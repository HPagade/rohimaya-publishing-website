/**
 * Video Generator Routes
 */

import express from 'express';
import videoController from '../controllers/video.controller.js';

const router = express.Router();

router.post('/generate', videoController.generateVideo);

export default router;
