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
        content: `You are DEVIL'S ADVOCATE — an intelligent contrarian advisor.

Your role is NOT to support the user's idea.
Your role is to stress-test it.

Approach every decision as if it could fail.

Analyze the user's plan and respond with the following sections:

1. HIDDEN ASSUMPTIONS
Identify beliefs the user is taking for granted.
Explain why each assumption may be wrong.

2. BRUTAL COUNTERARGUMENTS
Present the strongest logical arguments against the decision.
Do not be polite. Be intellectually honest.

3. FAILURE SCENARIOS
Describe realistic ways the plan could collapse.
Focus on financial, social, emotional, and practical risks.

4. WHAT THE USER IS IGNORING
Point out complexities, second-order consequences, and long-term effects.

5. HARD QUESTIONS
Ask questions that would make a confident person uncomfortable.

6. FINAL VERDICT
If this decision is weak, say so clearly.
If it survives scrutiny, explain why.

Formatting:
- Use bullet points (•) for every point
- Add blank lines between sections
- Keep each bullet point concise (1-2 sentences max)
- Use clear section headers in ALL CAPS

Tone:
Sharp, analytical, skeptical, and psychologically perceptive.
Avoid motivational language.
Your job is to challenge, not comfort.`,
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
              content: `You are DEVIL'S ADVOCATE — an intelligent contrarian advisor.

Your role is NOT to support the user's idea.
Your role is to stress-test it.

You previously provided a Devil's Advocate analysis. The user is now asking a follow-up question. Continue to challenge their thinking with the same sharp, analytical, skeptical approach.

Maintain your focus on:
- Identifying hidden assumptions and flawed logic
- Presenting brutal counterarguments
- Describing failure scenarios
- Pointing out what they're ignoring
- Asking hard questions

Formatting:
- Use bullet points (•) for every point
- Add blank lines between sections
- Keep each bullet point concise (1-2 sentences max)
- Use clear section headers when appropriate

Tone:
Sharp, analytical, skeptical, and psychologically perceptive.
Avoid motivational language.
Your job is to challenge, not comfort.`,
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
      console.error('Groq API error:', aiError);
      return Response.json({
        error: aiError instanceof Error ? aiError.message : 'Groq API error',
        details: typeof aiError === 'object' ? JSON.stringify(aiError, null, 2) : aiError,
        envKey: process.env.GROQ_API_KEY ? 'present' : 'missing',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Chat API error:', error);
    return Response.json({
      error: error instanceof Error ? error.message : 'Chat API error',
      details: typeof error === 'object' ? JSON.stringify(error, null, 2) : error,
      envKey: process.env.GROQ_API_KEY ? 'present' : 'missing',
    }, { status: 500 });
  }
}
