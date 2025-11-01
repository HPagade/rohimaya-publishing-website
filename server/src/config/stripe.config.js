/**
 * Stripe Configuration
 * Pricing tiers and product configuration
 */

export const SUBSCRIPTION_TIERS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    priceId: null,
    limits: {
      formatter: 3,
      covers: 3,
      images: 3,
      videos: 1
    },
    features: [
      '3 manuscript formats/month',
      '3 book covers/month',
      '3 images/month',
      '1 video trailer/month',
      'Watermarked outputs',
      'Standard quality'
    ]
  },
  AUTHOR: {
    id: 'author',
    name: 'Author',
    price: 29,
    priceId: process.env.STRIPE_PRICE_AUTHOR, // Set in .env
    limits: {
      formatter: 10,
      covers: 5,
      images: 20,
      videos: 2
    },
    features: [
      '10 manuscript formats/month',
      '5 book covers/month',
      '20 images/month',
      '2 video trailers/month',
      'No watermarks',
      'HD quality',
      'Priority processing',
      'Email support'
    ]
  },
  PUBLISHER: {
    id: 'publisher',
    name: 'Publisher',
    price: 99,
    priceId: process.env.STRIPE_PRICE_PUBLISHER,
    limits: {
      formatter: -1, // -1 = unlimited
      covers: 30,
      images: 100,
      videos: 10
    },
    features: [
      'Unlimited manuscript formatting',
      '30 book covers/month',
      '100 images/month',
      '10 video trailers/month',
      'Batch processing',
      'API access',
      'White-label option',
      'Priority support',
      'Custom templates'
    ]
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    priceId: process.env.STRIPE_PRICE_ENTERPRISE,
    limits: {
      formatter: -1,
      covers: -1,
      images: -1,
      videos: -1
    },
    features: [
      'Everything unlimited',
      'Dedicated account manager',
      'Custom branding',
      'Advanced API access',
      'SLA guarantees',
      'Custom integrations',
      'Onboarding & training',
      'Phone support'
    ]
  }
};

export const FEATURE_COSTS = {
  // Cost per generation (for tracking profitability)
  formatter: 0.15,
  covers: 0.04,
  images: 0.04,
  videos: 0.10
};
