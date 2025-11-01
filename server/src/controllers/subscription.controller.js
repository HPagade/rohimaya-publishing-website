/**
 * Subscription Controller
 * Handles subscription-related endpoints
 */

import stripeService from '../services/stripe.service.js';
import databaseService from '../services/database.service.js';
import { SUBSCRIPTION_TIERS } from '../config/stripe.config.js';

class SubscriptionController {
  /**
   * Get all available subscription tiers
   */
  async getTiers(req, res, next) {
    try {
      const tiers = Object.values(SUBSCRIPTION_TIERS).map(tier => ({
        id: tier.id,
        name: tier.name,
        price: tier.price,
        limits: tier.limits,
        features: tier.features
      }));

      res.json({
        success: true,
        data: { tiers }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get current user's subscription info
   */
  async getMySubscription(req, res, next) {
    try {
      const userId = req.userId;

      const subscription = await databaseService.getSubscription(userId);

      // Get current usage
      const usage = {
        formatter: await databaseService.getUsage(userId, 'formatter'),
        covers: await databaseService.getUsage(userId, 'covers'),
        images: await databaseService.getUsage(userId, 'images'),
        videos: await databaseService.getUsage(userId, 'videos')
      };

      // Get tier limits
      const tierConfig = SUBSCRIPTION_TIERS[subscription.tier.toUpperCase()];

      res.json({
        success: true,
        data: {
          subscription: {
            tier: subscription.tier,
            status: subscription.status,
            currentPeriodEnd: subscription.current_period_end,
            cancelAtPeriodEnd: subscription.cancel_at_period_end
          },
          limits: tierConfig.limits,
          usage: {
            formatter: { count: usage.formatter.count, limit: tierConfig.limits.formatter },
            covers: { count: usage.covers.count, limit: tierConfig.limits.covers },
            images: { count: usage.images.count, limit: tierConfig.limits.images },
            videos: { count: usage.videos.count, limit: tierConfig.limits.videos }
          },
          features: tierConfig.features
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create checkout session for subscription
   */
  async createCheckout(req, res, next) {
    try {
      const userId = req.userId;
      const userEmail = req.userEmail;
      const { tier } = req.body;

      if (!tier) {
        return res.status(400).json({
          success: false,
          message: 'Subscription tier is required'
        });
      }

      const successUrl = `${process.env.FRONTEND_URL}/dashboard?success=true`;
      const cancelUrl = `${process.env.FRONTEND_URL}/pricing?canceled=true`;

      const session = await stripeService.createCheckoutSession(
        userId,
        userEmail,
        tier,
        successUrl,
        cancelUrl
      );

      res.json({
        success: true,
        data: {
          sessionId: session.sessionId,
          url: session.url
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create customer portal session
   */
  async createPortal(req, res, next) {
    try {
      const userId = req.userId;

      const subscription = await databaseService.getSubscription(userId);

      if (!subscription.stripe_customer_id) {
        return res.status(400).json({
          success: false,
          message: 'No active subscription found'
        });
      }

      const returnUrl = `${process.env.FRONTEND_URL}/dashboard`;

      const session = await stripeService.createPortalSession(
        subscription.stripe_customer_id,
        returnUrl
      );

      res.json({
        success: true,
        data: {
          url: session.url
        }
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Handle Stripe webhooks
   */
  async handleWebhook(req, res, next) {
    try {
      const signature = req.headers['stripe-signature'];
      const payload = req.body;

      // Verify webhook signature
      const event = stripeService.verifyWebhookSignature(payload, signature);

      // Handle the event
      const result = await stripeService.handleWebhook(event);

      // Update database based on webhook result
      switch (result.action) {
        case 'activate_subscription':
          await databaseService.upsertUser(result.userId, null);
          await databaseService.upsertSubscription(result.userId, {
            tier: result.tier,
            status: 'active',
            stripeCustomerId: result.customerId,
            stripeSubscriptionId: result.subscriptionId
          });
          break;

        case 'update_subscription':
          await databaseService.upsertSubscription(result.userId, {
            tier: result.tier,
            status: result.status
          });
          break;

        case 'cancel_subscription':
          await databaseService.cancelSubscription(result.userId);
          break;

        default:
          console.log('No database action needed for:', result.action);
      }

      res.json({ received: true });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(400).json({
        success: false,
        message: 'Webhook error'
      });
    }
  }

  /**
   * Get job history for current user
   */
  async getJobHistory(req, res, next) {
    try {
      const userId = req.userId;
      const limit = parseInt(req.query.limit) || 50;
      const offset = parseInt(req.query.offset) || 0;

      const jobs = await databaseService.getJobHistory(userId, limit, offset);

      res.json({
        success: true,
        data: {
          jobs,
          limit,
          offset,
          count: jobs.length
        }
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new SubscriptionController();
