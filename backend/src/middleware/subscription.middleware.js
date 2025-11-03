/**
 * Subscription Middleware
 * Checks user subscription status and usage limits
 */

import databaseService from '../services/database.service.js';

/**
 * Check if user can use a specific feature
 * @param {string} feature - The feature to check (formatter, covers, images, videos)
 */
export const checkFeatureAccess = (feature) => {
  return async (req, res, next) => {
    try {
      const userId = req.userId;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: 'Authentication required',
          action: 'login'
        });
      }

      // Check if user can use this feature
      const accessCheck = await databaseService.canUseFeature(userId, feature);

      if (!accessCheck.allowed) {
        return res.status(403).json({
          success: false,
          message: `You've reached your ${feature} limit for this month`,
          limit: accessCheck.limit,
          current: accessCheck.current,
          tier: accessCheck.tier,
          action: 'upgrade',
          upgradeUrl: `${process.env.FRONTEND_URL}/pricing`
        });
      }

      // Attach usage info to request for tracking
      req.featureUsage = {
        feature,
        remaining: accessCheck.remaining,
        limit: accessCheck.limit,
        current: accessCheck.current
      };

      next();
    } catch (error) {
      console.error('Error checking feature access:', error);
      res.status(500).json({
        success: false,
        message: 'Error checking subscription status'
      });
    }
  };
};

/**
 * Track feature usage after successful operation
 */
export const trackUsage = async (req, res, next) => {
  try {
    const userId = req.userId;
    const feature = req.featureUsage?.feature;

    if (userId && feature) {
      await databaseService.incrementUsage(userId, feature);
    }

    next();
  } catch (error) {
    console.error('Error tracking usage:', error);
    // Don't fail the request if usage tracking fails
    next();
  }
};

/**
 * Get user's current subscription and usage info
 */
export const getSubscriptionInfo = async (req, res, next) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }

    const subscription = await databaseService.getSubscription(userId);

    // Get usage for all features
    const usage = {
      formatter: await databaseService.getUsage(userId, 'formatter'),
      covers: await databaseService.getUsage(userId, 'covers'),
      images: await databaseService.getUsage(userId, 'images'),
      videos: await databaseService.getUsage(userId, 'videos')
    };

    req.subscriptionInfo = {
      subscription,
      usage
    };

    next();
  } catch (error) {
    console.error('Error getting subscription info:', error);
    res.status(500).json({
      success: false,
      message: 'Error retrieving subscription information'
    });
  }
};
