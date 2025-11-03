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

    if (limits.images !== -1 && usage && usage.images_used >= limits.images) {
      return NextResponse.json(
        { error: 'Monthly image limit reached. Please upgrade your plan.' },
        { status: 403 }
      )
    }

    const { description, style, size } = await request.json()

    if (!description) {
      return NextResponse.json({ error: 'Description is required' }, { status: 400 })
    }

    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    // Map styles to DALL-E friendly prompts
    const styleModifiers = {
      realistic: 'photorealistic, high detail, professional photography',
      illustration: 'digital illustration, modern art, vibrant',
      watercolor: 'watercolor painting, soft artistic style',
      cartoon: 'cartoon style, animated, colorful',
      sketch: 'pencil sketch, hand-drawn artistic style',
      vintage: 'vintage art, classic style, nostalgic',
    }

    // Map sizes
    const sizeMap = {
      square: '1024x1024',
      portrait: '1024x1792',
      landscape: '1792x1024',
    }

    const fullPrompt = `${description}. ${
      styleModifiers[style as keyof typeof styleModifiers] || ''
    }`

    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: fullPrompt,
      n: 1,
      size: (sizeMap[size as keyof typeof sizeMap] || '1024x1024') as '1024x1024' | '1024x1792' | '1792x1024',
      quality: 'hd',
    })

    const imageUrl = response.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI')
    }

    // Download and upload to Supabase Storage
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

    const fileName = `images/${user.id}/${Date.now()}-${style}-${size}.png`
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('covers') // Reuse covers bucket for now
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    let finalUrl = imageUrl

    if (!uploadError) {
      const { data: urlData } = supabase.storage.from('covers').getPublicUrl(fileName)
      finalUrl = urlData.publicUrl
    }

    // Increment usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'images',
    })

    return NextResponse.json({ imageUrl: finalUrl })
  } catch (error: any) {
    console.error('Image generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Image generation failed' },
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
    free: { images: 0 },
    creator: { images: 10 },
    professional: { images: 50 },
  }
  return limits[plan as keyof typeof limits] || limits.free
}
