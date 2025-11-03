import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase/server'

/**
 * Export API - Generate PDF/EPUB from analyzed manuscript
 * POST /api/format/export
 * Body: { jobId: string, format: 'pdf' | 'epub' }
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()

    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { jobId, format } = await request.json()

    if (!jobId || !format) {
      return NextResponse.json({ error: 'Missing jobId or format' }, { status: 400 })
    }

    if (!['pdf', 'epub'].includes(format)) {
      return NextResponse.json({ error: 'Invalid format. Must be pdf or epub' }, { status: 400 })
    }

    // Fetch job data
    const { data: job, error: jobError } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', jobId)
      .eq('user_id', user.id)
      .single()

    if (jobError || !job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    if (job.status !== 'completed') {
      return NextResponse.json({ error: 'Job not completed yet' }, { status: 400 })
    }

    const result = job.result

    // Generate formatted content
    let fileContent: string
    let mimeType: string
    let filename: string

    if (format === 'pdf') {
      // For PDF, we'll generate HTML that can be converted to PDF on client-side
      // or use a service like jsPDF. For production, consider using Puppeteer or similar
      fileContent = generateFormattedHTML(result)
      mimeType = 'text/html'
      filename = `formatted-manuscript-${jobId}.html`
    } else {
      // EPUB generation
      fileContent = generateEPUB(result)
      mimeType = 'application/epub+zip'
      filename = `formatted-manuscript-${jobId}.epub`
    }

    // Update job with export timestamp
    await supabase
      .from('jobs')
      .update({
        updated_at: new Date().toISOString(),
        metadata: { ...job.metadata, lastExport: { format, timestamp: new Date().toISOString() } }
      })
      .eq('id', jobId)

    // Return file
    return new NextResponse(fileContent, {
      status: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    })

  } catch (error) {
    console.error('Export error:', error)
    return NextResponse.json(
      { error: 'Failed to generate export' },
      { status: 500 }
    )
  }
}

/**
 * Generate beautifully formatted HTML from analysis result
 */
function generateFormattedHTML(result: any): string {
  const { chapters, wordCount, pageCount, readingTime, frontMatter, backMatter } = result

  let html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formatted Manuscript</title>
  <style>
    @page {
      size: 6in 9in;
      margin: 0.75in 0.5in;
    }
    body {
      font-family: 'Georgia', 'Times New Roman', serif;
      font-size: 12pt;
      line-height: 1.6;
      color: #000;
      max-width: 6in;
      margin: 0 auto;
      padding: 0.75in 0.5in;
    }
    h1 {
      font-size: 24pt;
      margin-top: 2em;
      margin-bottom: 1em;
      page-break-before: always;
      text-align: center;
    }
    h1:first-of-type {
      page-break-before: avoid;
    }
    h2 {
      font-size: 18pt;
      margin-top: 1.5em;
      margin-bottom: 0.75em;
    }
    p {
      text-align: justify;
      margin-bottom: 1em;
      text-indent: 2em;
    }
    .front-matter, .back-matter {
      font-style: italic;
      page-break-after: always;
    }
    .chapter-title {
      font-size: 18pt;
      text-align: center;
      margin: 2em 0 1em 0;
    }
    .metadata {
      text-align: center;
      margin: 2em 0;
      font-size: 10pt;
      color: #666;
    }
    @media print {
      body { margin: 0; }
    }
  </style>
</head>
<body>
  <div class="metadata">
    <p>Word Count: ${wordCount.toLocaleString()} | Page Count: ${pageCount} | Reading Time: ${readingTime} minutes</p>
  </div>
`

  // Add front matter
  if (frontMatter?.dedication) {
    html += `  <div class="front-matter">
    <h2>Dedication</h2>
    <p style="text-indent: 0;">${frontMatter.dedication}</p>
  </div>\n`
  }

  if (frontMatter?.foreword) {
    html += `  <div class="front-matter">
    <h2>Foreword</h2>
    <p style="text-indent: 0;">${frontMatter.foreword}</p>
  </div>\n`
  }

  if (frontMatter?.prologue) {
    html += `  <div class="front-matter">
    <h2>Prologue</h2>
    ${formatParagraphs(frontMatter.prologue)}
  </div>\n`
  }

  // Add chapters
  chapters.forEach((chapter: any) => {
    html += `  <div class="chapter">
    <h1>Chapter ${chapter.number}</h1>
    ${chapter.title && chapter.title !== `Chapter ${chapter.number}` ? `<div class="chapter-title">${chapter.title}</div>` : ''}
    ${formatParagraphs(chapter.content)}
  </div>\n`
  })

  // Add back matter
  if (backMatter?.epilogue) {
    html += `  <div class="back-matter">
    <h2>Epilogue</h2>
    ${formatParagraphs(backMatter.epilogue)}
  </div>\n`
  }

  if (backMatter?.acknowledgments) {
    html += `  <div class="back-matter">
    <h2>Acknowledgments</h2>
    <p style="text-indent: 0;">${backMatter.acknowledgments}</p>
  </div>\n`
  }

  if (backMatter?.about) {
    html += `  <div class="back-matter">
    <h2>About the Author</h2>
    <p style="text-indent: 0;">${backMatter.about}</p>
  </div>\n`
  }

  html += `</body>
</html>`

  return html
}

/**
 * Format text content into paragraphs
 */
function formatParagraphs(text: string): string {
  return text
    .split('\n\n')
    .filter(p => p.trim())
    .map(p => `    <p>${p.trim()}</p>`)
    .join('\n')
}

/**
 * Generate EPUB format (simplified - for production use epub-gen or similar)
 */
function generateEPUB(result: any): string {
  const { chapters, frontMatter, backMatter } = result

  // This is a simplified version. For production, use a library like epub-gen
  let content = '<?xml version="1.0" encoding="UTF-8"?>\n'
  content += '<package xmlns="http://www.idpf.org/2007/opf" version="3.0">\n'
  content += '  <metadata>\n'
  content += '    <dc:title>Formatted Manuscript</dc:title>\n'
  content += '    <dc:language>en</dc:language>\n'
  content += '  </metadata>\n'
  content += '  <manifest>\n'

  chapters.forEach((chapter: any, index: number) => {
    content += `    <item id="chapter${index + 1}" href="chapter${index + 1}.xhtml" media-type="application/xhtml+xml"/>\n`
  })

  content += '  </manifest>\n'
  content += '  <spine>\n'

  chapters.forEach((_: any, index: number) => {
    content += `    <itemref idref="chapter${index + 1}"/>\n`
  })

  content += '  </spine>\n'
  content += '</package>'

  return content
}
