/**
 * Service interfaces for PhoenixForge platform
 *
 * Following SOLID principles:
 * - Dependency Inversion: Depend on abstractions (interfaces), not concretions
 * - Interface Segregation: Small, focused interfaces
 * - Single Responsibility: Each interface has one clear purpose
 */

import type {
  User,
  UserProfile,
  Subscription,
  PlanType,
  PlanLimits,
  Usage,
  UsageResult,
  FeatureType,
  Referral,
  ReferralStats,
  Project,
  Template,
  ProductType,
  CreditPack,
  CreditPurchase,
  UserAnalytics,
  Team,
  TeamMember,
  TeamInvite,
} from './types'

// ============================================================================
// Repository Interfaces (Data Access Layer)
// ============================================================================

/**
 * Interface Segregation: Separate read and write operations
 */
export interface IReadRepository<T> {
  findById(id: string): Promise<T | null>
  findAll(): Promise<T[]>
}

export interface IWriteRepository<T> {
  create(data: Partial<T>): Promise<T>
  update(id: string, data: Partial<T>): Promise<T>
  delete(id: string): Promise<void>
}

export interface IRepository<T> extends IReadRepository<T>, IWriteRepository<T> {}

/**
 * User repository with specific query methods
 */
export interface IUserRepository extends IRepository<UserProfile> {
  findByEmail(email: string): Promise<UserProfile | null>
  findByReferralCode(code: string): Promise<UserProfile | null>
  updateCreditsBalance(userId: string, amount: number): Promise<UserProfile>
  completeOnboarding(userId: string): Promise<UserProfile>
}

/**
 * Subscription repository
 */
export interface ISubscriptionRepository extends IRepository<Subscription> {
  findActiveByUserId(userId: string): Promise<Subscription | null>
  findByStripeSubscriptionId(stripeId: string): Promise<Subscription | null>
  cancelAtPeriodEnd(id: string): Promise<Subscription>
}

/**
 * Usage repository
 */
export interface IUsageRepository {
  getCurrentMonthUsage(userId: string): Promise<Usage | null>
  incrementUsage(userId: string, feature: FeatureType, count?: number): Promise<Usage>
  resetMonthlyUsage(userId: string): Promise<void>
}

/**
 * Referral repository
 */
export interface IReferralRepository extends IRepository<Referral> {
  findByReferrerUserId(userId: string): Promise<Referral[]>
  findByReferralCode(code: string): Promise<Referral | null>
  markAsCompleted(id: string, refereeUserId: string): Promise<Referral>
  markAsRewarded(id: string): Promise<Referral>
}

/**
 * Project repository
 */
export interface IProjectRepository extends IRepository<Project> {
  findByUserId(userId: string): Promise<Project[]>
  findByUserIdAndType(userId: string, type: ProductType): Promise<Project[]>
}

/**
 * Template repository
 */
export interface ITemplateRepository extends IReadRepository<Template> {
  findByProductType(type: ProductType): Promise<Template[]>
  findFreeTemplates(): Promise<Template[]>
  findPremiumTemplates(): Promise<Template[]>
}

// ============================================================================
// Service Interfaces (Business Logic Layer)
// ============================================================================

/**
 * Authentication service
 */
export interface IAuthService {
  getCurrentUser(): Promise<User>
  requireAuth(): Promise<User>
  signOut(): Promise<void>
}

/**
 * Subscription service - handles plan logic
 */
export interface ISubscriptionService {
  getActiveSubscription(userId: string): Promise<Subscription | null>
  getUserPlan(userId: string): Promise<PlanType>
  getPlanLimits(plan: PlanType): PlanLimits
  isTrialing(subscription: Subscription | null): boolean
  createCheckoutSession(userId: string, priceId: string, trialDays?: number): Promise<string>
  cancelSubscription(userId: string): Promise<void>
}

/**
 * Usage tracking service
 */
export interface IUsageService {
  checkUsageLimit(userId: string, feature: FeatureType): Promise<UsageResult>
  incrementUsage(userId: string, feature: FeatureType, count?: number): Promise<void>
  getCurrentUsage(userId: string): Promise<Usage | null>
  canUseFeature(userId: string, feature: FeatureType): Promise<boolean>
}

/**
 * Referral service
 */
export interface IReferralService {
  generateReferralCode(userId: string): Promise<string>
  getReferralStats(userId: string): Promise<ReferralStats>
  trackReferral(referralCode: string, newUserId: string): Promise<void>
  processReferralReward(referralId: string): Promise<void>
  getUserReferrals(userId: string): Promise<Referral[]>
}

/**
 * Project service
 */
export interface IProjectService {
  createProject(userId: string, type: ProductType, title: string, data: Record<string, any>): Promise<Project>
  updateProject(projectId: string, data: Partial<Project>): Promise<Project>
  getProject(projectId: string): Promise<Project>
  getUserProjects(userId: string, type?: ProductType): Promise<Project[]>
  deleteProject(projectId: string): Promise<void>
}

/**
 * Template service - Strategy Pattern
 */
export interface ITemplateService {
  getTemplate(templateId: string): Promise<Template>
  getTemplatesForProduct(type: ProductType): Promise<Template[]>
  applyTemplate(projectId: string, templateId: string): Promise<Project>
}

/**
 * Template strategy interface
 */
export interface ITemplateStrategy {
  getProductType(): ProductType
  getDefaultTemplate(): Record<string, any>
  validateTemplateData(data: Record<string, any>): boolean
  applyTemplate(currentData: Record<string, any>, templateData: Record<string, any>): Record<string, any>
}

/**
 * Credits service
 */
export interface ICreditsService {
  getAvailablePacks(): Promise<CreditPack[]>
  purchaseCredits(userId: string, packId: string): Promise<CreditPurchase>
  useCredits(userId: string, feature: FeatureType, amount: number): Promise<boolean>
  getUserCreditsBalance(userId: string): Promise<number>
}

/**
 * Analytics service
 */
export interface IAnalyticsService {
  getUserAnalytics(userId: string): Promise<UserAnalytics>
  calculateValueDelivered(usage: Usage): number
  trackEvent(userId: string, eventName: string, properties?: Record<string, any>): Promise<void>
  getUserStreak(userId: string): Promise<number>
}

/**
 * Team service
 */
export interface ITeamService {
  createTeam(ownerId: string, name: string, plan: PlanType, seats: number): Promise<Team>
  inviteMember(teamId: string, email: string, role: 'admin' | 'member'): Promise<TeamInvite>
  acceptInvite(inviteCode: string, userId: string): Promise<TeamMember>
  removeTeamMember(teamId: string, userId: string): Promise<void>
  getTeamMembers(teamId: string): Promise<TeamMember[]>
}

/**
 * Email service
 */
export interface IEmailService {
  sendWelcomeEmail(user: User): Promise<void>
  sendTrialStartedEmail(user: User, trialEndDate: Date): Promise<void>
  sendTrialEndingEmail(user: User, daysRemaining: number): Promise<void>
  sendReferralRewardEmail(user: User, reward: string): Promise<void>
  sendInviteEmail(email: string, team: Team, inviteCode: string): Promise<void>
}

/**
 * Notification service
 */
export interface INotificationService {
  notifyUser(userId: string, title: string, message: string): Promise<void>
  notifyAchievement(userId: string, achievementId: string): Promise<void>
}

// ============================================================================
// Factory Interfaces
// ============================================================================

/**
 * Service factory for dependency injection
 */
export interface IServiceFactory {
  createAuthService(): IAuthService
  createSubscriptionService(): ISubscriptionService
  createUsageService(): IUsageService
  createReferralService(): IReferralService
  createProjectService(): IProjectService
  createTemplateService(): ITemplateService
  createCreditsService(): ICreditsService
  createAnalyticsService(): IAnalyticsService
  createTeamService(): ITeamService
  createEmailService(): IEmailService
}

/**
 * Repository factory
 */
export interface IRepositoryFactory {
  createUserRepository(): IUserRepository
  createSubscriptionRepository(): ISubscriptionRepository
  createUsageRepository(): IUsageRepository
  createReferralRepository(): IReferralRepository
  createProjectRepository(): IProjectRepository
  createTemplateRepository(): ITemplateRepository
}
