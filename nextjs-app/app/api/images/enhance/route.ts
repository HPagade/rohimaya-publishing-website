import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { description, style } = await request.json()

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const styleDescriptions = {
      realistic: 'photorealistic, highly detailed, professional photography quality',
      illustration: 'digital illustration, modern art style, vibrant colors',
      watercolor: 'watercolor painting, soft edges, artistic, flowing colors',
      cartoon: 'cartoon style, animated, fun and colorful',
      sketch: 'pencil sketch, hand-drawn, artistic line work',
      vintage: 'vintage art style, classic, nostalgic aesthetic',
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert at writing DALL-E image generation prompts. You take simple descriptions and enhance them to be detailed, specific, and optimized for beautiful image generation. Keep prompts under 400 characters.',
        },
        {
          role: 'user',
          content: `Enhance this image description for DALL-E generation. Style: ${style} (${
            styleDescriptions[style as keyof typeof styleDescriptions]
          }). Original description: "${description}". Make it detailed and specific while keeping the core idea.`,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    const enhancedPrompt = response.choices[0].message.content?.trim() || description

    return NextResponse.json({ enhancedPrompt })
  } catch (error: any) {
    console.error('Enhancement error:', error)
    return NextResponse.json(
      { error: error.message || 'Enhancement failed' },
      { status: 500 }
    )
  }
}
