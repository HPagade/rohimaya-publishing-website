import OpenAI from 'openai'

export interface Chapter {
  number: number
  title: string
  startIndex: number
  endIndex: number
  wordCount: number
}

export interface TextAnalysisResult {
  chapters: Chapter[]
  wordCount: number
  pageCount: number
  readingTime: number
  genre?: string
  readingLevel?: string
}

export class OpenAITextAnalyzer {
  private client: OpenAI

  constructor() {
    this.client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  }

  async analyzeText(text: string, options?: { detectChapters?: boolean; analyzeGenre?: boolean }): Promise<TextAnalysisResult> {
    try {
      // Use GPT-4 for analysis (first 15k chars)
      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Analyze this manuscript. Return JSON with: chapters (array with title, startIndex, wordCount), genre, readingLevel'
          },
          { role: 'user', content: text.substring(0, 15000) }
        ],
        temperature: 0.3,
        max_tokens: 2000
      })

      const analysis = this.parseResponse(response.choices[0].message.content || '')

      return {
        chapters: analysis.chapters.length > 0 ? analysis.chapters : this.detectChaptersRegex(text),
        wordCount: text.split(/\s+/).length,
        pageCount: Math.ceil(text.split(/\s+/).length / 250),
        readingTime: Math.ceil(text.split(/\s+/).length / 200),
        genre: analysis.genre,
        readingLevel: analysis.readingLevel
      }
    } catch (error) {
      // Fallback to regex
      return {
        chapters: this.detectChaptersRegex(text),
        wordCount: text.split(/\s+/).length,
        pageCount: Math.ceil(text.split(/\s+/).length / 250),
        readingTime: Math.ceil(text.split(/\s+/).length / 200)
      }
    }
  }

  private parseResponse(content: string) {
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/)
      if (jsonMatch) return JSON.parse(jsonMatch[0])
    } catch (e) { }
    return { chapters: [], genre: 'Unknown', readingLevel: 'Unknown' }
  }

  private detectChaptersRegex(text: string): Chapter[] {
    const chapters: Chapter[] = []
    const regex = /chapter\s+(\d+)[:\s]+([^\n]+)/gi
    let match
    let chapterNum = 1

    while ((match = regex.exec(text)) !== null) {
      const startIndex = match.index
      const endIndex = chapters.length > 0 ? startIndex : text.length
      if (chapters.length > 0) chapters[chapters.length - 1].endIndex = startIndex

      chapters.push({
        number: chapterNum++,
        title: match[0],
        startIndex,
        endIndex: text.length,
        wordCount: 0
      })
    }

    if (chapters.length === 0) {
      chapters.push({
        number: 1,
        title: 'Chapter 1',
        startIndex: 0,
        endIndex: text.length,
        wordCount: text.split(/\s+/).length
      })
    }

    // Calculate word counts
    chapters.forEach((ch, i) => {
      const chapterText = text.substring(ch.startIndex, ch.endIndex)
      ch.wordCount = chapterText.split(/\s+/).length
    })

    return chapters
  }
}
