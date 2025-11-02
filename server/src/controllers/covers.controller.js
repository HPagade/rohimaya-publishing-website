/**
 * Covers Controller - Handles AI cover generation
 */

import coverGenerator from '../services/cover.generator.service.js';

class CoversController {
  async generateCovers(req, res, next) {
    try {
      const result = await coverGenerator.generateCover(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getGenreSuggestions(req, res, next) {
    try {
      const { genre } = req.params;
      const suggestions = coverGenerator.getGenreSuggestions(genre);
      res.json({ success: true, data: suggestions });
    } catch (error) {
      next(error);
    }
  }

  async addTextOverlay(req, res, next) {
    try {
      const { coverImagePath, textOptions } = req.body;
      const result = await coverGenerator.addTextOverlay(coverImagePath, textOptions);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new CoversController();
