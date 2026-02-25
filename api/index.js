const DEFAULT_ALLOWED_ORIGIN = 'https://nmaffly.github.io';

function normalizeOrigin(value) {
  if (!value) return null;
  try {
    return new URL(value).origin;
  } catch (err) {
    return value.replace(/\/+$/, '');
  }
}

const allowedOrigins = (process.env.FRONTEND_URL || DEFAULT_ALLOWED_ORIGIN)
  .split(',')
  .map((o) => normalizeOrigin(o.trim()))
  .filter(Boolean);
const allowAnyOrigin = allowedOrigins.includes('*');

function setCorsHeaders(req, res) {
  const origin = req.headers.origin;
  if (origin && (allowAnyOrigin || allowedOrigins.includes(origin))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (!origin && allowedOrigins.length > 0) {
    res.setHeader('Access-Control-Allow-Origin', allowedOrigins[0]);
  } else if (!origin && allowAnyOrigin) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }

  res.setHeader('Vary', 'Origin');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
}

module.exports = async function handler(req, res) {
  setCorsHeaders(req, res);

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  res.json({
    message: 'Portfolio Chatbot API',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /api/health'
    }
  });
};
