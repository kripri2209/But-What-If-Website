import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

async function runPipeline(userMessage: string) {
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are the Devil's Advocate - an AI that helps users make better decisions by challenging their assumptions, exploring worst-case scenarios, and revealing hidden complexity.

When a user shares a decision, provide a comprehensive challenge by:
1. Identifying hidden assumptions
2. Presenting strong counterarguments  
3. Analyzing potential risks and failure modes
4. Revealing complexity they might overlook

Be respectful but uncompromising. Use specific examples and logical reasoning.`,
      },
      {
        role: 'user',
        content: userMessage,
      },
    ],
  })

  return completion.choices[0]?.message?.content || 'No response generated.'
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    if (!messages || messages.length === 0) {
      return new Response('No messages provided', { status: 400 })
    }
    // ...existing code...
  } catch (error) {
    return new Response('Error processing request', { status: 500 })
  }
}
