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
app.use('/api/health', healthRoutes);

// AI Formatter Service
app.use('/api/formatter', formatterRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'AI Book Formatter API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      formatter: '/api/formatter'
    }
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
  console.log('🔥 PhoenixForge AI API Server');
  console.log('================================');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log('================================');
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Promise Rejection:', err);
  process.exit(1);
});

export default app;
