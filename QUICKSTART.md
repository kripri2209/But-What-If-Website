# Devils Advocate - Quick Start Guide

## What is Devils Advocate?

Devils Advocate is an AI-powered decision analysis tool that challenges your assumptions, explores worst-case scenarios, and reveals hidden complexity in your choices. It uses a sophisticated 5-stage prompt pipeline to provide deep, nuanced counterarguments to help you make better decisions.

## Features

✅ **5-Stage Analysis Pipeline**
- Parser: Extract core decision
- Assumptions: Identify hidden beliefs
- Counterarguments: Generate opposing views
- Risk Analysis: Explore failure modes
- Synthesis: Comprehensive challenge

✅ **Real-Time Streaming Responses** - See the devil's advocate think in real-time

✅ **Conversation History** - Continue debates across multiple messages

✅ **Decision Analytics** - Track decisions and outcomes over time

✅ **Dark Mode Design** - Beautiful, focused interface with red/orange accents

## Tech Stack

- **Frontend**: Next.js 16 + React 19 + Shadcn/ui + Tailwind CSS
- **AI**: OpenAI GPT-4 via Vercel AI Gateway + AI SDK 6
- **Database**: Supabase PostgreSQL with Row Level Security
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
cd devils-advocate
pnpm install
```

2. **Environment variables**
```bash
# Copy example
cp .env.example .env.local

# Add your Supabase credentials
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

3. **Database setup**
```bash
# In Supabase dashboard, run these SQL scripts:
# 1. scripts/001_create_tables.sql
# 2. scripts/002_create_rls_policies.sql
```

4. **Start development server**
```bash
pnpm dev
```

Visit `http://localhost:3000`

## Project Structure

```
devils-advocate/
├── app/
│   ├── api/chat/route.ts          # Multi-prompt pipeline API
│   ├── page.tsx                   # Landing page
│   ├── chat/page.tsx              # Chat interface
│   ├── analytics/page.tsx         # Analytics dashboard
│   └── layout.tsx                 # Root layout
├── components/
│   ├── chat-interface.tsx         # Main chat UI
│   ├── landing-page.tsx           # Landing page
│   ├── analytics-dashboard.tsx    # Analytics UI
│   └── ui/                        # Shadcn UI components
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser client
│   │   ├── server.ts              # Server client
│   │   └── db.ts                  # Database utilities
│   ├── constants/prompts.ts       # System prompts
│   ├── types/index.ts             # TypeScript types
│   └── utils.ts                   # Utility functions
├── scripts/
│   ├── 001_create_tables.sql      # Create tables
│   └── 002_create_rls_policies.sql # RLS policies
└── middleware.ts                   # Supabase session handling
```

## Core Components

### Chat Interface (`components/chat-interface.tsx`)
- Real-time streaming chat
- Message history
- Loading indicators
- Input validation

### API Route (`app/api/chat/route.ts`)
```ts
POST /api/chat
Body: { messages: ChatMessage[] }
Response: Streaming text response
```

### Database (`lib/supabase/db.ts`)
- `saveConversation()` - Create new chat
- `saveMessage()` - Store user/assistant message
- `saveDecisionAnalytics()` - Log decision analysis
- `getConversations()` - Fetch user's conversations
- `getMessages()` - Fetch conversation history
- `getDecisionAnalytics()` - Fetch decision history

## The 5-Stage Pipeline

When a user sends their first message, the API runs through this pipeline:

```
User Input
    ↓
[1] PARSER: Extract core decision
    ↓
[2] ASSUMPTIONS: Identify hidden beliefs
    ↓
[3] COUNTERARGUMENTS: Generate opposing views
    ↓
[4] RISK_ANALYSIS: Explore failure modes
    ↓
[5] SYNTHESIS: Create comprehensive response
    ↓
Streamed to User
```

Each stage uses GPT-4 to build on the previous analysis, creating a deeply thoughtful challenge to the user's decision.

## Key Files to Modify

### To change system prompts:
Edit `lib/constants/prompts.ts`

### To modify API logic:
Edit `app/api/chat/route.ts`

### To update UI styling:
Edit `app/globals.css` for theme tokens
Edit component files for layout/design

### To add database fields:
1. Create SQL migration in `scripts/`
2. Update `lib/types/index.ts` interfaces
3. Update database utilities in `lib/supabase/db.ts`

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

### Test Supabase connection:
```ts
// In a route handler or action:
import { createServerClient } from '@/lib/supabase/server'

const supabase = await createServerClient()
const { data, error } = await supabase.auth.getUser()
```

## Common Tasks

### Add a new API endpoint
1. Create `app/api/[name]/route.ts`
2. Implement POST/GET/etc handlers
3. Use `createServerClient` for database access

### Add database table
1. Create migration file in `scripts/`
2. Add RLS policies
3. Update types in `lib/types/index.ts`
4. Add utility functions in `lib/supabase/db.ts`

### Style a component
- Use Tailwind CSS classes
- Reference design tokens in `app/globals.css`
- Color palette: Black, Slate-800, Red-500, Orange-500

### Debug streaming responses
Add console.log in `app/api/chat/route.ts`:
```ts
console.log('[v0] Pipeline stage:', stageName)
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy to Vercel:
```bash
vercel deploy --prod
```

## Performance Tips

1. **Streaming**: Chat responses stream to client in real-time
2. **Caching**: Consider caching decision analytics
3. **Database**: Indexes on `user_id`, `conversation_id`, `created_at`
4. **API**: Limit concurrent pipeline stages if needed

## Security

- ✅ Row Level Security enabled on all tables
- ✅ Users can only access their own data
- ✅ API validates request format
- ✅ Environment variables are secure

To test RLS:
```sql
-- As authenticated user
SELECT * FROM conversations; -- Shows only their conversations

-- As different user
SELECT * FROM conversations; -- Shows only their conversations
```

## Troubleshooting

### Chat not responding?
- Check OpenAI credits
- Verify API key in Vercel dashboard
- Check browser console for errors
- Review `app/api/chat/route.ts` error handling

### Database errors?
- Verify Supabase connection
- Check RLS policies enabled
- Ensure tables exist
- Review database logs

### Styling issues?
- Clear Next.js cache: `rm -rf .next`
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

- [Vercel AI SDK Docs](https://sdk.vercel.ai)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [OpenAI API](https://platform.openai.com/docs)

## Support

For issues:
1. Check error logs in browser console
2. Review Vercel deployment logs
3. Check Supabase activity logs
4. Refer to DEPLOYMENT.md troubleshooting section

Happy decision-making! 🎯
