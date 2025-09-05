import OpenAI from 'openai'

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true // Note: In production, API calls should go through your backend
})

// Error handling utility
const handleOpenAIError = (error, operation) => {
  console.error(`OpenAI Error in ${operation}:`, error)
  throw new Error(`Failed to ${operation}: ${error.message}`)
}

// Generate personalized scripts based on situation
export const generatePersonalizedScript = async (situation, stateCode, language = 'en') => {
  try {
    const prompt = `Generate a respectful and legally sound script for a police interaction in ${stateCode} state. 
    
    Situation: ${situation}
    Language: ${language === 'es' ? 'Spanish' : 'English'}
    
    Requirements:
    - Be respectful and non-confrontational
    - Assert constitutional rights appropriately
    - Include specific phrases for the situation
    - Keep it concise and memorable
    - Ensure it's legally accurate for ${stateCode}
    
    Format the response as a JSON object with:
    {
      "script": "The main script text",
      "keyPoints": ["point1", "point2", "point3"],
      "tone": "respectful/assertive/calm",
      "context": "Brief explanation of when to use this"
    }`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a legal expert specializing in constitutional rights during police interactions. Provide accurate, helpful, and safe advice."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 800
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    // Parse JSON response
    try {
      return JSON.parse(response)
    } catch (parseError) {
      // If JSON parsing fails, return a structured response
      return {
        script: response,
        keyPoints: [],
        tone: "respectful",
        context: "Generated script for police interaction"
      }
    }
  } catch (error) {
    handleOpenAIError(error, 'generate personalized script')
  }
}

// Translate existing scripts to different languages
export const translateScript = async (text, targetLanguage) => {
  try {
    const languageMap = {
      'es': 'Spanish',
      'en': 'English',
      'fr': 'French',
      'de': 'German',
      'it': 'Italian',
      'pt': 'Portuguese'
    }

    const targetLang = languageMap[targetLanguage] || targetLanguage

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: `You are a professional translator specializing in legal and law enforcement contexts. Translate the following text to ${targetLang} while maintaining legal accuracy and respectful tone.`
        },
        {
          role: "user",
          content: `Translate this police interaction script to ${targetLang}:\n\n${text}`
        }
      ],
      temperature: 0.3,
      max_tokens: 500
    })

    return completion.choices[0]?.message?.content || text
  } catch (error) {
    handleOpenAIError(error, 'translate script')
  }
}

// Analyze incident report and provide insights
export const analyzeIncident = async (incidentData) => {
  try {
    const prompt = `Analyze this police interaction incident and provide helpful insights:

    Date: ${incidentData.date}
    Time: ${incidentData.time}
    Location: ${incidentData.location}
    Description: ${incidentData.description}
    Officer Badge: ${incidentData.officerBadge}
    Outcome: ${incidentData.outcome}

    Please provide:
    1. Key observations about the interaction
    2. Rights that may have been relevant
    3. Suggestions for similar future situations
    4. Any red flags or concerning elements
    5. Recommended follow-up actions

    Keep the analysis objective, educational, and supportive.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a civil rights expert who helps people understand their interactions with law enforcement. Provide educational, objective analysis."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.5,
      max_tokens: 1000
    })

    return completion.choices[0]?.message?.content
  } catch (error) {
    handleOpenAIError(error, 'analyze incident')
  }
}

// Generate state-specific legal information
export const generateStateInfo = async (stateCode, topic) => {
  try {
    const prompt = `Provide accurate, current legal information about ${topic} in ${stateCode} state.
    
    Focus on:
    - Specific state laws and regulations
    - How they differ from federal law
    - Practical implications for citizens
    - Recent changes or updates
    
    Keep the information factual, accessible, and actionable.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a legal researcher with expertise in state-specific laws. Provide accurate, current information with appropriate disclaimers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 800
    })

    return completion.choices[0]?.message?.content
  } catch (error) {
    handleOpenAIError(error, 'generate state information')
  }
}

// Generate emergency response suggestions
export const generateEmergencyResponse = async (situation, location) => {
  try {
    const prompt = `Generate appropriate emergency response guidance for this situation:
    
    Situation: ${situation}
    Location: ${location}
    
    Provide:
    1. Immediate safety steps
    2. Who to contact and when
    3. Information to gather/document
    4. Legal considerations
    5. Follow-up actions
    
    Prioritize safety and legal protection.`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are an emergency response expert who helps people navigate crisis situations safely and legally."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.4,
      max_tokens: 600
    })

    return completion.choices[0]?.message?.content
  } catch (error) {
    handleOpenAIError(error, 'generate emergency response')
  }
}

// Check if OpenAI is properly configured
export const isOpenAIConfigured = () => {
  return !!import.meta.env.VITE_OPENAI_API_KEY
}

// Test OpenAI connection
export const testOpenAIConnection = async () => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Hello, this is a connection test. Please respond with 'Connection successful'."
        }
      ],
      max_tokens: 10
    })

    return completion.choices[0]?.message?.content?.includes('successful') || false
  } catch (error) {
    console.error('OpenAI connection test failed:', error)
    return false
  }
}
