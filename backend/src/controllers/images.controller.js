/**
 * Images Controller - Handles AI image generation
 */

import imageContentGenerator from '../services/image.content.generator.service.js';

class ImagesController {
  async generateCookbookImages(req, res, next) {
    try {
      const { recipes, options } = req.body;
      const result = await imageContentGenerator.generateCookbookImages(recipes, options);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async generateKidsbookIllustrations(req, res, next) {
    try {
      const { scenes, options } = req.body;
      const result = await imageContentGenerator.generateKidsbookIllustrations(scenes, options);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async generateCustomImage(req, res, next) {
    try {
      const { prompt, options } = req.body;
      const result = await imageContentGenerator.generateCustomImage(prompt, options);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }
}

export default new ImagesController();
