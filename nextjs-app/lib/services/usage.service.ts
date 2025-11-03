/**
 * Usage Service
 *
 * Following SOLID principles:
 * - Single Responsibility: Handles usage tracking and limit checking
 * - Dependency Inversion: Depends on interfaces, not concrete implementations
 */

import type {
  IUsageService,
  IUsageRepository,
  ISubscriptionService,
} from '../core/interfaces'
import type { FeatureType, UsageResult } from '../core/types'
import { UsageLimitError } from '../core/types'

export class UsageService implements IUsageService {
  constructor(
    private readonly usageRepo: IUsageRepository,
    private readonly subscriptionService: ISubscriptionService
  ) {}

  async checkUsageLimit(userId: string, feature: FeatureType): Promise<UsageResult> {
    // Get user's plan
    const plan = await this.subscriptionService.getUserPlan(userId)
    const limits = this.subscriptionService.getPlanLimits(plan)

    // Get feature limit
    const limit = this.getFeatureLimit(limits, feature)

    // -1 means unlimited
    if (limit === -1) {
      return {
        allowed: true,
        remaining: -1,
        limit: -1,
        message: 'Unlimited usage',
      }
    }

    // Get current usage
    const usage = await this.usageRepo.getCurrentMonthUsage(userId)
    const used = this.getFeatureUsage(usage, feature)

    const remaining = limit - used

    if (remaining <= 0) {
      return {
        allowed: false,
        remaining: 0,
        limit,
        message: `Monthly ${feature} limit reached. Upgrade your plan to continue.`,
      }
    }

    return {
      allowed: true,
      remaining,
      limit,
      message: `${remaining} ${feature} remaining this month`,
    }
  }

  async incrementUsage(
    userId: string,
    feature: FeatureType,
    count: number = 1
  ): Promise<void> {
    // Check if user can use feature
    const result = await this.checkUsageLimit(userId, feature)

    if (!result.allowed) {
      throw new UsageLimitError(result.message!)
    }

    // Check if incrementing would exceed limit
    if (result.limit !== -1 && count > result.remaining) {
      throw new UsageLimitError(
        `Cannot use ${count} ${feature}. Only ${result.remaining} remaining.`
      )
    }

    // Increment usage
    await this.usageRepo.incrementUsage(userId, feature, count)
  }

  async getCurrentUsage(userId: string) {
    return this.usageRepo.getCurrentMonthUsage(userId)
  }

  async canUseFeature(userId: string, feature: FeatureType): Promise<boolean> {
    const result = await this.checkUsageLimit(userId, feature)
    return result.allowed
  }

  /**
   * Helper to get feature limit from plan limits
   */
  private getFeatureLimit(
    limits: any,
    feature: FeatureType
  ): number {
    const mapping: Record<FeatureType, keyof typeof limits> = {
      formats: 'formats',
      audiobooks: 'audiobooks',
      covers: 'covers',
      images: 'images',
      cookbooks: 'cookbooks',
      health_content: 'health_content',
      marketing_content: 'marketing_content',
    }

    return limits[mapping[feature]] || 0
  }

  /**
   * Helper to get feature usage from usage record
   */
  private getFeatureUsage(usage: any, feature: FeatureType): number {
    if (!usage) return 0

    const mapping: Record<FeatureType, string> = {
      formats: 'formats_used',
      audiobooks: 'audiobooks_used',
      covers: 'covers_used',
      images: 'images_used',
      cookbooks: 'cookbooks_used',
      health_content: 'health_content_used',
      marketing_content: 'marketing_content_used',
    }

    return usage[mapping[feature]] || 0
  }
}
