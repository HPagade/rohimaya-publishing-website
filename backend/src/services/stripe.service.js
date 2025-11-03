/**
 * Stripe Service
 * Handles all Stripe payment operations
 */

import Stripe from 'stripe';
import { SUBSCRIPTION_TIERS } from '../config/stripe.config.js';

class StripeService {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  /**
   * Create a checkout session for subscription
   */
  async createCheckoutSession(userId, userEmail, tier, successUrl, cancelUrl) {
    try {
      const tierConfig = SUBSCRIPTION_TIERS[tier.toUpperCase()];

      if (!tierConfig || !tierConfig.priceId) {
        throw new Error('Invalid subscription tier');
      }

      const session = await this.stripe.checkout.sessions.create({
        customer_email: userEmail,
        client_reference_id: userId,
        payment_method_types: ['card'],
        mode: 'subscription',
        line_items: [
          {
            price: tierConfig.priceId,
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          tier: tierConfig.id
        },
        subscription_data: {
          metadata: {
            userId,
            tier: tierConfig.id
          }
        }
      });

      return {
        sessionId: session.id,
        url: session.url
      };
    } catch (error) {
      console.error('Error creating checkout session:', error);
      throw error;
    }
  }

  /**
   * Create a customer portal session for managing subscription
   */
  async createPortalSession(customerId, returnUrl) {
    try {
      const session = await this.stripe.billingPortal.sessions.create({
        customer: customerId,
        return_url: returnUrl,
      });

      return {
        url: session.url
      };
    } catch (error) {
      console.error('Error creating portal session:', error);
      throw error;
    }
  }

  /**
   * Get subscription details
   */
  async getSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error retrieving subscription:', error);
      throw error;
    }
  }

  /**
   * Cancel subscription
   */
  async cancelSubscription(subscriptionId) {
    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
      return subscription;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  }

  /**
   * Update subscription tier
   */
  async updateSubscription(subscriptionId, newTier) {
    try {
      const tierConfig = SUBSCRIPTION_TIERS[newTier.toUpperCase()];

      if (!tierConfig || !tierConfig.priceId) {
        throw new Error('Invalid subscription tier');
      }

      const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);

      const updatedSubscription = await this.stripe.subscriptions.update(subscriptionId, {
        items: [{
          id: subscription.items.data[0].id,
          price: tierConfig.priceId,
        }],
        metadata: {
          tier: tierConfig.id
        }
      });

      return updatedSubscription;
    } catch (error) {
      console.error('Error updating subscription:', error);
      throw error;
    }
  }

  /**
   * Handle Stripe webhook events
   */
  async handleWebhook(event) {
    try {
      switch (event.type) {
        case 'checkout.session.completed':
          return await this.handleCheckoutCompleted(event.data.object);

        case 'customer.subscription.updated':
          return await this.handleSubscriptionUpdated(event.data.object);

        case 'customer.subscription.deleted':
          return await this.handleSubscriptionDeleted(event.data.object);

        case 'invoice.payment_succeeded':
          return await this.handlePaymentSucceeded(event.data.object);

        case 'invoice.payment_failed':
          return await this.handlePaymentFailed(event.data.object);

        default:
          console.log(`Unhandled event type: ${event.type}`);
          return { handled: false };
      }
    } catch (error) {
      console.error('Error handling webhook:', error);
      throw error;
    }
  }

  /**
   * Handle successful checkout
   */
  async handleCheckoutCompleted(session) {
    const userId = session.metadata.userId;
    const tier = session.metadata.tier;
    const customerId = session.customer;
    const subscriptionId = session.subscription;

    return {
      action: 'activate_subscription',
      userId,
      tier,
      customerId,
      subscriptionId
    };
  }

  /**
   * Handle subscription update
   */
  async handleSubscriptionUpdated(subscription) {
    const userId = subscription.metadata.userId;
    const tier = subscription.metadata.tier;
    const status = subscription.status;

    return {
      action: 'update_subscription',
      userId,
      tier,
      status
    };
  }

  /**
   * Handle subscription deletion
   */
  async handleSubscriptionDeleted(subscription) {
    const userId = subscription.metadata.userId;

    return {
      action: 'cancel_subscription',
      userId
    };
  }

  /**
   * Handle successful payment
   */
  async handlePaymentSucceeded(invoice) {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;

    return {
      action: 'payment_succeeded',
      customerId,
      subscriptionId,
      amount: invoice.amount_paid
    };
  }

  /**
   * Handle failed payment
   */
  async handlePaymentFailed(invoice) {
    const customerId = invoice.customer;
    const subscriptionId = invoice.subscription;

    return {
      action: 'payment_failed',
      customerId,
      subscriptionId
    };
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload, signature) {
    try {
      const event = this.stripe.webhooks.constructEvent(
        payload,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
      return event;
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      throw error;
    }
  }
}

export default new StripeService();
