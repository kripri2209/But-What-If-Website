# Devils Advocate - File Index

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
|------|---------|
| `app/page.tsx` | Landing page entry point |
| `app/chat/page.tsx` | Chat interface page |
| `app/analytics/page.tsx` | Analytics dashboard page |

### Components
| File | Purpose |
|------|---------|
| `components/landing-page.tsx` | Landing page UI with hero, features, 5-stage pipeline |
| `components/chat-interface.tsx` | Main chat UI with message display and input |
| `components/analytics-dashboard.tsx` | Analytics UI for decision tracking |

### UI Components (Auto-generated via shadcn)
All components in `components/ui/` are shadcn/ui components and should not be manually edited.

## ⚙️ Backend & API

| File | Purpose |
|------|---------|
| `app/api/chat/route.ts` | **Core API** - Multi-prompt pipeline, streaming responses |
| `app/layout.tsx` | Root layout with metadata and global setup |
| `middleware.ts` | Supabase session middleware |

## 🗄️ Database & Supabase

### Database Utilities
| File | Purpose |
|------|---------|
| `lib/supabase/client.ts` | Browser-side Supabase client |
| `lib/supabase/server.ts` | Server-side Supabase client |
| `lib/supabase/db.ts` | **Database functions** - CRUD operations for conversations, messages, analytics |

### Database Migrations
| File | Purpose |
|------|---------|
| `scripts/001_create_tables.sql` | Create tables: conversations, messages, decision_analytics |
| `scripts/002_create_rls_policies.sql` | Row Level Security policies for data privacy |

## 📦 Utilities & Configuration

### Constants & Types
| File | Purpose |
|------|---------|
| `lib/constants/prompts.ts` | **System prompts** - All stage prompts, constants for pipeline |
| `lib/types/index.ts` | **TypeScript types** - Conversation, Message, DecisionAnalytic, etc. |
| `lib/utils.ts` | General utility functions (cn, formatting, etc.) |

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
devils-advocate/
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
components/chat-interface.tsx
    ↓ (POST /api/chat)
app/api/chat/route.ts
    ├─ Parse user message
    ├─ Get conversation history
    ├─ Run 5-stage pipeline:
    │  ├─ Parser prompt (lib/constants/prompts.ts)
    │  ├─ Assumptions prompt
    │  ├─ Counterarguments prompt
    │  ├─ Risk analysis prompt
    │  └─ Synthesis prompt
    └─ Stream response
    ↓
components/chat-interface.tsx (displays streamed response)
    ↓
lib/supabase/db.ts (save message)
    ↓
Supabase PostgreSQL
```

## 🔐 Security Files

- `middleware.ts` - Session handling and auth protection
- `scripts/002_create_rls_policies.sql` - Row Level Security policies
- `lib/supabase/server.ts` - Server-side auth context

## 📊 Important API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/` | GET | Landing page |
| `/chat` | GET | Chat interface page |
| `/analytics` | GET | Analytics dashboard page |
| `/api/chat` | POST | Main chat API with multi-prompt pipeline |

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
