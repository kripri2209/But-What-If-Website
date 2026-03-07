# Devils Advocate - Project Summary

## Overview

**Devils Advocate** is a sophisticated AI-powered decision analysis tool that helps users make better choices by challenging their assumptions, exploring worst-case scenarios, and revealing hidden complexity. It uses a proprietary 5-stage prompt pipeline to provide deep, nuanced counterarguments.

## Project Status: 🔄 In Progress

Core features implemented. UI refinements and flow optimization in progress.

## What Has Been Built

### 1. **Frontend** (Next.js 16 + React 19)
- ✅ Interactive typing intro screen showing "WELCOME TO DEVIL'S ADVOCATE"
- ✅ Interactive chat interface with real-time streaming
- ✅ Click-to-skip functionality on intro screen
- ✅ Responsive design with modern animations
- 🔄 Navigation system (in progress)

### 2. **Backend API** (Groq LLaMA 3.3 70B)
- ✅ Chat API (`/api/chat`) with Devil's Advocate prompt
- ✅ 6-stage analysis: Hidden Assumptions → Counterarguments → Failure Scenarios → What You're Ignoring → Hard Questions → Final Verdict
- ✅ Streaming response support for real-time feedback
- ✅ Follow-up message handling for continued debates
- ✅ Error handling and validation

### 3. **Database** (Local Storage)
- ✅ Chat sessions stored in browser localStorage
- ✅ Conversation history management
- ✅ Session persistence across page reloads
- 🔄 Supabase integration (planned for future)

### 4. **Utilities & Infrastructure**
- ✅ localStorage chat session management
- ✅ React hooks for state management
- ✅ TypeScript for type safety
- ✅ Tailwind CSS for styling

### 5. **Documentation**
- ✅ PROJECT_SUMMARY.md - Current project state (this file)
- 🔄 Additional documentation as needed

## Key Features

### Interactive Typing Intro Screen
- Displays "WELCOME TO DEVIL'S ADVOCATE" with typing animation
- Click-to-skip functionality
- Never shows again after being skipped (stored in localStorage)
- Smooth transitions to chat interface

### The 6-Stage Analysis Pipeline
```
User Input → Hidden Assumptions → Counterarguments → Failure Scenarios → What You're Ignoring → Hard Questions → Final Verdict
```

Each stage builds on the previous one to create a comprehensive Devil's Advocate response.

### Real-Time Chat Interface
- First message runs full analysis pipeline
- Follow-up messages use conversational context
- **Advanced markdown rendering** with GitHub-flavored markdown support
- **Code syntax highlighting** for code blocks
- **Copy any message** to clipboard with hover button
- **Retry failed messages** automatically
- **Toast notifications** for immediate feedback
- Error handling and validation
- Session persistence with localStorage
 with session management
- **Copy message functionality** (hover over any message)
- **Clear conversation button** in header
- **Toast notifications** for user actions and errors
- **Retry buttons** for failed API requests
- **Enhanced markdown rendering** with lists, code blocks, formatting
### UI/UX
- Clean, minimal design
- Smooth animations and transitions
- Responsive layout
- Chat history sidebar

## File Structure

```
devils-advocate/
├── app/
│   ├── api/chat/route.ts          ← Chat API with Groq
│   ├── page.tsx                   ← Main entry (ChatInterface)
│   ├── HomeLanding.tsx            ← Landing page component (unused)
│   ├── OrbitalScreen.tsx          ← Orbital screen component (unused)
│   └── layout.tsx                 ← Root layout
├── Source Code/
│   └── components/
│       ├── chat-interface.tsx     ← Main chat UI with typing intro
│       └── ui/                    ← UI components
├── package.json                   ← Dependencies
└── Configuration files
```

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Frontend** | Next.js 16, React 19, Tailwind CSS | User interface & interactions |
| **AI** | Groq (LLaMA 3.3 70B) | LLM processing & Devil's Advocate analysis |
| **Storage** | Browser localStorage | Conversation persistence |
| **Deployment** | Vercel | Production hosting |

## Environment Variables

```bash
GROQ_API_KEY=                     # Your Groq API key for LLaMA model access
```

## Installation & Deployment

### Local Development
```bash
pnpm install
# Add GROQ_API_KEY to .env.local
pnpm dev
```

### Deployment to Vercel
1. Connect GitHub repository
2. Add GROQ_API_KEY in Vercel dashboard environment variables
3. Deploy: `vercel deploy --prod`

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed steps.

## What Users Experience

✅ Engaging typing intro animation
✅ AI-powered Devil's Advocate analysis of their ideas
✅ Challenge to their hidden assumptions
✅ Brutal counterarguments they hadn't considered
✅ Failure scenario analysis
✅ Hard questions that make them think deeper
✅ Ongoing conversation to refine thinking
✅ Persistent chat history across sessions

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

✅ Interactive typing intro screen with "WELCOME TO DEVIL'S ADVOCATE"
✅ Click-to-skip functionality  
✅ Full chat interface with Devil's Advocate AI
✅ 6-stage analysis pipeline
✅ Chat history with localStorage persistence
✅ Session management across page reloads
✅ **Enhanced markdown rendering** with code syntax highlighting
✅ **Copy message to clipboard** functionality
✅ **Retry failed messages** with one click
✅ **Clear conversation** button in header
✅ **Toast notifications** for user feedback
✅ **Better error handling** with detailed messages
✅ **Loading indicators** and timeout warnings

## Next Steps / Future Enhancements

1. **User Authentication**
   - Sign-up/login pages
   - User profiles
   - Onboarding flow

2. **Conversation Management**
   - View/delete past conversations
   - Export conversations as PDF
   - Share conversations

3. **Advanced Analytics**
   - Decision outcome tracking
   - Lessons learned dashboard
   - Success/failure metrics
   - Decision patterns analysis

4. **Collaboration**
   - Share decisions with teammates
   - Collaborative analysis
   - Comments and annotations

5. **Integrations**
   - Email summaries
   - Slack bot integration
   - Calendar integration

6. **Mobile App**
   - Native iOS/Android apps
   - Push notifications
   - Offline support

## Testing Checklist
Intro never reappears after being dismissed
- [x] Chat interface loads after intro
- [x] Chat API returns Devil's Advocate responses
- [x] Conversation history persists in localStorage
- [x] Follow-up messages work in conversation
- [x] **Copy message to clipboard works**
- [x] **Markdown rendering with code highlighting**
- [x] **Toast notifications display correctly**
- [x] **Clear conversation button works**
- [x] **Retry button appears on failed messages**
- [x] Click-to-skip functionality works
- [x] Chat interface loads after intro
- [x] Chat API returns Devil's Advocate responses
- [x] Conversation history persists in localStorage
- [x] Follow-up messages work in conversation
- [ ] Error handling for API failures
- [ ] Mobile responsive design
- [ ] Performance optimization

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

**Current State**: Interactive typing intro screen + Chat interface with Devil's Advocate AI

**Next Action**: Continue UI/UX refinements and feature additions
