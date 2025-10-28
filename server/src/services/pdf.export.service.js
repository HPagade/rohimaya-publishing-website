/**
 * PDF Export Service
 * Generates print-ready PDF files for KDP, IngramSpark, and other platforms
 */

import PDFDocument from 'pdfkit';
import fs from 'fs-extra';
import path from 'path';

class PDFExportService {
  /**
   * Generate print-ready PDF
   * @param {Object} manuscript - Manuscript data
   * @param {Object} options - PDF generation options
   * @returns {Promise<string>} - Path to generated PDF file
   */
  async generatePDF(manuscript, options = {}) {
    try {
      console.log('📕 Generating print-ready PDF...');

      const {
        title = 'Untitled',
        author = 'Unknown Author',
        genre = 'fiction',
        chapters = [],
        text = ''
      } = manuscript;

      const {
        format = '6x9', // KDP standard trade paperback
        bleed = true,
        pageNumbers = true,
        chapterPages = true
      } = options;

      // Get page dimensions
      const dimensions = this._getPageDimensions(format, bleed);

      // Create output directory
      const outputDir = path.join(process.cwd(), 'temp', 'exports');
      await fs.ensureDir(outputDir);

      // Generate unique filename
      const filename = `${this._sanitizeFilename(title)}-print.pdf`;
      const outputPath = path.join(outputDir, filename);

      // Create PDF document
      const doc = new PDFDocument({
        size: [dimensions.width, dimensions.height],
        margins: dimensions.margins,
        info: {
          Title: title,
          Author: author,
          Creator: 'AI Book Formatter',
          Producer: 'AI Book Formatter'
        }
      });

      // Pipe to file
      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // Generate PDF content
      await this._generatePDFContent(doc, manuscript, options, dimensions);

      // Finalize PDF
      doc.end();

      // Wait for stream to finish
      await new Promise((resolve, reject) => {
        stream.on('finish', resolve);
        stream.on('error', reject);
      });

      console.log(`✅ PDF generated: ${outputPath}`);

      return {
        path: outputPath,
        filename: filename,
        size: (await fs.stat(outputPath)).size
      };
    } catch (error) {
      console.error('❌ PDF generation error:', error.message);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }

  /**
   * Generate PDF content
   * @private
   */
  async _generatePDFContent(doc, manuscript, options, dimensions) {
    const { title, author, chapters, text } = manuscript;

    // Add title page
    this._addTitlePage(doc, title, author, dimensions);

    // Add copyright page
    doc.addPage();
    this._addCopyrightPage(doc, title, author);

    // Add chapters
    if (chapters && chapters.length > 0) {
      for (let i = 0; i < chapters.length; i++) {
        const chapter = chapters[i];
        this._addChapter(doc, chapter, i + 1, options);
      }
    } else {
      // No chapters detected - add as single body
      doc.addPage();
      doc.fontSize(12).text(text, {
        align: 'justify',
        lineGap: 3
      });
    }

    // Add page numbers if requested
    if (options.pageNumbers) {
      this._addPageNumbers(doc, dimensions);
    }
  }

  /**
   * Add title page
   * @private
   */
  _addTitlePage(doc, title, author, dimensions) {
    const pageHeight = dimensions.height;
    const centerY = pageHeight / 2;

    doc
      .fontSize(32)
      .font('Helvetica-Bold')
      .text(title, {
        align: 'center',
        valign: 'center'
      })
      .moveDown(3)
      .fontSize(18)
      .font('Helvetica')
      .text(author, {
        align: 'center'
      });
  }

  /**
   * Add copyright page
   * @private
   */
  _addCopyrightPage(doc, title, author) {
    const year = new Date().getFullYear();

    doc
      .fontSize(10)
      .font('Helvetica')
      .text(`Copyright © ${year} ${author}`, {
        align: 'center'
      })
      .moveDown()
      .text('All rights reserved.', { align: 'center' })
      .moveDown(2)
      .fontSize(8)
      .text(
        'No part of this book may be reproduced or transmitted in any form or by any means, electronic or mechanical, including photocopying, recording, or by any information storage and retrieval system, without permission in writing from the publisher.',
        {
          align: 'left'
        }
      )
      .moveDown(2)
      .text(`Published ${year}`, { align: 'left' })
      .text('Formatted by AI Book Formatter', { align: 'left' });
  }

  /**
   * Add chapter to PDF
   * @private
   */
  _addChapter(doc, chapter, chapterNumber, options) {
    // Start new page for chapter
    doc.addPage();

    // Chapter title
    doc
      .fontSize(20)
      .font('Helvetica-Bold')
      .text(`Chapter ${chapterNumber}`, {
        align: 'center'
      });

    if (chapter.title && !chapter.title.startsWith('Chapter')) {
      doc.moveDown(0.5).fontSize(16).text(chapter.title, {
        align: 'center'
      });
    }

    doc.moveDown(2);

    // Chapter content
    doc
      .fontSize(12)
      .font('Helvetica')
      .text(chapter.content || chapter.text || '', {
        align: 'justify',
        lineGap: 3,
        indent: 30 // First line indent
      });
  }

  /**
   * Add page numbers to all pages
   * @private
   */
  _addPageNumbers(doc, dimensions) {
    const pages = doc.bufferedPageRange();

    for (let i = 2; i < pages.count; i++) {
      // Skip title and copyright
      doc.switchToPage(i);

      doc
        .fontSize(10)
        .text(
          String(i - 1), // Start numbering from 1 after front matter
          50,
          dimensions.height - 50,
          {
            align: 'center'
          }
        );
    }
  }

  /**
   * Get page dimensions based on format
   * @private
   */
  _getPageDimensions(format, withBleed = false) {
    // Dimensions in points (1 inch = 72 points)
    const formats = {
      '6x9': { width: 432, height: 648 }, // Standard trade paperback
      '5.5x8.5': { width: 396, height: 612 }, // Digest
      '5x8': { width: 360, height: 576 }, // Mass market
      '8.5x11': { width: 612, height: 792 } // Standard letter
    };

    let dims = formats[format] || formats['6x9'];

    // Add bleed if requested (0.125 inches = 9 points on each side)
    if (withBleed) {
      dims = {
        width: dims.width + 18,
        height: dims.height + 18
      };
    }

    // Standard margins
    dims.margins = {
      top: 54, // 0.75 inches
      bottom: 54,
      left: 54,
      right: 54
    };

    return dims;
  }

  /**
   * Sanitize filename
   * @private
   */
  _sanitizeFilename(filename) {
    return filename
      .replace(/[^a-z0-9]/gi, '-')
      .replace(/-+/g, '-')
      .toLowerCase();
  }
}

export default new PDFExportService();
