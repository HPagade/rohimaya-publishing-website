/**
 * Publication Standards Service
 * Ensures manuscripts meet requirements for major publishing platforms
 */

class PublicationStandardsService {
  constructor() {
    // Define publication platform specifications
    this.platforms = {
      kdp: {
        name: 'Amazon KDP',
        formats: {
          'trade-paperback-6x9': {
            width: 6,
            height: 9,
            unit: 'in',
            marginTop: 0.75,
            marginBottom: 0.75,
            marginInner: 0.875, // Binding side
            marginOuter: 0.625,
            bleed: 0.125,
            minPageCount: 24,
            maxPageCount: 828,
            dpi: 300
          },
          'trade-paperback-5x8': {
            width: 5,
            height: 8,
            unit: 'in',
            marginTop: 0.5,
            marginBottom: 0.5,
            marginInner: 0.625,
            marginOuter: 0.5,
            bleed: 0.125,
            minPageCount: 24,
            maxPageCount: 828,
            dpi: 300
          },
          'large-8.5x11': {
            width: 8.5,
            height: 11,
            unit: 'in',
            marginTop: 1,
            marginBottom: 1,
            marginInner: 1,
            marginOuter: 0.75,
            bleed: 0.125,
            minPageCount: 24,
            maxPageCount: 480,
            dpi: 300
          }
        },
        colorMode: ['bw', 'premium-color'],
        paperType: ['white', 'cream'],
        coverFinish: ['matte', 'glossy']
      },
      ingramspark: {
        name: 'IngramSpark',
        formats: {
          'trade-paperback-6x9': {
            width: 6,
            height: 9,
            unit: 'in',
            marginTop: 0.75,
            marginBottom: 0.75,
            marginInner: 0.75,
            marginOuter: 0.5,
            bleed: 0.125,
            minPageCount: 18,
            maxPageCount: 800,
            dpi: 300
          },
          'trade-paperback-5x8': {
            width: 5,
            height: 8,
            unit: 'in',
            marginTop: 0.5,
            marginBottom: 0.5,
            marginInner: 0.625,
            marginOuter: 0.5,
            bleed: 0.125,
            minPageCount: 18,
            maxPageCount: 800,
            dpi: 300
          },
          'hardcover-6x9': {
            width: 6,
            height: 9,
            unit: 'in',
            marginTop: 0.75,
            marginBottom: 0.75,
            marginInner: 0.875,
            marginOuter: 0.625,
            bleed: 0.125,
            minPageCount: 18,
            maxPageCount: 800,
            dpi: 300
          }
        },
        colorMode: ['bw', 'standard-color', 'premium-color'],
        paperType: ['white', 'cream', 'groundwood'],
        coverFinish: ['matte', 'glossy', 'linen']
      },
      bnpress: {
        name: 'Barnes & Noble Press',
        formats: {
          'trade-paperback-6x9': {
            width: 6,
            height: 9,
            unit: 'in',
            marginTop: 0.75,
            marginBottom: 0.75,
            marginInner: 0.75,
            marginOuter: 0.5,
            bleed: 0.125,
            minPageCount: 24,
            maxPageCount: 800,
            dpi: 300
          },
          'trade-paperback-5x8': {
            width: 5,
            height: 8,
            unit: 'in',
            marginTop: 0.5,
            marginBottom: 0.5,
            marginInner: 0.625,
            marginOuter: 0.5,
            bleed: 0.125,
            minPageCount: 24,
            maxPageCount: 800,
            dpi: 300
          }
        },
        colorMode: ['bw', 'color'],
        paperType: ['white', 'cream']
      },
      applebooks: {
        name: 'Apple Books',
        formats: {
          epub: {
            maxFileSize: 2000, // MB
            imageFormats: ['jpg', 'png', 'gif'],
            coverRequired: true,
            tocRequired: true,
            isbn: 'required'
          }
        }
      },
      draft2digital: {
        name: 'Draft2Digital',
        formats: {
          epub: {
            maxFileSize: 650, // MB
            imageFormats: ['jpg', 'png'],
            coverRequired: true,
            tocRequired: true
          }
        }
      }
    };
  }

  /**
   * Get format specifications for a platform
   * @param {string} platform - Platform name (kdp, ingramspark, etc.)
   * @param {string} format - Format type (trade-paperback-6x9, etc.)
   * @returns {Object} Format specifications
   */
  getFormatSpecs(platform, format) {
    const platformData = this.platforms[platform];

    if (!platformData) {
      throw new Error(`Unknown platform: ${platform}`);
    }

    const formatSpecs = platformData.formats[format];

    if (!formatSpecs) {
      throw new Error(`Unknown format ${format} for platform ${platform}`);
    }

    return {
      platform: platformData.name,
      format,
      specs: formatSpecs
    };
  }

  /**
   * Validate manuscript meets platform requirements
   * @param {Object} manuscript - Manuscript data
   * @param {string} platform - Target platform
   * @param {string} format - Target format
   * @returns {Object} Validation result
   */
  validateManuscript(manuscript, platform, format) {
    const specs = this.getFormatSpecs(platform, format);
    const errors = [];
    const warnings = [];

    // Validate page count
    const pageCount = manuscript.pageCount || this._estimatePageCount(manuscript);

    if (specs.specs.minPageCount && pageCount < specs.specs.minPageCount) {
      errors.push(`Page count (${pageCount}) is below minimum (${specs.specs.minPageCount}) for ${specs.platform}`);
    }

    if (specs.specs.maxPageCount && pageCount > specs.specs.maxPageCount) {
      errors.push(`Page count (${pageCount}) exceeds maximum (${specs.specs.maxPageCount}) for ${specs.platform}`);
    }

    // Validate images if present
    if (manuscript.images && manuscript.images.length > 0) {
      manuscript.images.forEach((image, index) => {
        if (image.size > 10485760) { // 10MB
          warnings.push(`Image ${index + 1} (${image.fileName}) exceeds recommended size of 10MB`);
        }
      });
    }

    // Check for ISBN
    if (!manuscript.isbn && platform === 'applebooks') {
      errors.push('ISBN is required for Apple Books');
    }

    return {
      valid: errors.length === 0,
      errors,
      warnings,
      specs,
      estimatedPageCount: pageCount
    };
  }

  /**
   * Generate copyright page content
   * @param {Object} bookInfo - Book information
   * @returns {string} Copyright page HTML
   */
  generateCopyrightPage(bookInfo) {
    const {
      title,
      author,
      isbn,
      publisher = 'Self-Published',
      copyrightYear = new Date().getFullYear(),
      edition = 'First Edition',
      disclaimer = null
    } = bookInfo;

    let copyrightHtml = `
      <div class="copyright-page">
        <h2>${title}</h2>
        <p>by ${author}</p>
        <br/>
        <p>Copyright © ${copyrightYear} by ${author}</p>
        <p>All rights reserved.</p>
        <br/>
        <p>${edition}</p>
        <br/>`;

    if (isbn) {
      copyrightHtml += `<p>ISBN: ${isbn}</p><br/>`;
    }

    copyrightHtml += `
        <p>Published by ${publisher}</p>
        <br/>
        <p>No part of this publication may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the publisher, except in the case of brief quotations embodied in critical reviews and certain other noncommercial uses permitted by copyright law.</p>`;

    if (disclaimer) {
      copyrightHtml += `<br/><p class="disclaimer">${disclaimer}</p>`;
    }

    copyrightHtml += `
      </div>`;

    return copyrightHtml;
  }

  /**
   * Generate ISBN barcode data
   * @param {string} isbn - ISBN number
   * @returns {Object} Barcode data
   */
  generateISBNBarcode(isbn) {
    // Clean ISBN (remove dashes)
    const cleanISBN = isbn.replace(/-/g, '');

    // Validate ISBN-13
    if (cleanISBN.length !== 13 || !cleanISBN.startsWith('978')) {
      throw new Error('Invalid ISBN-13 format. Must be 13 digits starting with 978 or 979');
    }

    return {
      isbn: cleanISBN,
      displayISBN: isbn,
      format: 'EAN-13',
      barcodeData: cleanISBN,
      // Note: Actual barcode image generation would require a barcode library
      message: 'Barcode data generated. Use barcode library for image generation.'
    };
  }

  /**
   * Get available formats for a platform
   * @param {string} platform - Platform name
   * @returns {Array} Available formats
   */
  getAvailableFormats(platform) {
    const platformData = this.platforms[platform];

    if (!platformData) {
      return [];
    }

    return Object.keys(platformData.formats).map(formatKey => ({
      key: formatKey,
      name: this._formatName(formatKey),
      specs: platformData.formats[formatKey]
    }));
  }

  /**
   * Get all supported platforms
   * @returns {Array} List of platforms
   */
  getAllPlatforms() {
    return Object.keys(this.platforms).map(key => ({
      key,
      name: this.platforms[key].name,
      formats: this.getAvailableFormats(key)
    }));
  }

  /**
   * Estimate page count from word count
   * @private
   */
  _estimatePageCount(manuscript) {
    const wordsPerPage = 250; // Standard estimate
    return Math.ceil((manuscript.wordCount || 0) / wordsPerPage);
  }

  /**
   * Format display name
   * @private
   */
  _formatName(formatKey) {
    return formatKey
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

export default new PublicationStandardsService();
