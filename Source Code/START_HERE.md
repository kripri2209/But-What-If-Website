# 🚀 START HERE - But, What If... Project Guide

Welcome to **But, What If...** - an AI-powered decision analysis chatbot that challenges your assumptions and explores the hidden complexity of your choices.

## ✨ What Is This?

A full-stack web application that helps users make better decisions by acting as a critical thinking advisor through an advanced AI analysis pipeline.

**Key Innovation**: Multi-prompt pipeline that systematically challenges decisions through:
1. **Parse** - Extract core decision
2. **Assumptions** - Identify hidden beliefs
3. **Counterarguments** - Generate opposing views
4. **Risk Analysis** - Explore failure modes
5. **Synthesis** - Create comprehensive challenge

## 🎯 Quick Start (5 minutes)

### 1. Install dependencies
```bash
pnpm install
```

### 2. Set up environment
```bash
cp .env.example .env.local
# Add your Supabase credentials:
# NEXT_PUBLIC_SUPABASE_URL=...
# NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

### 3. Set up database
- Go to Supabase dashboard
- Open SQL Editor
- Run `scripts/001_create_tables.sql`
- Run `scripts/002_create_rls_policies.sql`

### 4. Start development
```bash
pnpm dev
```

Visit `http://localhost:3000` 🎉

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
- Landing page with features showcase
- Interactive chat interface with real-time streaming
- Analytics dashboard
- Responsive dark-mode design

### ✅ Backend
- Multi-prompt pipeline API
- Streaming response support
- Follow-up message handling
- Error handling

### ✅ Database
- Supabase PostgreSQL with RLS
- Conversations, messages, analytics tables
- Migration scripts ready to run

### ✅ Documentation
- 8 comprehensive markdown guides
- Type definitions and constants
- Database utilities
- System prompts

## 📂 Project Structure

```
but-what-if/
├── app/                        # Next.js pages
│   ├── page.tsx               # Landing page
│   ├── chat/page.tsx          # Chat interface
│   ├── analytics/page.tsx     # Analytics dashboard
│   ├── api/chat/route.ts      # ⭐ Main API with 5-stage pipeline
│   └── layout.tsx             # Root layout
├── components/                 # React components
│   ├── chat-interface.tsx     # Chat UI
│   ├── landing-page.tsx       # Landing page UI
│   ├── analytics-dashboard.tsx # Analytics UI
│   └── ui/                    # Shadcn UI components
├── lib/                        # Utilities
│   ├── supabase/              # Supabase setup
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── db.ts             # Database functions
│   ├── constants/prompts.ts   # System prompts
│   ├── types/index.ts         # TypeScript types
│   └── utils.ts
├── scripts/                    # Database migrations
│   ├── 001_create_tables.sql
│   └── 002_create_rls_policies.sql
├── middleware.ts              # Session handling
└── 📄 Documentation files (8 guides)
```

## 🔑 Key Files to Know

| File | What It Does | When to Edit |
|------|-------------|--------------|
| `app/api/chat/route.ts` | 5-stage pipeline API | Change AI behavior |
| `components/chat-interface.tsx` | Chat UI | Modify chat display |
| `components/landing-page.tsx` | Landing page | Update homepage |
| `lib/constants/prompts.ts` | System prompts | Change analysis prompts |
| `lib/supabase/db.ts` | Database functions | Add database operations |
| `app/globals.css` | Theme & styling | Change colors/fonts |

## 🎯 The 5-Stage Pipeline

When a user sends their first message:

```
"I'm thinking about quitting my job"
    ↓
STAGE 1: Parser extracts "Decision: Career change from employment to unknown"
    ↓
STAGE 2: Assumptions identifies "You assume new opportunity exists, You assume savings last"
    ↓
STAGE 3: Counterarguments generates "You might fail financially, Market might be bad"
    ↓
STAGE 4: Risk Analysis discovers "Family impact, Resume gap, Loss of benefits"
    ↓
STAGE 5: Synthesis creates comprehensive analytical response
    ↓
Response streamed to user in real-time
```

Each stage uses GPT-4 and builds on previous outputs for deep analysis.

## 🚀 What To Do Next

### Option 1: Get Running Locally (5 min)
```bash
pnpm install
cp .env.example .env.local
# Add Supabase credentials
pnpm dev
```

### Option 2: Understand the Code (15 min)
Read in order:
1. [QUICKSTART.md](./QUICKSTART.md) - Setup and structure
2. [ARCHITECTURE.md](./ARCHITECTURE.md) - How it all works
3. Browse: `app/api/chat/route.ts` - See the pipeline

### Option 3: Deploy to Production (30 min)
Follow: [DEPLOYMENT.md](./DEPLOYMENT.md)

### Option 4: Customize (varies)
- Change prompts: Edit `lib/constants/prompts.ts`
- Change design: Edit `app/globals.css` and components
- Change behavior: Modify `app/api/chat/route.ts`

## 💡 Key Concepts

### The Critical Thinking Approach
Instead of helping users confirm decisions, this AI actively challenges them to think deeper and consider what they might be missing.

### 5-Stage Pipeline
Progressive analysis that builds understanding layer by layer, creating richer insights than a single-prompt approach.

### Real-Time Streaming
Responses stream character-by-character for better UX and immediate feedback.

### Data Privacy
Row Level Security ensures users only see their own conversations and decisions.

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS
- **UI Components**: Shadcn/ui
- **AI**: OpenAI GPT-4 (via Vercel AI Gateway)
- **Database**: Supabase PostgreSQL
- **Streaming**: Vercel AI SDK 6
- **Deployment**: Vercel

## ❓ Common Questions

**Q: How do I change the system prompts?**
A: Edit `lib/constants/prompts.ts` - all prompts are defined there.

**Q: How do I modify the UI?**
A: Edit component files in `components/` and styling in `app/globals.css`.

**Q: How do I add a new page?**
A: Create `app/[name]/page.tsx` - Next.js will automatically route it.

**Q: How do I save data to database?**
A: Use functions from `lib/supabase/db.ts` in your API routes.

**Q: How do I deploy?**
A: Follow the step-by-step guide in [DEPLOYMENT.md](./DEPLOYMENT.md).

## 🐛 Debugging

### Chat not responding?
- Check OpenAI API access
- Review `app/api/chat/route.ts` for errors
- Check browser console for errors

### Database not saving?
- Verify Supabase connection
- Check RLS policies are enabled
- Run migrations if not done yet

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
