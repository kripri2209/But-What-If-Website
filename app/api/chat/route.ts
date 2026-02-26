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

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || ''

    let result
    try {
      if (messages.length === 1) {
        result = await runPipeline(userMessage)
      } else {
        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: `You are the Devil's Advocate - an AI that helps users make better decisions by challenging their assumptions, exploring worst-case scenarios, presenting alternative perspectives, and analyzing hidden risks.

You previously provided a Devil's Advocate analysis. The user is now asking a follow-up question. Continue to challenge their thinking, provide deeper insights, and explore further complexity.

Be respectful but uncompromising. Use specific examples and logical reasoning.`,
            },
            ...messages.map((msg: any) => ({
              role: msg.role,
              content: msg.content,
            })),
          ],
        })

        result = completion.choices[0]?.message?.content || 'No response generated.'
      }

      return Response.json({
        text: result,
      })
    } catch (aiError) {
      console.error('Groq API error:', aiError)
      return Response.json({
        error: aiError instanceof Error ? aiError.message : 'Groq API error',
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
