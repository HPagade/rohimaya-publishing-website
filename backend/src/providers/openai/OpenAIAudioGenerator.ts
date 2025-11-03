/**
 * OpenAI Audio Generator Implementation
 * Implements IAudioGenerator interface
 * Follows: Single Responsibility, Open/Closed, Liskov Substitution
 */

import OpenAI from 'openai';
import {
  IAudioGenerator,
  Voice,
  AudioGenerationOptions,
  AudioResult,
  AudioChapter
} from '../../interfaces/IAudioGenerator';

export class OpenAIAudioGenerator implements IAudioGenerator {
  private client: OpenAI | null = null;
  private readonly providerName = 'OpenAI TTS';

  // OpenAI TTS voices
  private readonly voices: Voice[] = [
    {
      id: 'alloy',
      name: 'Alloy',
      gender: 'neutral',
      language: 'en-US',
      description: 'Neutral, versatile voice suitable for any content'
    },
    {
      id: 'echo',
      name: 'Echo',
      gender: 'male',
      language: 'en-US',
      description: 'Deep, authoritative male voice ideal for non-fiction'
    },
    {
      id: 'fable',
      name: 'Fable',
      gender: 'neutral',
      language: 'en-US',
      description: 'Storytelling voice perfect for fiction and narratives'
    },
    {
      id: 'onyx',
      name: 'Onyx',
      gender: 'male',
      language: 'en-US',
      description: 'Professional male voice for business content'
    },
    {
      id: 'nova',
      name: 'Nova',
      gender: 'female',
      language: 'en-US',
      description: 'Warm, friendly female voice - most popular choice'
    },
    {
      id: 'shimmer',
      name: 'Shimmer',
      gender: 'female',
      language: 'en-US',
      description: 'Energetic female voice for children\'s books and upbeat content'
    }
  ];

  constructor(apiKey?: string) {
    if (apiKey || process.env.OPENAI_API_KEY) {
      this.client = new OpenAI({
        apiKey: apiKey || process.env.OPENAI_API_KEY
      });
    }
  }

  /**
   * Generate audio from text using OpenAI TTS
   */
  async generateAudio(options: AudioGenerationOptions): Promise<AudioResult> {
    if (!this.isConfigured()) {
      throw new Error('OpenAI API key not configured');
    }

    const {
      text,
      voice,
      speed = 1.0,
      format = 'mp3',
      quality = 'standard'
    } = options;

    try {
      console.log(`🎙️  Generating audio with ${this.providerName} (voice: ${voice})...`);

      // Validate voice
      if (!this.voices.find(v => v.id === voice)) {
        throw new Error(`Invalid voice: ${voice}. Use one of: ${this.voices.map(v => v.id).join(', ')}`);
      }

      // Generate audio using OpenAI TTS
      const response = await this.client!.audio.speech.create({
        model: quality === 'high' ? 'tts-1-hd' : 'tts-1',
        voice: voice as 'alloy' | 'echo' | 'fable' | 'onyx' | 'nova' | 'shimmer',
        input: text,
        speed: Math.max(0.25, Math.min(4.0, speed)), // Clamp between 0.25 and 4.0
        response_format: format as 'mp3' | 'opus' | 'aac' | 'flac'
      });

      // Get audio buffer
      const buffer = Buffer.from(await response.arrayBuffer());
      const size = buffer.length;

      // Estimate duration (approximate: ~150 words per minute at 1.0x speed)
      const wordCount = text.split(/\s+/).length;
      const duration = Math.ceil((wordCount / 150) * 60 / speed);

      // Calculate cost
      const cost = this.estimateCost(text.length, voice);

      // TODO: Upload to storage and get URL
      // For now, return mock URL
      const url = `https://storage.example.com/audio/${Date.now()}.${format}`;

      console.log(`✅ Audio generated: ${duration}s, ${(size / 1024 / 1024).toFixed(2)}MB`);

      return {
        url,
        duration,
        size,
        format,
        cost
      };
    } catch (error: any) {
      console.error(`❌ ${this.providerName} API Error:`, error.message);
      throw new Error(`Failed to generate audio: ${error.message}`);
    }
  }

  /**
   * Generate audio for multiple chapters
   */
  async generateChapters(
    chapters: { title: string; text: string }[],
    voice: string
  ): Promise<AudioChapter[]> {
    console.log(`🎙️  Generating audiobook with ${chapters.length} chapters...`);

    const results: AudioChapter[] = [];

    for (let i = 0; i < chapters.length; i++) {
      const chapter = chapters[i];
      console.log(`Processing chapter ${i + 1}/${chapters.length}: ${chapter.title}`);

      try {
        const audio = await this.generateAudio({
          text: chapter.text,
          voice,
          format: 'mp3'
        });

        results.push({
          chapterNumber: i + 1,
          title: chapter.title,
          audioUrl: audio.url,
          duration: audio.duration
        });
      } catch (error: any) {
        console.error(`Failed to generate chapter ${i + 1}:`, error.message);
        // Continue with other chapters
      }
    }

    console.log(`✅ Generated ${results.length}/${chapters.length} chapters successfully`);

    return results;
  }

  /**
   * List available voices
   */
  async listVoices(): Promise<Voice[]> {
    return this.voices;
  }

  /**
   * Get voice by ID
   */
  async getVoice(voiceId: string): Promise<Voice | null> {
    return this.voices.find(v => v.id === voiceId) || null;
  }

  /**
   * Estimate cost for audio generation
   * OpenAI TTS pricing: $15 per 1M characters
   */
  estimateCost(textLength: number, voice: string): number {
    const costPerMillion = 15.0;
    return (textLength / 1_000_000) * costPerMillion;
  }

  /**
   * Check if generator is configured
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
}
