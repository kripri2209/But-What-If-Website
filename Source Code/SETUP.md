# But, What If... - Setup & Deployment Guide

## Quick Start

### 1. Local Development Setup

**Prerequisites:**
- Node.js 18+
- pnpm (or npm/yarn)
- Groq API account

**Installation:**
```bash
# Clone or open the project
cd but-what-if

# Install dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Add your Groq API key to .env.local
GROQ_API_KEY=your_groq_api_key_here
```

**Get Groq API Key:**
1. Go to [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to API Keys
4. Create new API key
5. Copy to `.env.local`

**Run Development Server:**
```bash
pnpm dev
```

Visit `http://localhost:3000` to see the application.

**No database setup required!** All data is stored in browser localStorage.

### 2. Environment Variables

**Required Variable:**
```bash
GROQ_API_KEY=your_groq_api_key_here
```

That's it! Just one environment variable needed.

**One-click Deploy:**

Click the button below to deploy to Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourname%2Fbut-what-if)

Or deploy manually:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow prompts and add environment variables
```

### 3. Vercel Deployment

**Using Vercel CLI:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add GROQ_API_KEY when prompted
# Or add it in Vercel dashboard after deployment

# Deploy to production
vercel --prod
```

**Manual Vercel Setup:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable: `GROQ_API_KEY`
5. Deploy!

**No database configuration needed!**

### 4. Testing the Application

**Test the Chat:**
1. Go to `http://localhost:3000` (or your deployed URL)
2. Chat interface loads automatically
3. Enter a decision or question
4. Watch AI response stream in real-time
5. Continue conversation with follow-ups
6. Test features:
   - Copy message to clipboard
   - Clear conversation
   - Retry failed messages
   - Check localStorage persistence (refresh page)

**Test Question Classification:**
Try different types of questions:
- Financial: "Should I buy a house?"
- Career: "Should I quit my job?"
- Relationship: "Should I get married?"
- Ethical: "Should I tell the truth?"
- Lifestyle: "Should I move to another country?"

## Troubleshooting

### "GROQ_API_KEY is not set"
Make sure your `.env.local` file has:
```bash
GROQ_API_KEY=your_key_here
```

### "Too many requests" (429 error)
- You've hit rate limit (10 requests/minute)
- Wait 60 seconds and try again
- Or edit `MAX_REQUESTS_PER_MINUTE` in `route.ts`

### "Cannot find module 'groq-sdk'"
```bash
pnpm install groq-sdk
```

### localStorage not working
- Check browser privacy settings
- Ensure cookies/storage not blocked
- Try incognito mode to test
- Check browser console for quota errors

### Streaming not working
- Check Groq API status: [status.groq.com](https://status.groq.com)
- Verify API key is valid
- Check browser console for errors
- Test with curl command:
```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}]}'
```

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
│   │   ├── chat-interface.tsx     # Chat UI
│   │   └── ui/                    # shadcn/ui components
│   ├── lib/
│   │   ├── constants/
│   │   │   └── prompts.ts         # Expert prompts
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript types
│   │   └── utils.ts               # Utilities
│   └── [Documentation]
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
| Groq SDK | 0.37.0 | AI API client |
| LLaMA 3.3 70B | via Groq | Language model |
| shadcn/ui | Latest | UI components |
| localStorage | Browser API | Data persistence |

## Performance Tips

1. **Streaming**: Groq provides ~200-300 tokens/sec
2. **localStorage**: Zero-latency data access
3. **Code Splitting**: Dynamic imports for large components
4. **No Backend**: All persistence is client-side
5. **Image Optimization**: Next.js Image component
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

- [ ] `GROQ_API_KEY` configured in Vercel
- [ ] SSL certificate enabled (automatic on Vercel)
- [ ] Rate limiting tested
- [ ] Content filtering tested
- [ ] Error logging configured
- [ ] Analytics tracking added (optional)
- [ ] Custom domain configured (optional)
- [ ] Performance tested on mobile
- [ ] localStorage limits understood

## Support & Resources

**Documentation:**
- [Next.js Docs](https://nextjs.org/docs)
- [Groq Docs](https://console.groq.com/docs)
- [LLaMA 3.3](https://www.llama.com/llama3-3/)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com)

**Community:**
- Groq Discord
- Next.js Discord
- GitHub Discussions

## Next Steps

1. Deploy to Vercel
2. Set up custom domain (optional)
3. Add cloud sync (optional - requires backend)
4. Implement export features (PDF, Markdown)
5. Build analytics dashboard
6. Add more AI model options
7. Consider Progressive Web App

Built with ❤️ using Groq's lightning-fast inference!
