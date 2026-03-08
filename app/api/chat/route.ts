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

// Greeting detection
function isGreeting(input: string): boolean {
  const lowerInput = input.toLowerCase().trim();
  
  // Check if the input is primarily a greeting (not a decision question)
  // Must be short (under 80 chars) and match greeting patterns
  if (lowerInput.length > 80) {
    return false; // Too long to be just a greeting
  }
  
  // Keywords that indicate this is NOT a greeting but a decision question
  const decisionKeywords = [
    'should i', 'which', 'what if', 'option', 'choice', 'decide', 'better',
    'recommend', 'suggest', 'advice', 'help me choose', 'pros and cons'
  ];
  
  if (decisionKeywords.some(keyword => lowerInput.includes(keyword))) {
    return false;
  }
  
  // Greeting words/phrases
  const greetingWords = [
    'hi', 'hey', 'hello', 'hiya', 'sup', 'yo', 'howdy', 'heya',
    'good morning', 'good afternoon', 'good evening', 'good day'
  ];
  
  // Status/small talk phrases
  const statusPhrases = [
    'how are you', 'how r u', 'how are ya', 'how are u',
    'how\'s it going', 'how is it going', 'hows it going',
    'how have you been', 'how you been',
    'how are things', 'how\'s everything', 'hows everything',
    'what\'s up', 'whats up', 'wassup', 'what up', 'whats good',
    'how you doing', 'how\'s your day', 'hows your day'
  ];
  
  // Check if input contains greeting words or status phrases
  const hasGreeting = greetingWords.some(greeting => {
    // Match greeting at start or after certain punctuation
    const pattern = new RegExp(`(^|\\s)${greeting}(\\s|$|,|!|\\?)`, 'i');
    return pattern.test(lowerInput);
  });
  
  const hasStatus = statusPhrases.some(phrase => lowerInput.includes(phrase));
  
  // It's a greeting if it contains greeting words and/or status phrases
  // Examples: "hi", "how are you", "hi how are you", "hello what's up", etc.
  return hasGreeting || hasStatus;
}

// Generate friendly greeting response
function getGreetingResponse(): string {
  const responses = [
    "Hey there! 👋 I'm here to help you think through tough decisions. What's on your mind?",
    "Hello! Ready to challenge your assumptions? Tell me about a decision you're facing.",
    "Hi! I'm an AI-powered decision analysis tool. What decision can I help you analyze today?",
    "Hey! Got a tough choice to make? Share the details and I'll help you see all the angles.",
    "Hello there! Whether it's a career move, relationship decision, or anything else — I'm here to help you think it through. What's the situation?",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Detect meta or off-topic questions
function isMetaOrOffTopicQuestion(input: string): boolean {
  const lowerInput = input.toLowerCase().trim();
  
  // Meta questions about the AI/system itself
  const metaPatterns = [
    // Identity questions
    'are you an ai', 'are you a bot', 'are you real', 'are you human',
    'what are you', 'who are you', 'what is your name', 'what\'s your name',
    'whats your name', 'who made you', 'who created you', 'who built you',
    'who developed you', 'who programmed you',
    
    // Capability questions
    'can you talk', 'can you think', 'can you feel', 'do you have feelings',
    'are you sentient', 'are you conscious', 'do you understand',
    
    // Technical questions
    'what model are you', 'what language model', 'which ai are you',
    'what version are you', 'how do you work', 'how were you made',
    
    // Purpose questions (when not decision-related)
    'what do you do', 'what can you do', 'what are your features',
    'tell me about yourself', 'describe yourself',
    
    // Testing/absurd questions
    'say something', 'can you hear me', 'are you there', 'are you listening',
    'test', 'testing', 'hello world',
  ];
  
  // Check if input matches any meta patterns
  const hasMetaPattern = metaPatterns.some(pattern => lowerInput.includes(pattern));
  
  // Absurd or non-sensical patterns
  const absurdPatterns = [
    /^(a|aa+|aaa+)$/i, // Just letter repetition
    /^(lol|lmao|haha|hehe)+$/i, // Just laughter
    /^test(ing)?$/i, // Just "test" or "testing"
    /^\.+$/, // Just dots
    /^\?+$/, // Just question marks
  ];
  
  const isAbsurd = absurdPatterns.some(pattern => pattern.test(lowerInput));
  
  return hasMetaPattern || isAbsurd;
}

// Generate redirect response for meta/off-topic questions
function getRedirectResponse(): string {
  const responses = [
    "I'm not a personal AI assistant — I'm a **decision-analysis companion** built to challenge your ideas and identify risks.\n\nShare a decision or scenario you're facing, and I'll help you think through it critically.",
    
    "This isn't a general chatbot — it's a **critical thinking tool** designed to analyze decisions and explore outcomes.\n\nGot a choice to make? A scenario to evaluate?\n\nTell me about it.",
    
    "I specialize in **decision analysis**, not small talk.\n\nMy purpose is to challenge assumptions, identify risks, and help you see angles you might miss.\n\nWhat decision can I help you think through?",
    
    "I'm built for **decision-making**, not conversation.\n\nThink of me as your critical thinking partner who asks uncomfortable questions.\n\nShare a scenario or choice you're facing, and let's analyze it together.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}

// Detect insults or rude language directed at the AI
function containsInsults(input: string): boolean {
  const lowerInput = input.toLowerCase().trim();
  
  // Insults and rude language patterns
  const insultPatterns = [
    // Direct insults
    'stupid', 'dumb', 'idiot', 'fool', 'foolish', 'moron', 'useless',
    'pathetic', 'terrible', 'awful', 'garbage', 'trash', 'crap',
    'suck', 'you suck', 'this sucks',
    
    // Questioning intelligence/capability
    'are you stupid', 'are you dumb', 'are you an idiot', 'are you foolish',
    'you are stupid', 'you are dumb', 'you are useless', 'you are terrible',
    'you\'re stupid', 'you\'re dumb', 'you\'re useless', 'you\'re terrible',
    'youre stupid', 'youre dumb', 'youre useless',
    
    // Dismissive language
    'shut up', 'go away', 'get lost', 'leave me alone',
    'i hate you', 'you\'re annoying', 'youre annoying',
    
    // Profanity directed at the AI (keeping it mild)
    'damn you', 'screw you', 'f*** you', 'fuck you',
  ];
  
  // Check if input contains insults
  const hasInsult = insultPatterns.some(pattern => lowerInput.includes(pattern));
  
  // Additional check: Negative "you are/you're" statements followed by negative words
  const youAreNegative = /you('re|\s+are)\s+(so\s+)?(bad|wrong|broken|defective|incompetent)/i.test(lowerInput);
  
  return hasInsult || youAreNegative;
}

// Generate calm, professional response to insults
function getCalmRedirectResponse(): string {
  const responses = [
    "I understand you may be frustrated.\n\nI'm here as a **decision-analysis tool** to help evaluate choices and identify risks.\n\nIf you'd like, share a decision or situation you're facing, and I'll provide an objective analysis.",
    
    "I'm designed to remain neutral and analytical.\n\nMy purpose is to help you think through decisions by challenging assumptions and exploring outcomes.\n\nWould you like to share a choice or scenario to analyze?",
    
    "I don't take things personally — I'm a tool built for critical thinking and decision analysis.\n\nIf there's a specific decision or situation you need help evaluating, I'm ready to assist.",
    
    "My function is to provide objective decision analysis, not to engage emotionally.\n\nI'm here to help you explore options and identify risks.\n\nLet me know if you have a decision you'd like to think through.",
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
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

async function runPipeline(userMessage: string, weights?: Array<{name: string; weight: number}>) {
  // MIXTURE OF EXPERTS: Classify question and route to specialized expert
  const questionType = classifyQuestion(userMessage);
  const expertPrompt = EXPERT_PROMPTS[questionType];
  
  // Log classification in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`🎯 Question classified as: ${questionType}`);
    if (weights && weights.length > 0) {
      console.log(`⚖️  Weighted criteria:`, weights);
    }
  }
  
  // Get optimal settings for this question type
  let { temperature, maxTokens } = getOptimalSettings(userMessage);
  
  // Build weighted criteria context if provided
  let weightsContext = '';
  if (weights && weights.length > 0) {
    weightsContext = `\n\n**USER'S WEIGHTED CRITERIA (Higher = More Important):**\n${weights.map(w => `• ${w.name}: ${w.weight}/10`).join('\n')}\n\nIMPORTANT: Prioritize evaluation based on these weighted criteria. Options scoring higher on high-weight criteria should be highlighted as stronger choices.`;
  }
  
  const systemPrompt = expertPrompt + weightsContext + `

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

    const { messages, weights } = await req.json();

    if (!messages || messages.length === 0) {
      return Response.json({
        error: 'No messages provided',
      }, { status: 400 });
    }

    // Get the latest user message
    const userMessage = messages[messages.length - 1]?.content || '';

    // Handle simple greetings FIRST (before validation to allow short greetings like "hi")
    if (isGreeting(userMessage)) {
      return Response.json({
        text: getGreetingResponse(),
      }, { status: 200 });
    }

    // Handle meta/off-topic questions (redirect to decision-making)
    if (isMetaOrOffTopicQuestion(userMessage)) {
      return Response.json({
        text: getRedirectResponse(),
      }, { status: 200 });
    }

    // Handle insults or rude language calmly and professionally
    if (containsInsults(userMessage)) {
      return Response.json({
        text: getCalmRedirectResponse(),
      }, { status: 200 });
    }

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
        // First message: Full expert analysis with optional weights
        result = await runPipeline(userMessage, weights);
      } else {
        // Follow-up message: Use same expert system with conversation context
        // Classify based on original question for consistency
        const firstUserMessage = messages.find((m: any) => m.role === 'user')?.content || userMessage;
        const questionType = classifyQuestion(firstUserMessage);
        const expertPrompt = EXPERT_PROMPTS[questionType];
        
        // Log classification in development
        if (process.env.NODE_ENV === 'development') {
          console.log(`🎯 Follow-up classified as: ${questionType}`);
          if (weights && weights.length > 0) {
            console.log(`⚖️  Using weighted criteria:`, weights);
          }
        }
        
        // Build weighted criteria context if provided
        let weightsContext = '';
        if (weights && weights.length > 0) {
          weightsContext = `\n\n**USER'S WEIGHTED CRITERIA (Higher = More Important):**\n${weights.map(w => `• ${w.name}: ${w.weight}/10`).join('\n')}\n\nIMPORTANT: Continue to evaluate based on these weighted criteria in your follow-up response.`;
        }
        
        const systemPromptWithContext = expertPrompt + weightsContext + `

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
