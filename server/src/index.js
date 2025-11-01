/**
 * PhoenixForge AI - Backend API Server
 * Main entry point for the Express.js server
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// Import routes
import formatterRoutes from './routes/formatter.routes.js';
import healthRoutes from './routes/health.routes.js';
import healthPublishingRoutes from './routes/health-publishing.routes.js';
import coversRoutes from './routes/covers.routes.js';
import imagesRoutes from './routes/images.routes.js';
import videosRoutes from './routes/videos.routes.js';
import subscriptionRoutes from './routes/subscription.routes.js';

// Import middleware
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ======================
// MIDDLEWARE
// ======================

// Security headers
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// Request logging
app.use(morgan('dev'));

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ======================
// ROUTES
// ======================

// Health check
app.use('/api/healthcheck', healthRoutes);

// Subscription & Billing
app.use('/api/subscription', subscriptionRoutes);

// AI Services
app.use('/api/formatter', formatterRoutes);
app.use('/api/covers', coversRoutes);
app.use('/api/images', imagesRoutes);
app.use('/api/videos', videosRoutes);

// Health Publishing Services
app.use('/api/health', healthPublishingRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'PhoenixForge Platform - Complete Publishing & Health Content Suite',
    version: '4.0.0',
    status: 'running',
    endpoints: {
      healthcheck: '/api/healthcheck',
      subscription: '/api/subscription',
      formatter: '/api/formatter',
      covers: '/api/covers',
      images: '/api/images',
      videos: '/api/videos',
      healthPublishing: '/api/health'
    },
    features: [
      'AI Manuscript Formatting',
      'AI Cover Generation',
      'AI Image Creation',
      'AI Video Trailers',
      'Cookbook Formatting & Nutrition Analysis',
      'Health Content Generation',
      'Medical Citations (AMA Style)',
      'Medical Disclaimers',
      'Subscription Management',
      'Usage Tracking'
    ]
  });
});

// ======================
// ERROR HANDLING
// ======================

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// ======================
// START SERVER
// ======================

app.listen(PORT, () => {
  console.log('🔥 PhoenixForge Platform API Server');
  console.log('====================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`✨ Publishing + Health AI Suite`);
  console.log('====================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

export default app;
