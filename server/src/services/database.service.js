/**
 * Database Service
 * Handles all database operations for users, subscriptions, and usage tracking
 */

import pkg from 'pg';
const { Pool } = pkg;
import { SUBSCRIPTION_TIERS } from '../config/stripe.config.js';

class DatabaseService {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
  }

  /**
   * Create or update user
   */
  async upsertUser(userId, email, name = null) {
    const query = `
      INSERT INTO users (id, email, name)
      VALUES ($1, $2, $3)
      ON CONFLICT (id)
      DO UPDATE SET email = $2, name = $3, updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const result = await this.pool.query(query, [userId, email, name]);
    return result.rows[0];
  }

  /**
   * Get user by ID
   */
  async getUser(userId) {
    const query = 'SELECT * FROM users WHERE id = $1';
    const result = await this.pool.query(query, [userId]);
    return result.rows[0];
  }

  /**
   * Create or update subscription
   */
  async upsertSubscription(userId, subscriptionData) {
    const {
      tier = 'free',
      status = 'active',
      stripeCustomerId = null,
      stripeSubscriptionId = null,
      currentPeriodStart = null,
      currentPeriodEnd = null,
      cancelAtPeriodEnd = false
    } = subscriptionData;

    const query = `
      INSERT INTO subscriptions (
        user_id, tier, status, stripe_customer_id, stripe_subscription_id,
        current_period_start, current_period_end, cancel_at_period_end
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (user_id)
      DO UPDATE SET
        tier = $2,
        status = $3,
        stripe_customer_id = $4,
        stripe_subscription_id = $5,
        current_period_start = $6,
        current_period_end = $7,
        cancel_at_period_end = $8,
        updated_at = CURRENT_TIMESTAMP
      RETURNING *
    `;

    const result = await this.pool.query(query, [
      userId, tier, status, stripeCustomerId, stripeSubscriptionId,
      currentPeriodStart, currentPeriodEnd, cancelAtPeriodEnd
    ]);

    return result.rows[0];
  }

  /**
   * Get user subscription
   */
  async getSubscription(userId) {
    const query = 'SELECT * FROM subscriptions WHERE user_id = $1';
    const result = await this.pool.query(query, [userId]);

    if (result.rows.length === 0) {
      // Return free tier by default
      return {
        user_id: userId,
        tier: 'free',
        status: 'active',
        ...SUBSCRIPTION_TIERS.FREE.limits
      };
    }

    return result.rows[0];
  }

  /**
   * Cancel subscription (downgrade to free)
   */
  async cancelSubscription(userId) {
    const query = `
      UPDATE subscriptions
      SET tier = 'free',
          status = 'canceled',
          cancel_at_period_end = TRUE,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = $1
      RETURNING *
    `;

    const result = await this.pool.query(query, [userId]);
    return result.rows[0];
  }

  /**
   * Get current period usage for a user and feature
   */
  async getUsage(userId, feature) {
    const now = new Date();
    const periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const periodEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const query = `
      SELECT * FROM usage
      WHERE user_id = $1
        AND feature = $2
        AND period_start = $3
    `;

    const result = await this.pool.query(query, [userId, feature, periodStart]);

    if (result.rows.length === 0) {
      // Create new usage record
      const insertQuery = `
        INSERT INTO usage (user_id, feature, count, period_start, period_end)
        VALUES ($1, $2, 0, $3, $4)
        RETURNING *
      `;
      const insertResult = await this.pool.query(insertQuery, [userId, feature, periodStart, periodEnd]);
      return insertResult.rows[0];
    }

    return result.rows[0];
  }

  /**
   * Increment usage count
   */
  async incrementUsage(userId, feature) {
    const currentUsage = await this.getUsage(userId, feature);

    const query = `
      UPDATE usage
      SET count = count + 1, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await this.pool.query(query, [currentUsage.id]);
    return result.rows[0];
  }

  /**
   * Check if user can use a feature (within limits)
   */
  async canUseFeature(userId, feature) {
    const subscription = await this.getSubscription(userId);
    const usage = await this.getUsage(userId, feature);

    const tierConfig = SUBSCRIPTION_TIERS[subscription.tier.toUpperCase()];
    const limit = tierConfig.limits[feature];

    // -1 means unlimited
    if (limit === -1) {
      return { allowed: true, remaining: -1 };
    }

    const remaining = limit - usage.count;

    return {
      allowed: remaining > 0,
      remaining: Math.max(0, remaining),
      limit,
      current: usage.count,
      tier: subscription.tier
    };
  }

  /**
   * Record job in history
   */
  async recordJob(userId, jobId, feature, status, inputData = null, outputData = null, errorMessage = null, processingTime = null) {
    const query = `
      INSERT INTO job_history (
        user_id, job_id, feature, status, input_data, output_data,
        error_message, processing_time, completed_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *
    `;

    const completedAt = status === 'completed' || status === 'error' ? new Date() : null;

    const result = await this.pool.query(query, [
      userId, jobId, feature, status, inputData, outputData,
      errorMessage, processingTime, completedAt
    ]);

    return result.rows[0];
  }

  /**
   * Get user's job history
   */
  async getJobHistory(userId, limit = 50, offset = 0) {
    const query = `
      SELECT * FROM job_history
      WHERE user_id = $1
      ORDER BY created_at DESC
      LIMIT $2 OFFSET $3
    `;

    const result = await this.pool.query(query, [userId, limit, offset]);
    return result.rows;
  }

  /**
   * Get usage statistics for admin dashboard
   */
  async getUsageStats(startDate, endDate) {
    const query = `
      SELECT
        feature,
        COUNT(*) as total_jobs,
        COUNT(DISTINCT user_id) as unique_users,
        AVG(processing_time) as avg_processing_time
      FROM job_history
      WHERE created_at BETWEEN $1 AND $2
      GROUP BY feature
    `;

    const result = await this.pool.query(query, [startDate, endDate]);
    return result.rows;
  }

  /**
   * Close database connection
   */
  async close() {
    await this.pool.end();
  }
}

export default new DatabaseService();
