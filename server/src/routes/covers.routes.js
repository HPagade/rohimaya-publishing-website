import express from 'express';
import coversController from '../controllers/covers.controller.js';

const router = express.Router();

router.post('/generate', coversController.generateCovers);
router.get('/genre-suggestions/:genre', coversController.getGenreSuggestions);
router.post('/add-text', coversController.addTextOverlay);

export default router;
