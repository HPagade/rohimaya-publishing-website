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

// POST /api/formatter/process - Process manuscript and generate exports
router.post('/process', formatterController.processManuscript);

// GET /api/formatter/status/:jobId - Get formatting job status
router.get('/status/:jobId', formatterController.getStatus);

// GET /api/formatter/download/:jobId/:exportType - Download formatted file
router.get('/download/:jobId/:exportType', formatterController.downloadExport);

// GET /api/formatter/voices - Get available audiobook voices
router.get('/voices', formatterController.getVoices);

export default router;
