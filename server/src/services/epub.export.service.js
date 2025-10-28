/**
 * ePub/Kindle Export Service
 * Generates ePub files compatible with Kindle, Apple Books, and other platforms
 */

import Epub from 'epub-gen-memory';
import fs from 'fs-extra';
import path from 'path';

class EpubExportService {
  /**
   * Generate ePub file
   * @param {Object} manuscript - Manuscript data
   * @param {Object} options - ePub generation options
   * @returns {Promise<string>} - Path to generated ePub file
   */
  async generateEpub(manuscript, options = {}) {
    try {
      console.log('📱 Generating ePub file...');

      const {
        title = 'Untitled',
        author = 'Unknown Author',
        genre = 'fiction',
        chapters = [],
        text = ''
      } = manuscript;

      // Create output directory
      const outputDir = path.join(process.cwd(), 'temp', 'exports');
      await fs.ensureDir(outputDir);

      // Generate unique filename
      const filename = `${this._sanitizeFilename(title)}-kindle.epub`;
      const outputPath = path.join(outputDir, filename);

      // Prepare chapter content
      const content = this._prepareChapters(chapters, text, genre);

      // ePub options
      const epubOptions = {
        title: title,
        author: author,
        publisher: options.publisher || 'Self-Published',
        cover: options.coverImage, // Optional cover image URL or path
        content: content,
        lang: options.language || 'en',
        tocTitle: 'Table of Contents',
        appendChapterTitles: false,
        // Kindle-specific optimizations
        css: this._getKindleCSS(genre),
        fonts: [],
        verbose: false
      };

      // Generate ePub
      const epubBuffer = await new Epub(epubOptions, outputPath).promise;

      // Write to file
      await fs.writeFile(outputPath, epubBuffer);

      console.log(`✅ ePub generated: ${outputPath}`);

      return {
        path: outputPath,
        filename: filename,
        size: (await fs.stat(outputPath)).size
      };
    } catch (error) {
      console.error('❌ ePub generation error:', error.message);
      throw new Error(`Failed to generate ePub: ${error.message}`);
    }
  }

  /**
   * Prepare chapters for ePub
   * @private
   */
  _prepareChapters(chapters, text, genre) {
    const content = [];

    if (chapters && chapters.length > 0) {
      // Process detected chapters
      chapters.forEach((chapter, index) => {
        const chapterTitle = chapter.title || `Chapter ${index + 1}`;
        const chapterContent = chapter.content || chapter.text || '';

        content.push({
          title: chapterTitle,
          data: this._formatChapterContent(chapterContent, genre)
        });
      });
    } else {
      // No chapters detected - create single chapter
      content.push({
        title: 'Book',
        data: this._formatChapterContent(text, genre)
      });
    }

    return content;
  }

  /**
   * Format chapter content with appropriate HTML
   * @private
   */
  _formatChapterContent(content, genre) {
    // Split into paragraphs
    const paragraphs = content.split(/\n\n+/);

    // Format each paragraph
    const formattedParagraphs = paragraphs.map((para) => {
      const trimmed = para.trim();
      if (!trimmed) return '';

      // Check if it's a heading or dialogue
      if (this._isHeading(trimmed)) {
        return `<h2>${trimmed}</h2>`;
      } else if (genre === 'childrens' || genre === 'children') {
        // Children's books: larger text, more spacing
        return `<p class="children">${trimmed.replace(/\n/g, '<br>')}</p>`;
      } else if (genre === 'cookbook') {
        // Cookbook: special formatting for ingredients/steps
        return this._formatCookbookContent(trimmed);
      } else {
        // Standard fiction/non-fiction
        return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
      }
    });

    return formattedParagraphs.join('\n');
  }

  /**
   * Check if text is a heading
   * @private
   */
  _isHeading(text) {
    return (
      text.length < 100 &&
      (text.match(/^[A-Z\s]+$/) || // All caps
        text.match(/^Chapter\s+\d+/i) || // Chapter heading
        text.match(/^Part\s+\d+/i)) // Part heading
    );
  }

  /**
   * Format cookbook-specific content
   * @private
   */
  _formatCookbookContent(text) {
    // Check for ingredients list
    if (text.match(/ingredients:/i)) {
      const parts = text.split(/instructions?:/i);
      let html = '<div class="recipe">';

      if (parts[0]) {
        html += '<h3>Ingredients</h3><ul>';
        const ingredients = parts[0]
          .replace(/ingredients:/i, '')
          .trim()
          .split('\n');
        ingredients.forEach((ing) => {
          if (ing.trim()) html += `<li>${ing.trim()}</li>`;
        });
        html += '</ul>';
      }

      if (parts[1]) {
        html += '<h3>Instructions</h3><ol>';
        const steps = parts[1].trim().split('\n');
        steps.forEach((step) => {
          if (step.trim()) html += `<li>${step.trim()}</li>`;
        });
        html += '</ol>';
      }

      html += '</div>';
      return html;
    }

    return `<p>${text}</p>`;
  }

  /**
   * Get Kindle-optimized CSS based on genre
   * @private
   */
  _getKindleCSS(genre) {
    const baseCSS = `
      body {
        font-family: Georgia, serif;
        line-height: 1.6;
        text-align: justify;
      }

      h1, h2, h3 {
        font-family: Helvetica, Arial, sans-serif;
        text-align: center;
        margin: 1em 0;
        page-break-after: avoid;
      }

      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.2em; }

      p {
        margin: 0;
        text-indent: 1.5em;
        orphans: 2;
        widows: 2;
      }

      p:first-of-type {
        text-indent: 0;
      }

      /* Page breaks */
      .chapter {
        page-break-before: always;
      }
    `;

    // Genre-specific CSS
    const genreCSS = {
      children: `
        p.children {
          font-size: 1.2em;
          line-height: 1.8;
          text-indent: 0;
        }
      `,
      cookbook: `
        .recipe {
          margin: 1em 0;
        }
        .recipe h3 {
          text-align: left;
          font-size: 1.1em;
          margin-top: 1em;
        }
        .recipe ul, .recipe ol {
          margin-left: 1.5em;
        }
        .recipe li {
          margin: 0.5em 0;
        }
      `,
      poetry: `
        p {
          text-align: left;
          text-indent: 0;
          font-style: italic;
        }
      `
    };

    return baseCSS + (genreCSS[genre] || '');
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

export default new EpubExportService();
