import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { streamClaudeResponse, rateLimiter } from '@/lib/llm'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    // P0: Authentication check
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Rate limiting (10 requests per minute per user)
    if (!rateLimiter.check(userId, 10, 60000)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before making more requests.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { prompt, manuscriptContext, styleProfile } = body

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 })
    }

    // Build system prompt with style profile if available
    let systemPrompt = 'You are a creative writing assistant helping an author write their novel. Generate engaging, well-written prose that continues the story naturally.'
    
    if (styleProfile) {
      systemPrompt += `\n\nThe author's writing style: ${JSON.stringify(styleProfile)}`
      systemPrompt += '\n\nMatch this style, tone, and perspective in your generation.'
    }

    if (manuscriptContext) {
      systemPrompt += `\n\nCurrent manuscript context:\n${manuscriptContext}`
    }

    // Stream response using Server-Sent Events
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          await streamClaudeResponse(
            prompt,
            systemPrompt,
            (chunk) => {
              const data = `data: ${JSON.stringify({ text: chunk })}\n\n`
              controller.enqueue(encoder.encode(data))
            }
          )
          
          // Send completion signal
          controller.enqueue(encoder.encode('data: [DONE]\n\n'))
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Writer API error:', error)
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    )
  }
}
