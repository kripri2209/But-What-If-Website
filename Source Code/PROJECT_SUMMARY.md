# But, What If... - Project Summary

## Overview

**But, What If...** is a sophisticated AI-powered decision analysis tool that helps users make better choices by challenging their assumptions, exploring worst-case scenarios, and revealing hidden complexity.

## Project Status: 🔄 In Progress

Core features implemented. UI refinements and flow optimization in progress.

## What Has Been Built

### 1. **Frontend** (Next.js 16 + React 19)
- ✅ Interactive chat interface with real-time streaming
- ✅ Message display with markdown rendering and code highlighting
- ✅ Copy message to clipboard functionality
- ✅ Clear conversation button
- ✅ Retry failed messages
- ✅ Toast notifications for user feedback
- ✅ Responsive design with modern animations
- ✅ Loading indicators and timeout warnings

### 2. **Backend API** (Groq LLaMA 3.3 70B)
- ✅ Chat API (`/api/chat`) with Mixture of Experts routing
- ✅ Question classification (Financial, Career, Relationship, Ethical, Lifestyle, General)
- ✅ Domain-specific expert prompts with Chain-of-Thought reasoning
- ✅ Structured response format (REASONING → DETAILED → OPTIONS)
- ✅ Streaming response support for real-time feedback
- ✅ Follow-up message handling with conversation context
- ✅ Dynamic temperature adjustment per question type
- ✅ Comprehensive error handling and validation
- ✅ Rate limiting (10 req/min per client)
- ✅ Content filtering (violence, self-harm, illegal activity)
- ✅ Prompt injection defense

### 3. **Data Storage** (Browser localStorage)
- ✅ Chat sessions stored in browser localStorage
- ✅ Conversation history management
- ✅ Session persistence across page reloads
- ✅ Privacy-first (no server-side storage)
- ✅ No authentication required

### 4. **Security & Safety**
- ✅ Input validation (length, content type)
- ✅ Rate limiting with in-memory store
- ✅ Harmful content filtering
- ✅ Prompt injection detection and defense
- ✅ Meta-analysis responses for manipulation attempts
- ✅ Crisis resources for at-risk content

### 5. **Documentation**
- ✅ README.md - Project overview
- ✅ ARCHITECTURE.md - Technical design
- ✅ PROJECT_SUMMARY.md - Current state (this file)
- ✅ QUICKSTART.md - Developer guide
- ✅ SETUP.md - Configuration guide
- ✅ DEPLOYMENT.md - Deployment checklist
- ✅ AI_IMPROVEMENTS.md - AI enhancement techniques
- ✅ EDGE_CASE_HANDLING.md - Comprehensive edge case documentation
- ✅ FILE_INDEX.md - Complete file reference

## Key Features

### Mixture of Experts System
Intelligent question classification routes queries to domain-specialized experts:
- **Financial Expert**: Money, investments, budgets, loans
- **Career Expert**: Jobs, startups, professional growth
- **Relationship Expert**: Dating, marriage, family, friendships
- **Ethical Expert**: Moral dilemmas, values, honesty
- **Lifestyle Expert**: Health, travel, life changes, habits
- **General Expert**: Catch-all for other questions

### Chain-of-Thought Analysis
```
User Input → Classification → Expert Selection → Chain-of-Thought → Structured Response
```

Each expert follows domain-specific reasoning:
1. Domain-specific analysis steps
2. Risk identification
3. Alternative exploration
4. Structured output

### Response Structure
**REASONING**: Step-by-step Chain-of-Thought analysis
**DETAILED**: What you're missing, risks, real talk, bottom line
**OPTIONS**: Concrete alternatives with pros/cons

### Real-Time Chat Interface
- Streaming responses with Groq's ultra-fast inference
- **Advanced markdown rendering** with GitHub-flavored markdown
- **Code syntax highlighting** for technical discussions
- **Copy any message** to clipboard with hover button
- **Retry failed messages** automatically
- **Clear conversation** to start fresh
- **Toast notifications** for immediate feedback
- Error handling with detailed messages
- Session persistence with localStorage
- Dynamic temperature per question type

### Security Features
- Input validation (3-2000 chars, text required)
- Rate limiting (10 requests/min)
- Content filtering (violence, self-harm, illegal)
- Prompt injection defense
- Privacy-first (no server storage)

## File Structure

```
but-what-if/
├── app/
│   ├── api/chat/route.ts          ← Chat API with Mixture of Experts
│   ├── page.tsx                   ← Main chat interface entry
│   ├── layout.tsx                 ← Root layout
│   └── globals.css                ← Global styles
├── Source Code/
│   ├── components/
│   │   ├── chat-interface.tsx     ← Main chat UI
│   │   └── ui/                    ← shadcn/ui components
│   ├── lib/
│   │   ├── constants/
│   │   │   └── prompts.ts         ← Expert prompts & classification
│   │   ├── types/
│   │   │   └── index.ts           ← TypeScript types
│   │   └── utils.ts               ← Utility functions
│   └── [Documentation files]
├── package.json                   ← Dependencies
└── Configuration files
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS v4 | User interface & real-time interactions |
| **AI** | Groq (LLaMA 3.3 70B Versatile) | Ultra-fast LLM inference & analysis |
| **Prompting** | Mixture of Experts + Chain-of-Thought | Domain-specialized reasoning |
| **Storage** | Browser localStorage | Conversation persistence |
| **UI Components** | shadcn/ui + Radix UI | Accessible, customizable components |
| **Deployment** | Vercel | Production hosting with edge runtime |

## Environment Variables

```bash
GROQ_API_KEY=your_groq_api_key_here     # Required: Get from console.groq.com
```

That's it! No database credentials needed.

## Deployment to Vercel

```bash
# One-time setup
vercel

# Add environment variable in Vercel dashboard:
GROQ_API_KEY=your_api_key

# Deploy to production
vercel --prod
```

No database setup needed!

## What Users Experience

✅ Lightning-fast AI responses (Groq's ~200-300 tokens/sec)
✅ Domain-specific expert analysis
✅ Step-by-step Chain-of-Thought reasoning
✅ Structured insights (reasoning, details, options)
✅ Challenge to hidden assumptions
✅ Brutal counterarguments they hadn't considered
✅ Specific failure scenario analysis
✅ Hard questions that drive deeper thinking
✅ Ongoing conversation to refine analysis
✅ Private by default - no account needed
✅ Persistent chat history in browser

## API Endpoint

### POST /api/chat
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {"role": "user", "content": "I want to quit my job"}
    ]
  }'
```

**First message**: Runs 5-stage pipeline
**Follow-up messages**: Uses conversation context

## Performance Metrics

Current benchmarks:
- **Typing intro animation**: ~3-5 seconds duration
- **Chat response (first)**: ~3-5 seconds (Groq LLaMA)
- **Chat response (follow-up)**: ~2-4 seconds
- **localStorage operations**: < 50ms

## Current Features

✅ Mixture of Experts with 6 domain specialists
✅ Intelligent question classification
✅ Chain-of-Thought reasoning per domain
✅ Dynamic temperature adjustment
✅ Full chat interface with streaming
✅ Structured responses (REASONING → DETAILED → OPTIONS)
✅ Chat history with localStorage persistence
✅ Session management across page reloads
✅ **Enhanced markdown rendering** with code syntax highlighting
✅ **Copy message to clipboard** functionality
✅ **Retry failed messages** with one click
✅ **Clear conversation** button in header
✅ **Toast notifications** for user feedback
✅ **Comprehensive error handling** with detailed messages
✅ **Loading indicators** and timeout warnings (15s)
✅ **Rate limiting** - 10 requests per minute
✅ **Content filtering** - blocks harmful content
✅ **Prompt injection defense** - detects manipulation
✅ **Input validation** - length and content checks

## Next Steps / Future Enhancements

1. **Cloud Sync** (Optional)
   - Backend storage for cross-device sync
   - User authentication
   - Cloud backup of conversations

2. **Export Features**
   - Export conversations as PDF
   - Export as Markdown
   - Share conversations via link

3. **Advanced Analytics**
   - Decision outcome tracking
   - Lessons learned dashboard
   - Success/failure patterns
   - Personal decision-making insights

4. **More AI Models**
   - Claude (Anthropic)
   - GPT-4 (OpenAI)
   - Gemini (Google)
   - Model selection in UI

5. **Collaboration**
   - Share decisions with team
   - Collaborative analysis
   - Comments and annotations

6. **Mobile Experience**
   - Progressive Web App
   - Native iOS/Android apps
   - Voice input support

7. **Custom Experts**
   - User-defined domain experts
   - Industry-specific templates
   - Custom prompt engineering

8. **Integrations**
   - Email summaries
   - Slack bot
   - Browser extension

## Testing Checklist

- [x] Chat interface loads correctly
- [x] Chat API returns domain-expert responses
- [x] Question classification works accurately
- [x] Conversation history persists in localStorage
- [x] Follow-up messages maintain context
- [x] Copy message to clipboard works
- [x] Markdown rendering with code highlighting
- [x] Toast notifications display correctly
- [x] Clear conversation button works
- [x] Retry button appears on failed messages
- [x] Rate limiting enforces 10 req/min limit
- [x] Content filtering blocks harmful input
- [x] Prompt injection defense activates
- [x] Dynamic temperature adjusts per question type
- [ ] Mobile responsive design fully tested
- [ ] Performance optimization complete
- [ ] Accessibility audit passed

## Support & Resources

- **Current Documentation**: This PROJECT_SUMMARY.md file
- **Dependencies**: Check package.json
- **Issues**: Check browser console for errors

## Credits

Built with:
- Groq LLaMA 3.3 70B for AI analysis
- Next.js 16 & React 19
- Tailwind CSS for styling

---

**Status**: 🔄 In Progress

**Current State**: Interactive typing intro screen + Chat interface with But, What If... AI

**Next Action**: Continue UI/UX refinements and feature additions
