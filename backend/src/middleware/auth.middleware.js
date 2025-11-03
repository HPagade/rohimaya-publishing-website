/**
 * Authentication Middleware
 * Verifies JWT tokens from Clerk and extracts user info
 */

import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

/**
 * Require authentication for protected routes
 * This middleware integrates with Clerk
 */
export const requireAuth = ClerkExpressRequireAuth({
  onError: (error) => {
    console.error('Auth error:', error);
    return {
      status: 401,
      message: 'Unauthorized - Please sign in'
    };
  }
});

/**
 * Extract user info from authenticated request
 */
export const extractUser = (req, res, next) => {
  try {
    if (req.auth && req.auth.userId) {
      req.userId = req.auth.userId;
      req.userEmail = req.auth.sessionClaims?.email;
      next();
    } else {
      res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
  } catch (error) {
    console.error('Error extracting user:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid authentication token'
    });
  }
};

/**
 * Optional authentication - doesn't fail if not authenticated
 * Used for features that work for both authenticated and anonymous users
 */
export const optionalAuth = (req, res, next) => {
  if (req.auth && req.auth.userId) {
    req.userId = req.auth.userId;
    req.userEmail = req.auth.sessionClaims?.email;
  }
  next();
};
