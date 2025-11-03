/**
 * Template Service with Strategy Pattern
 *
 * Following SOLID principles:
 * - Strategy Pattern: Different template strategies for each product type
 * - Open/Closed: New product types can be added without modifying existing code
 * - Single Responsibility: Each strategy handles one product type
 */

import type {
  ITemplateService,
  ITemplateStrategy,
  ITemplateRepository,
  IProjectRepository,
} from '../core/interfaces'
import type { Template, Project, ProductType } from '../core/types'
import { NotFoundError, ValidationError } from '../core/types'

/**
 * Base template strategy
 */
abstract class BaseTemplateStrategy implements ITemplateStrategy {
  abstract getProductType(): ProductType
  abstract getDefaultTemplate(): Record<string, any>

  validateTemplateData(data: Record<string, any>): boolean {
    return data !== null && typeof data === 'object'
  }

  applyTemplate(
    currentData: Record<string, any>,
    templateData: Record<string, any>
  ): Record<string, any> {
    // Default: merge template data with current data, template takes precedence
    return { ...currentData, ...templateData }
  }
}

/**
 * Formatter template strategy
 */
class FormatterTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'formatter'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      format: 'trade_paperback',
      pageSize: 'us_trade',
      margins: { top: 1, bottom: 1, left: 0.75, right: 0.75 },
      font: 'Georgia',
      fontSize: 12,
      lineSpacing: 1.5,
      includePageNumbers: true,
      includeToc: true,
    }
  }
}

/**
 * Audiobook template strategy
 */
class AudiobookTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'audiobook'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      voice: 'alloy',
      speed: 1.0,
      splitByChapter: true,
      addIntro: false,
      addOutro: false,
    }
  }
}

/**
 * Covers template strategy
 */
class CoversTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'covers'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      bookType: 'novel',
      spine: '0.5',
      paperType: 'white',
      binding: 'perfect',
      coverStyle: 'modern',
    }
  }
}

/**
 * Images template strategy
 */
class ImagesTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'images'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      style: 'illustration',
      size: 'square',
      quality: 'hd',
      count: 1,
    }
  }
}

/**
 * Cookbook template strategy
 */
class CookbookTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'cookbook'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      layout: 'modern',
      includeImages: true,
      recipesPerPage: 1,
      includeTips: true,
    }
  }
}

/**
 * Health template strategy
 */
class HealthTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'health'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      contentType: 'workout',
      level: 'intermediate',
      duration: '30-minutes',
    }
  }
}

/**
 * Marketing template strategy
 */
class MarketingTemplateStrategy extends BaseTemplateStrategy {
  getProductType(): ProductType {
    return 'marketing'
  }

  getDefaultTemplate(): Record<string, any> {
    return {
      contentType: 'social',
      platform: 'Twitter',
      tone: 'professional',
      variations: 3,
    }
  }
}

/**
 * Template Service implementation
 */
export class TemplateService implements ITemplateService {
  private strategies: Map<ProductType, ITemplateStrategy>

  constructor(
    private readonly templateRepo: ITemplateRepository,
    private readonly projectRepo: IProjectRepository
  ) {
    // Register all strategies (Strategy Pattern)
    this.strategies = new Map([
      ['formatter', new FormatterTemplateStrategy()],
      ['audiobook', new AudiobookTemplateStrategy()],
      ['covers', new CoversTemplateStrategy()],
      ['images', new ImagesTemplateStrategy()],
      ['cookbook', new CookbookTemplateStrategy()],
      ['health', new HealthTemplateStrategy()],
      ['marketing', new MarketingTemplateStrategy()],
    ])
  }

  async getTemplate(templateId: string): Promise<Template> {
    const template = await this.templateRepo.findById(templateId)

    if (!template) {
      throw new NotFoundError('Template')
    }

    return template
  }

  async getTemplatesForProduct(type: ProductType): Promise<Template[]> {
    return this.templateRepo.findByProductType(type)
  }

  async applyTemplate(projectId: string, templateId: string): Promise<Project> {
    // Get project
    const project = await this.projectRepo.findById(projectId)
    if (!project) {
      throw new NotFoundError('Project')
    }

    // Get template
    const template = await this.getTemplate(templateId)

    // Verify template matches project type
    if (template.product_type !== project.product_type) {
      throw new ValidationError(
        `Template type (${template.product_type}) doesn't match project type (${project.product_type})`
      )
    }

    // Get strategy for product type
    const strategy = this.strategies.get(project.product_type)
    if (!strategy) {
      throw new ValidationError(`No strategy found for product type: ${project.product_type}`)
    }

    // Apply template using strategy
    const mergedData = strategy.applyTemplate(project.data, template.data)

    // Update project
    return this.projectRepo.update(projectId, { data: mergedData })
  }

  /**
   * Get default template for product type
   */
  getDefaultTemplateData(type: ProductType): Record<string, any> {
    const strategy = this.strategies.get(type)
    if (!strategy) {
      throw new ValidationError(`No strategy found for product type: ${type}`)
    }

    return strategy.getDefaultTemplate()
  }
}
