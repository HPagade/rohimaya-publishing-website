import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { field, currentText, genre, context } = await request.json()
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    let prompt = ''

    switch (field) {
      case 'title':
        prompt = `You are a bestselling author and book marketing expert. ${
          currentText
            ? `Improve this book title to make it more compelling and marketable: "${currentText}"`
            : `Generate a compelling book title for a ${genre} book`
        }. Return only the improved title, nothing else.`
        break

      case 'subtitle':
        prompt = `You are a book marketing expert. Generate a compelling subtitle for a ${genre} book titled "${context.title}". ${
          currentText ? `Improve on this: "${currentText}"` : ''
        }. The subtitle should clarify the book's value. Return only the subtitle, nothing else.`
        break

      case 'tagline':
        prompt = `You are a book marketing expert. Generate a short, powerful tagline (5-10 words) for a ${genre} book titled "${context.title}". ${
          currentText ? `Improve on this: "${currentText}"` : ''
        }. Make it memorable and intriguing. Return only the tagline, nothing else.`
        break

      case 'blurb':
        prompt = `You are a bestselling author and book marketing expert. ${
          currentText
            ? `Rewrite and improve this back cover blurb to make it more compelling and professional: "${currentText}"`
            : `Write a compelling back cover blurb (100-150 words) for a ${genre} book titled "${context.title}" by ${context.author}`
        }. The blurb should hook readers immediately, create intrigue, and make them want to buy the book. Use professional copywriting techniques. Return only the blurb text, nothing else.`
        break

      default:
        return NextResponse.json({ error: 'Invalid field' }, { status: 400 })
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert book marketing copywriter with deep knowledge of what makes books sell. You write compelling, professional copy that converts browsers into buyers.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 500,
    })

    const optimizedText = response.choices[0].message.content?.trim() || ''

    // Remove quotes if AI added them
    const cleanedText = optimizedText.replace(/^["']|["']$/g, '')

    return NextResponse.json({ optimizedText: cleanedText })
  } catch (error: any) {
    console.error('Optimization error:', error)
    return NextResponse.json({ error: error.message || 'Optimization failed' }, { status: 500 })
  }
}
