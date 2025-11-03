/**
 * Audio Generation Interface
 * Abstracts text-to-speech capabilities
 * Follows: Single Responsibility, Interface Segregation, Dependency Inversion
 */

export interface Voice {
  id: string;
  name: string;
  gender: 'male' | 'female' | 'neutral';
  language: string;
  description: string;
  previewUrl?: string;
}

export interface AudioGenerationOptions {
  text: string;
  voice: string;
  speed?: number; // 0.25 to 4.0
  format?: 'mp3' | 'wav' | 'opus';
  quality?: 'standard' | 'high';
}

export interface AudioResult {
  url: string;
  duration: number; // seconds
  size: number; // bytes
  format: string;
  cost?: number;
}

export interface AudioChapter {
  chapterNumber: number;
  title: string;
  audioUrl: string;
  duration: number;
}

/**
 * Interface for audio generation providers
 * Can be implemented by OpenAI TTS, ElevenLabs, Google TTS, Azure TTS, etc.
 */
export interface IAudioGenerator {
  /**
   * Generate audio from text
   */
  generateAudio(options: AudioGenerationOptions): Promise<AudioResult>;

  /**
   * Generate audio for multiple chapters
   */
  generateChapters(chapters: { title: string; text: string }[], voice: string): Promise<AudioChapter[]>;

  /**
   * List available voices
   */
  listVoices(): Promise<Voice[]>;

  /**
   * Get voice by ID
   */
  getVoice(voiceId: string): Promise<Voice | null>;

  /**
   * Estimate cost for audio generation
   */
  estimateCost(textLength: number, voice: string): number;

  /**
   * Check if the generator is properly configured
   */
  isConfigured(): boolean;

  /**
   * Get the provider name
   */
  getProviderName(): string;
}
