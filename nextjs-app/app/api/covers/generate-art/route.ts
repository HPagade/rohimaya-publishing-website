import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import OpenAI from 'openai'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { title, subtitle, genre, style, colorScheme } = await request.json()
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }

    // Build DALL-E prompt based on inputs
    const styleDescriptions = {
      minimalist: 'minimalist design with clean lines and simple shapes',
      vintage: 'vintage aesthetic with nostalgic, classic elements',
      modern: 'modern and contemporary with bold geometric shapes',
      artistic: 'artistic and creative with expressive, painterly style',
      professional: 'professional and sleek with business-like elegance',
      dramatic: 'dramatic with high contrast and intense visual impact',
    }

    const colorDescriptions = {
      vibrant: 'vibrant, bold colors',
      dark: 'dark, moody atmosphere with deep tones',
      pastel: 'soft pastel colors',
      earth: 'warm earth tones',
      ocean: 'cool ocean blues and teals',
      sunset: 'warm sunset colors',
    }

    const prompt = `Professional book cover art for "${title}"${
      subtitle ? ` - ${subtitle}` : ''
    }. Genre: ${genre}. Style: ${
      styleDescriptions[style as keyof typeof styleDescriptions]
    }. Colors: ${
      colorDescriptions[colorScheme as keyof typeof colorDescriptions]
    }. Create an eye-catching, professional book cover design that would work well in bookstores. High quality, publishable artwork. No text or titles, just the visual artwork.`

    // Generate image with DALL-E 3
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1792', // Portrait orientation for book covers
      quality: 'hd',
    })

    const imageUrl = response.data?.[0]?.url

    if (!imageUrl) {
      throw new Error('No image URL returned from OpenAI')
    }

    // Download the image and upload to Supabase Storage
    const imageResponse = await fetch(imageUrl)
    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())

    const fileName = `covers/${user.id}/${Date.now()}-cover-art.png`
    const { error: uploadError, data: uploadData } = await supabase.storage
      .from('covers')
      .upload(fileName, imageBuffer, {
        contentType: 'image/png',
        upsert: true,
      })

    if (uploadError) {
      console.error('Upload error:', uploadError)
      // Return the temporary OpenAI URL if upload fails
      return NextResponse.json({ imageUrl })
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from('covers').getPublicUrl(fileName)

    return NextResponse.json({ imageUrl: urlData.publicUrl })
  } catch (error: any) {
    console.error('Cover art generation error:', error)
    return NextResponse.json(
      { error: error.message || 'Cover art generation failed' },
      { status: 500 }
    )
  }
}
