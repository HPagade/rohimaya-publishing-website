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

    if (limits.health_content !== -1 && usage && usage.health_content_used >= limits.health_content) {
      return NextResponse.json(
        { error: 'Monthly health content limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const { contentType, workoutLevel, workoutType, mealGoal, calories, articleTopic, articleLength } = await request.json()

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    let prompt = ''

    if (contentType === 'workout') {
      prompt = `Create a comprehensive ${workoutLevel} level ${workoutType} workout plan. Include:
- 5-6 exercises
- Sets and reps for each
- Rest periods
- Form tips
- Progression advice
- Estimated duration`
    } else if (contentType === 'meal') {
      prompt = `Create a ${mealGoal} meal plan with ${calories} calories per day. Include:
- Breakfast, lunch, dinner, and 2 snacks
- Macronutrient breakdown
- Portion sizes
- Shopping list
- Meal prep tips`
    } else if (contentType === 'article') {
      prompt = `Write a ${articleLength}-word health and wellness article about: "${articleTopic}".
Make it evidence-based, engaging, and SEO-optimized. Include:
- Introduction with hook
- 3-4 main sections with subheadings
- Practical tips
- Scientific references
- Conclusion with call-to-action
- Medical disclaimer at the end`
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a certified health and fitness professional. Create evidence-based, accurate, and practical health content.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const content = response.choices[0].message.content || ''

    // Increment usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'health_content',
    })

    return NextResponse.json({ content, contentType })
  } catch (error: any) {
    console.error('Health content generation error:', error)
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
    free: { health_content: 0 },
    creator: { health_content: 10 },
    professional: { health_content: 50 },
  }
  return limits[plan as keyof typeof limits] || limits.free
}
