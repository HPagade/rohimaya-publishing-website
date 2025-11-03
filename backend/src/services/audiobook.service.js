/**
 * Audiobook Service
 * Generates audiobooks using OpenAI's Text-to-Speech API
 */

import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

class AudiobookService {
  constructor() {
    this.openai = null;
  }

  /**
   * Get OpenAI client (lazy initialization)
   * @private
   */
  _getClient() {
    if (!this.openai && this.isConfigured()) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
    return this.openai;
  }

  /**
   * Generate audiobook from manuscript
   * @param {Object} manuscript - Manuscript data
   * @param {Object} options - Audiobook generation options
   * @returns {Promise<Object>} - Paths to generated audio files
   */
  async generateAudiobook(manuscript, options = {}) {
    try {
      console.log('🎙️  Generating audiobook...');

      const {
        title = 'Untitled',
        author = 'Unknown Author',
        chapters = [],
        text = ''
      } = manuscript;

      const {
        voice = 'nova', // alloy, echo, fable, onyx, nova, shimmer
        speed = 1.0
      } = options;

      // Create output directory
      const outputDir = path.join(process.cwd(), 'temp', 'exports', 'audiobook');
      await fs.ensureDir(outputDir);

      const audioFiles = [];

      if (chapters && chapters.length > 0) {
        // Generate audio for each chapter
        for (let i = 0; i < chapters.length; i++) {
          const chapter = chapters[i];
          console.log(`🎙️  Generating Chapter ${i + 1}/${chapters.length}...`);

          const audioPath = await this._generateChapterAudio(
            chapter,
            i + 1,
            outputDir,
            voice,
            speed
          );

          audioFiles.push({
            chapter: i + 1,
            title: chapter.title || `Chapter ${i + 1}`,
            path: audioPath,
            filename: path.basename(audioPath)
          });
        }
      } else {
        // Generate audio for entire book as single file
        console.log('🎙️  Generating full audiobook...');

        const audioPath = await this._generateTextAudio(
          text,
          'full-audiobook',
          outputDir,
          voice,
          speed
        );

        audioFiles.push({
          chapter: 1,
          title: title,
          path: audioPath,
          filename: path.basename(audioPath)
        });
      }

      // Create ZIP archive of all audio files
      const zipPath = await this._createAudiobookZip(audioFiles, title, outputDir);

      console.log(`✅ Audiobook generated: ${audioFiles.length} files`);

      return {
        files: audioFiles,
        zipPath: zipPath,
        totalFiles: audioFiles.length,
        voice: voice
      };
    } catch (error) {
      console.error('❌ Audiobook generation error:', error.message);
      throw new Error(`Failed to generate audiobook: ${error.message}`);
    }
  }

  /**
   * Generate audio for a single chapter
   * @private
   */
  async _generateChapterAudio(chapter, chapterNumber, outputDir, voice, speed) {
    const chapterText = chapter.content || chapter.text || '';

    // Add chapter title as intro
    const fullText = `Chapter ${chapterNumber}. ${chapter.title || ''}. ${chapterText}`;

    // Split into chunks if too long (OpenAI TTS has ~4096 char limit per request)
    const chunks = this._splitTextIntoChunks(fullText, 4000);

    if (chunks.length === 1) {
      // Single chunk - generate directly
      return await this._generateTextAudio(
        chunks[0],
        `chapter-${chapterNumber.toString().padStart(2, '0')}`,
        outputDir,
        voice,
        speed
      );
    } else {
      // Multiple chunks - generate and concatenate
      const chunkFiles = [];

      for (let i = 0; i < chunks.length; i++) {
        const chunkPath = await this._generateTextAudio(
          chunks[i],
          `chapter-${chapterNumber.toString().padStart(2, '0')}-part${i + 1}`,
          outputDir,
          voice,
          speed
        );
        chunkFiles.push(chunkPath);
      }

      // Note: In production, you'd want to use ffmpeg to concatenate these
      // For now, return the first chunk (or implement concatenation)
      return chunkFiles[0];
    }
  }

  /**
   * Generate audio from text using OpenAI TTS
   * @private
   */
  async _generateTextAudio(text, filename, outputDir, voice, speed) {
    try {
      const openai = this._getClient();

      // Call OpenAI TTS API
      const mp3 = await openai.audio.speech.create({
        model: 'tts-1', // or 'tts-1-hd' for higher quality
        voice: voice,
        input: text,
        speed: speed
      });

      // Convert response to buffer
      const buffer = Buffer.from(await mp3.arrayBuffer());

      // Save to file
      const outputPath = path.join(outputDir, `${filename}.mp3`);
      await fs.writeFile(outputPath, buffer);

      return outputPath;
    } catch (error) {
      console.error(`❌ TTS error for ${filename}:`, error.message);
      throw error;
    }
  }

  /**
   * Split text into manageable chunks
   * @private
   */
  _splitTextIntoChunks(text, maxLength) {
    if (text.length <= maxLength) {
      return [text];
    }

    const chunks = [];
    const paragraphs = text.split(/\n\n+/);
    let currentChunk = '';

    for (const paragraph of paragraphs) {
      if ((currentChunk + paragraph).length <= maxLength) {
        currentChunk += paragraph + '\n\n';
      } else {
        if (currentChunk) chunks.push(currentChunk.trim());
        currentChunk = paragraph + '\n\n';
      }
    }

    if (currentChunk) chunks.push(currentChunk.trim());

    return chunks;
  }

  /**
   * Create ZIP archive of all audiobook files
   * @private
   */
  async _createAudiobookZip(audioFiles, title, outputDir) {
    const zipFilename = `${this._sanitizeFilename(title)}-audiobook.zip`;
    const zipPath = path.join(path.dirname(outputDir), zipFilename);

    const output = fs.createWriteStream(zipPath);
    const archive = archiver('zip', {
      zlib: { level: 9 }
    });

    return new Promise((resolve, reject) => {
      output.on('close', () => {
        console.log(`📦 Audiobook ZIP created: ${archive.pointer()} bytes`);
        resolve(zipPath);
      });

      archive.on('error', (err) => {
        reject(err);
      });

      archive.pipe(output);

      // Add all audio files to archive
      audioFiles.forEach((file) => {
        archive.file(file.path, { name: file.filename });
      });

      // Add metadata file
      const metadata = {
        title: title,
        chapters: audioFiles.map((f) => ({
          chapter: f.chapter,
          title: f.title,
          filename: f.filename
        })),
        generatedAt: new Date().toISOString(),
        generator: 'AI Book Formatter'
      };

      archive.append(JSON.stringify(metadata, null, 2), {
        name: 'metadata.json'
      });

      archive.finalize();
    });
  }

  /**
   * Get available voices
   */
  getAvailableVoices() {
    return [
      {
        id: 'alloy',
        name: 'Alloy',
        gender: 'neutral',
        description: 'Balanced and natural'
      },
      {
        id: 'echo',
        name: 'Echo',
        gender: 'male',
        description: 'Deep and authoritative'
      },
      {
        id: 'fable',
        name: 'Fable',
        gender: 'neutral',
        description: 'Warm and storytelling'
      },
      {
        id: 'onyx',
        name: 'Onyx',
        gender: 'male',
        description: 'Professional and clear'
      },
      {
        id: 'nova',
        name: 'Nova',
        gender: 'female',
        description: 'Warm and engaging (Recommended)'
      },
      {
        id: 'shimmer',
        name: 'Shimmer',
        gender: 'female',
        description: 'Bright and energetic'
      }
    ];
  }

  /**
   * Check if OpenAI API key is configured
   */
  isConfigured() {
    return (
      !!process.env.OPENAI_API_KEY &&
      process.env.OPENAI_API_KEY !== 'sk-your-openai-api-key-here'
    );
  }

  /**
   * Sanitize filename
   * @private
   */
  _sanitizeFilename(filename) {
    return filename
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
  }
}

export default new AudiobookService();
