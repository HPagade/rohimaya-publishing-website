/**
 * Image Generator Routes
 */

import express from 'express';
import imageController from '../controllers/image.controller.js';

const router = express.Router();

router.post('/generate', imageController.generateImage);

export default router;
