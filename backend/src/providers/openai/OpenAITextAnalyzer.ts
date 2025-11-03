/**
 * OpenAI Text Analyzer Implementation
 * Implements ITextAnalyzer interface
 * Follows: Single Responsibility, Open/Closed, Liskov Substitution
 */

import OpenAI from 'openai';
import {
  ITextAnalyzer,
  TextAnalysisResult,
  Chapter,
  AnalysisOptions
} from '../../interfaces/ITextAnalyzer';

export class OpenAITextAnalyzer implements ITextAnalyzer {
  private client: OpenAI | null = null;
  private readonly providerName = 'OpenAI';

  constructor(apiKey?: string) {
    if (apiKey || process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: apiKey || process.env.OPENAI_API_KEY
      });
    }
  }

  /**
   * Analyze manuscript text using GPT-4
   */
  async analyzeText(
    text: string,
    options: AnalysisOptions = {}
  ): Promise<TextAnalysisResult> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      detectChapters = true,
      analyzeGenre = true,
      maxLength = 15000
    } = options;

    try {
      console.log(`🤖 Analyzing manuscript with ${this.providerName}...`);

      const truncatedText = text.substring(0, maxLength);
      const wordCount = this.countWords(text);

      // Use GPT-4 for analysis
      const response = await this.client!.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: this.getSystemPrompt(detectChapters, analyzeGenre)
          },
          {
            role: 'user',
            content: truncatedText
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const analysis = this.parseResponse(response.choices[0].message.content || '');

      // If AI analysis failed, fallback to regex
      const chapters = analysis.chapters.length > 0
        ? analysis.chapters
        : await this.detectChapters(text);

      return {
        chapters,
        wordCount,
        pageCount: Math.ceil(wordCount / 250), // ~250 words per page
        readingTime: this.estimateReadingTime(wordCount),
        readingLevel: analysis.readingLevel,
        genre: analysis.genre,
        frontMatter: analysis.frontMatter,
        backMatter: analysis.backMatter
      };
    } catch (error: any) {
      console.error(`❌ ${this.providerName} API Error:`, error.message);

      // Fallback to regex-based analysis
      console.log('⚠️  Falling back to regex-based chapter detection');
      return this.fallbackAnalysis(text);
    }
  }

  /**
   * Detect chapters using AI or regex fallback
   */
  async detectChapters(text: string): Promise<Chapter[]> {
    if (!this.isConfigured()) {
      return this.regexDetectChapters(text);
    }

    try {
      const response = await this.client!.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Extract chapter titles and their positions from this manuscript. Return as JSON array.'
          },
          {
            role: 'user',
            content: text.substring(0, 15000)
          }
        ],
        temperature: 0.3
      });

      const chapters = this.parseChapters(response.choices[0].message.content || '', text);
      return chapters.length > 0 ? chapters : this.regexDetectChapters(text);
    } catch (error) {
      return this.regexDetectChapters(text);
    }
  }

  /**
   * Estimate reading time based on word count
   */
  estimateReadingTime(wordCount: number): number {
    return Math.ceil(wordCount / 200); // 200 words per minute average
  }

  /**
   * Check if analyzer is configured
   */
  isConfigured(): boolean {
    return this.client !== null;
  }

  /**
   * Get provider name
   */
  getProviderName(): string {
    return this.providerName;
  }

  /**
   * Estimate cost for analysis
   * GPT-4: ~$0.03 per 1K tokens (input) + $0.06 per 1K tokens (output)
   */
  estimateCost(textLength: number): number {
    const inputTokens = textLength / 4; // ~4 chars per token
    const outputTokens = 2000; // Max tokens we request
    const inputCost = (inputTokens / 1000) * 0.03;
    const outputCost = (outputTokens / 1000) * 0.06;
    return inputCost + outputCost;
  }

  // ======================
  // PRIVATE HELPER METHODS
  // ======================

  private getSystemPrompt(detectChapters: boolean, analyzeGenre: boolean): string {
    let prompt = 'You are an expert book analyzer. Analyze this manuscript and return a JSON object with:\n';

    if (detectChapters) {
      prompt += '- "chapters": array of {title, startIndex, content}\n';
    }
    if (analyzeGenre) {
      prompt += '- "genre": detected genre\n';
      prompt += '- "readingLevel": reading difficulty level\n';
    }

    prompt += '- "frontMatter": {dedication, foreword, prologue}\n';
    prompt += '- "backMatter": {epilogue, acknowledgments, about}\n';

    return prompt;
  }

  private parseResponse(content: string): any {
    try {
      // Try to extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      return {};
    } catch (error) {
      console.error('Failed to parse AI response:', error);
      return {};
    }
  }

  private parseChapters(content: string, fullText: string): Chapter[] {
    try {
      const data = JSON.parse(content);
      if (Array.isArray(data.chapters)) {
        return data.chapters.map((ch: any, index: number) => ({
          number: index + 1,
          title: ch.title || `Chapter ${index + 1}`,
          startIndex: ch.startIndex || 0,
          endIndex: ch.endIndex || fullText.length,
          content: ch.content || '',
          wordCount: this.countWords(ch.content || '')
        }));
      }
    } catch (error) {
      // Fall through to return empty array
    }
    return [];
  }

  /**
   * Regex-based chapter detection (fallback)
   */
  private regexDetectChapters(text: string): Chapter[] {
    const chapters: Chapter[] = [];

    // Multiple regex patterns to catch different chapter formats
    const patterns = [
      /chapter\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)[:\s]+([^\n]+)/gi,
      /^(\d+)\.\s+([^\n]+)/gm,
      /^[IVX]+\.\s+([^\n]+)/gm
    ];

    let matches: RegExpMatchArray[] = [];
    for (const pattern of patterns) {
      const found = Array.from(text.matchAll(pattern));
      if (found.length > 0) {
        matches = found;
        break;
      }
    }

    if (matches.length === 0) {
      // No chapters found, treat entire text as one chapter
      return [{
        number: 1,
        title: 'Chapter 1',
        startIndex: 0,
        endIndex: text.length,
        content: text,
        wordCount: this.countWords(text)
      }];
    }

    matches.forEach((match, index) => {
      const startIndex = match.index || 0;
      const endIndex = index < matches.length - 1
        ? (matches[index + 1].index || text.length)
        : text.length;

      const chapterText = text.substring(startIndex, endIndex).trim();

      chapters.push({
        number: index + 1,
        title: match[0].trim(),
        startIndex,
        endIndex,
        content: chapterText,
        wordCount: this.countWords(chapterText)
      });
    });

    return chapters;
  }

  /**
   * Fallback analysis when API fails
   */
  private fallbackAnalysis(text: string): TextAnalysisResult {
    const wordCount = this.countWords(text);
    const chapters = this.regexDetectChapters(text);

    return {
      chapters,
      wordCount,
      pageCount: Math.ceil(wordCount / 250),
      readingTime: this.estimateReadingTime(wordCount),
      readingLevel: 'Unknown',
      genre: 'Unknown'
    };
  }

  /**
   * Count words in text
   */
  private countWords(text: string): number {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  }
}
