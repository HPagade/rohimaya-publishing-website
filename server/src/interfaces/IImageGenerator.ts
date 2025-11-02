/**
 * Image Generation Interface
 * Abstracts AI image generation capabilities
 * Follows: Single Responsibility, Interface Segregation, Dependency Inversion
 */

export interface ImageGenerationOptions {
  prompt: string;
  style?: string;
  size?: '1024x1024' | '1024x1792' | '1792x1024' | '512x512';
  quality?: 'standard' | 'hd';
  negativePrompt?: string; // What NOT to include
  seed?: number; // For reproducibility
}

export interface ImageResult {
  url: string;
  width: number;
  height: number;
  format: string;
  cost?: number;
  seed?: number;
}

export interface CoverGenerationOptions extends ImageGenerationOptions {
  title: string;
  author: string;
  genre: string;
  description?: string;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  promptModifier: string;
}

/**
 * Interface for image generation providers
 * Can be implemented by DALL-E, Midjourney, Stability AI, etc.
 */
export interface IImageGenerator {
  /**
   * Generate a single image
   */
  generateImage(options: ImageGenerationOptions): Promise<ImageResult>;

  /**
   * Generate multiple variations
   */
  generateBatch(options: ImageGenerationOptions, count: number): Promise<ImageResult[]>;

  /**
   * Generate book cover (specialized)
   */
  generateCover(options: CoverGenerationOptions): Promise<ImageResult>;

  /**
   * Get available style presets
   */
  getStylePresets(): Promise<StylePreset[]>;

  /**
   * Estimate cost for image generation
   */
  estimateCost(options: ImageGenerationOptions, count?: number): number;

  /**
   * Check if the generator is properly configured
   */
  isConfigured(): boolean;

  /**
   * Get the provider name
   */
  getProviderName(): string;

  /**
   * Get supported sizes
   */
  getSupportedSizes(): string[];
}
