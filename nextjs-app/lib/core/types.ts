/**
 * Core domain types for PhoenixForge platform
 *
 * Following SOLID principles:
 * - Single Responsibility: Each type has one clear purpose
 * - Interface Segregation: Small, focused interfaces
 */

// ============================================================================
// User & Authentication Types
// ============================================================================

export interface User {
  id: string
  email: string
  created_at: string
  user_metadata?: {
    full_name?: string
  }
}

export interface UserProfile extends User {
  referral_code: string
  credits_balance: number
  onboarding_completed: boolean
  trial_ends_at?: string | null
}

// ============================================================================
// Subscription Types
// ============================================================================

export type PlanType = 'free' | 'creator' | 'professional' | 'team' | 'enterprise'
export type BillingInterval = 'monthly' | 'yearly'
export type SubscriptionStatus = 'active' | 'trialing' | 'past_due' | 'canceled' | 'incomplete'

export interface Subscription {
  id: string
  user_id: string
  status: SubscriptionStatus
  price_id: string
  current_period_start: string
  current_period_end: string
  cancel_at_period_end: boolean
  trial_end?: string | null
  created_at: string
}

export interface PlanLimits {
  formats: number
  audiobooks: number
  covers: number
  images: number
  cookbooks: number
  health_content: number
  marketing_content: number
}

export interface PlanConfig {
  id: PlanType
  name: string
  price: {
    monthly: number
    yearly: number
  }
  limits: PlanLimits
  features: string[]
}

// ============================================================================
// Usage Tracking Types
// ============================================================================

export type FeatureType =
  | 'formats'
  | 'audiobooks'
  | 'covers'
  | 'images'
  | 'cookbooks'
  | 'health_content'
  | 'marketing_content'

export interface Usage {
  id: string
  user_id: string
  month: string
  formats_used: number
  audiobooks_used: number
  covers_used: number
  images_used: number
  cookbooks_used: number
  health_content_used: number
  marketing_content_used: number
  updated_at: string
}

export interface UsageResult {
  allowed: boolean
  remaining: number
  limit: number
  message?: string
}

// ============================================================================
// Referral Types
// ============================================================================

export type ReferralStatus = 'pending' | 'completed' | 'rewarded'

export interface Referral {
  id: string
  referrer_user_id: string
  referee_user_id: string | null
  referral_code: string
  status: ReferralStatus
  reward_given: boolean
  created_at: string
  completed_at?: string | null
}

export interface ReferralStats {
  total_referrals: number
  completed_referrals: number
  pending_referrals: number
  total_rewards_earned: number
  conversion_rate: number
}

// ============================================================================
// Project/Template Types
// ============================================================================

export type ProductType =
  | 'formatter'
  | 'audiobook'
  | 'covers'
  | 'images'
  | 'cookbook'
  | 'health'
  | 'marketing'

export type ProjectStatus = 'draft' | 'generating' | 'completed' | 'failed'

export interface Project {
  id: string
  user_id: string
  product_type: ProductType
  title: string
  data: Record<string, any>
  status: ProjectStatus
  created_at: string
  updated_at: string
}

export interface Template {
  id: string
  product_type: ProductType
  name: string
  description: string
  category: string
  data: Record<string, any>
  preview_image?: string
  is_premium: boolean
  price?: number
}

// ============================================================================
// Credits Types
// ============================================================================

export type CreditType = FeatureType

export interface CreditPack {
  id: string
  type: CreditType
  amount: number
  price: number
  name: string
  description: string
}

export interface CreditPurchase {
  id: string
  user_id: string
  credits_purchased: number
  credits_type: CreditType
  amount_paid: number
  created_at: string
}

export interface CreditUsage {
  id: string
  user_id: string
  credits_used: number
  feature_type: FeatureType
  created_at: string
}

// ============================================================================
// Analytics Types
// ============================================================================

export interface UserAnalytics {
  total_projects: number
  completed_projects: number
  total_usage: number
  streak_days: number
  value_delivered: number
  achievements: Achievement[]
}

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string
  unlocked: boolean
  unlocked_at?: string
}

// ============================================================================
// Team Types
// ============================================================================

export type TeamRole = 'owner' | 'admin' | 'member'
export type InviteStatus = 'pending' | 'accepted' | 'expired'

export interface Team {
  id: string
  name: string
  owner_user_id: string
  plan_type: PlanType
  seats_total: number
  seats_used: number
  created_at: string
}

export interface TeamMember {
  id: string
  team_id: string
  user_id: string
  role: TeamRole
  joined_at: string
}

export interface TeamInvite {
  id: string
  team_id: string
  email: string
  role: TeamRole
  invite_code: string
  status: InviteStatus
  created_at: string
  expires_at: string
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  page_size: number
  has_more: boolean
}

// ============================================================================
// Error Types
// ============================================================================

export class DomainError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message)
    this.name = 'DomainError'
  }
}

export class UsageLimitError extends DomainError {
  constructor(message: string) {
    super(message, 'USAGE_LIMIT_EXCEEDED', 403)
    this.name = 'UsageLimitError'
  }
}

export class AuthenticationError extends DomainError {
  constructor(message: string = 'Authentication required') {
    super(message, 'AUTHENTICATION_ERROR', 401)
    this.name = 'AuthenticationError'
  }
}

export class NotFoundError extends DomainError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404)
    this.name = 'NotFoundError'
  }
}

export class ValidationError extends DomainError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400)
    this.name = 'ValidationError'
  }
}
