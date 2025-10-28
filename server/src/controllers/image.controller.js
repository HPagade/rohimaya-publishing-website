/**
 * Image Generator Controller
 * Handles AI image generation requests
 */

import openaiService from '../services/openai.service.js';

class ImageController {
  /**
   * Generate image
   * POST /api/images/generate
   */
  async generateImage(req, res, next) {
    try {
      const { prompt, style, size, quantity = 1 } = req.body;

      if (!prompt) {
        return res.status(400).json({
          success: false,
          error: 'Prompt is required'
        });
      }

      console.log('🖼️  Generating image...');

      // Check if OpenAI is configured
      if (!openaiService.isConfigured()) {
        const mockImages = [];
        for (let i = 0; i < Math.min(quantity, 4); i++) {
          mockImages.push({
            id: `img-mock-${Date.now()}-${i}`,
            url: `https://picsum.photos/1024/1024?random=${Date.now()}-${i}`,
            prompt,
            style: style || 'realistic'
          });
        }

        return res.json({
          success: true,
          mode: 'mock',
          data: {
            images: mockImages,
            message: 'OpenAI API not configured. Showing placeholder images.'
          }
        });
      }

      // Generate with DALL-E 3
      const imageUrl = await openaiService.generateImage({
        prompt,
        style: style || 'realistic',
        size: size || '1024x1024'
      });

      res.json({
        success: true,
        mode: 'ai',
        data: {
          images: [{
            id: `img-${Date.now()}`,
            url: imageUrl,
            prompt,
            style: style || 'realistic'
          }]
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new ImageController();
