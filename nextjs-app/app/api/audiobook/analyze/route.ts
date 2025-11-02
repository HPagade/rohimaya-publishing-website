import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'
import { OpenAITextAnalyzer } from '@/lib/ai/OpenAITextAnalyzer'
import { parseDocument } from '@/lib/parsers'

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await request.formData()
    const file = formData.get('file') as File
    const textContent = formData.get('text') as string

    let text: string

    if (file) {
      text = await parseDocument(file)
    } else if (textContent) {
      text = textContent
    } else {
      return NextResponse.json({ error: 'No file or text provided' }, { status: 400 })
    }

    // Analyze with AI
    const analyzer = new OpenAITextAnalyzer()
    const analysis = await analyzer.analyzeText(text, {
      detectChapters: true,
    })

    return NextResponse.json({
      chapters: analysis.chapters,
      wordCount: analysis.wordCount,
      estimatedDuration: Math.ceil(analysis.wordCount / 150), // ~150 words per minute
    })
  } catch (error: any) {
    console.error('Analysis error:', error)
    return NextResponse.json({ error: error.message || 'Analysis failed' }, { status: 500 })
  }
}
