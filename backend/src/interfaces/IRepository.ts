/**
 * Repository Interface
 * Abstracts data access layer
 * Follows: Single Responsibility, Dependency Inversion
 */

/**
 * Base repository interface for all entities
 * Follows Repository Pattern
 */
export interface IRepository<T> {
  /**
   * Find entity by ID
   */
  findById(id: string): Promise<T | null>;

  /**
   * Find all entities matching filter
   */
  findAll(filter?: Partial<T>): Promise<T[]>;

  /**
   * Create new entity
   */
  create(entity: Omit<T, 'id' | 'createdAt' | 'updatedAt'>): Promise<T>;

  /**
   * Update existing entity
   */
  update(id: string, updates: Partial<T>): Promise<T>;

  /**
   * Delete entity
   */
  delete(id: string): Promise<boolean>;

  /**
   * Count entities matching filter
   */
  count(filter?: Partial<T>): Promise<number>;
}

/**
 * User entity
 */
export interface User {
  id: string;
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  subscriptionTier: string;
  subscriptionStatus: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  subscriptionStartDate?: Date;
  subscriptionEndDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * User-specific repository methods
 */
export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findByClerkId(clerkId: string): Promise<User | null>;
  findByStripeCustomerId(customerId: string): Promise<User | null>;
  updateSubscription(userId: string, subscription: {
    tier: string;
    status: string;
    stripeSubscriptionId?: string;
    startDate?: Date;
    endDate?: Date;
  }): Promise<User>;
}

/**
 * Job entity
 */
export interface Job {
  id: string;
  userId: string;
  type: string; // 'format', 'audiobook', 'cover', 'image', etc.
  status: string; // 'pending', 'processing', 'completed', 'failed'
  progress: number; // 0-100
  inputFileName?: string;
  inputFileUrl?: string;
  inputFileSize?: number;
  title?: string;
  author?: string;
  genre?: string;
  wordCount?: number;
  chapterCount?: number;
  outputFiles: Array<{
    type: string;
    url: string;
    size: number;
  }>;
  errorMessage?: string;
  retryCount: number;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  updatedAt: Date;
}

/**
 * Job-specific repository methods
 */
export interface IJobRepository extends IRepository<Job> {
  findByUserId(userId: string, limit?: number): Promise<Job[]>;
  findPending(): Promise<Job[]>;
  findProcessing(): Promise<Job[]>;
  updateStatus(jobId: string, status: string, progress?: number): Promise<Job>;
  addOutputFile(jobId: string, file: { type: string; url: string; size: number }): Promise<Job>;
  markFailed(jobId: string, errorMessage: string): Promise<Job>;
}

/**
 * Usage entity
 */
export interface Usage {
  id: string;
  userId: string;
  month: string; // Format: 'YYYY-MM'
  formatsUsed: number;
  audiobooksUsed: number;
  coversUsed: number;
  imagesUsed: number;
  cookbooksUsed: number;
  healthContentUsed: number;
  marketingContentUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Usage-specific repository methods
 */
export interface IUsageRepository extends IRepository<Usage> {
  findByUserAndMonth(userId: string, month: string): Promise<Usage | null>;
  incrementUsage(userId: string, feature: string): Promise<Usage>;
  getCurrentMonthUsage(userId: string): Promise<Usage>;
  hasReachedLimit(userId: string, feature: string, limit: number): Promise<boolean>;
}

/**
 * Subscription Plan entity
 */
export interface SubscriptionPlan {
  id: string;
  name: string;
  stripePriceId: string;
  priceMonthly: number;
  formatsPerMonth: number | null; // null = unlimited
  audiobooksPerMonth: number | null;
  coversPerMonth: number | null;
  imagesPerMonth: number | null;
  cookbooksPerMonth: number | null;
  healthContentPerMonth: number | null;
  marketingContentPerMonth: number | null;
  features: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Subscription Plan repository
 */
export interface ISubscriptionPlanRepository extends IRepository<SubscriptionPlan> {
  findByName(name: string): Promise<SubscriptionPlan | null>;
  findByStripePriceId(priceId: string): Promise<SubscriptionPlan | null>;
  findAllActive(): Promise<SubscriptionPlan[]>;
}
