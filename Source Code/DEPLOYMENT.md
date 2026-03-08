# But, What If... - Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Verify `NEXT_PUBLIC_SUPABASE_URL` environment variable is set
- [ ] Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable is set
- [ ] Verify Supabase project is connected and accessible
- [ ] Check that OpenAI API key is available (via Vercel AI Gateway)

### Database Setup
- [ ] Run migration script `001_create_tables.sql` in Supabase
- [ ] Run RLS policies script `002_create_rls_policies.sql`
- [ ] Verify tables exist: `conversations`, `messages`, `decision_analytics`
- [ ] Test Supabase connection with `lib/supabase/server.ts`

### Code Verification
- [ ] All TypeScript files compile without errors
- [ ] `app/api/chat/route.ts` includes complete 5-stage pipeline
- [ ] Chat interface component uses `useChat` from `@ai-sdk/react`
- [ ] Landing page has all features visible
- [ ] Analytics dashboard component is created

### Dependencies
- [ ] Run `pnpm install` to verify all dependencies install
- [ ] Verify `ai` (^6.0.0) is installed
- [ ] Verify `@ai-sdk/openai` is installed
- [ ] Verify `@supabase/supabase-js` is installed

## Deployment Steps

### 1. Vercel Deployment
```bash
# Connect GitHub repository if using Git
git remote add origin <your-repo-url>
git push origin main

# Or use Vercel CLI
vercel deploy --prod
```

### 2. Environment Variables (Vercel)
In Vercel Project Settings → Environment Variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Note: OpenAI API key flows through Vercel AI Gateway (no manual setup needed)

### 3. Database Migration (Supabase)
- Navigate to Supabase SQL Editor
- Create new query
- Copy content from `scripts/001_create_tables.sql`
- Execute the query
- Repeat for `scripts/002_create_rls_policies.sql`

### 4. Test Deployment
- [ ] Visit deployed URL
- [ ] Test landing page loads correctly
- [ ] Test chat interface loads
- [ ] Send a test message and verify API response
- [ ] Check database for saved messages
- [ ] Test analytics page loads

## Post-Deployment

### Monitoring
- [ ] Set up error tracking (Sentry recommended)
- [ ] Monitor OpenAI API usage
- [ ] Check Supabase database performance
- [ ] Set up logging for chat API

### Optimization
- [ ] Enable Edge caching for static assets
- [ ] Configure image optimization
- [ ] Set up database query optimization
- [ ] Monitor API response times

### Security
- [ ] Verify RLS policies are active
- [ ] Test that users can only access their own data
- [ ] Enable CORS properly for API endpoints
- [ ] Regular security audits

## Troubleshooting

### Common Issues

**API returns 401 Unauthorized**
- Check OpenAI credentials in Vercel AI Gateway
- Verify API key has correct permissions
- Check rate limits

**Chat messages not saving**
- Verify Supabase connection string
- Check RLS policies are enabled
- Ensure user is authenticated
- Check database disk space

**Frontend doesn't connect to API**
- Verify CORS headers in `/app/api/chat/route.ts`
- Check API endpoint is correct in chat component
- Verify Vercel deployment is complete

**Slow responses**
- Check OpenAI API response times
- Monitor Supabase query performance
- Consider response streaming optimization
- Review pipeline stage execution times

## Rollback Plan

If issues occur after deployment:
1. Revert to last stable Git commit: `git revert <commit-hash>`
2. Redeploy to Vercel
3. Check error logs in Vercel dashboard
4. Check Supabase activity logs for database issues

## Success Criteria

- ✅ Landing page loads in < 2 seconds
- ✅ Chat API responds in < 5 seconds (first message with pipeline)
- ✅ Follow-up messages respond in < 3 seconds
- ✅ No database errors in logs
- ✅ Users can create and save conversations
- ✅ RLS policies prevent data leakage
- ✅ Mobile experience is responsive

## Next Steps

After successful deployment, consider:
1. Setting up user authentication/login
2. Adding conversation history UI
3. Implementing conversation export feature
4. Adding decision outcome tracking
5. Building analytics dashboard with insights
6. Setting up email notifications
