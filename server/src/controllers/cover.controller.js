/**
 * Cover Generator Controller
 * Handles book cover generation requests
 */

import openaiService from '../services/openai.service.js';

class CoverController {
  /**
   * Generate book cover
   * POST /api/covers/generate
   */
  async generateCover(req, res, next) {
    try {
      const { title, author, genre, style, description, variations = 1 } = req.body;

      // Validate required fields
      if (!title || !author || !genre) {
        return res.status(400).json({
          success: false,
          error: 'Title, author, and genre are required'
        });
      }

      console.log(`🎨 Generating cover for "${title}" by ${author}`);

      // Check if OpenAI is configured
      if (!openaiService.isConfigured()) {
        console.log('⚠️  OpenAI not configured, returning mock data');

        // Return mock covers
        const mockCovers = [];
        for (let i = 0; i < Math.min(variations, 6); i++) {
          mockCovers.push({
            id: `cover-mock-${Date.now()}-${i}`,
            url: `https://picsum.photos/400/600?random=${Date.now()}-${i}`,
            thumbnail: `https://picsum.photos/200/300?random=${Date.now()}-${i}`,
            title,
            author,
            genre,
            style: style || 'modern',
            variation: i + 1
          });
        }

        return res.json({
          success: true,
          mode: 'mock',
          data: {
            covers: mockCovers,
            message: 'OpenAI API not configured. Showing placeholder images.'
          }
        });
      }

      // Generate covers with DALL-E 3
      const covers = [];
      const numVariations = Math.min(variations, 6); // Limit to 6

      for (let i = 0; i < numVariations; i++) {
        try {
          const imageUrl = await openaiService.generateCoverImage({
            title,
            author,
            genre,
            style: style || 'modern',
            description: description || `A ${genre} book cover`
          });

          covers.push({
            id: `cover-${Date.now()}-${i}`,
            url: imageUrl,
            thumbnail: imageUrl,
            title,
            author,
            genre,
            style: style || 'modern',
            variation: i + 1
          });

          // Add delay between requests to avoid rate limiting
          if (i < numVariations - 1) {
            await new Promise(resolve => setTimeout(resolve, 2000));
          }
        } catch (error) {
          console.error(`❌ Failed to generate variation ${i + 1}:`, error.message);
          // Continue with other variations
        }
      }

      if (covers.length === 0) {
        throw new Error('Failed to generate any covers');
      }

      res.json({
        success: true,
        mode: 'ai',
        data: {
          covers,
          generated: covers.length,
          requested: numVariations
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get cover generation status
   * GET /api/covers/status/:jobId
   */
  async getStatus(req, res, next) {
    try {
      const { jobId } = req.params;

      // Mock status response
      res.json({
        success: true,
        data: {
          jobId,
          status: 'completed',
          progress: 100,
          message: 'Cover generation complete'
        }
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get available genres and styles
   * GET /api/covers/options
   */
  async getOptions(req, res, next) {
    try {
      const options = {
        genres: [
          'fantasy',
          'romance',
          'thriller',
          'mystery',
          'science-fiction',
          'horror',
          'historical-fiction',
          'contemporary',
          'young-adult',
          'non-fiction',
          'cookbook',
          'children',
          'poetry',
          'memoir'
        ],
        styles: [
          'minimalist',
          'modern',
          'classic',
          'bold',
          'dramatic',
          'elegant',
          'playful',
          'dark',
          'vibrant',
          'vintage'
        ],
        formats: [
          { name: 'ebook', size: '1600x2400' },
          { name: 'print', size: '2550x3300' },
          { name: 'thumbnail', size: '400x600' }
        ]
      };

      res.json({
        success: true,
        data: options
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new CoverController();
