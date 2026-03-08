# But, What If... - File Index

Complete reference of all project files and their purposes.

## 📄 Documentation Files

| File | Purpose |
|------|---------|
| [README.md](./README.md) | Project overview and feature description |
| [QUICKSTART.md](./QUICKSTART.md) | Developer quick start guide - start here! |
| [SETUP.md](./SETUP.md) | Detailed setup and configuration guide |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Production deployment checklist |
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Technical architecture and design patterns |
| [PROMPTS.md](./PROMPTS.md) | System prompt reference and engineering notes |
| [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) | High-level project status and overview |
| [FILE_INDEX.md](./FILE_INDEX.md) | This file - complete file reference |

## 🎨 Frontend Components

### Pages
| File | Purpose |
|------|----------|
| `app/page.tsx` | Main chat interface entry point |
| `app/layout.tsx` | Root layout with metadata and providers |
| `app/globals.css` | Global styles and theme variables |

### Components
| File | Purpose |
|------|---------|
| `Source Code/components/chat-interface.tsx` | Main chat UI with streaming, markdown, copy, retry features |

### UI Components (Auto-generated via shadcn)
All components in `components/ui/` are shadcn/ui components and should not be manually edited.

## ⚙️ Backend & API

| File | Purpose |
|------|---------|
| `app/api/chat/route.ts` | **Core API** - Mixture of Experts, Groq integration, streaming responses, safety features |
| `app/layout.tsx` | Root layout with metadata and global setup |

## 🗄️ Database & Storage

**Storage Method:** Browser localStorage (no database)

| Feature | Implementation |
|---------|---------------|
| Chat sessions | Stored in localStorage as JSON |
| Message history | Part of chat session object |
| Persistence | Survives page reloads |
| Privacy | All data stays in browser |

## 📦 Utilities & Configuration

### Constants & Types
| File | Purpose |
|------|---------|
| `Source Code/lib/constants/prompts.ts` | **Expert prompts & classification** - Mixture of Experts, question classification, domain-specific prompts |
| `Source Code/lib/types/index.ts` | **TypeScript types** - Message, ChatSession, QuestionType, etc. |
| `Source Code/lib/utils.ts` | General utility functions (cn, formatting, etc.) |

### Configuration
| File | Purpose |
|------|---------|
| `package.json` | Dependencies and scripts |
| `.env.example` | Environment variable template |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS configuration |
| `app/globals.css` | Global styles and design tokens |

## 🎯 Key Directories

```
but-what-if/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── chat/           # Chat page
│   ├── analytics/      # Analytics page
│   └── layout.tsx      # Root layout
├── components/         # React components
│   ├── ui/            # Shadcn UI components
│   ├── chat-interface.tsx
│   ├── landing-page.tsx
│   └── analytics-dashboard.tsx
├── lib/               # Utilities and services
│   ├── supabase/      # Supabase clients and DB functions
│   ├── constants/     # Constants (prompts, etc.)
│   ├── types/         # TypeScript types
│   └── utils.ts
├── scripts/           # Database migration scripts
│   ├── 001_create_tables.sql
│   └── 002_create_rls_policies.sql
├── middleware.ts      # Next.js middleware
└── Documentation/     # All .md files
```

## 🔄 Data Flow

```
User Input
    ↓
Source Code/components/chat-interface.tsx
    ↓ (POST /api/chat)
app/api/chat/route.ts
    ├─ Input validation & content filtering
    ├─ Rate limiting check
    ├─ Question classification (Financial/Career/etc)
    ├─ Expert prompt selection
    ├─ Dynamic temperature setting
    ├─ Groq API call with streaming
    └─ Prompt injection defense
    ↓
Stream response back to client
    ↓
Source Code/components/chat-interface.tsx (display with markdown)
    ↓
localStorage (save to browser storage)
```

## � Important API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Main chat interface |
| `/api/chat` | POST | Chat API with Mixture of Experts and Groq streaming |

## 🚀 Deployment Files

| File | Purpose |
|------|---------|
| `.vercelignore` | Files to exclude from Vercel deployment |
| `DEPLOYMENT.md` | Deployment checklist and steps |
| `vercel.json` | Vercel configuration (if needed) |

## 📝 How to Use This Index

1. **For frontend work**: Look at `components/` directory
2. **For API changes**: Edit `app/api/chat/route.ts`
3. **For database work**: Use `lib/supabase/db.ts` functions
4. **For prompts**: Edit `lib/constants/prompts.ts`
5. **For styling**: Modify `app/globals.css` and component files
6. **For deployment**: Follow `DEPLOYMENT.md`
7. **For development**: Start with `QUICKSTART.md`

## 🔧 Common Tasks & Files to Edit

| Task | Files to Edit |
|------|---------------|
| Change system prompts | `lib/constants/prompts.ts` |
| Modify chat behavior | `app/api/chat/route.ts` |
| Update UI styling | `app/globals.css`, component files |
| Add database fields | `scripts/` (migrations), `lib/types/`, `lib/supabase/db.ts` |
| Change landing page | `components/landing-page.tsx` |
| Add new page | Create `app/[name]/page.tsx` |
| Add API endpoint | Create `app/api/[name]/route.ts` |
| Adjust colors/theme | `app/globals.css` (design tokens) |

## 📚 File Size Reference

- **Large files** (> 300 lines): `QUICKSTART.md`, `DEPLOYMENT.md`, `PROMPTS.md`, `app/api/chat/route.ts`
- **Medium files** (100-300 lines): `components/chat-interface.tsx`, `components/landing-page.tsx`, `lib/supabase/db.ts`
- **Small files** (< 100 lines): Most utility files, database scripts

## ✅ Completeness Checklist

- ✅ All documentation files present
- ✅ All frontend components implemented
- ✅ API route with 5-stage pipeline
- ✅ Database utilities and migrations
- ✅ Type definitions
- ✅ System prompts
- ✅ Supabase integration
- ✅ Middleware setup
- ✅ Configuration files

## 🎓 Learning Path

**For new developers:**
1. Read: `README.md` (overview)
2. Read: `QUICKSTART.md` (setup)
3. Explore: `app/page.tsx` (landing page)
4. Explore: `components/chat-interface.tsx` (chat UI)
5. Study: `app/api/chat/route.ts` (API logic)
6. Study: `lib/constants/prompts.ts` (prompts)
7. Study: `ARCHITECTURE.md` (full architecture)

**For deployment:**
1. Check: `DEPLOYMENT.md` checklist
2. Configure: Environment variables
3. Run: Database migrations
4. Deploy: To Vercel

**For customization:**
1. Prompts: Edit `lib/constants/prompts.ts`
2. UI: Edit component files
3. Theme: Edit `app/globals.css`
4. Database: Create migrations in `scripts/`

---

**Last Updated**: 2024
**Status**: ✅ Complete and ready for development/deployment
