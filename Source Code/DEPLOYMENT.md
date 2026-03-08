# But, What If... - Deployment Checklist

## Pre-Deployment

### Environment Setup
- [ ] Verify `GROQ_API_KEY` environment variable is set
- [ ] Test API key works with Groq console
- [ ] Check API credits/quota

### Code Verification
- [ ] All TypeScript files compile without errors
- [ ] `app/api/chat/route.ts` includes Mixture of Experts
- [ ] Question classification working correctly
- [ ] Chat interface component tested
- [ ] localStorage persistence verified
- [ ] Rate limiting tested
- [ ] Content filtering tested
- [ ] Prompt injection defense verified

### Dependencies
- [ ] Run `pnpm install` to verify all dependencies install
- [ ] Verify `groq-sdk` (^0.37.0) is installed
- [ ] Verify all Next.js 16 dependencies present
- [ ] No security vulnerabilities (`pnpm audit`)

## Deployment Steps

### 1. Vercel Deployment
```bash
# Option 1: Connect GitHub repository
git remote add origin <your-repo-url>
git push origin main
# Then import in Vercel dashboard

# Option 2: Use Vercel CLI
npm i -g vercel
vercel
vercel --prod
```

### 2. Environment Variables (Vercel)
In Vercel Project Settings → Environment Variables, add:
- `GROQ_API_KEY` - Your Groq API key from console.groq.com

That's it! Only one environment variable needed.

### 3. Test Deployment
- [ ] Visit deployed URL
- [ ] Test chat interface loads correctly
- [ ] Send a test message and verify AI response
- [ ] Check localStorage saves conversations
- [ ] Verify streaming works properly
- [ ] Test on mobile devices
- [ ] Check different question types (Financial, Career, etc.)
- [ ] Test rate limiting (send 11 requests quickly)
- [ ] Test content filtering (try harmful keywords)
- [ ] Test prompt injection defense

## Post-Deployment

### Monitoring
- [ ] Monitor Groq API usage in console.groq.com
- [ ] Check Vercel Analytics for page metrics
- [ ] Monitor API response times
- [ ] Track error rates in Vercel logs
- [ ] Set up uptime monitoring (optional)

### Optimization
- [ ] Enable Edge caching for static assets
- [ ] Configure image optimization
- [ ] Monitor API response times
- [ ] Test on various devices and browsers
- [ ] Verify mobile experience

### Security
- [ ] Verify rate limiting is active
- [ ] Test content filtering with various inputs
- [ ] Verify prompt injection defense works
- [ ] Check API keys are not exposed to client
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Regular security audits

## Troubleshooting

### Common Issues

**API returns 401 Unauthorized**
- Check Groq API key is correct
- Verify key is set in Vercel environment variables
- Check API key has not expired
- Verify you have API credits

**Chat messages not saving**
- Check browser localStorage is enabled
- Verify browser storage quota not exceeded
- Check browser privacy settings
- Try incognito mode to test

**Rate limiting issues**
- Default is 10 requests/minute
- Adjust `MAX_REQUESTS_PER_MINUTE` in `route.ts`
- Consider Redis for production rate limiting

**Streaming not working**
- Check Vercel function timeout settings
- Verify Groq API status
- Check browser console for errors
- Test with curl to isolate client vs server

**Classification not accurate**
- Review patterns in `classifyQuestion()` function
- Add more specific keywords
- Test with various question types
- Check console for classification logs

**Content filtering too aggressive**
- Review patterns in `filterHarmfulContent()`
- Adjust keywords as needed
- Test edge cases
- Balance safety with usability
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
