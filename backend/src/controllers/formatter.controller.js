/**
 * Formatter Controller
 * Handles complete manuscript formatting workflow
 */

import fs from 'fs-extra';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import documentParser from '../services/document.parser.service.js';
import openaiService from '../services/openai.service.js';
import pdfExportService from '../services/pdf.export.service.js';
import epubExportService from '../services/epub.export.service.js';
import audiobookService from '../services/audiobook.service.js';

// In-memory job storage (replace with Redis in production)
const jobs = new Map();

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

      const filePath = req.file.path;
      const fileType = req.file.mimetype;

      // Parse document based on type
      const parsedDoc = await documentParser.parseDocument(filePath, fileType);

      // Extract metadata from request body
      const title = req.body.title || 'Untitled';
      const author = req.body.author || 'Unknown Author';
      const genre = req.body.genre || 'fiction';

      // Analyze manuscript structure with AI (if configured)
      let analysis = {
        chapters: [],
        wordCount: parsedDoc.wordCount
      };

      if (openaiService.isConfigured()) {
        try {
          console.log('🤖 Analyzing with AI...');
          analysis = await openaiService.analyzeManuscript(parsedDoc.text);
        } catch (error) {
          console.warn('⚠️  AI analysis failed, using basic detection:', error.message);
          analysis.chapters = this._basicChapterDetection(parsedDoc.text);
        }
      } else {
        console.log('⚠️  OpenAI not configured, using basic chapter detection');
        analysis.chapters = this._basicChapterDetection(parsedDoc.text);
      }

      // Create job
      const jobId = uuidv4();
      const job = {
        id: jobId,
        status: 'analyzed',
        manuscript: {
          title,
          author,
          genre,
          text: parsedDoc.text,
          html: parsedDoc.html,
          wordCount: parsedDoc.wordCount,
          chapters: analysis.chapters || [],
          originalFilename: req.file.originalname
        },
        createdAt: new Date(),
        exportsRequested: [],
        exports: {}
      };

      jobs.set(jobId, job);

      // Clean up uploaded file
      await fs.remove(filePath);

      // Return analysis results
      res.json({
        success: true,
        data: {
          jobId,
          fileName: req.file.originalname,
          wordCount: parsedDoc.wordCount,
          chapterCount: analysis.chapters?.length || 0,
          chapters: (analysis.chapters || []).slice(0, 10), // Send first 10 chapters
          format: parsedDoc.format
        }
      });
    } catch (error) {
      // Clean up file on error
      if (req.file) {
        await fs.remove(req.file.path).catch(() => {});
      }
      next(error);
    }
  }

  /**
   * Process manuscript and generate exports
   * POST /api/formatter/process
   */
  async processManuscript(req, res, next) {
    try {
      const { jobId, exports } = req.body;

      if (!jobId) {
        return res.status(400).json({
          success: false,
          error: 'Job ID required'
        });
      }

      const job = jobs.get(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      // Validate exports
      const requestedExports = exports || [];
      const validExports = ['pdf', 'kindle', 'audiobook'];

      for (const exp of requestedExports) {
        if (!validExports.includes(exp)) {
          return res.status(400).json({
            success: false,
            error: `Invalid export type: ${exp}`
          });
        }
      }

      // Update job status
      job.status = 'processing';
      job.exportsRequested = requestedExports;
      job.options = {
        voice: req.body.voice || 'nova',
        speed: req.body.speed || 1.0
      };

      // Start processing in background (don't await)
      this._processExports(job).catch((error) => {
        console.error('❌ Export processing error:', error);
        job.status = 'failed';
        job.error = error.message;
      });

      // Return immediate response
      res.json({
        success: true,
        data: {
          jobId,
          status: 'processing',
          message: 'Export processing started',
          estimatedTime: this._estimateProcessingTime(job)
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get job status
   * GET /api/formatter/status/:jobId
   */
  async getStatus(req, res, next) {
    try {
      const { jobId } = req.params;

      const job = jobs.get(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      // Return job status
      res.json({
        success: true,
        data: {
          jobId: job.id,
          status: job.status,
          progress: job.progress || 0,
          exports: job.exports,
          error: job.error,
          createdAt: job.createdAt,
          completedAt: job.completedAt
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Download export file
   * GET /api/formatter/download/:jobId/:exportType
   */
  async downloadExport(req, res, next) {
    try {
      const { jobId, exportType } = req.params;

      const job = jobs.get(jobId);
      if (!job) {
        return res.status(404).json({
          success: false,
          error: 'Job not found'
        });
      }

      const exportData = job.exports[exportType];
      if (!exportData || !exportData.path) {
        return res.status(404).json({
          success: false,
          error: 'Export not found or not ready'
        });
      }

      // Check if file exists
      const exists = await fs.pathExists(exportData.path);
      if (!exists) {
        return res.status(404).json({
          success: false,
          error: 'File not found'
        });
      }

      // Send file
      res.download(exportData.path, exportData.filename);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get available voices for audiobook
   * GET /api/formatter/voices
   */
  async getVoices(req, res, next) {
    try {
      const voices = audiobookService.getAvailableVoices();

      res.json({
        success: true,
        data: voices
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Process all requested exports
   * @private
   */
  async _processExports(job) {
    try {
      console.log(`📦 Processing exports for job ${job.id}...`);

      const totalExports = job.exportsRequested.length;
      let completed = 0;

      // Generate PDF
      if (job.exportsRequested.includes('pdf')) {
        console.log('📕 Generating PDF...');
        job.progress = Math.floor((completed / totalExports) * 100);

        const pdfResult = await pdfExportService.generatePDF(job.manuscript, {
          format: '6x9',
          bleed: true,
          pageNumbers: true
        });

        job.exports.pdf = pdfResult;
        completed++;
        job.progress = Math.floor((completed / totalExports) * 100);
      }

      // Generate Kindle/ePub
      if (job.exportsRequested.includes('kindle')) {
        console.log('📱 Generating Kindle/ePub...');
        job.progress = Math.floor((completed / totalExports) * 100);

        const epubResult = await epubExportService.generateEpub(job.manuscript, {
          publisher: job.manuscript.author
        });

        job.exports.kindle = epubResult;
        completed++;
        job.progress = Math.floor((completed / totalExports) * 100);
      }

      // Generate Audiobook
      if (job.exportsRequested.includes('audiobook')) {
        console.log('🎙️  Generating Audiobook...');
        job.progress = Math.floor((completed / totalExports) * 100);

        const audiobookResult = await audiobookService.generateAudiobook(
          job.manuscript,
          {
            voice: job.options.voice,
            speed: job.options.speed
          }
        );

        job.exports.audiobook = {
          path: audiobookResult.zipPath,
          filename: path.basename(audiobookResult.zipPath),
          files: audiobookResult.files,
          totalFiles: audiobookResult.totalFiles
        };

        completed++;
        job.progress = 100;
      }

      // Mark job as complete
      job.status = 'completed';
      job.completedAt = new Date();
      job.progress = 100;

      console.log(`✅ Job ${job.id} completed successfully`);
    } catch (error) {
      console.error(`❌ Job ${job.id} failed:`, error.message);
      job.status = 'failed';
      job.error = error.message;
      throw error;
    }
  }

  /**
   * Basic chapter detection (fallback)
   * @private
   */
  _basicChapterDetection(text) {
    const chapters = [];
    const chapterRegex = /chapter\s+(\d+|one|two|three|four|five|six|seven|eight|nine|ten)[:\s]+([^\n]*)/gi;

    let match;
    let lastIndex = 0;
    let chapterNum = 1;

    while ((match = chapterRegex.exec(text)) !== null) {
      if (lastIndex > 0) {
        // Save previous chapter content
        chapters[chapters.length - 1].content = text
          .substring(lastIndex, match.index)
          .trim();
      }

      chapters.push({
        number: chapterNum++,
        title: match[0].trim(),
        startIndex: match.index,
        content: ''
      });

      lastIndex = match.index;
    }

    // Handle last chapter
    if (chapters.length > 0 && lastIndex > 0) {
      chapters[chapters.length - 1].content = text.substring(lastIndex).trim();
    }

    // If no chapters found, treat entire text as one chapter
    if (chapters.length === 0) {
      chapters.push({
        number: 1,
        title: 'Full Book',
        startIndex: 0,
        content: text
      });
    }

    return chapters;
  }

  /**
   * Estimate processing time
   * @private
   */
  _estimateProcessingTime(job) {
    const baseTime = 30; // 30 seconds base
    const wordCount = job.manuscript.wordCount;
    const exportsCount = job.exportsRequested.length;

    // Estimate: 1 second per 1000 words
    const textTime = Math.ceil(wordCount / 1000);

    // Export times
    const exportTimes = {
      pdf: 20,
      kindle: 15,
      audiobook: Math.ceil(wordCount / 200) // ~200 words per second TTS
    };

    let totalTime = baseTime + textTime;

    job.exportsRequested.forEach((exp) => {
      totalTime += exportTimes[exp] || 10;
    });

    return `${Math.ceil(totalTime / 60)} minutes`;
  }
}

export default new FormatterController();
