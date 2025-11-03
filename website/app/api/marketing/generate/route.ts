import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Check usage limits
    const currentMonth = new Date().toISOString().slice(0, 7)
    const { data: usage } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', currentMonth)
      .single()

    const { data: subscription } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single()

    const plan = subscription ? getPlanFromPriceId(subscription.price_id) : 'free'
    const limits = getPlanLimits(plan)

    if (limits.marketing_content !== -1 && usage && usage.marketing_content_used >= limits.marketing_content) {
      return NextResponse.json(
        { error: 'Monthly marketing content limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const { contentType, platform, bookTitle, genre, topic, tone } = await request.json()

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    let prompt = ''

    if (contentType === 'social') {
      const limits = {
        Twitter: '280 characters',
        Facebook: 'engaging and conversational',
        Instagram: 'with relevant hashtags',
        LinkedIn: 'professional tone'
      }

      prompt = `Create 3 different ${platform} posts about: "${topic}".
Tone: ${tone}.
Platform note: ${limits[platform as keyof typeof limits]}.
Make each variation unique and optimized for engagement.
Format: Just the post text, no labels.`
    } else if (contentType === 'email') {
      prompt = `Create 3 variations of an email ${platform.toLowerCase()} about: "${topic}".
Tone: ${tone}.
Each variation should include:
- Subject line
- Email body
- Call-to-action
Format: Subject: [subject]\n\n[body]`
    } else if (contentType === 'ad') {
      prompt = `Create 3 ${platform} ad copy variations about: "${topic}".
Tone: ${tone}.
Include:
- Headline (under 30 characters)
- Description (under 90 characters)
- Call-to-action
Format each as: Headline: [headline]\nDescription: [description]\nCTA: [cta]`
    } else if (contentType === 'description') {
      prompt = `Create 3 book description variations for "${bookTitle}" (${genre} genre).
Tone: ${tone}.
Format for ${platform}.
Each should be:
- Engaging hook in first sentence
- 2-3 paragraphs
- Compelling call-to-action
- Optimized for conversions`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert marketing copywriter. Create compelling, conversion-optimized content.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 1500,
    })

    const content = response.choices[0].message.content || ''

    // Split into variations
    const variations = content
      .split(/\n\n---+\n\n|\n\nVariation \d+:?\n\n/i)
      .filter(v => v.trim())
      .slice(0, 3)

    // Increment usage (count as 3 for the variations)
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'marketing_content',
      p_count: 3,
    })

    return NextResponse.json({ variations })
  } catch (error: any) {
    console.error('Marketing content generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Content generation failed' },
      { status: 500 }
    )
  }
}

function getPlanFromPriceId(priceId: string): string {
  if (priceId.includes('creator')) return 'creator'
  if (priceId.includes('professional')) return 'professional'
  return 'free'
}

function getPlanLimits(plan: string) {
  const limits = {
    free: { marketing_content: 0 },
    creator: { marketing_content: 20 },
    professional: { marketing_content: 100 },
  }
  return limits[plan as keyof typeof limits] || limits.free
}
