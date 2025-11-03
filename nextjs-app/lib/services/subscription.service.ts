/**
 * Subscription Service
 *
 * Following SOLID principles:
 * - Single Responsibility: Handles subscription business logic only
 * - Dependency Inversion: Depends on ISubscriptionRepository interface
 * - Open/Closed: Plan configs can be extended without modifying service
 */

import Stripe from 'stripe'
import type { ISubscriptionService, ISubscriptionRepository } from '../core/interfaces'
import type { Subscription, PlanType, PlanLimits, PlanConfig } from '../core/types'

/**
 * Plan configurations - Open/Closed Principle
 * New plans can be added without modifying service logic
 */
const PLAN_CONFIGS: Record<PlanType, PlanConfig> = {
  free: {
    id: 'free',
    name: 'Free',
    price: { monthly: 0, yearly: 0 },
    limits: {
      formats: 3,
      audiobooks: 1,
      covers: 2,
      images: 5,
      cookbooks: 0,
      health_content: 0,
      marketing_content: 0,
    },
    features: ['3 formats per month', '1 audiobook chapter', '2 AI covers', '5 AI images'],
  },
  creator: {
    id: 'creator',
    name: 'Creator',
    price: { monthly: 29, yearly: 279 },
    limits: {
      formats: 50,
      audiobooks: 10,
      covers: 15,
      images: 30,
      cookbooks: 5,
      health_content: 20,
      marketing_content: 50,
    },
    features: [
      '50 formats per month',
      '10 audiobook chapters',
      '15 AI covers',
      '30 AI images',
      '5 cookbooks',
      '20 health content pieces',
      '50 marketing assets',
      'Priority support',
      'HD quality',
    ],
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: { monthly: 79, yearly: 758 },
    limits: {
      formats: -1, // unlimited
      audiobooks: -1,
      covers: -1,
      images: -1,
      cookbooks: -1,
      health_content: -1,
      marketing_content: -1,
    },
    features: [
      'Unlimited everything',
      'All 7 products',
      'Premium support',
      'Ultra HD quality',
      'API access',
    ],
  },
  team: {
    id: 'team',
    name: 'Team',
    price: { monthly: 199, yearly: 1910 },
    limits: {
      formats: -1,
      audiobooks: -1,
      covers: -1,
      images: -1,
      cookbooks: -1,
      health_content: -1,
      marketing_content: -1,
    },
    features: [
      'Everything in Professional',
      '5 team seats',
      'Shared usage pool',
      'Team analytics',
    ],
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: { monthly: 0, yearly: 0 }, // Custom pricing
    limits: {
      formats: -1,
      audiobooks: -1,
      covers: -1,
      images: -1,
      cookbooks: -1,
      health_content: -1,
      marketing_content: -1,
    },
    features: [
      'Everything in Team',
      'Unlimited seats',
      'White-label option',
      'Dedicated support',
      'Custom integrations',
    ],
  },
}

export class SubscriptionService implements ISubscriptionService {
  private stripe: Stripe

  constructor(
    private readonly subscriptionRepo: ISubscriptionRepository,
    stripeSecretKey: string
  ) {
    this.stripe = new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16',
    })
  }

  async getActiveSubscription(userId: string): Promise<Subscription | null> {
    return this.subscriptionRepo.findActiveByUserId(userId)
  }

  async getUserPlan(userId: string): Promise<PlanType> {
    const subscription = await this.getActiveSubscription(userId)

    if (!subscription) {
      return 'free'
    }

    return this.extractPlanFromPriceId(subscription.price_id)
  }

  getPlanLimits(plan: PlanType): PlanLimits {
    return PLAN_CONFIGS[plan].limits
  }

  isTrialing(subscription: Subscription | null): boolean {
    if (!subscription) return false
    if (!subscription.trial_end) return false

    return (
      subscription.status === 'trialing' &&
      new Date(subscription.trial_end) > new Date()
    )
  }

  async createCheckoutSession(
    userId: string,
    priceId: string,
    trialDays: number = 7
  ): Promise<string> {
    const session = await this.stripe.checkout.sessions.create({
      customer_email: undefined, // Will be filled from user record
      client_reference_id: userId,
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: trialDays,
        metadata: {
          user_id: userId,
        },
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        user_id: userId,
      },
    })

    return session.url!
  }

  async cancelSubscription(userId: string): Promise<void> {
    const subscription = await this.getActiveSubscription(userId)

    if (!subscription) {
      throw new Error('No active subscription found')
    }

    await this.subscriptionRepo.cancelAtPeriodEnd(subscription.id)
  }

  /**
   * Helper to extract plan type from Stripe Price ID
   * Following Open/Closed: Can extend with new price ID patterns
   */
  private extractPlanFromPriceId(priceId: string): PlanType {
    const lowercaseId = priceId.toLowerCase()

    if (lowercaseId.includes('creator')) return 'creator'
    if (lowercaseId.includes('professional') || lowercaseId.includes('pro'))
      return 'professional'
    if (lowercaseId.includes('team')) return 'team'
    if (lowercaseId.includes('enterprise')) return 'enterprise'

    return 'free'
  }

  /**
   * Get plan configuration
   */
  getPlanConfig(plan: PlanType): PlanConfig {
    return PLAN_CONFIGS[plan]
  }

  /**
   * Get all available plans
   */
  getAllPlans(): PlanConfig[] {
    return Object.values(PLAN_CONFIGS)
  }
}
