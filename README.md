# But, What If... - AI-Powered Decision Challenger
But, What If... is an intelligent decision-making assistant that challenges your assumptions, explores worst-case scenarios, and reveals the hidden complexity of your choices. Instead of encouraging confirmation bias, it acts as a contrarian advisor that helps stress-test decisions before you commit to them.

## Understanding of the Problem
 
Many people make decisions based on limited perspectives, emotional bias, or incomplete information. Traditional AI assistants tend to support the user’s viewpoint, which can reinforce confirmation bias instead of improving decision quality.

The goal of this project was to build a system that intentionally challenges the user’s thinking. Instead of agreeing with the user, the system analyzes the decision from a skeptical perspective, highlighting risks, hidden assumptions, and possible failure scenarios.

The idea is to simulate a “Devil’s Advocate” style analysis, where every decision is examined critically before it is taken.

## ScreenShots of Website 
<img width="1543" height="797" alt="Screenshot 2026-03-08 163137" src="https://github.com/user-attachments/assets/2c3b09ac-9a35-407c-a339-c01dc246ba4f" />

<img width="1578" height="876" alt="Screenshot 2026-03-08 163240" src="https://github.com/user-attachments/assets/be917b2c-b780-4b55-afbe-8d0148153023" />

<img width="540" height="588" alt="Screenshot 2026-03-08 155410" src="https://github.com/user-attachments/assets/2fc557e0-7b0e-4379-a48e-19d7e52b5081" />

<img width="855" height="760" alt="Screenshot 2026-03-08 155452" src="https://github.com/user-attachments/assets/a95276ec-8242-4e43-9ea2-dd2effe85baa" />

<img width="1007" height="681" alt="Screenshot 2026-03-08 155334" src="https://github.com/user-attachments/assets/34b31b97-172d-4fbc-a209-73ea5e6ab279" />

## Why the Solution Was Structured This Way
The system was structured to simulate specialized reasoning rather than a single general AI response.

To achieve this, a Mixture of Experts architecture was used.
Instead of sending every question to the same prompt, the system:
Classifies the user's question
Routes it to a specialized expert prompt
Generates structured reasoning
Streams the response to the interface
This structure was chosen because:
Different domains require different reasoning styles
Structured prompts produce more consistent and readable responses
Modular design makes it easier to extend the system with more experts later
This approach improves the quality and clarity of AI responses.

## Edge Cases Considered
Provided with more detail in : EDGE_CASE_HANDLING.md

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

A. Verecel 
https://but-what-if.vercel.app

B. Manually

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

1. Visit the chat interface at " https://but-what-if.vercel.app "
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

This uses Chain-of-Thought style prompting with strict output formatting and persona engineering.

Key Principles:
- Challenge respectfully but don't sugarcoat
- Focus on realistic, significant risks
- Identify implicit assumptions, not explicit ones
- Provide specific counterarguments with examples
- Help reveal true complexity, not just create doubt

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
And many more...

## License

MIT - Feel free to use for personal or commercial projects

## Support

For issues or questions, open an issue on the project repository.
