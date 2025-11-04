import Anthropic from '@anthropic-ai/sdk'
import OpenAI from 'openai'

// Claude/Anthropic client for Writer tool
export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

// OpenAI client for Format/Covers/Images (lazy-loaded to avoid build errors)
let _openai: OpenAI | null = null
export function getOpenAIClient(): OpenAI {
  if (!_openai) {
    _openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'placeholder',
    })
  }
  return _openai
}

export const openai = getOpenAIClient()

/**
 * Stream text generation from Claude Opus
 * @param prompt User prompt
 * @param systemPrompt System context
 * @param onChunk Callback for each chunk
 */
export async function streamClaudeResponse(
  prompt: string,
  systemPrompt: string,
  onChunk: (text: string) => void
): Promise<void> {
  const stream = anthropic.messages.stream({
    model: 'claude-3-opus-20240229',
    max_tokens: 4096,
    system: systemPrompt,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  for await (const event of stream) {
    if (
      event.type === 'content_block_delta' &&
      event.delta.type === 'text_delta'
    ) {
      onChunk(event.delta.text)
    }
  }
}

/**
 * Analyze writing style and tone using GPT-4
 * @param sampleText Sample manuscript text (at least 1000 words)
 * @returns Style profile object
 */
export async function analyzeWritingStyle(sampleText: string): Promise<{
  tone: string
  style: string
  complexity: string
  perspective: string
}> {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: 'You are a literary analyst. Analyze the writing style and return a JSON object with: tone, style, complexity, perspective.',
      },
      {
        role: 'user',
        content: `Analyze this writing sample:\n\n${sampleText.substring(0, 3000)}`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  return JSON.parse(response.choices[0].message.content || '{}')
}

/**
 * Generate book cover with DALL-E 3
 * @param prompt Cover description
 * @returns Image URL
 */
export async function generateCoverImage(prompt: string): Promise<string> {
  const response = await openai.images.generate({
    model: 'dall-e-3',
    prompt: prompt,
    n: 1,
    size: '1024x1792', // Portrait for book covers
    quality: 'hd',
  })

  return response.data?.[0]?.url || ''
}

/**
 * Rate limiting helper (prevents API abuse)
 */
export class RateLimiter {
  private requests: Map<string, number[]> = new Map()

  /**
   * Check if user has exceeded rate limit
   * @param userId User ID
   * @param limit Max requests per window
   * @param windowMs Time window in milliseconds
   * @returns true if allowed, false if rate limited
   */
  check(userId: string, limit: number, windowMs: number): boolean {
    const now = Date.now()
    const userRequests = this.requests.get(userId) || []
    
    // Remove old requests outside the window
    const recentRequests = userRequests.filter(time => now - time < windowMs)
    
    if (recentRequests.length >= limit) {
      return false // Rate limited
    }
    
    // Add current request
    recentRequests.push(now)
    this.requests.set(userId, recentRequests)
    
    return true // Allowed
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter()
