/**
 * Image Content Generator Service
 * AI-powered image generation for book content (illustrations, recipe photos, etc.)
 */

import OpenAI from 'openai';
import fs from 'fs-extra';
import path from 'path';
import axios from 'axios';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageContentGeneratorService {
  constructor() {
    this.openai = process.env.OPENAI_API_KEY ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    }) : null;

    this.imagesDir = path.join(__dirname, '../../../exports/images');
    fs.ensureDirSync(this.imagesDir);
  }

  isConfigured() {
    return this.openai !== null;
  }

  /**
   * Generate cookbook recipe images
   */
  async generateCookbookImages(recipes, options = {}) {
    if (!this.isConfigured()) {
      return this._generateMockImages(recipes, 'cookbook');
    }

    const {
      style = 'professional food photography',
      size = '1024x1024'
    } = options;

    const images = [];

    for (const recipe of recipes) {
      try {
        const prompt = `Professional food photography of ${recipe.name || recipe.title}. ${recipe.description || ''}. High quality, appetizing, well-lit, restaurant-style presentation, garnished beautifully. ${style}.`;

        console.log(`🍳 Generating image for: ${recipe.name || recipe.title}`);

        const response = await this.openai.images.generate({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size,
          quality: 'hd',
          style: 'vivid'
        });

        const imageUrl = response.data[0].url;
        const imagePath = await this._downloadImage(imageUrl, recipe.name || recipe.title, 'recipe');

        images.push({
          id: `recipe_img_${images.length + 1}`,
          recipeId: recipe.id,
          recipeName: recipe.name || recipe.title,
          url: imageUrl,
          localPath: imagePath,
          prompt,
          type: 'recipe-photo'
        });

        // Rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error generating image for ${recipe.name}:`, error.message);
      }
    }

    return {
      success: true,
      images,
      mode: 'ai',
      count: images.length
    };
  }

  /**
   * Generate kids book illustrations
   */
  async generateKidsbookIllustrations(scenes, options = {}) {
    if (!this.isConfigured()) {
      return this._generateMockImages(scenes, 'kids');
    }

    const {
      style = 'children\'s book illustration',
      characterDescription = '',
      artStyle = 'watercolor',
      size = '1024x1024'
    } = options;

    const illustrations = [];

    for (const scene of scenes) {
      try {
        let prompt = `${artStyle} children's book illustration. ${scene.description}. `;

        if (characterDescription) {
          prompt += `Main character: ${characterDescription}. `;
        }

        prompt += `Bright, colorful, whimsical, suitable for children ages 3-8. ${style}. Professional children's book quality.`;

        console.log(`🎨 Generating illustration for scene ${scene.number}...`);

        const response = await this.openai.images.generate({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size,
          quality: 'hd',
          style: 'vivid'
        });

        const imageUrl = response.data[0].url;
        const imagePath = await this._downloadImage(imageUrl, `scene_${scene.number}`, 'illustration');

        illustrations.push({
          id: `illus_${illustrations.length + 1}`,
          sceneNumber: scene.number,
          sceneDescription: scene.description,
          url: imageUrl,
          localPath: imagePath,
          prompt,
          type: 'illustration'
        });

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error generating illustration for scene ${scene.number}:`, error.message);
      }
    }

    return {
      success: true,
      illustrations,
      mode: 'ai',
      count: illustrations.length
    };
  }

  /**
   * Generate custom image from prompt
   */
  async generateCustomImage(prompt, options = {}) {
    if (!this.isConfigured()) {
      return this._generateMockImage(prompt);
    }

    const {
      size = '1024x1024',
      quality = 'hd',
      style = 'vivid'
    } = options;

    try {
      console.log(`🎨 Generating custom image...`);

      const response = await this.openai.images.generate({
        model: 'dall-e-3',
        prompt,
        n: 1,
        size,
        quality,
        style
      });

      const imageUrl = response.data[0].url;
      const imagePath = await this._downloadImage(imageUrl, 'custom', 'custom');

      return {
        success: true,
        image: {
          id: `custom_${Date.now()}`,
          url: imageUrl,
          localPath: imagePath,
          prompt,
          revisedPrompt: response.data[0].revised_prompt
        },
        mode: 'ai'
      };
    } catch (error) {
      console.error('Custom image generation error:', error);
      throw new Error(`Failed to generate image: ${error.message}`);
    }
  }

  /**
   * Download image from URL
   * @private
   */
  async _downloadImage(url, name, type) {
    const fileName = `${type}_${name.replace(/[^a-z0-9]/gi, '_')}_${Date.now()}.png`;
    const imagePath = path.join(this.imagesDir, fileName);

    const response = await axios.get(url, { responseType: 'arraybuffer' });
    await fs.writeFile(imagePath, response.data);

    console.log(`✅ Image saved: ${fileName}`);
    return imagePath;
  }

  /**
   * Generate mock images for testing
   * @private
   */
  _generateMockImages(items, type) {
    const images = items.map((item, index) => ({
      id: `${type}_img_${index + 1}`,
      itemId: item.id,
      itemName: item.name || item.title || item.description,
      url: `https://via.placeholder.com/1024x1024/667eea/ffffff?text=${encodeURIComponent(item.name || `${type} ${index + 1}`)}`,
      localPath: null,
      mock: true,
      type
    }));

    return {
      success: true,
      images,
      mode: 'mock',
      count: images.length,
      message: 'Mock images generated. Add OPENAI_API_KEY for AI generation.'
    };
  }

  _generateMockImage(prompt) {
    return {
      success: true,
      image: {
        id: `mock_${Date.now()}`,
        url: `https://via.placeholder.com/1024x1024/667eea/ffffff?text=AI+Image`,
        localPath: null,
        prompt,
        mock: true
      },
      mode: 'mock',
      message: 'Mock image generated. Add OPENAI_API_KEY for AI generation.'
    };
  }
}

export default new ImageContentGeneratorService();
