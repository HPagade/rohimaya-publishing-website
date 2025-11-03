/**
 * Usage Repository
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles usage data access
 * - Dependency Inversion: Implements IUsageRepository interface
 */

import { SupabaseClient } from '@supabase/supabase-js'
import type { IUsageRepository } from '../core/interfaces'
import type { Usage, FeatureType } from '../core/types'

export class UsageRepository implements IUsageRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getCurrentMonthUsage(userId: string): Promise<Usage | null> {
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM

    const { data, error } = await this.supabase
      .from('usage')
      .select('*')
      .eq('user_id', userId)
      .eq('month', currentMonth)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        // Create usage record if it doesn't exist
        return this.createMonthlyUsage(userId, currentMonth)
      }
      throw new Error(`Failed to fetch usage: ${error.message}`)
    }

    return data
  }

  async incrementUsage(
    userId: string,
    feature: FeatureType,
    count: number = 1
  ): Promise<Usage> {
    // Use Supabase RPC function for atomic increment
    const { data, error } = await this.supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_feature: feature,
      p_count: count,
    })

    if (error) {
      throw new Error(`Failed to increment usage: ${error.message}`)
    }

    // Fetch and return updated usage
    const usage = await this.getCurrentMonthUsage(userId)
    if (!usage) {
      throw new Error('Failed to fetch updated usage')
    }

    return usage
  }

  async resetMonthlyUsage(userId: string): Promise<void> {
    const currentMonth = new Date().toISOString().slice(0, 7)

    const { error } = await this.supabase
      .from('usage')
      .update({
        formats_used: 0,
        audiobooks_used: 0,
        covers_used: 0,
        images_used: 0,
        cookbooks_used: 0,
        health_content_used: 0,
        marketing_content_used: 0,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .eq('month', currentMonth)

    if (error) {
      throw new Error(`Failed to reset usage: ${error.message}`)
    }
  }

  private async createMonthlyUsage(userId: string, month: string): Promise<Usage> {
    const { data, error } = await this.supabase
      .from('usage')
      .insert({
        user_id: userId,
        month,
        formats_used: 0,
        audiobooks_used: 0,
        covers_used: 0,
        images_used: 0,
        cookbooks_used: 0,
        health_content_used: 0,
        marketing_content_used: 0,
      })
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create usage record: ${error.message}`)
    }

    return data
  }
}
