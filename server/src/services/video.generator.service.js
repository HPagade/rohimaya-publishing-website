/**
 * Video Generator Service
 * AI-powered video trailer creation for books
 */

import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class VideoGeneratorService {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }) : null;

    this.videosDir = path.join(__dirname, '../../../exports/videos');
    fs.ensureDirSync(this.videosDir);
  }

  isConfigured() {
    return this.openai !== null;
  }

  /**
   * Generate video script for book trailer
   */
  async generateVideoScript(bookInfo) {
    const { title, author, genre, description, duration = 30 } = bookInfo;

    if (!this.isConfigured()) {
      return this._generateMockScript(bookInfo);
    }

    try {
      const prompt = `Create a compelling ${duration}-second video trailer script for a ${genre} book titled "${title}" by ${author}.

Book description: ${description}

The script should:
1. Hook the viewer in the first 3 seconds
2. Tease the story without spoiling
3. Build excitement and emotion
4. End with a call-to-action
5. Be exactly ${duration} seconds when read at normal pace

Format the script with timing markers and visual suggestions.`;

      const response = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional book marketing expert specializing in video trailer scripts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 500
      });

      const script = response.choices[0].message.content;

      return {
        success: true,
        script,
        title,
        duration,
        mode: 'ai'
      };
    } catch (error) {
      console.error('Script generation error:', error);
      throw new Error(`Failed to generate script: ${error.message}`);
    }
  }

  /**
   * Generate voiceover from script
   */
  async generateVoiceover(script, options = {}) {
    const {
      voice = 'nova',
      speed = 1.0
    } = options;

    if (!this.isConfigured()) {
      return this._generateMockVoiceover(script);
    }

    try {
      console.log(`🎙️ Generating voiceover with voice: ${voice}`);

      const response = await this.openai.audio.speech.create({
        model: 'tts-1-hd',
        voice,
        input: script,
        speed
      });

      const buffer = Buffer.from(await response.arrayBuffer());
      const audioPath = path.join(this.videosDir, `voiceover_${Date.now()}.mp3`);
      await fs.writeFile(audioPath, buffer);

      console.log(`✅ Voiceover saved: ${path.basename(audioPath)}`);

      return {
        success: true,
        audioPath,
        voice,
        duration: this._estimateAudioDuration(script, speed),
        mode: 'ai'
      };
    } catch (error) {
      console.error('Voiceover generation error:', error);
      throw new Error(`Failed to generate voiceover: ${error.message}`);
    }
  }

  /**
   * Create video compilation (placeholder - requires video processing library)
   */
  async createVideoCompilation(options) {
    const {
      script,
      voiceoverPath,
      images = [],
      music = null,
      duration = 30
    } = options;

    // This would use ffmpeg or similar video processing library
    // For now, return compilation instructions

    return {
      success: true,
      message: 'Video compilation ready. Requires ffmpeg integration for actual video creation.',
      compilation: {
        script,
        voiceover: voiceoverPath,
        images: images.length,
        duration,
        outputFormat: 'mp4',
        resolution: '1920x1080'
      },
      instructions: [
        '1. Use ffmpeg to combine images with Ken Burns effect',
        '2. Add voiceover audio track',
        '3. Add background music (if provided)',
        '4. Apply transitions between images',
        '5. Add title cards and credits',
        '6. Export as 1080p MP4'
      ]
    };
  }

  /**
   * Get available voice options
   */
  getVoiceOptions() {
    return [
      { id: 'alloy', name: 'Alloy', description: 'Neutral, versatile' },
      { id: 'echo', name: 'Echo', description: 'Male, deep, authoritative' },
      { id: 'fable', name: 'Fable', description: 'Storytelling, engaging' },
      { id: 'onyx', name: 'Onyx', description: 'Male, professional, confident' },
      { id: 'nova', name: 'Nova', description: 'Female, warm, recommended', recommended: true },
      { id: 'shimmer', name: 'Shimmer', description: 'Female, energetic, upbeat' }
    ];
  }

  /**
   * Estimate audio duration from script
   * @private
   */
  _estimateAudioDuration(script, speed = 1.0) {
    // Average speaking rate: 150 words per minute
    const wordCount = script.split(/\s+/).length;
    const durationMinutes = wordCount / 150;
    const durationSeconds = (durationMinutes * 60) / speed;
    return Math.ceil(durationSeconds);
  }

  /**
   * Generate mock script for testing
   * @private
   */
  _generateMockScript(bookInfo) {
    const { title, author, genre, duration = 30 } = bookInfo;

    const script = `[0:00-0:03]
VISUAL: Book cover fades in
VOICEOVER: "Imagine a world..."

[0:03-0:10]
VISUAL: Dramatic imagery related to ${genre}
VOICEOVER: "Where ${title.toLowerCase()} changes everything..."

[0:10-0:20]
VISUAL: Key scenes and characters
VOICEOVER: "Experience the journey that readers can't stop talking about..."

[0:20-0:${duration}]
VISUAL: Book cover with author name
VOICEOVER: "${title} by ${author}. Available now."

Duration: ${duration} seconds`;

    return {
      success: true,
      script,
      title,
      duration,
      mode: 'mock',
      message: 'Mock script generated. Add OPENAI_API_KEY for AI generation.'
    };
  }

  /**
   * Generate mock voiceover for testing
   * @private
   */
  _generateMockVoiceover(script) {
    return {
      success: true,
      audioPath: null,
      voice: 'mock',
      duration: 30,
      mode: 'mock',
      message: 'Mock voiceover generated. Add OPENAI_API_KEY for AI generation.'
    };
  }
}

export default new VideoGeneratorService();
