/**
 * User Repository Implementation
 * Implements IUserRepository using Supabase
 * Follows: Single Responsibility, Dependency Inversion
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { IUserRepository, User } from '../interfaces/IRepository';

export class UserRepository implements IUserRepository {
  private supabase: SupabaseClient;

  constructor(supabaseUrl?: string, supabaseKey?: string) {
    this.supabase = createClient(
      supabaseUrl || process.env.SUPABASE_URL!,
      supabaseKey || process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }

  /**
   * Find user by ID
   */
  async findById(id: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error finding user by ID:', error);
      return null;
    }

    return this.mapToUser(data);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      return null;
    }

    return this.mapToUser(data);
  }

  /**
   * Find user by Clerk ID
   */
  async findByClerkId(clerkId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('clerk_id', clerkId)
      .single();

    if (error) {
      return null;
    }

    return this.mapToUser(data);
  }

  /**
   * Find user by Stripe customer ID
   */
  async findByStripeCustomerId(customerId: string): Promise<User | null> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('stripe_customer_id', customerId)
      .single();

    if (error) {
      return null;
    }

    return this.mapToUser(data);
  }

  /**
   * Find all users matching filter
   */
  async findAll(filter?: Partial<User>): Promise<User[]> {
    let query = this.supabase.from('users').select('*');

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error finding users:', error);
      return [];
    }

    return data.map(this.mapToUser);
  }

  /**
   * Create new user
   */
  async create(entity: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .insert({
        clerk_id: entity.clerkId,
        email: entity.email,
        first_name: entity.firstName,
        last_name: entity.lastName,
        subscription_tier: entity.subscriptionTier || 'free',
        subscription_status: entity.subscriptionStatus || 'inactive'
      })
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to create user: ${error.message}`);
    }

    return this.mapToUser(data);
  }

  /**
   * Update existing user
   */
  async update(id: string, updates: Partial<User>): Promise<User> {
    const updateData: any = {};

    if (updates.email) updateData.email = updates.email;
    if (updates.firstName) updateData.first_name = updates.firstName;
    if (updates.lastName) updateData.last_name = updates.lastName;
    if (updates.subscriptionTier) updateData.subscription_tier = updates.subscriptionTier;
    if (updates.subscriptionStatus) updateData.subscription_status = updates.subscriptionStatus;
    if (updates.stripeCustomerId) updateData.stripe_customer_id = updates.stripeCustomerId;
    if (updates.stripeSubscriptionId) updateData.stripe_subscription_id = updates.stripeSubscriptionId;
    if (updates.subscriptionStartDate) updateData.subscription_start_date = updates.subscriptionStartDate;
    if (updates.subscriptionEndDate) updateData.subscription_end_date = updates.subscriptionEndDate;

    const { data, error } = await this.supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update user: ${error.message}`);
    }

    return this.mapToUser(data);
  }

  /**
   * Delete user
   */
  async delete(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      return false;
    }

    return true;
  }

  /**
   * Count users matching filter
   */
  async count(filter?: Partial<User>): Promise<number> {
    let query = this.supabase
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (filter) {
      Object.entries(filter).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    const { count, error } = await query;

    if (error) {
      console.error('Error counting users:', error);
      return 0;
    }

    return count || 0;
  }

  /**
   * Update user subscription
   */
  async updateSubscription(
    userId: string,
    subscription: {
      tier: string;
      status: string;
      stripeSubscriptionId?: string;
      startDate?: Date;
      endDate?: Date;
    }
  ): Promise<User> {
    const { data, error } = await this.supabase
      .from('users')
      .update({
        subscription_tier: subscription.tier,
        subscription_status: subscription.status,
        stripe_subscription_id: subscription.stripeSubscriptionId,
        subscription_start_date: subscription.startDate,
        subscription_end_date: subscription.endDate
      })
      .eq('id', userId)
      .select()
      .single();

    if (error) {
      throw new Error(`Failed to update subscription: ${error.message}`);
    }

    return this.mapToUser(data);
  }

  // ======================
  // PRIVATE HELPER METHODS
  // ======================

  /**
   * Map database row to User entity
   */
  private mapToUser(data: any): User {
    return {
      id: data.id,
      clerkId: data.clerk_id,
      email: data.email,
      firstName: data.first_name,
      lastName: data.last_name,
      subscriptionTier: data.subscription_tier,
      subscriptionStatus: data.subscription_status,
      stripeCustomerId: data.stripe_customer_id,
      stripeSubscriptionId: data.stripe_subscription_id,
      subscriptionStartDate: data.subscription_start_date ? new Date(data.subscription_start_date) : undefined,
      subscriptionEndDate: data.subscription_end_date ? new Date(data.subscription_end_date) : undefined,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at)
    };
  }
}
