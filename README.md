# But, What If... - AI-Powered Decision Challenger

But, What If... is an intelligent decision-making assistant that challenges your assumptions, explores worst-case scenarios, and reveals the hidden complexity of your choices. Instead of encouraging confirmation bias, it acts as your personal contrarian advisor.

## What It Does

But, What If... uses AI to help you make better decisions by:

1. **Challenging Assumptions** - Identifies the hidden beliefs and biases driving your decision
2. **Presenting Counterarguments** - Offers powerful opposing viewpoints you may have overlooked
3. **Exploring Worst Cases** - Details realistic failure modes and disaster scenarios
4. **Analyzing Hidden Risks** - Uncovers non-obvious costs, consequences, and ripple effects
5. **Revealing Complexity** - Helps you understand trade-offs and what you're truly missing

## Technology Stack

- **Frontend**: Next.js 16 + React 19 + shadcn/ui + Tailwind CSS v4
- **AI**: Groq (LLaMA 3.3 70B Versatile) with Mixture of Experts routing
- **Storage**: Browser localStorage for conversation persistence
- **Deployment**: Vercel
- **Real-time**: Groq SDK with streaming responses

## Architecture

### Mixture of Experts System

Intelligent question classification routes each query to a specialized expert:

```
User Input
  → Question Classification (Financial, Career, Relationship, Ethical, Lifestyle, General)
  → Expert Prompt Selection (domain-specific analysis)
  → Chain-of-Thought Reasoning
  → Structured Response (REASONING → DETAILED → OPTIONS)
  → Streaming to Client
```

**Expert Domains:**
- **Financial Expert**: Money, investments, budgets
- **Career Expert**: Jobs, businesses, professional growth
- **Relationship Expert**: Connections, family, partnerships
- **Ethical Expert**: Moral dilemmas, values conflicts
- **Lifestyle Expert**: Health, location, life changes
- **General Expert**: Everything else

### Storage

- **localStorage** - Conversation history stored in browser
- **Session persistence** - Chat history survives page reloads
- **No authentication required** - Privacy-first approach

## Pages

- **`/`** - Landing page introducing But, What If...
- **`/chat`** - Multi-turn chat interface for challenging decisions
- **`/analytics`** - Dashboard showing decision history and patterns

## Key Features

- **Mixture of Experts** - Intelligent routing to domain-specialized prompts
- **Multi-turn Conversations** - Continue debating across multiple messages with context
- **Streaming Responses** - Real-time AI response streaming for immediate feedback
- **Chain-of-Thought Reasoning** - Step-by-step analysis before final verdict
- **Structured Responses** - REASONING → DETAILED → OPTIONS format
- **Conversation History** - localStorage persistence survives page reloads
- **Dynamic Temperature** - Adjusts creativity based on question type
- **Copy to Clipboard** - Easy sharing of AI insights
- **Markdown Support** - Code highlighting, formatting, lists

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

2. Set up environment variables:
```bash
cp .env.example .env.local
# Add your Groq API key
GROQ_API_KEY=your_groq_api_key
```

3. Run the development server:
```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. Visit the chat interface at [http://localhost:3000](http://localhost:3000)
2. Share a decision you're making or considering
3. But, What If... will challenge your thinking with:
   - **Reasoning**: Step-by-step analysis of your decision
   - **What You're Missing**: Blind spots and ignored factors
   - **What Could Go Wrong**: Specific risks and failure scenarios  
   - **Real Talk**: Direct truth about wishful thinking
   - **Bottom Line**: Hard questions you need to answer
   - **Options**: Concrete alternatives with pros/cons
4. Continue the conversation to explore specific concerns
5. Your chat history persists in browser localStorage

## Example Decisions to Challenge

- Career changes and job transitions
- Business decisions and product launches
- Investment and financial decisions
- Personal life choices
- Technology and tool selections
- Strategy and planning decisions

## Prompt Engineering
llama-3.3-70b-versatile : Provided by Groq (via their SDK).
This is Meta's Llama 3.3 model with 70 billion parameters, optimized for versatile reasoning tasks. Groq provides extremely fast inference speeds for this model.

Major Prompt Engineering Techniques:
1. Role-Based Prompting
Assigns clear identity: "You are But, What If... — an intelligent contrarian advisor"
Defines explicit purpose: "Your role is NOT to support... Your role is to stress-test"
2. Structured Output Format
Forces 6-section response structure:
HIDDEN ASSUMPTIONS
BRUTAL COUNTERARGUMENTS
FAILURE SCENARIOS
WHAT THE USER IS IGNORING
HARD QUESTIONS
FINAL VERDICT
3. Task Decomposition
Breaks complex "challenge thinking" task into specific sub-tasks
Each section has clear instructions (e.g., "Identify beliefs... Explain why each assumption may be wrong")
4. Tone Specification
Explicit tone directive: "Sharp, analytical, skeptical, and psychologically perceptive"
Negative examples: "Avoid motivational language"
Clear boundary: "Your job is to challenge, not comfort"
5. Formatting Instructions
Bullet points (•) for every point
Blank lines between sections
Concise constraints (1-2 sentences max)
ALL CAPS for section headers
6. Context-Aware Prompting
First message: Uses full 6-section structured prompt via runPipeline()
Follow-ups: Shorter continuation prompt that references previous analysis
Maintains conversation history with ...messages.map() spread
7. Behavioral Constraints
"Do not be polite. Be intellectually honest."
"Approach every decision as if it could fail"
"Ask questions that would make a confident person uncomfortable"
8. Focus Directives
Lists specific areas: financial, social, emotional, practical risks
Points to: complexities, second-order consequences, long-term effects
9. Conditional Logic
Different prompts for initial vs follow-up messages
Adapts based on conversation length: if (messages.length === 1)

This is Chain-of-Thought style prompting with strict output formatting and persona engineering.

Key Principles:
- Challenge respectfully but don't sugarcoat
- Focus on realistic, significant risks
- Identify implicit assumptions, not explicit ones
- Provide specific counterarguments with examples
- Help reveal true complexity, not just create doubt

## Development

### Project Structure

```
/app
  /api/chat - Chat API route with Groq AI streaming and Mixture of Experts
  page.tsx - Main chat interface
  layout.tsx - Root layout
  globals.css - Global styles
/Source Code
  /components
    chat-interface.tsx - Multi-turn chat UI
    /ui - shadcn/ui component library
  /lib
    /constants
      prompts.ts - Expert prompts and question classification
    /types
      index.ts - TypeScript type definitions
    utils.ts - Utility functions
```

### Customization

- **Theme Colors**: Edit color variables in `app/globals.css`
- **Expert Prompts**: Modify domain-specific prompts in `Source Code/lib/constants/prompts.ts`
- **Question Classification**: Adjust patterns in `classifyQuestion()` function
- **UI Components**: Uses shadcn/ui components from `Source Code/components/ui/`

## Security & Safety

- **Rate Limiting**: In-memory rate limiting (10 requests/minute per client)
- **Content Filtering**: Blocks harmful content (violence, self-harm, illegal activity)
- **Prompt Injection Defense**: Detects and neutralizes manipulation attempts
- **Input Validation**: Length limits (3-2000 chars), text requirements
- **Private by Default**: All data stored locally in browser, no accounts needed
- **HTTPS Only**: Deployed on Vercel with automatic HTTPS
- **API Keys**: Groq API key secured via environment variables

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
