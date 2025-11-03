/**
 * Subscription Repository
 *
 * Following SOLID principles:
 * - Single Responsibility: Only handles subscription data access
 * - Dependency Inversion: Implements ISubscriptionRepository interface
 * - Open/Closed: Can be extended without modification
 */

import { SupabaseClient } from '@supabase/supabase-js'
import type { ISubscriptionRepository } from '../core/interfaces'
import type { Subscription } from '../core/types'
import { NotFoundError } from '../core/types'

export class SubscriptionRepository implements ISubscriptionRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async findById(id: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw new Error(`Failed to find subscription: ${error.message}`)
    }

    return data
  }

  async findAll(): Promise<Subscription[]> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(`Failed to fetch subscriptions: ${error.message}`)
    }

    return data || []
  }

  async create(data: Partial<Subscription>): Promise<Subscription> {
    const { data: subscription, error } = await this.supabase
      .from('subscriptions')
      .insert(data)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to create subscription: ${error.message}`)
    }

    return subscription
  }

  async update(id: string, data: Partial<Subscription>): Promise<Subscription> {
    const { data: subscription, error } = await this.supabase
      .from('subscriptions')
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`)
    }

    return subscription
  }

  async delete(id: string): Promise<void> {
    const { error } = await this.supabase.from('subscriptions').delete().eq('id', id)

    if (error) {
      throw new Error(`Failed to delete subscription: ${error.message}`)
    }
  }

  async findActiveByUserId(userId: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .in('status', ['active', 'trialing'])
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null // Not found
      throw new Error(`Failed to find active subscription: ${error.message}`)
    }

    return data
  }

  async findByStripeSubscriptionId(stripeId: string): Promise<Subscription | null> {
    const { data, error } = await this.supabase
      .from('subscriptions')
      .select('*')
      .eq('stripe_subscription_id', stripeId)
      .single()

    if (error) {
      if (error.code === 'PGRST116') return null
      throw new Error(`Failed to find subscription by Stripe ID: ${error.message}`)
    }

    return data
  }

  async cancelAtPeriodEnd(id: string): Promise<Subscription> {
    return this.update(id, { cancel_at_period_end: true })
  }
}
