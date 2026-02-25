const OpenAI = require('openai');
const { knowledgeBase, systemPrompt } = require('../backend/chatKnowledge');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 10;
const rateLimitStore = new Map();

const DEFAULT_ALLOWED_ORIGIN = 'https://nmaffly.github.io';
const allowedOrigins = (process.env.FRONTEND_URL || DEFAULT_ALLOWED_ORIGIN)
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

let kbIndex = null;
let kbIndexPromise = null;

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin && allowedOrigins.length > 0) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (forwarded) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { windowStart: now, count: 1 });
    return { allowed: true };
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    const retryAfterMs = RATE_LIMIT_WINDOW_MS - (now - entry.windowStart);
    return { allowed: false, retryAfterMs };
  }

  entry.count += 1;
  return { allowed: true };
}

function cosineSim(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  const len = Math.min(a.length, b.length);

  for (let i = 0; i < len; i += 1) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-8);
}

async function buildKbIndex() {
  const indexed = [];

  for (const entry of knowledgeBase) {
    const textParts = [
      `Title: ${entry.title}`,
      `Category: ${entry.category}`,
      `Keywords: ${entry.keywords.join(', ')}`,
      `Aliases: ${entry.aliases.join(', ')}`
    ];

    if (entry.data) {
      for (const [key, value] of Object.entries(entry.data)) {
        textParts.push(`${key}: ${value}`);
      }
    }

    const text = textParts.join('\n');

    const emb = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text
    });

    indexed.push({
      ...entry,
      _embedding: emb.data[0].embedding
    });
  }

  return indexed;
}

async function getKbIndex() {
  if (kbIndex) return kbIndex;
  if (!kbIndexPromise) {
    kbIndexPromise = buildKbIndex()
      .then((idx) => {
        kbIndex = idx;
        return idx;
      })
      .catch((err) => {
        kbIndexPromise = null;
        throw err;
      });
  }
  return kbIndexPromise;
}

async function findRelevantContext(userMessage) {
  let index;
  try {
    index = await getKbIndex();
  } catch (err) {
    return 'Knowledge index failed to load. Please try again later.';
  }

  const qEmb = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: userMessage
  });
  const qVec = qEmb.data[0].embedding;

  const scored = index
    .map((entry) => ({
      entry,
      score: cosineSim(qVec, entry._embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  const filtered = scored.filter((x) => x.score > 0.2);

  if (filtered.length === 0) {
    return "No specific context found in Nate’s portfolio knowledge base.";
  }

  return filtered
    .map(({ entry }, i) => {
      const parts = [
        `SOURCE ${i + 1}`,
        `ID: ${entry.id}`,
        `CATEGORY: ${entry.category}`,
        `TITLE: ${entry.title}`,
        'CONTENT:'
      ];

      if (entry.data) {
        for (const [key, value] of Object.entries(entry.data)) {
          parts.push(`  ${key}: ${value}`);
        }
      }

      return parts.join('\n');
    })
    .join('\n\n');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const ip = getClientIp(req);
  const rate = checkRateLimit(ip);
  if (!rate.allowed) {
    res.status(429).json({
      error: 'Too many requests from this IP, please try again later.',
      retryAfter: '15 minutes'
    });
    return;
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { message, conversationHistory = [] } = body || {};

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        error: 'Message is required and must be a non-empty string'
      });
      return;
    }

    if (message.length > 500) {
      res.status(400).json({
        error: 'Message is too long. Please keep it under 500 characters.'
      });
      return;
    }

    const context = await findRelevantContext(message);

    const messages = [
      {
        role: 'system',
        content: systemPrompt.replace('{CONTEXT}', context)
      }
    ];

    if (Array.isArray(conversationHistory) && conversationHistory.length > 0) {
      conversationHistory.slice(-4).forEach((msg) => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          });
        }
      });
    }

    messages.push({ role: 'user', content: message });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      temperature: 0.7,
      max_tokens: 250,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });

    const response = completion.choices[0].message.content;

    res.json({
      response,
      tokensUsed: completion.usage?.total_tokens
    });
  } catch (error) {
    if (error?.code === 'insufficient_quota') {
      res.status(503).json({
        error:
          'The chatbot is temporarily unavailable. Please contact Nate directly at ncmaffly@ucdavis.edu'
      });
      return;
    }

    if (error?.code === 'invalid_api_key') {
      res.status(500).json({
        error: 'Configuration error. Please contact the site administrator.'
      });
      return;
    }

    res.status(500).json({
      error:
        'Sorry, I encountered an error. Please try again or contact Nate directly at ncmaffly@ucdavis.edu',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
