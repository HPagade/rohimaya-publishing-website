/**
 * Image Processing Service
 * Handles image uploads, optimization, and placement for manuscripts
 */

import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ImageProcessingService {
  constructor() {
    this.uploadsDir = path.join(__dirname, '../../../uploads/images');
    this.maxImageSize = 10485760; // 10MB per image
    this.supportedFormats = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];

    // Ensure uploads directory exists
    fs.ensureDirSync(this.uploadsDir);
  }

  /**
   * Process uploaded images for a manuscript
   * @param {Array} images - Array of image files
   * @param {string} jobId - Job ID for organization
   * @returns {Promise<Array>} Processed image data
   */
  async processImages(images, jobId) {
    if (!images || images.length === 0) {
      return [];
    }

    const processedImages = [];
    const jobImageDir = path.join(this.uploadsDir, jobId);
    await fs.ensureDir(jobImageDir);

    for (let i = 0; i < images.length; i++) {
      const image = images[i];

      try {
        // Validate image
        this._validateImage(image);

        // Save image
        const fileName = `image_${i + 1}${path.extname(image.originalname)}`;
        const imagePath = path.join(jobImageDir, fileName);
        await fs.writeFile(imagePath, image.buffer);

        // Get image info
        const stats = await fs.stat(imagePath);

        processedImages.push({
          id: `img_${i + 1}`,
          fileName,
          originalName: image.originalname,
          path: imagePath,
          size: stats.size,
          mimeType: image.mimetype,
          position: null, // Will be set by user
          caption: '', // Will be set by user
          width: null,
          height: null
        });
      } catch (error) {
        console.error(`Error processing image ${image.originalname}:`, error);
        throw new Error(`Failed to process image: ${image.originalname}`);
      }
    }

    return processedImages;
  }

  /**
   * Position images within manuscript chapters
   * @param {Array} chapters - Manuscript chapters
   * @param {Array} imagePlacements - Image placement instructions
   * @returns {Array} Chapters with images inserted
   */
  positionImages(chapters, imagePlacements) {
    if (!imagePlacements || imagePlacements.length === 0) {
      return chapters;
    }

    const chaptersWithImages = [...chapters];

    imagePlacements.forEach(placement => {
      const { imageId, chapterNumber, position, caption, fullPage } = placement;
      const chapterIndex = chaptersWithImages.findIndex(ch => ch.number === chapterNumber);

      if (chapterIndex === -1) {
        console.warn(`Chapter ${chapterNumber} not found for image placement`);
        return;
      }

      const chapter = chaptersWithImages[chapterIndex];

      // Create image marker
      const imageMarker = {
        type: 'image',
        id: imageId,
        caption: caption || '',
        fullPage: fullPage || false,
        position: position || 'center'
      };

      // Add image to chapter
      if (!chapter.images) {
        chapter.images = [];
      }
      chapter.images.push(imageMarker);

      // Insert image marker in content at specified position
      if (position === 'start') {
        chapter.content = `[IMAGE:${imageId}]\n\n${chapter.content}`;
      } else if (position === 'end') {
        chapter.content = `${chapter.content}\n\n[IMAGE:${imageId}]`;
      } else if (position === 'middle') {
        const contentParts = chapter.content.split('\n\n');
        const midPoint = Math.floor(contentParts.length / 2);
        contentParts.splice(midPoint, 0, `[IMAGE:${imageId}]`);
        chapter.content = contentParts.join('\n\n');
      }
    });

    return chaptersWithImages;
  }

  /**
   * Generate image placements for cookbooks (recipe images)
   * @param {Array} chapters - Manuscript chapters (recipes)
   * @param {Array} images - Available images
   * @returns {Array} Suggested placements
   */
  generateCookbookPlacements(chapters, images) {
    const placements = [];

    // Place one image per recipe/chapter at the start
    chapters.forEach((chapter, index) => {
      if (images[index]) {
        placements.push({
          imageId: images[index].id,
          chapterNumber: chapter.number,
          position: 'start',
          caption: `${chapter.title}`,
          fullPage: false
        });
      }
    });

    return placements;
  }

  /**
   * Generate image placements for kids books (illustrations)
   * @param {Array} chapters - Manuscript chapters
   * @param {Array} images - Available images
   * @returns {Array} Suggested placements
   */
  generateKidsbookPlacements(chapters, images) {
    const placements = [];

    // For kids books, place images throughout the text
    // Typically 1-2 images per page spread
    const imagesPerChapter = Math.ceil(images.length / chapters.length);

    chapters.forEach((chapter, chapterIndex) => {
      const startImageIndex = chapterIndex * imagesPerChapter;
      const endImageIndex = Math.min(startImageIndex + imagesPerChapter, images.length);

      for (let i = startImageIndex; i < endImageIndex; i++) {
        if (images[i]) {
          // Alternate between full page and inline
          const fullPage = i % 2 === 0;
          const position = fullPage ? 'start' : 'middle';

          placements.push({
            imageId: images[i].id,
            chapterNumber: chapter.number,
            position,
            caption: '',
            fullPage
          });
        }
      }
    });

    return placements;
  }

  /**
   * Optimize image for print (300 DPI)
   * @param {string} imagePath - Path to image
   * @returns {Promise<Object>} Optimization result
   */
  async optimizeForPrint(imagePath) {
    // This would use sharp or similar library for actual optimization
    // For now, return the original image info
    const stats = await fs.stat(imagePath);

    return {
      path: imagePath,
      size: stats.size,
      optimized: false,
      message: 'Image optimization requires sharp library installation'
    };
  }

  /**
   * Validate image file
   * @private
   */
  _validateImage(image) {
    // Check file size
    if (image.size > this.maxImageSize) {
      throw new Error(`Image ${image.originalname} exceeds maximum size of 10MB`);
    }

    // Check file format
    const ext = path.extname(image.originalname).toLowerCase();
    if (!this.supportedFormats.includes(ext)) {
      throw new Error(`Image ${image.originalname} has unsupported format. Supported: ${this.supportedFormats.join(', ')}`);
    }

    return true;
  }

  /**
   * Clean up image files for a job
   * @param {string} jobId - Job ID
   */
  async cleanup(jobId) {
    const jobImageDir = path.join(this.uploadsDir, jobId);

    try {
      await fs.remove(jobImageDir);
      console.log(`Cleaned up images for job ${jobId}`);
    } catch (error) {
      console.error(`Error cleaning up images for job ${jobId}:`, error);
    }
  }
}

export default new ImageProcessingService();
