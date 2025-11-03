/**
 * Videos Controller - Handles AI video generation
 */

import videoGenerator from '../services/video.generator.service.js';

class VideosController {
  async generateScript(req, res, next) {
    try {
      const result = await videoGenerator.generateVideoScript(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async generateVoiceover(req, res, next) {
    try {
      const { script, options } = req.body;
      const result = await videoGenerator.generateVoiceover(script, options);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async createCompilation(req, res, next) {
    try {
      const result = await videoGenerator.createVideoCompilation(req.body);
      res.json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  async getVoices(req, res, next) {
    try {
      const voices = videoGenerator.getVoiceOptions();
      res.json({ success: true, data: { voices } });
    } catch (error) {
      next(error);
    }
  }
}

export default new VideosController();
