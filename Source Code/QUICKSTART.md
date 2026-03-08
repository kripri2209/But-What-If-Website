# But, What If... - Quick Start Guide

## What is But, What If...?

But, What If... is an AI-powered decision analysis tool that uses a Mixture of Experts system to deliver domain-specialized critiques. Questions are intelligently routed to expert prompts (Financial, Career, Relationship, Ethical, Lifestyle, General) that use Chain-of-Thought reasoning for deeper analysis.

## Features

✅ **Mixture of Experts System**
- Intelligent question classification
- 6 domain specialists (Financial, Career, Relationship, Ethical, Lifestyle, General)
- Chain-of-Thought reasoning per domain

✅ **Structured Analysis**
- REASONING: Step-by-step expert thinking
- DETAILED: Blind spots, risks, real talk
- OPTIONS: Concrete alternatives with pros/cons

✅ **Real-Time Streaming** - Lightning-fast responses with Groq (~200-300 tokens/sec)

✅ **Conversation History** - localStorage persistence, no account needed

✅ **Safety Features** - Rate limiting, content filtering, prompt injection defense

✅ **Modern UI** - Markdown rendering, code highlighting, copy to clipboard

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + shadcn/ui + Tailwind CSS v4
- **AI**: Groq (LLaMA 3.3 70B Versatile) with Mixture of Experts
- **Storage**: Browser localStorage (no database required)
- **Deployment**: Vercel

## Local Development

### Prerequisites
```bash
# Node.js 18+ required
node --version

# pnpm package manager
npm install -g pnpm
```

### Setup

1. **Clone and install**
```bash
git clone <repository>
cd but-what-if
pnpm install
```

2. **Environment variables**
```bash
# Copy example
cp .env.example .env.local

# Add your Groq API key
GROQ_API_KEY=your_groq_api_key_here
```

Get your API key from [console.groq.com](https://console.groq.com)

```bash
pnpm dev
```

Visit `http://localhost:3000`

**No database setup needed!**

## Project Structure

```
but-what-if/
├── app/
│   ├── api/chat/route.ts          # Mixture of Experts + Groq API
│   ├── page.tsx                   # Main chat interface
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── Source Code/
│   ├── components/
│   │   ├── chat-interface.tsx     # Main chat UI
│   │   └── ui/                    # shadcn UI components
│   ├── lib/
│   │   ├── constants/
│   │   │   └── prompts.ts         # Expert prompts & classification
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   └── utils.ts               # Utility functions
│   └── [Documentation]
├── package.json
└── [Config files]
```

## Core Components

### Chat Interface (`Source Code/components/chat-interface.tsx`)
- Real-time streaming chat with Groq
- Message history from localStorage
- Loading indicators and timeouts
- Input validation (3-2000 chars)
- Copy to clipboard, retry, clear chat
- Markdown rendering with code highlighting

### API Route (`app/api/chat/route.ts`)
```ts
POST /api/chat
Body: { messages: ChatMessage[] }
Response: Server-Sent Events stream
```

**Pipeline:**
1. Input validation & content filtering
2. Rate limiting check
3. Question classification
4. Expert prompt selection
5. Chain-of-Thought reasoning
6. Streaming response
## The Mixture of Experts System

Each question is intelligently classified and routed to a domain specialist:

```
User Input
    ↓
Question Classification
(Financial | Career | Relationship | Ethical | Lifestyle | General)
    ↓
Expert Prompt Selection
    ↓
Chain-of-Thought Reasoning (domain-specific)
    ↓
Structured Response:
  - REASONING: Step-by-step analysis
  - DETAILED: Blind spots, risks, real talk
  - OPTIONS: Alternatives with pros/cons
    ↓
Streamed to User
```

**Expert Specializations:**
- **Financial**: Money flows, risks, opportunity costs
- **Career**: Trajectory, skills, market dynamics
- **Relationship**: Emotional patterns, perspectives, compatibility
- **Ethical**: Values, fairness, moral implications
- **Lifestyle**: Health, habits, long-term effects
- **General**: Multi-domain reasoning

## Key Files to Modify

### To change expert prompts:
Edit `Source Code/lib/constants/prompts.ts`

### To modify classification:
Edit `classifyQuestion()` in `Source Code/lib/constants/prompts.ts`

### To modify API logic:
Edit `app/api/chat/route.ts`

### To update UI styling:
Edit `app/globals.css` for theme tokens
Edit component files for layout/design

### To adjust safety features:
- Rate limiting: `checkRateLimit()` in `route.ts`
- Content filtering: `filterHarmfulContent()` in `route.ts`
- Prompt injection: `detectPromptInjection()` in `route.ts`

## Testing

### Test the chat API locally:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "I want to quit my job to start a startup"}
    ]
  }'
```

### Test question classification:
Open browser console and check for:
```
🎯 Question classified as: career
```

### Test localStorage:
```js
// In browser console
localStorage.getItem('chatSessions')
```

## Common Tasks

### Add a new expert domain
1. Add domain to `QuestionType` enum in `prompts.ts`
2. Add classification patterns to `classifyQuestion()`
3. Create expert prompt in `EXPERT_PROMPTS`
4. Test classification accuracy

### Adjust rate limiting
Edit `MAX_REQUESTS_PER_MINUTE` in `app/api/chat/route.ts`

### Modify temperature settings
Edit `getOptimalSettings()` in `app/api/chat/route.ts`

### Style a component
- Use Tailwind CSS classes
- Reference design tokens in `app/globals.css`
- Use shadcn/ui components from `Source Code/components/ui/`

### Debug streaming responses
Add console.log in `app/api/chat/route.ts`:
```ts
console.log('🎯 Question classified as:', questionType)
console.log('🌡️ Temperature:', temperature)
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add GROQ_API_KEY in Vercel dashboard
# Then deploy to production
vercel --prod
```

**No database setup required!**

## Performance Tips

1. **Streaming**: Groq provides ~200-300 tokens/sec (extremely fast)
2. **localStorage**: Zero-latency data access
3. **No Database**: No backend round-trips
4. **Client-Side First**: All persistence is local
5. **Code Splitting**: Dynamic imports for heavy components

## Security

- ✅ Rate limiting (10 req/min per client)
- ✅ Content filtering (violence, self-harm, illegal)
- ✅ Prompt injection defense
- ✅ Input validation (3-2000 chars)
- ✅ API key security (server-side only)
- ✅ Privacy-first (no server storage)
- ✅ HTTPS only (via Vercel)

**Test rate limiting:**
```bash
# Send 11 requests rapidly - last should be blocked
for i in {1..11}; do curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'; done
```

## Troubleshooting

### Chat not responding?
- Check Groq API key in `.env.local`
- Verify Groq API status at [status.groq.com](https://status.groq.com)
- Check browser console for errors
- Review `app/api/chat/route.ts` error handling
- Check rate limiting (10 req/min)

### localStorage not persisting?
- Check browser privacy settings
- Verify localStorage is enabled
- Check for quota exceeded errors
- Try clearing browser cache

### Styling issues?
- Clear Next.js cache: `rm -rf .next`
- Restart dev server: `pnpm dev`
- Verify Tailwind CSS config
- Check class names in components

## Next Steps

1. Add user authentication
2. Implement conversation export
3. Build decision outcome tracking
4. Create analytics dashboard
5. Set up email notifications
6. Add multi-language support

## Resources

- [Groq Documentation](https://console.groq.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [LLaMA 3.3 Model Card](https://www.llama.com/llama3-3/)

## Support

For issues:
1. Check error logs in browser console
2. Review Vercel deployment logs
3. Check Supabase activity logs
4. Refer to DEPLOYMENT.md troubleshooting section

Happy decision-making! 🎯
