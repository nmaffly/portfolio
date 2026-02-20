const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const { knowledgeBase, systemPrompt } = require('./chatKnowledge');

const app = express();
const port = process.env.PORT || 3001;
console.log(port);

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Rate limiting - 10 requests per 15 minutes per IP
const chatLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { 
    error: 'Too many requests from this IP, please try again later.',
    retryAfter: '15 minutes'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Helper function to calculate cosine similarity
function cosineSim(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-8);
}

// In-memory embedding cache for KB
let kbIndex = null;

async function buildKbIndex() {
  console.log("Building knowledge base embedding index...");

  const indexed = [];

  for (const entry of knowledgeBase) {
    // Build a rich text representation for embedding
    const textParts = [
      `Title: ${entry.title}`,
      `Category: ${entry.category}`,
      `Keywords: ${entry.keywords.join(', ')}`,
      `Aliases: ${entry.aliases.join(', ')}`
    ];

    // Add all data fields
    if (entry.data) {
      for (const [key, value] of Object.entries(entry.data)) {
        textParts.push(`${key}: ${value}`);
      }
    }

    const text = textParts.join("\n");

    const emb = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text
    });

    indexed.push({
      ...entry,
      _embedding: emb.data[0].embedding
    });
  }

  console.log(`Indexed ${indexed.length} knowledge entries`);
  return indexed;
}


async function findRelevantContext(userMessage) {
  // Fallback if embeddings not ready yet
  if (!kbIndex) {
    return "Knowledge index is still loading. Please ask again in a moment.";
  }

  const qEmb = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: userMessage
  });
  const qVec = qEmb.data[0].embedding;

  const scored = kbIndex
    .map((entry) => ({
      entry,
      score: cosineSim(qVec, entry._embedding)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 4); // top-k

  // Optional: threshold to avoid garbage matches
  const filtered = scored.filter((x) => x.score > 0.2);

  if (filtered.length === 0) {
    return "No specific context found in Nate’s portfolio knowledge base.";
  }

  // Format context with the structured data
  return filtered
    .map(({ entry }, i) => {
      const parts = [
        `SOURCE ${i + 1}`,
        `ID: ${entry.id}`,
        `CATEGORY: ${entry.category}`,
        `TITLE: ${entry.title}`,
        `CONTENT:`
      ];
      
      // Add all data fields in a readable format
      if (entry.data) {
        for (const [key, value] of Object.entries(entry.data)) {
          parts.push(`  ${key}: ${value}`);
        }
      }
      
      return parts.join("\n");
    })
    .join("\n\n");
}

/**
 * Main chat endpoint
 */
app.post('/api/chat', chatLimiter, async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    console.log(message);
    
    // Validation
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Message is required and must be a non-empty string' 
      });
    }
    
    if (message.length > 500) {
      return res.status(400).json({ 
        error: 'Message is too long. Please keep it under 500 characters.' 
      });
    }
    
    console.log(`[${new Date().toISOString()}] User question: "${message}"`);
    
    // Find relevant context using RAG
    const context = await findRelevantContext(message);
    console.log(`[${new Date().toISOString()}] Found context entries: ${context.split('\n\n').length}`);
    
    // Build conversation messages for OpenAI
    const messages = [
      {
        role: 'system',
        content: systemPrompt.replace('{CONTEXT}', context)
      }
    ];
    
    // Add conversation history for continuity (last 4 messages)
    if (conversationHistory.length > 0) {
      conversationHistory.slice(-4).forEach(msg => {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content
          });
        }
      });
    }
    
    // Add current message
    messages.push({
      role: 'user',
      content: message
    });
    
    // Call OpenAI API
    console.log(`[${new Date().toISOString()}] Calling OpenAI...`);
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Cheapest model, still very capable
      messages: messages,
      temperature: 0.7,
      max_tokens: 250,
      presence_penalty: 0.1,
      frequency_penalty: 0.1
    });
    
    const response = completion.choices[0].message.content;
    console.log(`[${new Date().toISOString()}] Response generated successfully`);
    
    res.json({ 
      response,
      tokensUsed: completion.usage.total_tokens
    });
    
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Error:`, error.message);
    
    // Handle specific OpenAI errors
    if (error.code === 'insufficient_quota') {
      return res.status(503).json({ 
        error: 'The chatbot is temporarily unavailable. Please contact Nate directly at ncmaffly@ucdavis.edu'
      });
    }
    
    if (error.code === 'invalid_api_key') {
      return res.status(500).json({ 
        error: 'Configuration error. Please contact the site administrator.'
      });
    }
    
    // Generic error
    res.status(500).json({ 
      error: 'Sorry, I encountered an error. Please try again or contact Nate directly at nmaffly@example.com',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

/**
 * Root endpoint
 */
app.get('/', (req, res) => {
  res.json({ 
    message: 'Portfolio Chatbot API',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  console.log(`\nBackend server running on http://localhost:${port}`);
  
  console.log(`Health check: http://localhost:${port}/health`);
  console.log(`Chat endpoint: POST http://localhost:${port}/api/chat\n`);
  
  // Validate OpenAI key
  if (!process.env.OPENAI_API_KEY) {
    console.warn('WARNING: OPENAI_API_KEY is not set in environment variables!');
  }

  buildKbIndex()
  .then((idx) => (kbIndex = idx))
  .catch((e) => console.error("Failed to build KB index:", e));
});
