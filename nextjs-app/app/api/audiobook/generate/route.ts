import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { OpenAITextAnalyzer } from '@/lib/ai/OpenAITextAnalyzer'
import { parseDocument } from '@/lib/parsers'
import OpenAI from 'openai'

function getOpenAIClient(): OpenAI {
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
}

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

    if (limits.audiobooks !== -1 && usage && usage.audiobooks_used >= limits.audiobooks) {
      return NextResponse.json({ error: 'Monthly audiobook limit reached. Please upgrade your plan.' }, { status: 403 })
    }

    // Parse request
    const formData = await request.formData()
    const file = formData.get('file') as File
    const textContent = formData.get('text') as string
    const voice = formData.get('voice') as string
    const speed = parseFloat(formData.get('speed') as string)
    const selectedChapters = JSON.parse(formData.get('chapters') as string)

    let text: string

    if (file) {
      text = await parseDocument(file)
    } else if (textContent) {
      text = textContent
    } else {
      return NextResponse.json({ error: 'No file or text provided' }, { status: 400 })
    }

    // Analyze to get chapters
    const analyzer = new OpenAITextAnalyzer()
    const analysis = await analyzer.analyzeText(text, { detectChapters: true })

    // Filter selected chapters
    const chaptersToGenerate = analysis.chapters.filter((ch) =>
      selectedChapters.includes(ch.number)
    )

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        type: 'audiobook',
        status: 'processing',
        chapter_count: chaptersToGenerate.length,
        progress: 0,
        metadata: {
          voice,
          speed,
          chapters: chaptersToGenerate.map((ch) => ({ number: ch.number, title: ch.title })),
        },
      })
      .select()
      .single()

    if (jobError) throw jobError

    // Generate audiobook chapters asynchronously
    generateAudioChapters(job.id, text, chaptersToGenerate, voice, speed, user.id)

    return NextResponse.json({
      jobId: job.id,
      message: 'Audiobook generation started',
      estimatedTime: Math.ceil(chaptersToGenerate.length * 30), // ~30 seconds per chapter
    })
  } catch (error: any) {
    console.error('Generation error:', error)
    return NextResponse.json({ error: error.message || 'Generation failed' }, { status: 500 })
  }
}

/**
 * Generate audio for each chapter (runs asynchronously)
 */
async function generateAudioChapters(
  jobId: string,
  fullText: string,
  chapters: any[],
  voice: string,
  speed: number,
  userId: string
) {
  const supabase = createServerClient()
  const openai = getOpenAIClient()

  try {
    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i]
      const chapterText = fullText.substring(chapter.startIndex, chapter.endIndex)

      // Generate audio using OpenAI TTS
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1-hd', // High-quality model
        voice: voice as any,
        input: chapterText,
        speed,
      })

      const buffer = Buffer.from(await mp3.arrayBuffer())

      // Upload to Supabase Storage
      const fileName = `${jobId}/chapter-${chapter.number}.mp3`
      const { error: uploadError } = await supabase.storage
        .from('audiobooks')
        .upload(fileName, buffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        })

      if (uploadError) {
        console.error('Upload error:', uploadError)
        continue
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('audiobooks')
        .getPublicUrl(fileName)

      // Update job progress
      await supabase
        .from('jobs')
        .update({
          progress: Math.round(((i + 1) / chapters.length) * 100),
          result: {
            chapters: chapters.slice(0, i + 1).map((ch, idx) => ({
              number: ch.number,
              title: ch.title,
              audioUrl: idx === i ? urlData.publicUrl : null,
            })),
          },
        })
        .eq('id', jobId)
    }

    // Mark as completed
    await supabase
      .from('jobs')
      .update({
        status: 'completed',
        progress: 100,
      })
      .eq('id', jobId)

    // Increment usage
    const currentMonth = new Date().toISOString().slice(0, 7)
    await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_feature: 'audiobooks',
      p_count: chapters.length,
    })
  } catch (error) {
    console.error('Audio generation failed:', error)
    await supabase
      .from('jobs')
      .update({ status: 'failed' })
      .eq('id', jobId)
  }
}

function getPlanFromPriceId(priceId: string): string {
  if (priceId.includes('creator')) return 'creator'
  if (priceId.includes('professional')) return 'professional'
  return 'free'
}

function getPlanLimits(plan: string) {
  const limits = {
    free: { audiobooks: 1 },
    creator: { audiobooks: 10 },
    professional: { audiobooks: -1 }, // unlimited
  }
  return limits[plan as keyof typeof limits] || limits.free
}
