/**
 * Subscription Routes
 */

import express from 'express';
import subscriptionController from '../controllers/subscription.controller.js';
import { requireAuth, extractUser } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/tiers', subscriptionController.getTiers);

// Webhook route (no auth required, verified by Stripe signature)
router.post('/webhook', express.raw({ type: 'application/json' }), subscriptionController.handleWebhook);

// Protected routes
router.get('/me', requireAuth, extractUser, subscriptionController.getMySubscription);
router.post('/checkout', requireAuth, extractUser, subscriptionController.createCheckout);
router.post('/portal', requireAuth, extractUser, subscriptionController.createPortal);
router.get('/history', requireAuth, extractUser, subscriptionController.getJobHistory);

export default router;
