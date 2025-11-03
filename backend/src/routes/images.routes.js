import express from 'express';
import imagesController from '../controllers/images.controller.js';

const router = express.Router();

router.post('/cookbook', imagesController.generateCookbookImages);
router.post('/kidsbook', imagesController.generateKidsbookIllustrations);
router.post('/custom', imagesController.generateCustomImage);

export default router;
