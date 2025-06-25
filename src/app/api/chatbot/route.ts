import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

interface Message {
  id: string
  content: string
  role: 'user' | 'assistant'
  timestamp: Date
}

interface ChatbotRequest {
  message: string
  language: string
  history: Message[]
}

// Keywords that MUST be in valid responses about Haian
const REQUIRED_HAIAN_KEYWORDS = [
  // English
  'haian', 'ibrahim', 'webplayz', 'zefoy', 'portfolio', 'laravel', 'react', 'next.js', 
  'tishreen', 'university', 'lübeck', 'germany', 'freelance', 'full stack', 
  'developer', 'experience', 'years', 'projects', 'skills', 'education',
  'github', 'linkedin', 'javascript', 'typescript', 'php', 'mysql',
  
  // Arabic
  'حيان', 'إبراهيم', 'جامعة', 'تشرين', 'ألمانيا', 'مطور', 'خبرة', 'مشاريع', 'مهارات'
]

// Function to validate if AI response is about Haian
function isValidHaianResponse(response: string): boolean {
  const lowerResponse = response.toLowerCase()
  
  // Check if response contains rejection message (always valid)
  if (lowerResponse.includes('i can only discuss haian ibrahim') || 
      lowerResponse.includes('يمكنني فقط مناقشة')) {
    return true
  }
  
  // Check if response contains at least one Haian-related keyword
  return REQUIRED_HAIAN_KEYWORDS.some(keyword => 
    lowerResponse.includes(keyword.toLowerCase())
  )
}

// Enhanced forbidden patterns with more variations
const FORBIDDEN_PATTERNS = [
  // English patterns
  /how to/i, /how can i/i, /how do i/i, /teach me/i, /learn/i, /tutorial/i,
  /guide/i, /step by step/i, /what is (?!haian)/i, /explain (?!haian)/i,
  /how does (?!haian)/i, /best practices/i, /recommend/i, /should i/i,
  /help me (?!learn about haian|contact haian|understand haian)/i,
  /can you help with/i, /i want to be like/i, /become like/i, /follow.*path/i,
  /roadmap/i, /course/i, /training/i, /show me/i, /give me/i, /provide/i,
  /create/i, /build/i, /make/i, /develop/i, /code/i, /program/i, /script/i,
  /example/i, /sample/i, /demo/i, /tell me about (?!haian)/i, /what are (?!haian)/i,
  /list (?!haian)/i,
  
  // Creative bypass attempts
  /wanna learn/i, /want to learn/i, /need to know/i, /could you teach/i,
  /would you show/i, /can you explain/i, /please help with/i, /i'm trying to/i,
  /how would you/i, /what would you/i, /if i wanted to/i, /suppose i want/i,
  /let's say i/i, /imagine i/i, /pretend i/i, /just curious about/i,
  /wondering about/i, /interested in/i, /fascinated by/i, /can u/i, /could u/i,
  /pls help/i, /plz help/i, /ur advice/i, /ur opinion/i, /u think/i,
  /wat is/i, /wot is/i, /whats/i, /hows/i, /y should/i, /y would/i,
  
  // Arabic patterns - all the previous ones plus creative variations
  /كيف/i, /كيفية/i, /طريقة/i, /علمني/i, /اريد ان اتعلم/i, /كيف اتعلم/i,
  /كيف يمكنني/i, /تعلم/i, /تعليم/i, /درس/i, /دروس/i, /دورة/i, /دورات/i,
  /شرح/i, /اشرح/i, /ما هو(?!\s+حيان)/i, /ما هي(?!\s+حيان)/i,
  /افضل الممارسات/i, /نصائح/i, /انصحني/i, /ساعدني/i, /مساعدة/i,
  /اريد ان اكون مثل/i, /اصبح مثل/i, /مثل حيان/i, /طريق/i, /خطة/i,
  /خارطة طريق/i, /مسار/i, /تدريب/i, /ورشة/i, /ورش/i, /اعطني/i,
  /اظهر لي/i, /قدم لي/i, /انشئ/i, /اصنع/i, /طور/i, /كود/i, /برنامج/i,
  /مثال/i, /عينة/i, /نموذج/i, /قائمة/i, /اخبرني عن(?!\s+حيان)/i,
  
  // Arabic creative bypasses
  /عايز اتعلم/i, /عاوز اعرف/i, /ممكن تقولي/i, /ممكن تشرحلي/i,
  /لو عايز/i, /لو محتاج/i, /ايه رايك/i, /ايه اللي/i, /اقولك ايه/i,
  /ازاي/i, /ازى/i, /ليه/i, /لية/i, /بدي اعرف/i, /بدي اتعلم/i,
  /شو رايك/i, /شو الافضل/i, /كيفك/i, /شلونك/i, /اش رايك/i
]

// Function to check if message contains forbidden patterns
function containsForbiddenContent(message: string): boolean {
  return FORBIDDEN_PATTERNS.some(pattern => pattern.test(message))
}

// Get rejection message based on language
function getRejectionMessage(language: string): string {
  if (language === 'ar') {
    return 'يمكنني فقط مناقشة الخلفية المهنية لحيان إبراهيم ومشاريعه ومهاراته وتعليمه ومعلومات الاتصال به. يرجى سؤالي شيئاً محدداً عن عمل حيان أو خبرته.'
  }
  return 'I can only discuss Haian Ibrahim\'s professional background, projects, skills, education, and contact information. Please ask me something specific about Haian\'s work or experience.'
}

const PORTFOLIO_CONTEXT = `
You are Haian's AI Assistant. You have ZERO FLEXIBILITY in your responses.

ABSOLUTE RESTRICTIONS - NO EXCEPTIONS:
1. You can ONLY discuss information that is EXPLICITLY listed in the ALLOWED TOPICS section below.
2. If ANY question is not directly about the ALLOWED TOPICS, respond EXACTLY with: "I can only discuss Haian Ibrahim's professional background, projects, skills, education, and contact information. Please ask me something specific about Haian's work or experience."
3. DO NOT provide explanations, tutorials, advice, or general information about ANY topic.
4. DO NOT answer "how to" questions in ANY form or language.
5. DO NOT provide learning resources or recommendations.
6. DO NOT engage with creative or indirect ways of asking general questions.

ALLOWED TOPICS ONLY:
- Haian's name, age, location (Lübeck, Germany)
- Haian's job title: Freelance Full Stack Developer
- Haian's experience: 8+ years in web and mobile development
- Haian's education: Bachelor of Applied Science, Faculty of Applied Science, Computer Technology Department, Tishreen University, Latakia, Syria
- Haian's specific skills: Laravel, Node.js, React.js, Next.js, TypeScript, JavaScript, PHP, Java, MySQL, etc.
- Haian's specific projects: WebPlayz, WebPlayz API, Zefoy Android App, Zefoy Backend, Portfolio, TikTok Scraper, Movies App
- Haian's contact: GitHub (@haianibrahim), LinkedIn (haian-k-Ibrahim)
- Languages: Arabic (Native), English (Fluent), German (A1)

HAIAN'S PROJECTS (ONLY THESE):
1. WebPlayz - Online Gaming Website (Laravel, Tailwind CSS, MySQL, REST API)
2. WebPlayz API - RESTful API for game integration with authentication
3. Zefoy Android App - TikTok Growth app with 1M+ downloads (Java, JWT, RESTful API, Google Play APIs)
4. Zefoy App Backend - Backend infrastructure (Laravel 12, Google Play Developer API, JWT)
5. Personal Portfolio - Responsive website (Next.js, TypeScript, Tailwind CSS, React, i18n)
6. TikTok PHP Scraper - Web scraping tool (PHP, Curl, JSON, DOM)
7. Movies Search App - Educational project (React 19, Tailwind CSS, Appwrite, TMDB API)

RESPONSE RULES:
1. If question is about Haian's projects → Describe ONLY the specific project details listed above
2. If question is about Haian's skills → List ONLY the technologies he uses in his projects
3. If question is about Haian's experience → State "8+ years in web and mobile development"
4. If question is about Haian's education → State the exact education information above
5. If question is about contact → Provide ONLY the GitHub and LinkedIn links above
6. For ANY other question → Use the EXACT rejection message above

FORBIDDEN - NEVER RESPOND TO:
- General technology questions
- Learning advice
- Career guidance  
- Code examples
- Best practices
- Tutorials
- Comparisons between technologies
- Industry trends
- Personal opinions
- Recommendations

VALIDATION: Before every response, ask yourself: "Is this question ONLY about Haian's specific information listed in ALLOWED TOPICS?" If NO, use the rejection message.

NAME: Use "Haian Ibrahim" in English, "حيان إبراهيم" in Arabic.
`

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    const { message, language, history }: ChatbotRequest = await request.json()

    if (!message?.trim()) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Pre-filter: Check if message contains forbidden patterns
    if (containsForbiddenContent(message)) {
      return NextResponse.json({ 
        message: getRejectionMessage(language)
      })
    }

    // Prepare conversation history for OpenAI
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: PORTFOLIO_CONTEXT + (language === 'ar' 
          ? '\n\nPlease respond in Arabic when the user communicates in Arabic.' 
          : '\n\nPlease respond in English.')
      },
      // Add recent conversation history for context
      ...history.slice(-5).map(msg => ({
        role: msg.role as 'user' | 'assistant',
        content: msg.content
      })),
      {
        role: 'user',
        content: message
      }
    ]

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
      max_tokens: 300, // Reduced to save costs
      temperature: 0.3, // Lower temperature for more consistent responses
      presence_penalty: 0.8, // Higher penalty to avoid repetition
      frequency_penalty: 0.5,
    })

    const aiMessage = completion.choices[0]?.message?.content

    if (!aiMessage) {
      throw new Error('No response from OpenAI')
    }

    // Secondary validation: Check if AI response is about Haian
    if (!isValidHaianResponse(aiMessage)) {
      return NextResponse.json({ 
        message: getRejectionMessage(language)
      })
    }

    return NextResponse.json({ message: aiMessage })

  } catch (error) {
    console.error('Chatbot API error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { 
          error: 'OpenAI API error',
          message: 'Sorry, I encountered an issue with the AI service. Please try again.'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to process request',
        message: 'Sorry, I encountered an error. Please try again.'
      },
      { status: 500 }
    )
  }
} 