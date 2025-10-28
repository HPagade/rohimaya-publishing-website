/**
 * OpenAI Service
 * Handles all interactions with OpenAI API (GPT-4, DALL-E 3)
 */

import OpenAI from 'openai';

class OpenAIService {
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
   * Analyze manuscript text and detect chapters
   * @param {string} text - The manuscript text
   * @returns {Promise<Object>} - Detected chapters and structure
   */
  async analyzeManuscript(text) {
    try {
      console.log('🤖 Analyzing manuscript with GPT-4...');

      const openai = this._getClient();
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert book formatter. Analyze the manuscript text and identify:
1. Chapter titles and their positions
2. Section breaks
3. Front matter (dedication, foreword, etc.)
4. Back matter (author's note, acknowledgments, etc.)
5. Overall structure

Return a JSON object with this structure:
{
  "chapters": [
    {"title": "Chapter 1: Title", "startIndex": 0, "endIndex": 1000, "content": "..."},
    ...
  ],
  "frontMatter": {"dedication": "...", "foreword": "..."},
  "backMatter": {"acknowledgments": "...", "about": "..."},
  "metadata": {"wordCount": 50000, "chapterCount": 12}
}`
          },
          {
            role: 'user',
            content: `Analyze this manuscript:\n\n${text.substring(0, 15000)}` // Limit to first ~15k chars
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      });

      const result = response.choices[0].message.content;

      // Try to parse as JSON
      try {
        return JSON.parse(result);
      } catch (e) {
        // If not valid JSON, return structured response
        return {
          chapters: this._extractChaptersFromText(text),
          metadata: {
            wordCount: text.split(/\s+/).length,
            analysis: result
          }
        };
      }
    } catch (error) {
      console.error('❌ OpenAI API Error:', error.message);
      throw new Error(`Failed to analyze manuscript: ${error.message}`);
    }
  }

  /**
   * Generate book cover image using DALL-E 3
   * @param {Object} params - Cover generation parameters
   * @returns {Promise<string>} - URL to generated image
   */
  async generateCoverImage(params) {
    const { title, author, genre, style, description } = params;

    try {
      console.log('🎨 Generating book cover with DALL-E 3...');

      // Construct prompt
      const prompt = `Professional book cover design for "${title}" by ${author}.
Genre: ${genre}. Style: ${style}.
${description}
High quality, professional publishing standard, eye-catching design, modern typography,
bestseller aesthetic. No text on the image - image only.`;

      const openai = this._getClient();
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: prompt,
        size: '1024x1792', // Portrait orientation for book covers
        quality: 'standard',
        n: 1
      });

      return response.data[0].url;
    } catch (error) {
      console.error('❌ DALL-E API Error:', error.message);
      throw new Error(`Failed to generate cover: ${error.message}`);
    }
  }

  /**
   * Generate custom images for book content
   * @param {Object} params - Image generation parameters
   * @returns {Promise<string>} - URL to generated image
   */
  async generateImage(params) {
    const { prompt, style, size = '1024x1024' } = params;

    try {
      console.log('🖼️  Generating image with DALL-E 3...');

      const fullPrompt = `${prompt}. Art style: ${style}. High quality, detailed, professional.`;

      const openai = this._getClient();
      const response = await openai.images.generate({
        model: 'dall-e-3',
        prompt: fullPrompt,
        size: size,
        quality: 'standard',
        n: 1
      });

      return response.data[0].url;
    } catch (error) {
      console.error('❌ DALL-E API Error:', error.message);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }

  /**
   * Generate video script using GPT-4
   * @param {Object} params - Script generation parameters
   * @returns {Promise<string>} - Generated script
   */
  async generateVideoScript(params) {
    const { title, genre, duration, style } = params;

    try {
      console.log('📝 Generating video script with GPT-4...');

      const openai = this._getClient();
      const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `You are an expert book marketing video scriptwriter. Create engaging,
compelling video scripts that make viewers want to read the book.`
          },
          {
            role: 'user',
            content: `Create a ${duration}-second video script for a book trailer.
Title: ${title}
Genre: ${genre}
Style: ${style}

Include:
- Hook (first 5 seconds)
- Story tease
- Character introduction
- Call to action
- Voiceover narration text
- Scene descriptions`
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error('❌ OpenAI API Error:', error.message);
      throw new Error(`Failed to generate script: ${error.message}`);
    }
  }

  /**
   * Helper: Extract chapters from text using simple pattern matching
   * @private
   */
  _extractChaptersFromText(text) {
    const chapters = [];
    const chapterRegex = /chapter\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)[:\s]+([^\n]+)/gi;

    let match;
    let lastIndex = 0;
    let chapterNum = 1;

    while ((match = chapterRegex.exec(text)) !== null) {
      if (lastIndex > 0) {
        // Save previous chapter content
        chapters[chapters.length - 1].content = text.substring(lastIndex, match.index).trim();
        chapters[chapters.length - 1].endIndex = match.index;
      }

      chapters.push({
        number: chapterNum++,
        title: match[0],
        startIndex: match.index,
        endIndex: text.length,
        content: ''
      });

      lastIndex = match.index;
    }

    // Handle last chapter
    if (chapters.length > 0 && lastIndex > 0) {
      chapters[chapters.length - 1].content = text.substring(lastIndex).trim();
    }

    // If no chapters found, treat entire text as one chapter
    if (chapters.length === 0) {
      chapters.push({
        number: 1,
        title: 'Chapter 1',
        startIndex: 0,
        endIndex: text.length,
        content: text
      });
    }

    return chapters;
  }

  /**
   * Check if OpenAI API key is configured
   * @returns {boolean}
   */
  isConfigured() {
    return !!process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-openai-api-key-here';
  }
}

export default new OpenAIService();
