# Devils Advocate - Architecture & Design

## System Overview

Devils Advocate is an AI-powered decision-making assistant that challenges user thinking through a sophisticated multi-stage analysis pipeline. The system combines Next.js, OpenAI GPT-4, and Supabase to deliver real-time, intelligent critiques of user decisions.

## Core Architecture

### Three-Layer Design

1. **Presentation Layer** (Next.js + React)
   - Landing page for user onboarding
   - Real-time chat interface for conversations
   - Analytics dashboard for decision tracking
   - Built with shadcn/ui and Tailwind CSS

2. **API Layer** (Next.js Route Handlers)
   - `/api/chat` - Handles message streaming with AI SDK 6
   - Manages conversation state and history
   - Integrates with OpenAI via Vercel AI Gateway

3. **Data Layer** (Supabase PostgreSQL)
   - Stores conversations and messages
   - Tracks decision analytics and outcomes
   - Implements Row Level Security for data isolation

## The Devils Advocate Analysis Pipeline

### Current Implementation (Simplified)

The current implementation uses a single sophisticated GPT-4 prompt that encompasses all analysis angles:

```
User Input
    ↓
/api/chat Route Handler
    ↓
OpenAI GPT-4 Turbo
(System prompt engineered for comprehensive devil's advocacy)
    ↓
Streaming Response with:
- Assumptions Challenged
- Key Counterarguments  
- Worst-Case Scenarios
- Hidden Risks & Costs
- Complexity Revelation
    ↓
UI Display with visual indicators
    ↓
Database Storage
```

### Prompt Engineering Strategy

The system prompt is carefully crafted to instruct GPT-4 to:

1. **Identify assumptions** - What the user is taking for granted
2. **Generate counterarguments** - Strongest opposing viewpoints
3. **Explore failures** - Realistic worst-case scenarios
4. **Reveal risks** - Non-obvious costs and consequences
5. **Question complexity** - What nuance are they missing

Key principles in prompting:
- Be respectful but uncompromising
- Focus on realistic, significant risks (not paranoia)
- Provide specific examples
- Help reveal true complexity (not just doubt)

### Future Enhancement: Multi-Stage Pipeline

For even deeper analysis, the architecture supports a future multi-stage pipeline:

```
User Input (Original Decision)
    ↓
Stage 1: Parser Prompt
(Extract and clarify decision)
    ↓
Stage 2: Assumptions Prompt
(Identify hidden beliefs with Stage 1 context)
    ↓
Stage 3: Counterarguments Prompt
(Generate opposition with assumptions identified)
    ↓
Stage 4: Risk Analysis Prompt
(Analyze failures with all prior context)
    ↓
Stage 5: Synthesis Prompt
(Create comprehensive response)
    ↓
Final Devils Advocate Response
```

To implement this, modify `/api/chat/route.ts` to chain multiple `generateText` calls sequentially before returning the final synthesis.

## Data Schema

### Conversations Table
```sql
id UUID PRIMARY KEY
user_id UUID (FK to auth.users)
title TEXT - Decision being analyzed
created_at TIMESTAMP
updated_at TIMESTAMP
```

### Messages Table
```sql
id UUID PRIMARY KEY
conversation_id UUID (FK)
role TEXT (user|assistant)
content TEXT - The actual message
analysis_data JSONB - Structured analysis (future use)
created_at TIMESTAMP
```

### Decision Analytics Table
```sql
id UUID PRIMARY KEY
user_id UUID (FK)
conversation_id UUID (FK)
decision_text TEXT
assumptions JSONB - Array of identified assumptions
counterarguments JSONB - Array of counterarguments
risks JSONB - Array of identified risks
decision_date TIMESTAMP
outcome TEXT - What actually happened (optional)
outcome_date TIMESTAMP (optional)
lesson_learned TEXT (optional)
created_at TIMESTAMP
```

### Row Level Security (RLS)

All tables implement RLS policies ensuring:
- Users can only SELECT/INSERT/UPDATE/DELETE their own records
- Messages can only be accessed if the user owns the conversation
- Analytics data is completely user-isolated

## API Design

### POST /api/chat

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I'm thinking about changing careers..."
    }
  ],
  "conversationId": "uuid-string"
}
```

**Response:**
- Server-Sent Events (SSE) stream
- Real-time streaming of AI response
- Each message chunk contains text delta
- Client assembles into complete response

## Component Architecture

### Landing Page (`/components/landing-page.tsx`)
- Hero section with value proposition
- Feature cards highlighting analysis angles
- Pipeline visualization
- Call-to-action buttons
- Navigation to chat and analytics

### Chat Interface (`/components/chat-interface.tsx`)
- Message display with role-based styling
- Input form with send button
- Loading states with animation
- Conversation history
- Header with navigation
- Responsive design

### Analytics Dashboard (`/components/analytics-dashboard.tsx`)
- Stats cards (decisions, assumptions, risks)
- Decision history list
- Risk level indicators
- Decision pattern insights
- Link to start new challenges

## Technology Choices & Rationale

### Next.js 16
- Latest features with React 19 compatibility
- Server Components for better performance
- Route handlers for API
- Built-in optimizations and deployment to Vercel

### OpenAI GPT-4 Turbo
- Most capable reasoning model
- Excellent at generating nuanced arguments
- Good context window for conversation history
- Reliable for structured thinking tasks

### Supabase
- PostgreSQL database with JSON support
- Built-in authentication (can be integrated)
- Row Level Security for data protection
- Real-time capabilities for future enhancements
- Easy to integrate with Next.js

### AI SDK 6
- Unified interface for multiple AI providers
- First-class streaming support
- TypeScript-first design
- Seamless integration with React hooks

### shadcn/ui
- Unstyled, composable components
- Built on Radix UI for accessibility
- Full customization via Tailwind
- Great for custom design systems

## Performance Considerations

1. **Streaming Responses**: Real-time AI response streaming prevents waiting
2. **Database Indexing**: Indexes on user_id and created_at for fast queries
3. **Image Optimization**: Images optimized via Next.js Image component
4. **Code Splitting**: Dynamic imports for heavy components
5. **CSS**: Tailwind v4 with optimized output

## Security Model

1. **Authentication**: Supabase Auth (future integration)
2. **Data Isolation**: RLS policies enforce user-only access
3. **API Protection**: Server-side API keys via environment variables
4. **HTTPS**: Automatic via Vercel deployment
5. **Input Validation**: Zod schemas for incoming data

## Monitoring & Analytics

Track:
- User engagement metrics
- Average conversation length
- Decision categories
- Outcomes vs predictions
- Most challenged assumptions

## Deployment

### Vercel Configuration
- Automatic deployments from git
- Environment variables for API keys
- Preview deployments for PRs
- Zero-config Next.js optimizations

### Database Backups
- Supabase handles automatic backups
- Point-in-time recovery available
- Regular backup retention

## Future Enhancements

1. **User Accounts**: Full Supabase Auth integration
2. **Multi-turn Pipeline**: Sequential prompt stages
3. **Export/PDF**: Decision analysis export
4. **Notifications**: Email alerts for tracked decisions
5. **Collaboration**: Share decisions with others
6. **Analytics**: ML-powered pattern detection
7. **Mobile**: Native mobile app
8. **Multiple Providers**: Claude, Grok, local models

## Development Workflow

1. Clone repository
2. Install dependencies: `pnpm install`
3. Copy `.env.example` to `.env.local` and add secrets
4. Run migrations: `pnpm run migrate`
5. Start dev server: `pnpm dev`
6. Test at `http://localhost:3000`

## Testing Strategy

- Unit tests for utility functions
- Integration tests for API routes
- E2E tests for critical flows
- Prompt testing for AI consistency
- Database testing with test fixtures

## Conclusion

Devils Advocate combines modern web technologies with sophisticated prompt engineering to create an AI assistant that genuinely challenges user thinking. The architecture is extensible for future enhancements while maintaining simplicity and performance in the current implementation.
