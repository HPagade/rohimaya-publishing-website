/**
 * Referral Service
 *
 * Following SOLID principles:
 * - Single Responsibility: Handles referral program logic
 * - Dependency Inversion: Depends on interfaces
 */

import type { IReferralService, IReferralRepository } from '../core/interfaces'
import type { Referral, ReferralStats } from '../core/types'
import { ValidationError } from '../core/types'

export class ReferralService implements IReferralService {
  constructor(private readonly referralRepo: IReferralRepository) {}

  async generateReferralCode(userId: string): Promise<string> {
    // Generate unique code: First 4 chars of user ID + random 4 chars
    const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase()
    const userPart = userId.substring(0, 4).toUpperCase()
    const code = `${userPart}${randomPart}`

    // Create pending referral record
    await this.referralRepo.create({
      referrer_user_id: userId,
      referral_code: code,
      status: 'pending',
      reward_given: false,
    })

    return code
  }

  async getReferralStats(userId: string): Promise<ReferralStats> {
    const referrals = await this.referralRepo.findByReferrerUserId(userId)

    const completedReferrals = referrals.filter((r) => r.status === 'completed' || r.status === 'rewarded')
    const pendingReferrals = referrals.filter((r) => r.status === 'pending')
    const rewardedReferrals = referrals.filter((r) => r.reward_given)

    return {
      total_referrals: referrals.length,
      completed_referrals: completedReferrals.length,
      pending_referrals: pendingReferrals.length,
      total_rewards_earned: rewardedReferrals.length,
      conversion_rate:
        referrals.length > 0
          ? (completedReferrals.length / referrals.length) * 100
          : 0,
    }
  }

  async trackReferral(referralCode: string, newUserId: string): Promise<void> {
    // Find pending referral by code
    const referral = await this.referralRepo.findByReferralCode(referralCode)

    if (!referral) {
      throw new ValidationError('Invalid referral code')
    }

    // Don't allow self-referral
    if (referral.referrer_user_id === newUserId) {
      throw new ValidationError('Cannot refer yourself')
    }

    // Mark referral as completed
    await this.referralRepo.markAsCompleted(referral.id, newUserId)
  }

  async processReferralReward(referralId: string): Promise<void> {
    const referral = await this.referralRepo.findById(referralId)

    if (!referral) {
      throw new ValidationError('Referral not found')
    }

    if (referral.reward_given) {
      return // Already rewarded
    }

    if (referral.status !== 'completed') {
      throw new ValidationError('Referral must be completed before rewarding')
    }

    // Mark as rewarded
    await this.referralRepo.markAsRewarded(referralId)

    // Reward logic handled in webhook/background job
    // This service just marks it as ready for reward
  }

  async getUserReferrals(userId: string): Promise<Referral[]> {
    return this.referralRepo.findByReferrerUserId(userId)
  }
}
