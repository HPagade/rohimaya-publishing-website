/**
 * Formatter Controller
 * Handles manuscript formatting requests
 */

import fs from 'fs';
import { promisify } from 'util';
import openaiService from '../services/openai.service.js';
import { deleteFile } from '../config/multer.config.js';

const readFile = promisify(fs.readFile);

class FormatterController {
  /**
   * Upload and analyze manuscript
   * POST /api/formatter/upload
   */
  async uploadManuscript(req, res, next) {
    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          error: 'No file uploaded'
        });
      }

      console.log('📄 File uploaded:', req.file.originalname);

      // Read file content
      const filePath = req.file.path;
      const fileBuffer = await readFile(filePath);
      const text = fileBuffer.toString('utf-8');

      // Validate text content
      if (!text || text.trim().length === 0) {
        deleteFile(filePath);
        return res.status(400).json({
          success: false,
          error: 'File appears to be empty or unreadable'
        });
      }

      // Check if OpenAI is configured
      if (!openaiService.isConfigured()) {
        // Return mock data if OpenAI not configured
        console.log('⚠️  OpenAI not configured, returning mock data');

        const mockChapters = openaiService._extractChaptersFromText(text);

        deleteFile(filePath);

        return res.json({
          success: true,
          mode: 'mock',
          data: {
            fileName: req.file.originalname,
            fileSize: req.file.size,
            wordCount: text.split(/\s+/).length,
            chapters: mockChapters.slice(0, 5), // Limit to first 5
            message: 'OpenAI API not configured. Using basic chapter detection.'
          }
        });
      }

      // Analyze with OpenAI
      const analysis = await openaiService.analyzeManuscript(text);

      // Clean up uploaded file
      deleteFile(filePath);

      // Return results
      res.json({
        success: true,
        mode: 'ai',
        data: {
          fileName: req.file.originalname,
          fileSize: req.file.size,
          wordCount: text.split(/\s+/).length,
          chapters: analysis.chapters || [],
          frontMatter: analysis.frontMatter || {},
          backMatter: analysis.backMatter || {},
          metadata: analysis.metadata || {}
        }
      });

    } catch (error) {
      // Clean up file on error
      if (req.file) {
        deleteFile(req.file.path);
      }
      next(error);
    }
  }

  /**
   * Format manuscript for export
   * POST /api/formatter/format
   */
  async formatManuscript(req, res, next) {
    try {
      const { chapters, format, template } = req.body;

      if (!chapters || !Array.isArray(chapters)) {
        return res.status(400).json({
          success: false,
          error: 'Chapters data required'
        });
      }

      console.log(`📚 Formatting manuscript as ${format}...`);

      // For now, return mock formatted content
      // In production, you would generate actual ePub/PDF/MOBI files
      const mockFormattedContent = {
        format: format || 'epub',
        template: template || 'modern',
        chapters: chapters,
        generated: true,
        downloadUrl: '/api/formatter/download/mock-file-id',
        message: 'Formatting complete! (Mock mode - actual file generation requires additional libraries)'
      };

      res.json({
        success: true,
        data: mockFormattedContent
      });

    } catch (error) {
      next(error);
    }
  }

  /**
   * Get formatting status
   * GET /api/formatter/status/:jobId
   */
  async getStatus(req, res, next) {
    try {
      const { jobId } = req.params;

      // Mock status response
      res.json({
        success: true,
        data: {
          jobId,
          status: 'completed',
          progress: 100,
          message: 'Formatting complete'
        }
      });

    } catch (error) {
      next(error);
    }
  }
}

export default new FormatterController();
