/**
 * Cover Generator Service
 * AI-powered book cover generation using DALL-E 3
 */

import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class CoverGeneratorService {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }) : null;

    this.coversDir = path.join(__dirname, '../../../exports/covers');
    fs.ensureDirSync(this.coversDir);

    // Genre-specific prompts and styles
    this.genreStyles = {
      fiction: {
        style: 'realistic, dramatic lighting, cinematic',
        keywords: 'literary, elegant, sophisticated'
      },
      fantasy: {
        style: 'epic fantasy art, detailed, magical atmosphere',
        keywords: 'mystical, dragons, castles, magic'
      },
      romance: {
        style: 'romantic, soft lighting, emotional, beautiful',
        keywords: 'love, passion, couple, hearts'
      },
      thriller: {
        style: 'dark, suspenseful, high contrast, dramatic',
        keywords: 'mystery, danger, shadows, tension'
      },
      scifi: {
        style: 'futuristic, technological, space, sci-fi aesthetic',
        keywords: 'technology, space, future, aliens'
      },
      horror: {
        style: 'dark, eerie, unsettling, gothic',
        keywords: 'scary, haunting, darkness, fear'
      },
      mystery: {
        style: 'intriguing, noir, mysterious atmosphere',
        keywords: 'detective, clues, shadows, investigation'
      },
      'non-fiction': {
        style: 'professional, clean, modern, informative',
        keywords: 'knowledge, learning, expertise'
      },
      children: {
        style: 'bright, colorful, whimsical, playful illustration',
        keywords: 'cute, fun, adventure, animals'
      },
      cookbook: {
        style: 'appetizing, professional food photography, vibrant',
        keywords: 'delicious, culinary, cooking, food'
      }
    };
  }

  /**
   * Check if service is configured
   */
  isConfigured() {
    return this.openai !== null;
  }

  /**
   * Generate book cover using DALL-E 3
   * @param {Object} coverOptions - Cover generation options
   * @returns {Promise<Object>} Generated cover data
   */
  async generateCover(coverOptions) {
    const {
      title,
      author,
      genre = 'fiction',
      description = '',
      style = 'default',
      colors = [],
      variations = 1,
      size = '1024x1792' // Portrait for book cover
    } = coverOptions;

    if (!this.isConfigured()) {
      return this._generateMockCover(coverOptions);
    }

    try {
      const covers = [];

      // Generate specified number of variations
      for (let i = 0; i < Math.min(variations, 3); i++) {
        const prompt = this._buildCoverPrompt(title, author, genre, description, style, i);

        console.log(`🎨 Generating cover variation ${i + 1}...`);
        console.log(`Prompt: ${prompt}`);

        const response = await this.openai.images.generate({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size,
          quality: 'hd',
          style: 'vivid'
        });

        const imageUrl = response.data[0].url;

        // Download and save the image
        const coverPath = await this._downloadCover(imageUrl, title, i + 1);

        covers.push({
          id: `cover_${i + 1}`,
          url: imageUrl,
          localPath: coverPath,
          title,
          author,
          genre,
          variation: i + 1,
          prompt,
          revisedPrompt: response.data[0].revised_prompt
        });

        // Add delay between requests to avoid rate limiting
        if (i < variations - 1) {
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      return {
        success: true,
        covers,
        mode: 'ai',
        message: `Generated ${covers.length} cover${covers.length > 1 ? 's' : ''} successfully`
      };
    } catch (error) {
      console.error('Cover generation error:', error);
      throw new Error(`Failed to generate cover: ${error.message}`);
    }
  }

  /**
   * Generate cover with text overlay
   * @param {string} coverImagePath - Base cover image path
   * @param {Object} textOptions - Text overlay options
   * @returns {Promise<string>} Path to cover with text
   */
  async addTextOverlay(coverImagePath, textOptions) {
    const {
      title,
      author,
      fontSize = 48,
      fontColor = '#FFFFFF',
      position = 'center'
    } = textOptions;

    // This would use a canvas library (node-canvas) to add text
    // For now, return a placeholder
    return {
      success: true,
      path: coverImagePath,
      message: 'Text overlay requires canvas library. Feature ready for integration.',
      textOptions
    };
  }

  /**
   * Get genre-specific cover suggestions
   * @param {string} genre - Book genre
   * @returns {Object} Genre suggestions
   */
  getGenreSuggestions(genre) {
    const genreStyle = this.genreStyles[genre] || this.genreStyles.fiction;

    return {
      genre,
      style: genreStyle.style,
      keywords: genreStyle.keywords,
      colorSuggestions: this._getGenreColors(genre),
      tips: this._getGenreTips(genre)
    };
  }

  /**
   * Build DALL-E prompt for cover generation
   * @private
   */
  _buildCoverPrompt(title, author, genre, description, style, variationIndex) {
    const genreStyle = this.genreStyles[genre] || this.genreStyles.fiction;

    let prompt = `Professional book cover design for "${title}" by ${author}. `;

    // Add genre-specific style
    prompt += `${genreStyle.style}. `;

    // Add description if provided
    if (description) {
      prompt += `Theme: ${description}. `;
    }

    // Add variation instructions
    if (variationIndex === 0) {
      prompt += 'Main concept, bold and eye-catching. ';
    } else if (variationIndex === 1) {
      prompt += 'Alternative perspective, different mood. ';
    } else {
      prompt += 'Unique interpretation, creative approach. ';
    }

    // Add genre keywords
    prompt += `Elements: ${genreStyle.keywords}. `;

    // Final instructions
    prompt += 'High quality, professional publishing standard, no text or words on the cover, suitable for book cover design, vertical portrait orientation.';

    return prompt;
  }

  /**
   * Download cover image from URL
   * @private
   */
  async _downloadCover(url, title, variationNumber) {
    const fileName = `${title.replace(/[^a-z0-9]/gi, '_')}_cover_${variationNumber}_${Date.now()}.png`;
    const coverPath = path.join(this.coversDir, fileName);

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(coverPath, response.data);

    console.log(`✅ Cover saved: ${fileName}`);

    return coverPath;
  }

  /**
   * Generate mock cover for testing
   * @private
   */
  _generateMockCover(coverOptions) {
    const { title, author, genre, variations = 1 } = coverOptions;

    const covers = [];
    for (let i = 0; i < variations; i++) {
      covers.push({
        id: `cover_${i + 1}`,
        url: `https://via.placeholder.com/1024x1792/667eea/ffffff?text=${encodeURIComponent(title)}`,
        localPath: null,
        title,
        author,
        genre,
        variation: i + 1,
        mock: true
      });
    }

    return {
      success: true,
      covers,
      mode: 'mock',
      message: 'Mock covers generated. Add OPENAI_API_KEY for AI generation.'
    };
  }

  /**
   * Get genre-specific color palettes
   * @private
   */
  _getGenreColors(genre) {
    const colorPalettes = {
      fiction: ['#2C3E50', '#34495E', '#7F8C8D', '#ECF0F1'],
      fantasy: ['#8E44AD', '#9B59B6', '#3498DB', '#E74C3C'],
      romance: ['#E74C3C', '#EC7063', '#F1948A', '#F8B4B9'],
      thriller: ['#1C1C1C', '#4A4A4A', '#C0392B', '#E74C3C'],
      scifi: ['#3498DB', '#2980B9', '#1ABC9C', '#16A085'],
      horror: ['#000000', '#2C3E50', '#7F0000', '#C0392B'],
      mystery: ['#34495E', '#2C3E50', '#7F8C8D', '#95A5A6'],
      'non-fiction': ['#2C3E50', '#3498DB', '#ECF0F1', '#BDC3C7'],
      children: ['#F39C12', '#E74C3C', '#3498DB', '#2ECC71'],
      cookbook: ['#E67E22', '#D35400', '#F39C12', '#27AE60']
    };

    return colorPalettes[genre] || colorPalettes.fiction;
  }

  /**
   * Get genre-specific cover tips
   * @private
   */
  _getGenreTips(genre) {
    const tips = {
      fiction: 'Focus on mood and atmosphere rather than literal interpretation',
      fantasy: 'Include magical or fantastical elements that hint at the story',
      romance: 'Use warm colors and emotional imagery',
      thriller: 'Create tension with dark colors and dramatic elements',
      scifi: 'Incorporate futuristic or technological elements',
      horror: 'Use dark, unsettling imagery to create atmosphere',
      mystery: 'Create intrigue with shadows and hidden elements',
      'non-fiction': 'Keep it professional and clear, focus on the subject matter',
      children: 'Use bright, inviting colors and fun characters',
      cookbook: 'Show appetizing food imagery with professional styling'
    };

    return tips[genre] || tips.fiction;
  }
}

export default new CoverGeneratorService();
