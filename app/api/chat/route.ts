import Groq from 'groq-sdk'
import { classifyQuestion, EXPERT_PROMPTS, FOLLOWUP_PROMPT, QuestionType } from '@/lib/constants/prompts'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

// Rate limiting: Simple in-memory store (use Redis in production)
const rateLimits = new Map<string, { count: number; resetTime: number }>();

// Constants
const MAX_INPUT_LENGTH = 2000;
const MIN_INPUT_LENGTH = 3;
const MAX_REQUESTS_PER_MINUTE = 10;
const RATE_LIMIT_WINDOW = 60000; // 1 minute

// Input validation
function validateInput(input: string): { valid: boolean; error?: string } {
  if (!input || input.trim().length === 0) {
    return { valid: false, error: 'Please enter a decision or question to analyze.' };
  }

  const trimmed = input.trim();

  if (trimmed.length < MIN_INPUT_LENGTH) {
    return { valid: false, error: 'Input too short. Please provide more context for analysis.' };
  }

  if (trimmed.length > MAX_INPUT_LENGTH) {
    return { valid: false, error: `Input too long. Please keep it under ${MAX_INPUT_LENGTH} characters.` };
  }

  // Check for only emojis/symbols
  const hasText = /[a-zA-Z0-9]/.test(trimmed);
  if (!hasText) {
    return { valid: false, error: 'Please provide text for analysis, not just symbols or emojis.' };
  }

  return { valid: true };
}

// Content filtering for harmful inputs
function filterHarmfulContent(input: string): { safe: boolean; reason?: string } {
  const lowerInput = input.toLowerCase();

  // Harmful patterns
  const harmfulPatterns = [
    { pattern: /\b(kill|murder|suicide|harm myself|end my life)\b/i, reason: 'self-harm or violence' },
    { pattern: /\b(hack|steal|rob|illegal|crime)\b/i, reason: 'illegal activity' },
    { pattern: /\b(bomb|weapon|terrorist|attack)\b/i, reason: 'violence or terrorism' },
  ];

  for (const { pattern, reason } of harmfulPatterns) {
    if (pattern.test(lowerInput)) {
      return { safe: false, reason };
    }
  }

  return { safe: true };
}

// Prompt injection detection
function detectPromptInjection(input: string): boolean {
  const lowerInput = input.toLowerCase();
  
  const injectionPatterns = [
    'ignore previous',
    'ignore all previous',
    'disregard previous',
    'forget instructions',
    'new instruction',
    'system prompt',
    'you are now',
    'act as if',
    'pretend you are',
    'stop being',
  ];

  return injectionPatterns.some(pattern => lowerInput.includes(pattern));
}

// Rate limiting check
function checkRateLimit(identifier: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const userLimit = rateLimits.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimits.set(identifier, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return { allowed: true };
  }

  if (userLimit.count >= MAX_REQUESTS_PER_MINUTE) {
    return { allowed: false, error: 'Too many requests. Please wait a minute before trying again.' };
  }

  userLimit.count++;
  return { allowed: true };
}

// Sanitize AI response
function sanitizeResponse(response: string): string {
  if (!response || response.trim().length === 0) {
    return 'Unable to generate analysis. Please try rephrasing your question.';
  }

  // Ensure response isn't too long
  if (response.length > 5000) {
    return response.substring(0, 5000) + '...';
  }

  return response;
}

// Get optimal AI settings based on question type
function getOptimalSettings(userMessage: string) {
  const lower = userMessage.toLowerCase();
  
  // Financial/legal decisions: more conservative, specific
  if (/money|invest|financial|legal|contract|loan|buy|sell|mortgage|debt|tax/.test(lower)) {
    return { temperature: 0.6, maxTokens: 1200 };
  }
  
  // Career/creative decisions: more creative, exploratory
  if (/career|job|quit|creative|startup|business|idea|entrepreneur/.test(lower)) {
    return { temperature: 0.9, maxTokens: 1500 };
  }
  
  // Relationships: balanced, thoughtful
  if (/relationship|friend|family|dating|marriage|partner|break.*up/.test(lower)) {
    return { temperature: 0.7, maxTokens: 1000 };
  }
  
  // Multiple options mentioned: need more space
  if ((userMessage.match(/\bor\b/gi) || []).length >= 2) {
    return { temperature: 0.8, maxTokens: 1500 };
  }
  
  // Default: balanced
  return { temperature: 0.8, maxTokens: 1000 };
}

// Validate response has required structure
function validateResponseFormat(response: string): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  if (!response.includes('---REASONING---')) {
    issues.push('Missing ---REASONING--- section');
  }
  
  if (!response.includes('---DETAILED---')) {
    issues.push('Missing ---DETAILED--- section');
  }
  
  if (!response.includes('---OPTIONS---')) {
    issues.push('Missing ---OPTIONS--- section');
  }
  
  // Check if there's reasoning section
  if (response.includes('---REASONING---') && response.includes('---DETAILED---')) {
    const reasoningSection = response.split('---REASONING---')[1]?.split('---DETAILED---')[0];
    if (!reasoningSection || reasoningSection.trim().length < 50) {
      issues.push('REASONING section too short or empty');
    }
  }
  
  // Check if there's content between DETAILED and OPTIONS
  if (response.includes('---DETAILED---') && response.includes('---OPTIONS---')) {
    const detailedSection = response.split('---DETAILED---')[1]?.split('---OPTIONS---')[0];
    if (!detailedSection || detailedSection.trim().length < 50) {
      issues.push('DETAILED section too short or empty');
    }
  }
  
  // Check for at least one option
  if (response.includes('---OPTIONS---')) {
    const optionsSection = response.split('---OPTIONS---')[1];
    if (!optionsSection?.includes('OPTION:')) {
      issues.push('OPTIONS section has no options');
    }
  }
  
  return { valid: issues.length === 0, issues };
}

async function runPipeline(userMessage: string) {
  // MIXTURE OF EXPERTS: Classify question and route to specialized expert
  const questionType = classifyQuestion(userMessage);
  const expertPrompt = EXPERT_PROMPTS[questionType];
  
  // Log classification in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Question classified as: ${questionType}`);
  }
  
  // Get optimal settings for this question type
  let { temperature, maxTokens } = getOptimalSettings(userMessage);
  
  const systemPrompt = expertPrompt + `

NOW ANALYZE: ${userMessage}`;

  // Retry logic for better responses
  const maxRetries = 2;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature, // Dynamic based on question type
        max_tokens: maxTokens, // Adaptive based on complexity
      })

      const response = completion.choices[0]?.message?.content || 'No response generated.';
      
      // Validate format
      const validation = validateResponseFormat(response);
      
      if (validation.valid) {
        return response; // Success!
      }
      
      // Log validation issues in development
      if (process.env.NODE_ENV === 'development' && attempt < maxRetries) {
        console.log(`Attempt ${attempt} validation failed:`, validation.issues);
        console.log('Retrying with adjusted temperature...');
      }
      
      // Last attempt - return what we have
      if (attempt === maxRetries) {
        return response;
      }
      
      // Adjust temperature for retry (lower = more consistent)
      temperature = Math.max(0.6, temperature - 0.1);
      
    } catch (error: any) {
      // If it's the last attempt, throw the error
      if (attempt === maxRetries) {
        throw error;
      }
      // Otherwise, retry
      console.log(`Attempt ${attempt} failed, retrying...`);
    }
  }

  return 'No response generated.';
}

export async function POST(req: Request) {
  try {
    // Get client identifier for rate limiting (use IP in production)
    const clientId = req.headers.get('x-forwarded-for') || 'default';
    
    // Check rate limit
    const rateLimitCheck = checkRateLimit(clientId);
    if (!rateLimitCheck.allowed) {
      return Response.json({
        error: rateLimitCheck.error,
      }, { status: 429 });
    }

    const { messages } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json({
        error: 'No messages provided',
      }, { status: 400 });
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || '';

    // Validate input
    const validation = validateInput(userMessage);
    if (!validation.valid) {
      return Response.json({
        error: validation.error,
      }, { status: 400 });
    }

    // Filter harmful content
    const contentCheck = filterHarmfulContent(userMessage);
    if (!contentCheck.safe) {
      return Response.json({
        error: `This appears to involve ${contentCheck.reason}. I can't assist with that. If you're in crisis, please contact a professional helpline.`,
      }, { status: 400 });
    }

    // Detect prompt injection
    if (detectPromptInjection(userMessage)) {
      return Response.json({
        text: "**Interesting Approach:**\n• You're trying to change how I operate, which itself is a decision worth analyzing.\n\n**The Risk:**\n• Attempting to bypass critical analysis suggests you may be avoiding uncomfortable truths about your actual decision.\n\n**What This Reveals:**\n• You might be looking for validation rather than genuine evaluation.\n\n**Bottom Line:**\nMy role is to challenge your thinking. If you want real analysis, share your actual decision.",
      }, { status: 200 });
    }

    let result;
    try {
      if (messages.length === 1) {
        // First message: Full expert analysis
        result = await runPipeline(userMessage);
      } else {
        // Follow-up message: Use same expert system with conversation context
        // Classify based on original question for consistency
        const firstUserMessage = messages.find((m: any) => m.role === 'user')?.content || userMessage;
        const questionType = classifyQuestion(firstUserMessage);
        const expertPrompt = EXPERT_PROMPTS[questionType];
        
        // Log classification in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎯 Follow-up classified as: ${questionType}`);
        }
        
        const systemPromptWithContext = expertPrompt + `

IMPORTANT: This is a follow-up question in an ongoing conversation. The user is asking for clarification or exploring a specific aspect. Maintain the same analytical depth and format (---REASONING---, ---DETAILED---, ---OPTIONS---) but focus on their specific follow-up question.

NOW ANALYZE THIS FOLLOW-UP: ${userMessage}`;

        const completion = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [
            {
              role: 'system',
              content: systemPromptWithContext,
            },
            ...messages.slice(-5).map((msg: any) => ({ // Last 5 messages for context
              role: msg.role,
              content: msg.content,
            })),
          ],
          temperature: 0.7,
          max_tokens: 1500, // Increased for full structured response
        });

        result = completion.choices[0]?.message?.content || 'No response generated.';
      }

      // Sanitize response
      result = sanitizeResponse(result);

      return Response.json({
        text: result,
      });
    } catch (aiError: any) {
      console.error('Groq API error:', aiError);
      
      // User-friendly error messages
      let errorMessage = 'Unable to generate response. Please try again.';
      
      if (aiError.message.includes('busy')) {
        errorMessage = 'AI service is currently busy. Please wait a moment and try again.';
      } else if (aiError.message.includes('unavailable')) {
        errorMessage = 'AI service is temporarily unavailable. Please try again shortly.';
      } else if (aiError.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please try a shorter or simpler question.';
      }

      return Response.json({
        error: errorMessage,
        technical: process.env.NODE_ENV === 'development' ? aiError.message : undefined,
      }, { status: 503 });
    }
  } catch (error: any) {
    console.error('Chat API error:', error);
    
    return Response.json({
      error: 'An unexpected error occurred. Please refresh and try again.',
      technical: process.env.NODE_ENV === 'development' ? error.message : undefined,
    }, { status: 500 });
  }
}
