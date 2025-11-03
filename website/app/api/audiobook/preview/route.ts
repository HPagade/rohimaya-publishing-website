import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { text, voice, speed } = await request.json()

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 })
    }

    // Generate preview audio (max 100 words)
    const previewText = text.split(' ').slice(0, 100).join(' ')

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice || 'nova',
      input: previewText,
      speed: speed || 1.0,
    })

    const buffer = Buffer.from(await mp3.arrayBuffer())

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Disposition': 'inline; filename="preview.mp3"',
      },
    })
  } catch (error: any) {
    console.error('Preview generation error:', error)
    return NextResponse.json({ error: error.message || 'Preview generation failed' }, { status: 500 })
  }
}
