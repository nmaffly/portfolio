# Portfolio Chatbot Backend

Express backend for the portfolio chatbot using OpenAI RAG.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file:**
```bash
cp .env.example .env
```

3. **Add your OpenAI API key to `.env`:**
```
OPENAI_API_KEY=sk-your-actual-key-here
```

Get your API key from: https://platform.openai.com/api-keys

## Running

**Development (with auto-restart):**
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on `http://localhost:3001`

## Endpoints

### POST /api/chat
Main chatbot endpoint.

**Request:**
```json
{
  "message": "What did you build at ScoutAI?",
  "conversationHistory": [
    { "role": "user", "content": "...", "timestamp": "..." },
    { "role": "assistant", "content": "...", "timestamp": "..." }
  ]
}
```

**Response:**
```json
{
  "response": "ScoutAI is a basketball analytics platform...",
  "tokensUsed": 156
}
```

### GET /health
Health check endpoint.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-02-03T...",
  "uptime": 123.45
}
```

## Rate Limiting

- 10 requests per 15 minutes per IP address
- Prevents abuse and controls costs

## Testing

```bash
# Test health check
curl http://localhost:3001/health

# Test chat (replace with your actual question)
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "What is ScoutAI?"}'
```

## Cost Estimates

Using GPT-4o-mini:
- Input: $0.15 per 1M tokens (~$0.0001 per question)
- Output: $0.60 per 1M tokens (~$0.0002 per response)
- Average conversation: ~$0.002 (0.2 cents per 5 Q&A)
- 100 users × 5 questions: ~$0.20

**Recommended:** Set spending limit in OpenAI dashboard to $5/month

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `OPENAI_API_KEY` | Yes | - | Your OpenAI API key |
| `PORT` | No | 3001 | Server port |
| `FRONTEND_URL` | No | http://localhost:3000 | Frontend URL for CORS |
| `NODE_ENV` | No | development | Environment mode |

## Deployment

### Option 1: Railway
1. Push code to GitHub
2. Connect Railway to your repo
3. Add environment variables in Railway dashboard
4. Deploy

### Option 2: Render
1. Create new Web Service
2. Connect your repo
3. Add environment variables
4. Deploy

### Option 3: With Frontend (Same Server)
If deploying on Vercel/Netlify with frontend:
- Frontend builds to `/build`
- Express serves static files from `/build`
- Add to `server.js` before routes:
```javascript
app.use(express.static(path.join(__dirname, '../build')));
```

## Troubleshooting

**"OpenAI API key is not set"**
- Make sure `.env` file exists
- Check that `OPENAI_API_KEY` is set correctly
- Restart the server

**CORS errors**
- Update `FRONTEND_URL` in `.env` to match your frontend
- For production, set it to your deployed frontend URL

**Rate limit errors**
- Wait 15 minutes
- Or adjust limits in `server.js` (chatLimiter)

**High costs**
- Set OpenAI spending limit: https://platform.openai.com/account/limits
- Monitor usage: https://platform.openai.com/usage
- Consider reducing `max_tokens` in server.js

## Files

- `server.js` - Main Express server
- `chatKnowledge.js` - Knowledge base for RAG
- `package.json` - Dependencies
- `.env` - Environment variables (create this)

## Security Notes

- Never commit `.env` file
- Set OpenAI spending limits
- Rate limiting is enabled by default
- CORS restricted to your frontend URL
