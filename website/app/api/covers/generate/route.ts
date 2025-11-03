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

    if (limits.covers !== -1 && usage && usage.covers_used >= limits.covers) {
      return NextResponse.json(
        { error: 'Monthly cover limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const coverData = await request.json()

    if (!coverData.title || !coverData.author) {
      return NextResponse.json({ error: 'Title and author are required' }, { status: 400 })
    }

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        type: 'cover',
        status: 'completed',
        title: coverData.title,
        progress: 100,
        result: {
          coverData,
          timestamp: new Date().toISOString(),
        },
      })
      .select()
      .single()

    if (jobError) throw jobError

    // In a production app, this would use Sharp or Canvas to composite the images
    // For now, we'll create placeholder URLs that point to a cover rendering service
    const jobId = job.id

    // Generate cover URLs (these would be actual rendered images in production)
    const frontCoverUrl = coverData.imageUrl || `/api/covers/render/front/${jobId}`
    const backCoverUrl = `/api/covers/render/back/${jobId}`
    const spineUrl = `/api/covers/render/spine/${jobId}`

    // Store cover data for rendering
    await supabase
      .from('jobs')
      .update({
        result: {
          ...job.result,
          frontCoverUrl,
          backCoverUrl,
          spineUrl,
        },
      })
      .eq('id', jobId)

    // Increment usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'covers',
    })

    return NextResponse.json({
      jobId,
      frontCoverUrl,
      backCoverUrl,
      spineUrl,
      message: 'Cover generated successfully',
    })
  } catch (error: any) {
    console.error('Cover generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Cover generation failed' },
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
    free: { covers: 0 },
    creator: { covers: 5 },
    professional: { covers: 20 },
  }
  return limits[plan as keyof typeof limits] || limits.free
}
