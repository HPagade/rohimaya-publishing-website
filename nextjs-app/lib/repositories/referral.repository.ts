/**
 * Referral Repository
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles referral data access
 * - Dependency Inversion: Implements IReferralRepository interface
 */

import { SupabaseClient } from '@supabase/supabase-js'
import type { IReferralRepository } from '../core/interfaces'
import type { Referral } from '../core/types'

export class ReferralRepository implements IReferralRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findById(id: string): Promise<Referral | null> {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw new Error(`Failed to find referral: ${error.message}`)
    }

    return data
  }

  async findAll(): Promise<Referral[]> {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch referrals: ${error.message}`)
    }

    return data || []
  }

  async create(data: Partial<Referral>): Promise<Referral> {
    const { data: referral, error } = await this.supabase
      .from('referrals')
      .insert(data)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create referral: ${error.message}`)
    }

    return referral
  }

  async update(id: string, data: Partial<Referral>): Promise<Referral> {
    const { data: referral, error } = await this.supabase
      .from('referrals')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update referral: ${error.message}`)
    }

    return referral
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('referrals').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete referral: ${error.message}`)
    }
  }

  async findByReferrerUserId(userId: string): Promise<Referral[]> {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .eq('referrer_user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch referrals by user: ${error.message}`)
    }

    return data || []
  }

  async findByReferralCode(code: string): Promise<Referral | null> {
    const { data, error } = await this.supabase
      .from('referrals')
      .select('*')
      .eq('referral_code', code)
      .eq('status', 'pending')
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw new Error(`Failed to find referral by code: ${error.message}`)
    }

    return data
  }

  async markAsCompleted(id: string, refereeUserId: string): Promise<Referral> {
    return this.update(id, {
      status: 'completed',
      referee_user_id: refereeUserId,
      completed_at: new Date().toISOString(),
    })
  }

  async markAsRewarded(id: string): Promise<Referral> {
    return this.update(id, {
      status: 'rewarded',
      reward_given: true,
    })
  }
}
