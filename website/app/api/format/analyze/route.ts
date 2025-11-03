import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { OpenAITextAnalyzer } from '@/lib/ai/OpenAITextAnalyzer'
import { parseDocument } from '@/lib/parsers'
import type { Chapter } from '@/lib/ai/OpenAITextAnalyzer'

export async function POST(request: NextRequest) {
  try {
    // Check auth
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Check usage limits
    const { data: usage } = await supabase
      .from('usage')
      .select('*')
      .eq('user_id', user.id)
      .eq('month', new Date().toISOString().slice(0, 7))
      .single()

    const { data: subscription } = await supabase
      .from('user_subscription_details')
      .select('*')
      .eq('clerk_id', user.id)
      .single()

    if (usage && subscription && subscription.formats_per_month !== null &&
        usage.formats_used >= subscription.formats_per_month) {
      return NextResponse.json({ error: 'Monthly format limit reached' }, { status: 403 })
    }

    // Parse form data
    const formData = await request.formData()
    const file = formData.get('file') as File
    const title = formData.get('title') as string
    const author = formData.get('author') as string

    if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 })

    // Parse document
    const text = await parseDocument(file)

    // Analyze with AI
    const analyzer = new OpenAITextAnalyzer()
    const analysis = await analyzer.analyzeText(text, {
      detectChapters: true,
      analyzeGenre: true
    })

    // Create job record
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .insert({
        user_id: user.id,
        type: 'format',
        status: 'completed',
        title,
        author,
        word_count: analysis.wordCount,
        chapter_count: analysis.chapters.length,
        progress: 100
      })
      .select()
      .single()

    if (jobError) throw jobError

    // Increment usage
    await supabase.rpc('increment_usage', {
      p_user_id: user.id,
      p_feature: 'formats'
    })

    // Store analysis in temporary storage
    const { error: storageError } = await supabase
      .storage
      .from('temp')
      .upload(`${job.id}/analysis.json`, JSON.stringify({ text, analysis }), {
        contentType: 'application/json'
      })

    if (storageError) console.error('Storage error:', storageError)

    return NextResponse.json({
      jobId: job.id,
      chapters: analysis.chapters.map((ch: Chapter) => ({
        title: ch.title,
        wordCount: ch.wordCount
      })),
      wordCount: analysis.wordCount,
      pageCount: analysis.pageCount,
      readingTime: analysis.readingTime
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 })
  }
}
