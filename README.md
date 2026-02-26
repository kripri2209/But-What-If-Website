# Devils Advocate - AI-Powered Decision Challenger

Devils Advocate is an intelligent decision-making assistant that challenges your assumptions, explores worst-case scenarios, and reveals the hidden complexity of your choices. Instead of encouraging confirmation bias, it acts as your personal contrarian advisor.

## What It Does

Devils Advocate uses AI to help you make better decisions by:

1. **Challenging Assumptions** - Identifies the hidden beliefs and biases driving your decision
2. **Presenting Counterarguments** - Offers powerful opposing viewpoints you may have overlooked
3. **Exploring Worst Cases** - Details realistic failure modes and disaster scenarios
4. **Analyzing Hidden Risks** - Uncovers non-obvious costs, consequences, and ripple effects
5. **Revealing Complexity** - Helps you understand trade-offs and what you're truly missing

## Technology Stack

- **Frontend**: Next.js 16 + shadcn/ui + Tailwind CSS v4
- **AI**: OpenAI GPT-4 via Vercel AI Gateway
- **Database**: Supabase PostgreSQL with Row Level Security
- **Deployment**: Vercel
- **Real-time**: AI SDK 6 with streaming responses

## Architecture

### API Pipeline

Each user input flows through our analysis system:

```
User Input 
  → Parser Prompt (clarify decision)
  → Assumptions Prompt (identify hidden beliefs)
  → Counterarguments Prompt (generate opposing views)
  → Risk Analysis Prompt (explore failure modes)
  → Synthesis Prompt (comprehensive challenge)
```

### Database Schema

- **conversations** - Multi-turn chat sessions with users
- **messages** - Individual user and assistant messages with analysis data
- **decision_analytics** - Tracked decisions with outcomes, risks, and lessons learned

All tables use Row Level Security (RLS) to ensure users only access their own data.

## Pages

- **`/`** - Landing page introducing Devils Advocate
- **`/chat`** - Multi-turn chat interface for challenging decisions
- **`/analytics`** - Dashboard showing decision history and patterns

## Key Features

- **Multi-turn Conversations** - Debate with the devil's advocate across multiple messages
- **Streaming Responses** - Real-time AI response streaming for immediate feedback
- **Conversation History** - Track and review all decisions challenged
- **Decision Analytics** - View patterns in your assumptions and common risks
- **Dark Theme** - Red and orange accent colors for high-contrast readability

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

3. Create database tables (run the SQL migrations):
```bash
# Tables are created via scripts/001_create_tables.sql
# RLS policies via scripts/002_create_rls_policies.sql
```

4. Run the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Visit the landing page and click "Start Debating"
2. Share a decision you're making or considering
3. Devils Advocate will challenge your thinking with:
   - Hidden assumptions you're making
   - Strong counterarguments
   - Potential risks and failures
   - Alternative perspectives
4. Continue the conversation to explore specific concerns
5. View your decision history in the Analytics dashboard

## Example Decisions to Challenge

- Career changes and job transitions
- Business decisions and product launches
- Investment and financial decisions
- Personal life choices
- Technology and tool selections
- Strategy and planning decisions

## Prompt Engineering

The system uses carefully crafted prompts that instruct GPT-4 to act as an uncompromising but respectful critic. Each prompt stage builds on previous analysis to create increasingly sophisticated challenges to the user's reasoning.

Key principles:
- Challenge respectfully but don't sugarcoat
- Focus on realistic, significant risks
- Identify implicit assumptions, not explicit ones
- Provide specific counterarguments with examples
- Help reveal true complexity, not just create doubt

## Development

### Project Structure

```
/app
  /api/chat - Chat API route with AI streaming
  /chat - Chat page component
  /analytics - Analytics dashboard page
  page.tsx - Landing page
/components
  chat-interface.tsx - Multi-turn chat UI
  landing-page.tsx - Landing page component
  analytics-dashboard.tsx - Analytics visualization
/lib/supabase
  client.ts - Supabase client setup
  server.ts - Supabase server setup
/scripts
  001_create_tables.sql - Database schema
  002_create_rls_policies.sql - Security policies
```

### Customization

- **Theme Colors**: Edit color variables in `app/globals.css`
- **System Prompt**: Modify the AI prompt in `app/api/chat/route.ts`
- **UI Components**: Uses shadcn/ui components from `components/ui/`

## Security

- **Row Level Security**: All user data is protected by Supabase RLS policies
- **Authentication**: Users' own auth system (can be integrated with Supabase Auth)
- **API Keys**: OpenAI key managed via Vercel AI Gateway environment variables
- **HTTPS Only**: Deployed on Vercel with automatic HTTPS

## Future Enhancements

- User authentication and login
- Decision outcomes tracking
- Email notifications for tracked decisions
- Export decision analysis as PDF
- Team collaboration and shared decisions
- More AI providers (Claude, Grok, etc.)
- Mobile app version

## License

MIT - Feel free to use for personal or commercial projects

## Support

For issues or questions, open an issue on the project repository.
