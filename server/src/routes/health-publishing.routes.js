/**
 * Health Publishing Routes
 * Routes for cookbook formatting, health content, nutrition analysis, and medical citations
 */

import express from 'express';
import multer from 'multer';
import { authenticateUser } from '../middleware/auth.middleware.js';
import { checkFeatureAccess } from '../middleware/subscription.middleware.js';
import * as healthController from '../controllers/health.controller.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOCX, and TXT files are allowed.'));
    }
  }
});

// Cookbook Routes
router.post(
  '/cookbook/analyze',
  authenticateUser,
  checkFeatureAccess('cookbook'),
  upload.single('file'),
  healthController.analyzeCookbook
);

router.post(
  '/cookbook/recipe',
  authenticateUser,
  checkFeatureAccess('cookbook'),
  healthController.addRecipe
);

router.post(
  '/cookbook/export',
  authenticateUser,
  checkFeatureAccess('cookbook'),
  healthController.exportCookbook
);

// Nutrition Analysis Routes
router.post(
  '/nutrition/analyze',
  authenticateUser,
  checkFeatureAccess('nutritionAnalysis'),
  healthController.analyzeNutrition
);

// Health Content Routes
router.post(
  '/content/generate',
  authenticateUser,
  checkFeatureAccess('healthContent'),
  healthController.generateHealthContent
);

// Medical Disclaimer Routes
router.post(
  '/disclaimer/generate',
  authenticateUser,
  healthController.generateDisclaimer
);

// Medical Citations Routes
router.post(
  '/citations/generate',
  authenticateUser,
  checkFeatureAccess('medicalCitations'),
  healthController.generateCitations
);

export default router;
