/**
 * Formatter Routes
 * Endpoints for manuscript formatting
 */

import express from 'express';
import { upload } from '../config/multer.config.js';
import formatterController from '../controllers/formatter.controller.js';

const router = express.Router();

// POST /api/formatter/upload - Upload and analyze manuscript
router.post('/upload', upload.single('file'), formatterController.uploadManuscript);

// POST /api/formatter/format - Format manuscript for export
router.post('/format', formatterController.formatManuscript);

// GET /api/formatter/status/:jobId - Get formatting job status
router.get('/status/:jobId', formatterController.getStatus);

export default router;
