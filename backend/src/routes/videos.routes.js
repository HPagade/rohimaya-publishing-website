import express from 'express';
import videosController from '../controllers/videos.controller.js';

const router = express.Router();

router.post('/script', videosController.generateScript);
router.post('/voiceover', videosController.generateVoiceover);
router.post('/compile', videosController.createCompilation);
router.get('/voices', videosController.getVoices);

export default router;
