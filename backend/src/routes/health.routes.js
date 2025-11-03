/**
 * Health Check Routes
 * Simple endpoint to verify server is running
 */

import express from 'express';

const router = express.Router();

// GET /api/health
router.get('/', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
