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
      videos: 1,
      cookbook: 0,
      healthContent: 0,
      nutritionAnalysis: 0,
      medicalCitations: 0
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
      videos: 2,
      cookbook: 3,
      healthContent: 10
    },
    features: [
      '10 manuscript formats/month',
      '5 book covers/month',
      '20 images/month',
      '2 video trailers/month',
      '3 cookbook formats/month',
      'Basic nutrition facts',
      'No watermarks',
      'HD quality',
      'Priority processing',
      'Email support'
    ]
  },
  HEALTH_AUTHOR: {
    id: 'health-author',
    name: 'Health Author',
    price: 49,
    priceId: process.env.STRIPE_PRICE_HEALTH_AUTHOR,
    limits: {
      formatter: 20,
      covers: 10,
      images: 50,
      videos: 5,
      cookbook: -1,
      healthContent: -1,
      nutritionAnalysis: 100,
      medicalCitations: 50
    },
    features: [
      '20 manuscript formats/month',
      '10 book covers/month',
      '50 images/month (food, wellness, medical)',
      '5 video trailers/month',
      'Unlimited cookbook formatting',
      'Unlimited health content generation',
      'AI nutrition facts & analysis',
      'Medical citation formatter (AMA style)',
      'Health disclaimer generator',
      'Recipe standardization',
      'Diet-specific templates (keto, vegan, etc.)',
      'Wellness book templates',
      'No watermarks',
      'HD quality',
      'Priority support'
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
      videos: 10,
      cookbook: -1,
      healthContent: -1,
      nutritionAnalysis: -1,
      medicalCitations: -1
    },
    features: [
      'Unlimited manuscript formatting',
      '30 book covers/month',
      '100 images/month',
      '10 video trailers/month',
      'Unlimited cookbook & health formatting',
      'Unlimited nutrition analysis',
      'Unlimited medical citations',
      'Batch processing',
      'Team collaboration (5 users)',
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
      videos: -1,
      cookbook: -1,
      healthContent: -1,
      nutritionAnalysis: -1,
      medicalCitations: -1
    },
    features: [
      'Everything unlimited',
      'All publishing & health tools',
      'Unlimited team members',
      'Dedicated account manager',
      'Custom branding',
      'Advanced API access',
      'SLA guarantees',
      'Custom integrations',
      'Onboarding & training',
      'Phone support',
      'Custom AI model training'
    ]
  }
};

export const FEATURE_COSTS = {
  // Cost per generation (for tracking profitability)
  formatter: 0.15,
  covers: 0.04,
  images: 0.04,
  videos: 0.10,
  cookbook: 0.18, // Higher cost for nutrition analysis
  healthContent: 0.12,
  nutritionAnalysis: 0.08,
  medicalCitations: 0.05
};
