-- PhoenixForge AI - Database Schema for Supabase
-- This schema supports user management, subscriptions, and job processing

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE
-- ============================================
-- Stores user information (synced from Clerk)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  clerk_id TEXT UNIQUE NOT NULL, -- Clerk user ID
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  subscription_tier TEXT DEFAULT 'free', -- 'free', 'pro', 'enterprise'
  subscription_status TEXT DEFAULT 'inactive', -- 'active', 'inactive', 'cancelled', 'past_due'
  stripe_customer_id TEXT, -- Stripe customer ID
  stripe_subscription_id TEXT, -- Stripe subscription ID
  subscription_start_date TIMESTAMP,
  subscription_end_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Index for fast lookups
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_stripe_customer_id ON users(stripe_customer_id);

-- ============================================
-- JOBS TABLE
-- ============================================
-- Stores processing jobs (manuscript formatting, etc.)
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'format', 'cover', 'image', etc.
  status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed'
  progress INTEGER DEFAULT 0, -- 0-100

  -- Input data
  input_file_name TEXT,
  input_file_url TEXT, -- Supabase Storage URL
  input_file_size INTEGER,

  -- Processing metadata
  title TEXT,
  author TEXT,
  genre TEXT,
  word_count INTEGER,
  chapter_count INTEGER,

  -- Output data
  output_files JSONB DEFAULT '[]'::jsonb, -- Array of {type, url, size}

  -- Error tracking
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_jobs_user_id ON jobs(user_id);
CREATE INDEX idx_jobs_status ON jobs(status);
CREATE INDEX idx_jobs_created_at ON jobs(created_at DESC);

-- ============================================
-- USAGE TRACKING TABLE
-- ============================================
-- Tracks monthly usage per user (7 products)
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: 'YYYY-MM'

  -- Phase 1 Usage Counters
  formats_used INTEGER DEFAULT 0,
  audiobooks_used INTEGER DEFAULT 0,

  -- Phase 2 Usage Counters
  covers_used INTEGER DEFAULT 0,
  images_used INTEGER DEFAULT 0,

  -- Phase 3 Usage Counters
  cookbooks_used INTEGER DEFAULT 0,
  health_content_used INTEGER DEFAULT 0,
  marketing_content_used INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),

  -- Unique constraint: one record per user per month
  UNIQUE(user_id, month)
);

-- Index for fast monthly lookups
CREATE INDEX idx_usage_user_month ON usage(user_id, month);

-- ============================================
-- SUBSCRIPTION PLANS TABLE
-- ============================================
-- Define available subscription plans (7 products)
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,

  -- Phase 1 Limits
  formats_per_month INTEGER, -- NULL = unlimited
  audiobooks_per_month INTEGER,

  -- Phase 2 Limits
  covers_per_month INTEGER,
  images_per_month INTEGER,

  -- Phase 3 Limits
  cookbooks_per_month INTEGER,
  health_content_per_month INTEGER,
  marketing_content_per_month INTEGER,

  -- Features
  features JSONB DEFAULT '[]'::jsonb,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert phased rollout plans
INSERT INTO subscription_plans (
  name, stripe_price_id, price_monthly,
  formats_per_month, audiobooks_per_month,
  covers_per_month, images_per_month,
  cookbooks_per_month, health_content_per_month, marketing_content_per_month,
  features
) VALUES
-- Free Tier (Lead Generation)
('free', 'free', 0,
  1, 1, -- 1 format, 1 audiobook preview
  3, 5, -- 3 covers, 5 images
  0, 0, 0, -- No cookbook/health/marketing
  '["1 format/month", "1 audiobook preview", "3 cover variations", "5 images", "Basic templates"]'::jsonb),

-- Starter ($19) - Choose one product
('starter', 'price_starter', 19,
  10, 5, -- 10 formats OR 5 audiobooks
  10, 20, -- OR 10 covers, 20 images
  0, 0, 0,
  '["Choose ONE product", "10 formats OR 5 audiobooks OR 10 covers", "Basic templates", "Email support"]'::jsonb),

-- Author ($29) - Formatter + Audiobook Bundle ⭐ MOST POPULAR
('author', 'price_author', 29,
  NULL, 10, -- Unlimited formats, 10 audiobooks
  10, 50, -- 10 covers, 50 images
  0, 0, 0,
  '["Unlimited formats", "10 audiobooks/month", "10 covers", "50 images", "Priority support", "No watermarks"]'::jsonb),

-- Author Pro ($49) - Everything + Visual Suite
('author_pro', 'price_author_pro', 49,
  NULL, NULL, -- Unlimited formats & audiobooks
  NULL, 100, -- Unlimited covers, 100 images
  0, 0, 10, -- Basic marketing
  '["Everything in Author", "Unlimited covers", "100 images/month", "Marketing suite (10/month)", "Advanced templates"]'::jsonb),

-- Health Author ($49) - Specialized for cookbook/wellness writers
('health_author', 'price_health_author', 49,
  NULL, 10, -- Unlimited formats, 10 audiobooks
  10, 50, -- 10 covers, 50 images
  NULL, 100, 0, -- Unlimited cookbooks, 100 health content
  '["Unlimited cookbook formatting", "Nutrition analysis (100/month)", "Medical citations", "Health content generation", "Diet-specific templates"]'::jsonb),

-- Complete Suite ($79) - All 7 products
('complete', 'price_complete', 79,
  NULL, NULL, -- Unlimited
  NULL, NULL, -- Unlimited
  NULL, NULL, NULL, -- Unlimited
  '["ALL 7 products unlimited", "Priority support", "No watermarks", "Advanced customization", "All templates"]'::jsonb),

-- Enterprise ($149) - Teams & API
('enterprise', 'price_enterprise', 149,
  NULL, NULL,
  NULL, NULL,
  NULL, NULL, NULL,
  '["Everything in Complete", "Team accounts (10 users)", "API access (10K calls/month)", "White label option", "Dedicated support", "Custom integrations"]'::jsonb);

-- ============================================
-- WEBHOOKS TABLE
-- ============================================
-- Store incoming webhook events for debugging
CREATE TABLE webhooks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL, -- 'stripe.checkout.completed', etc.
  payload JSONB NOT NULL,
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_webhooks_type ON webhooks(type);
CREATE INDEX idx_webhooks_processed ON webhooks(processed);

-- ============================================
-- STORAGE BUCKETS
-- ============================================
-- Create storage buckets in Supabase dashboard:
-- 1. 'uploads' - for user uploaded manuscripts (private)
-- 2. 'outputs' - for generated files (private, temporary)
-- 3. 'public' - for public assets like examples

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscription_plans ENABLE ROW LEVEL SECURITY;

-- Users can only read their own data
CREATE POLICY "Users can view own data" ON users
  FOR SELECT USING (clerk_id = auth.jwt() ->> 'sub');

-- Users can only view their own jobs
CREATE POLICY "Users can view own jobs" ON jobs
  FOR SELECT USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
  ));

-- Users can only view their own usage
CREATE POLICY "Users can view own usage" ON usage
  FOR SELECT USING (user_id IN (
    SELECT id FROM users WHERE clerk_id = auth.jwt() ->> 'sub'
  ));

-- Everyone can read subscription plans
CREATE POLICY "Anyone can view subscription plans" ON subscription_plans
  FOR SELECT USING (is_active = true);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers to update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON jobs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_usage_updated_at BEFORE UPDATE ON usage
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to get or create usage record for current month
CREATE OR REPLACE FUNCTION get_or_create_usage(p_user_id UUID)
RETURNS UUID AS $$
DECLARE
  v_month TEXT;
  v_usage_id UUID;
BEGIN
  v_month := TO_CHAR(NOW(), 'YYYY-MM');

  INSERT INTO usage (user_id, month)
  VALUES (p_user_id, v_month)
  ON CONFLICT (user_id, month) DO UPDATE SET updated_at = NOW()
  RETURNING id INTO v_usage_id;

  RETURN v_usage_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment usage counter (7 products)
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_feature TEXT -- 'formats', 'audiobooks', 'covers', 'images', 'cookbooks', 'health_content', 'marketing_content'
)
RETURNS BOOLEAN AS $$
DECLARE
  v_usage_id UUID;
BEGIN
  v_usage_id := get_or_create_usage(p_user_id);

  CASE p_feature
    -- Phase 1
    WHEN 'formats' THEN
      UPDATE usage SET formats_used = formats_used + 1 WHERE id = v_usage_id;
    WHEN 'audiobooks' THEN
      UPDATE usage SET audiobooks_used = audiobooks_used + 1 WHERE id = v_usage_id;
    -- Phase 2
    WHEN 'covers' THEN
      UPDATE usage SET covers_used = covers_used + 1 WHERE id = v_usage_id;
    WHEN 'images' THEN
      UPDATE usage SET images_used = images_used + 1 WHERE id = v_usage_id;
    -- Phase 3
    WHEN 'cookbooks' THEN
      UPDATE usage SET cookbooks_used = cookbooks_used + 1 WHERE id = v_usage_id;
    WHEN 'health_content' THEN
      UPDATE usage SET health_content_used = health_content_used + 1 WHERE id = v_usage_id;
    WHEN 'marketing_content' THEN
      UPDATE usage SET marketing_content_used = marketing_content_used + 1 WHERE id = v_usage_id;
  END CASE;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS
-- ============================================

-- View to get user subscription details (7 products)
CREATE OR REPLACE VIEW user_subscription_details AS
SELECT
  u.id,
  u.clerk_id,
  u.email,
  u.subscription_tier,
  u.subscription_status,
  sp.name AS plan_name,
  sp.price_monthly,

  -- Phase 1 Limits
  sp.formats_per_month,
  sp.audiobooks_per_month,

  -- Phase 2 Limits
  sp.covers_per_month,
  sp.images_per_month,

  -- Phase 3 Limits
  sp.cookbooks_per_month,
  sp.health_content_per_month,
  sp.marketing_content_per_month,

  -- Features
  sp.features,

  -- Subscription dates
  u.subscription_start_date,
  u.subscription_end_date,

  -- Phase 1 Usage
  COALESCE(usage.formats_used, 0) AS formats_used_this_month,
  COALESCE(usage.audiobooks_used, 0) AS audiobooks_used_this_month,

  -- Phase 2 Usage
  COALESCE(usage.covers_used, 0) AS covers_used_this_month,
  COALESCE(usage.images_used, 0) AS images_used_this_month,

  -- Phase 3 Usage
  COALESCE(usage.cookbooks_used, 0) AS cookbooks_used_this_month,
  COALESCE(usage.health_content_used, 0) AS health_content_used_this_month,
  COALESCE(usage.marketing_content_used, 0) AS marketing_content_used_this_month,

  -- Current month
  TO_CHAR(NOW(), 'YYYY-MM') AS current_month
FROM users u
LEFT JOIN subscription_plans sp ON u.subscription_tier = sp.name
LEFT JOIN usage ON u.id = usage.user_id AND usage.month = TO_CHAR(NOW(), 'YYYY-MM');

-- ============================================
-- SAMPLE DATA (for testing)
-- ============================================

-- Uncomment to insert sample data for testing:
-- INSERT INTO users (clerk_id, email, first_name, last_name, subscription_tier, subscription_status) VALUES
-- ('user_test123', 'test@example.com', 'Test', 'User', 'pro', 'active');

-- ============================================
-- NOTES
-- ============================================

/*
SETUP INSTRUCTIONS:

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Copy and paste this entire file
4. Click "Run"
5. Go to Storage and create buckets:
   - 'uploads' (private)
   - 'outputs' (private)
   - 'public' (public)

6. Set up storage policies:
   - Users can upload to 'uploads' bucket with their user_id folder
   - Users can read from 'outputs' bucket with their user_id folder
   - Everyone can read from 'public' bucket

7. Get your Supabase credentials:
   - Project URL: https://xxx.supabase.co
   - Anon Key: eyJhbGc...
   - Service Role Key: eyJhbGc... (keep secret!)

8. Add to your .env files (frontend and backend):
   REACT_APP_SUPABASE_URL=https://xxx.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=eyJhbGc...
   SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
*/
