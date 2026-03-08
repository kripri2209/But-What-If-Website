# 🚀 START HERE - But, What If... Project Guide

Welcome to **But, What If...** - an AI-powered decision analysis chatbot that challenges your assumptions and explores the hidden complexity of your choices.

## ✨ What Is This?

A full-stack web application that helps users make better decisions by acting as a critical thinking advisor through an advanced **Mixture of Experts** AI system.

**Key Innovation**: Intelligent question classification routes each query to a domain-specialized expert (Financial, Career, Relationship, Ethical, Lifestyle, General) that uses Chain-of-Thought reasoning for deep analysis.

## 🎯 Quick Start (5 minutes)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Add your Groq API key:
GROQ_API_KEY=your_groq_api_key_here
```

Get your key from [console.groq.com](https://console.groq.com)

### 3. Start development
```bash
pnpm dev
```

Visit `http://localhost:3000` 🎉

**No database setup required!**

## 📚 Documentation Map

Choose your path based on what you need:

### 👨‍💻 For Developers
1. **[QUICKSTART.md](./QUICKSTART.md)** ← Start here!
   - Local setup
   - Project structure
   - Common tasks
   - Testing guide

2. **[ARCHITECTURE.md](./ARCHITECTURE.md)**
   - Technical design
   - Data flow
   - Component architecture
   - Database schema

### 🚀 For Deployment
1. **[DEPLOYMENT.md](./DEPLOYMENT.md)**
   - Step-by-step checklist
   - Vercel setup
   - Supabase migration
   - Testing before launch

2. **[SETUP.md](./SETUP.md)**
   - Detailed configuration
   - Environment variables
   - Database setup
   - Troubleshooting

### 🎓 For Understanding
1. **[README.md](./README.md)**
   - Project overview
   - Features
   - Tech stack

2. **[PROMPTS.md](./PROMPTS.md)**
   - AI prompt engineering
   - 5-stage pipeline details
   - System prompt reference

3. **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)**
   - High-level status
   - What's been built
   - File structure
   - Next steps

### 🗂️ For Navigation
- **[FILE_INDEX.md](./FILE_INDEX.md)** - Complete file reference and purposes

## 🏗️ What's Already Built

### ✅ Frontend
- Interactive chat interface with real-time streaming
- Responsive dark-mode design
- Markdown rendering with code highlighting
- Copy to clipboard, clear chat, retry features
- Toast notifications
- localStorage persistence

### ✅ Backend
- Mixture of Experts AI routing
- 6 domain specialists (Financial, Career, Relationship, Ethical, Lifestyle, General)
- Chain-of-Thought reasoning per domain
- Dynamic temperature adjustment
- Groq API integration with streaming
- Rate limiting (10 req/min)
- Content filtering (violence, self-harm, illegal)
- Prompt injection defense
- Input validation

### ✅ Data Storage
- Browser localStorage (no database)
- Privacy-first approach
- Session persistence
- No authentication required

### ✅ Documentation
- 8 comprehensive markdown guides
- Type definitions and constants
- Database utilities
- System prompts

## 📂 Project Structure

```
but-what-if/
├── app/                        # Next.js app directory
│   ├── page.tsx               # Main chat interface
│   ├── api/chat/route.ts      # ⭐ Mixture of Experts + Groq API
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── Source Code/
│   ├── components/            # React components
│   │   ├── chat-interface.tsx # Chat UI
│   │   └── ui/                # shadcn UI components
│   ├── lib/                   # Utilities
│   │   ├── constants/
│   │   │   └── prompts.ts     # Expert prompts & classification
│   │   ├── types/index.ts     # TypeScript types
│   │   └── utils.ts           # Utility functions
│   └── [Documentation]        # 8 comprehensive guides
├── package.json
└── Configuration files
```

## 🔑 Key Files to Know

| File | What It Does | When to Edit |
|------|-------------|--------------|
| `app/api/chat/route.ts` | Mixture of Experts + Groq API | Change AI behavior, add experts |
| `Source Code/components/chat-interface.tsx` | Chat UI | Modify chat display |
| `Source Code/lib/constants/prompts.ts` | Expert prompts & classification | Change prompts, add domains |
| `lib/supabase/db.ts` | Database functions | Add database operations |
| `app/globals.css` | Theme & styling | Change colors/fonts |

## 🎯 The Mixture of Experts System

When a user sends a message:

```
"Should I buy a house or keep renting?"
    ↓
Question Classification
    ↓
Determined: FINANCIAL (keyword: buy, house, renting)
    ↓
Financial Expert Selected
    ↓
Chain-of-Thought Reasoning:
  1. Follow the money (down payment, mortgage, maintenance)
  2. Calculate worst-case (market crash, job loss)
  3. Identify hidden costs (taxes, insurance, repairs)
  4. Stress test (what if rates rise?)
  5. Compare alternatives (investing difference)
    ↓
Structured Response:
  - REASONING: Expert's step-by-step thinking
  - DETAILED: Financial blind spots and risks
  - OPTIONS: Buy vs Rent with specific pros/cons
    ↓
Streamed to user in real-time via Groq
```

Each expert (Financial, Career, Relationship, Ethical, Lifestyle, General) uses domain-specific Chain-of-Thought reasoning.

## 🚀 What To Do Next

### Option 1: Get Running Locally (2 min)
```bash
pnpm install
cp .env.example .env.local
# Add Groq API key
GROQ_API_KEY=your_key
pnpm dev
```

### Option 2: Understand the Code (15 min)
Read in order:
1. [QUICKSTART.md](./QUICKSTART.md) - Setup and structure
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - Mixture of Experts system
3. Browse: `app/api/chat/route.ts` - See the implementation

### Option 3: Deploy to Production (10 min)
Follow: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Option 4: Customize (varies)
- Add expert: Edit `Source Code/lib/constants/prompts.ts`
- Change prompts: Modify expert prompts in same file
- Change design: Edit `app/globals.css` and components
- Adjust safety: Modify validation functions in `route.ts`

## 💡 Key Concepts

### The Critical Thinking Approach
Instead of helping users confirm decisions, this AI actively challenges them to think deeper and consider what they might be missing.

### Mixture of Experts
Questions are intelligently classified and routed to domain specialists, each with expertise in Financial, Career, Relationship, Ethical, Lifestyle, or General decision-making.

### Chain-of-Thought Reasoning
Each expert follows a structured thinking process before responding, ensuring thorough analysis.

### Real-Time Streaming
Groq provides ultra-fast streaming (~200-300 tokens/sec) for immediate feedback.

### Privacy First
All data stays in browser localStorage - no server-side storage, no authentication needed.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI + Tailwind)
- **AI**: Groq (LLaMA 3.3 70B Versatile)
- **Storage**: Browser localStorage
- **Prompting**: Mixture of Experts + Chain-of-Thought
- **Deployment**: Vercel

## ❓ Common Questions

**Q: How do I change the expert prompts?**
A: Edit `Source Code/lib/constants/prompts.ts` - all expert prompts are defined in `EXPERT_PROMPTS`.

**Q: How do I add a new expert domain?**
A: 1) Add to `QuestionType` enum, 2) Add patterns to `classifyQuestion()`, 3) Add expert prompt to `EXPERT_PROMPTS` object.

**Q: How do I modify the UI?**
A: Edit `Source Code/components/chat-interface.tsx` and styling in `app/globals.css`.

**Q: How do I adjust rate limiting?**
A: Change `MAX_REQUESTS_PER_MINUTE` constant in `app/api/chat/route.ts`.

**Q: How do I deploy?**
A: Follow [DEPLOYMENT.md](./DEPLOYMENT.md). Just need to add `GROQ_API_KEY` in Vercel.

## 🐛 Debugging

### Chat not responding?
- Check Groq API key in `.env.local`
- Check Groq API status: [status.groq.com](https://status.groq.com)
- Review browser console for errors
- Check `app/api/chat/route.ts` for server errors

### localStorage not saving?
- Check browser privacy settings
- Verify localStorage is enabled
- Check browser storage quota
- Try incognito mode to test

### Classification not working?
- Check console for `🎯 Question classified as:` logs
- Review patterns in `classifyQuestion()` function
- Test with obvious keywords for each domain

### UI looks broken?
- Clear Next.js cache: `rm -rf .next`
- Check Tailwind is working: `pnpm dev`
- Verify all components are imported

## 📖 Full Documentation Index

| Guide | Purpose | Reading Time |
|-------|---------|--------------|
| [README.md](./README.md) | Project overview | 5 min |
| [QUICKSTART.md](./QUICKSTART.md) | Developer guide | 15 min |
| [SETUP.md](./SETUP.md) | Configuration guide | 10 min |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production checklist | 20 min |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical deep dive | 25 min |
| [PROMPTS.md](./PROMPTS.md) | Prompt engineering | 10 min |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | Project status | 10 min |
| [FILE_INDEX.md](./FILE_INDEX.md) | File reference | 5 min |

## 🎓 Learning Path

**Beginner (Start here)**
1. Read [README.md](./README.md) - 5 min
2. Follow [QUICKSTART.md](./QUICKSTART.md) setup - 5 min
3. Explore landing page code - 10 min
4. Send test message in chat - 5 min

**Intermediate**
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) - 25 min
2. Study `app/api/chat/route.ts` - 15 min
3. Review database schema - 10 min
4. Understand RLS policies - 10 min

**Advanced**
1. Study [PROMPTS.md](./PROMPTS.md) - 10 min
2. Analyze prompt engineering - 15 min
3. Review pipeline stages - 10 min
4. Optimize performance - 30 min

## ✅ Verification Checklist

Before considering complete, verify:
- [ ] Landing page loads and shows features
- [ ] Can send message in chat interface
- [ ] API returns analytical response
- [ ] Response streams in real-time
- [ ] Messages saved to database
- [ ] Can send follow-up messages
- [ ] Analytics page loads
- [ ] Mobile responsive design works

## 🎯 Project Status

| Component | Status | Notes |
|-----------|--------|-------|
| Frontend UI | ✅ Complete | Landing, chat, analytics |
| API Pipeline | ✅ Complete | 5-stage multi-prompt |
| Database | ✅ Complete | Tables, migrations, RLS |
| Supabase Integration | ✅ Complete | Auth & database ready |
| Documentation | ✅ Complete | 8 comprehensive guides |
| Testing | ✅ Ready | See QUICKSTART.md |
| Deployment | ✅ Ready | See DEPLOYMENT.md |

## 🚀 Next Steps

1. **Immediate**: `pnpm install && pnpm dev` to get running
2. **Short-term**: Read [QUICKSTART.md](./QUICKSTART.md) for full understanding
3. **Medium-term**: Deploy to Vercel following [DEPLOYMENT.md](./DEPLOYMENT.md)
4. **Long-term**: Add user auth, conversation export, outcome tracking

## 📞 Need Help?

1. **Setup issues**: Check [SETUP.md](./SETUP.md) troubleshooting section
2. **Development questions**: See [QUICKSTART.md](./QUICKSTART.md) FAQ
3. **Deployment issues**: Follow [DEPLOYMENT.md](./DEPLOYMENT.md) troubleshooting
4. **Architecture questions**: Read [ARCHITECTURE.md](./ARCHITECTURE.md)
5. **Prompt customization**: See [PROMPTS.md](./PROMPTS.md)

---

## 🎉 Ready? Let's Go!

```bash
# 1. Install
pnpm install

# 2. Configure
cp .env.example .env.local
# Add Supabase credentials

# 3. Run database migrations in Supabase dashboard

# 4. Start
pnpm dev

# 5. Visit http://localhost:3000
```

**Welcome to But, What If...!** 🎯

Start challenging decisions and revealing complexity.

---

Last Updated: 2024  
Status: ✅ Complete and Ready  
Next Guide: [QUICKSTART.md](./QUICKSTART.md)
