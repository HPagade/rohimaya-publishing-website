/**
 * Cover Generator Routes
 * Endpoints for book cover generation
 */

import express from 'express';
import coverController from '../controllers/cover.controller.js';

const router = express.Router();

// POST /api/covers/generate - Generate book cover
router.post('/generate', coverController.generateCover);

// GET /api/covers/status/:jobId - Get generation status
router.get('/status/:jobId', coverController.getStatus);

// GET /api/covers/options - Get available genres and styles
router.get('/options', coverController.getOptions);

export default router;
