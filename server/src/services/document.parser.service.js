/**
 * Document Parser Service
 * Handles parsing of different document formats (.docx, .pdf, .txt)
 */

import mammoth from 'mammoth';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');
import fs from 'fs-extra';

class DocumentParserService {
  /**
   * Parse document based on file type
   * @param {string} filePath - Path to the file
   * @param {string} fileType - MIME type or extension
   * @returns {Promise<Object>} - Parsed document data
   */
  async parseDocument(filePath, fileType) {
    try {
      console.log(`📖 Parsing document: ${filePath} (${fileType})`);

      // Determine parser based on file type
      if (this._isWordDocument(fileType)) {
        return await this._parseWordDocument(filePath);
      } else if (this._isPDF(fileType)) {
        return await this._parsePDF(filePath);
      } else if (this._isTextFile(fileType)) {
        return await this._parseTextFile(filePath);
      } else {
        throw new Error(`Unsupported file type: ${fileType}`);
      }
    } catch (error) {
      console.error('❌ Document parsing error:', error.message);
      throw new Error(`Failed to parse document: ${error.message}`);
    }
  }

  /**
   * Parse Word document (.docx)
   * @private
   */
  async _parseWordDocument(filePath) {
    try {
      const buffer = await fs.readFile(filePath);
      const result = await mammoth.convertToHtml({ buffer });

      // Extract plain text for analysis
      const plainText = await mammoth.extractRawText({ buffer });

      return {
        html: result.value,
        text: plainText.value,
        wordCount: plainText.value.split(/\s+/).filter(w => w).length,
        format: 'docx',
        warnings: result.messages
      };
    } catch (error) {
      throw new Error(`Word document parsing failed: ${error.message}`);
    }
  }

  /**
   * Parse PDF document
   * @private
   */
  async _parsePDF(filePath) {
    try {
      const dataBuffer = await fs.readFile(filePath);
      const data = await pdfParse(dataBuffer);

      return {
        text: data.text,
        html: this._textToHtml(data.text),
        wordCount: data.text.split(/\s+/).filter(w => w).length,
        pageCount: data.numpages,
        format: 'pdf',
        metadata: data.info
      };
    } catch (error) {
      throw new Error(`PDF parsing failed: ${error.message}`);
    }
  }

  /**
   * Parse plain text file (.txt)
   * @private
   */
  async _parseTextFile(filePath) {
    try {
      const text = await fs.readFile(filePath, 'utf-8');

      return {
        text: text,
        html: this._textToHtml(text),
        wordCount: text.split(/\s+/).filter(w => w).length,
        format: 'txt'
      };
    } catch (error) {
      throw new Error(`Text file parsing failed: ${error.message}`);
    }
  }

  /**
   * Convert plain text to basic HTML
   * @private
   */
  _textToHtml(text) {
    return text
      .split('\n\n')
      .map(paragraph => `<p>${paragraph.replace(/\n/g, '<br>')}</p>`)
      .join('\n');
  }

  /**
   * Check if file is a Word document
   * @private
   */
  _isWordDocument(fileType) {
    return (
      fileType.includes('word') ||
      fileType.includes('.docx') ||
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    );
  }

  /**
   * Check if file is a PDF
   * @private
   */
  _isPDF(fileType) {
    return fileType.includes('pdf') || fileType === 'application/pdf';
  }

  /**
   * Check if file is plain text
   * @private
   */
  _isTextFile(fileType) {
    return (
      fileType.includes('text') ||
      fileType === 'text/plain' ||
      fileType.endsWith('.txt')
    );
  }
}

export default new DocumentParserService();
