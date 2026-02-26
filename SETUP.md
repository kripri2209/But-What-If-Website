# Devils Advocate - Setup & Deployment Guide

## Quick Start

### 1. Local Development Setup

**Prerequisites:**
- Node.js 18+
- pnpm (or npm/yarn)
- Supabase account

**Installation:**
```bash
# Clone or open the project
cd devils-advocate

# Install dependencies
pnpm install

# Copy environment template
cp .env.example .env.local

# Add your Supabase credentials to .env.local
# NEXT_PUBLIC_SUPABASE_URL=your_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
# SUPABASE_SERVICE_ROLE_KEY=your_key
```

**Run Development Server:**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

### 2. Database Setup (Supabase)

**Create Tables:**

Run the SQL migrations in Supabase:

1. Go to Supabase Dashboard → SQL Editor
2. Create new query and run `/scripts/001_create_tables.sql`
3. Create another query and run `/scripts/002_create_rls_policies.sql`

Or via command line:
```bash
# Using psql (if you have it installed)
psql $POSTGRES_URL < scripts/001_create_tables.sql
psql $POSTGRES_URL < scripts/002_create_rls_policies.sql
```

**Verify Tables Created:**
```sql
SELECT tablename FROM pg_tables WHERE schemaname = 'public';
```

You should see:
- conversations
- messages
- decision_analytics

### 3. Environment Variables

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL          # Your Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY     # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY         # Supabase service role key
SUPABASE_JWT_SECRET               # JWT secret (from Supabase settings)
POSTGRES_URL                      # Direct database URL
```

**Getting Supabase Credentials:**
1. Go to https://supabase.com and sign in
2. Create new project or select existing
3. Go to Settings → API
4. Copy the URL and keys
5. Go to Settings → Database to get POSTGRES_URL

### 4. Vercel Deployment

**One-click Deploy:**

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourname%2Fdevils-advocate)

Or deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

**Manual Vercel Setup:**
1. Push code to GitHub
2. Go to vercel.com
3. Import your repository
4. Add environment variables in Settings
5. Deploy!

### 5. Testing the Application

**Test the Chat:**
1. Go to `/` (landing page)
2. Click "Start Debating"
3. Enter a decision you're making
4. Submit and wait for Devils Advocate response
5. Continue conversation by entering follow-ups

**Test the Analytics:**
1. Go to `/analytics` to see decision history
2. View mock data and patterns
3. (Real data will populate once you start making decisions)

## Troubleshooting

### "Cannot find module '@supabase/supabase-js'"
```bash
pnpm install @supabase/supabase-js @ai-sdk/openai ai @ai-sdk/react
```

### "NEXT_PUBLIC_SUPABASE_URL is not set"
Make sure your `.env.local` file has the variables:
```bash
cat .env.local | grep SUPABASE
```

### "401 Unauthorized" errors
- Check that your Supabase anon key is correct
- Verify RLS policies are created (check scripts/002_create_rls_policies.sql)
- Check that rows_security is enabled on tables

### "API response 429 - Rate Limited"
- OpenAI has rate limits. Wait a moment and retry
- Upgrade your OpenAI plan for higher limits

### Database Connection Issues
- Verify POSTGRES_URL is correct
- Check your IP is allowed in Supabase settings
- Make sure pool connection settings are correct

## Project Structure

```
devils-advocate/
├── app/
│   ├── api/chat/route.ts          # Chat API with AI streaming
│   ├── chat/page.tsx              # Chat interface page
│   ├── analytics/page.tsx          # Analytics dashboard
│   ├── page.tsx                   # Landing page
│   ├── layout.tsx                 # Root layout
│   └── globals.css                # Global styles
├── components/
│   ├── chat-interface.tsx         # Chat UI component
│   ├── landing-page.tsx           # Landing page component
│   └── analytics-dashboard.tsx    # Analytics component
│   └── ui/                        # shadcn/ui components
├── lib/
│   └── supabase/
│       ├── client.ts              # Browser client
│       └── server.ts              # Server client
├── scripts/
│   ├── 001_create_tables.sql      # Database schema
│   └── 002_create_rls_policies.sql # Security policies
├── .env.example                   # Environment template
├── package.json                   # Dependencies
├── next.config.mjs                # Next.js config
├── tsconfig.json                  # TypeScript config
├── README.md                      # Project overview
├── ARCHITECTURE.md                # System design
└── SETUP.md                       # This file
```

## Key Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 16.1.6 | Web framework |
| React | 19.2.4 | UI library |
| TypeScript | 5.7.3 | Type safety |
| Tailwind CSS | 4.2.0 | Styling |
| AI SDK | 6.0.0+ | AI integration |
| OpenAI | via Gateway | GPT-4 model |
| Supabase | v2.47.0 | Database |
| shadcn/ui | Latest | UI components |

## Performance Tips

1. **Streaming**: Responses stream in real-time - no waiting
2. **Database Indexes**: Already added for common queries
3. **Code Splitting**: Dynamic imports for larger pages
4. **Image Optimization**: All images use Next.js Image component
5. **CSS**: Tailwind v4 with production optimization

## Monitoring & Logging

**View Logs:**
```bash
# Local development
# Check browser console and terminal

# Vercel production
vercel logs  # or check Vercel dashboard
```

**Track Errors:**
- Implement Sentry for error tracking
- Add custom logging to API routes
- Monitor database performance in Supabase dashboard

## Customization

### Change Colors
Edit `app/globals.css` theme variables

### Modify AI Behavior
Edit the system prompt in `app/api/chat/route.ts`

### Update Landing Page
Edit `components/landing-page.tsx`

### Add Features
1. Create new component in `/components`
2. Create new page in `/app`
3. Add routes as needed
4. Update navigation links

## Production Checklist

- [ ] Environment variables configured in Vercel
- [ ] Database migrations run successfully
- [ ] SSL certificate enabled (automatic on Vercel)
- [ ] Database backups enabled in Supabase
- [ ] Error logging configured
- [ ] Analytics tracking added (optional)
- [ ] Custom domain configured (optional)
- [ ] CORS settings verified
- [ ] Rate limiting configured
- [ ] Performance tested

## Support & Resources

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [AI SDK Docs](https://sdk.vercel.ai)
- [Supabase Docs](https://supabase.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

**Community:**
- Join Vercel Discord
- Follow Supabase community
- Check GitHub issues

## Next Steps

1. Deploy to Vercel
2. Set up custom domain (optional)
3. Add authentication (optional - Supabase Auth integration)
4. Implement multi-stage pipeline (optional)
5. Add outcome tracking
6. Build analytics features
7. Consider mobile app

Good luck building Devils Advocate!
