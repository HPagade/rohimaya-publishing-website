/**
 * Text Analysis Interface
 * Abstracts AI text analysis capabilities
 * Follows: Single Responsibility, Interface Segregation, Dependency Inversion
 */

export interface Chapter {
  number: number;
  title: string;
  startIndex: number;
  endIndex: number;
  content: string;
  wordCount: number;
}

export interface TextAnalysisResult {
  chapters: Chapter[];
  wordCount: number;
  pageCount: number;
  readingTime: number; // minutes
  readingLevel?: string;
  genre?: string;
  frontMatter?: {
    dedication?: string;
    foreword?: string;
    prologue?: string;
  };
  backMatter?: {
    epilogue?: string;
    acknowledgments?: string;
    about?: string;
  };
}

export interface AnalysisOptions {
  detectChapters?: boolean;
  analyzeGenre?: boolean;
  maxLength?: number; // Max characters to analyze
}

/**
 * Interface for text analysis providers
 * Can be implemented by OpenAI, Anthropic, Google, etc.
 */
export interface ITextAnalyzer {
  /**
   * Analyze manuscript text and extract structure
   */
  analyzeText(text: string, options?: AnalysisOptions): Promise<TextAnalysisResult>;

  /**
   * Detect chapters in manuscript
   */
  detectChapters(text: string): Promise<Chapter[]>;

  /**
   * Estimate reading time based on word count
   */
  estimateReadingTime(wordCount: number): number;

  /**
   * Check if the analyzer is properly configured
   */
  isConfigured(): boolean;

  /**
   * Get the provider name
   */
  getProviderName(): string;

  /**
   * Estimate cost for analysis
   */
  estimateCost(textLength: number): number;
}
