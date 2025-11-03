import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { jobId: string } }
) {
  try {
    const supabase = createServerClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { jobId } = params

    const { data: job, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (error || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    // Get audio URLs from storage
    let chapters = []
    if (job.result?.chapters) {
      chapters = job.result.chapters.map((ch: any) => ({
        id: `${jobId}-${ch.number}`,
        chapter: ch.number,
        title: ch.title,
        status: ch.audioUrl ? 'completed' : 'processing',
        audioUrl: ch.audioUrl,
      }))
    }

    return NextResponse.json({
      status: job.status,
      progress: job.progress,
      chapters,
    })
  } catch (error: any) {
    console.error('Status check error:', error)
    return NextResponse.json({ error: error.message || 'Status check failed' }, { status: 500 })
  }
}
