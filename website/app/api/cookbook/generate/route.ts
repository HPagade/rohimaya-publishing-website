import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

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

    if (limits.cookbooks !== -1 && usage && usage.cookbooks_used >= limits.cookbooks) {
      return NextResponse.json(
        { error: 'Monthly cookbook limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const { title, author, recipes, layoutStyle } = await request.json()

    if (!title || !author || !recipes || recipes.length === 0) {
      return NextResponse.json({ error: 'Title, author, and at least one recipe required' }, { status: 400 })
    }

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        type: 'cookbook',
        status: 'completed',
        title,
        progress: 100,
        result: {
          title,
          author,
          recipeCount: recipes.length,
          layoutStyle,
          timestamp: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (jobError) throw jobError

    // In production, this would generate actual PDF
    // For now, return a download URL
    const downloadUrl = `/api/cookbook/download/${job.id}`

    // Increment usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'cookbooks',
    })

    return NextResponse.json({
      jobId: job.id,
      downloadUrl,
      message: 'Cookbook generated successfully',
    })
  } catch (error: any) {
    console.error('Cookbook generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Cookbook generation failed' },
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
    free: { cookbooks: 0 },
    creator: { cookbooks: 5 },
    professional: { cookbooks: 20 },
  }
  return limits[plan as keyof typeof limits] || limits.free
}
