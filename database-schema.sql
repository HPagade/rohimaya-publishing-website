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
-- Tracks monthly usage per user
CREATE TABLE usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  month TEXT NOT NULL, -- Format: 'YYYY-MM'

  -- Usage counters
  formats_used INTEGER DEFAULT 0,
  covers_used INTEGER DEFAULT 0,
  images_used INTEGER DEFAULT 0,
  videos_used INTEGER DEFAULT 0,

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
-- Define available subscription plans
CREATE TABLE subscription_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  stripe_price_id TEXT UNIQUE NOT NULL,
  price_monthly DECIMAL(10,2) NOT NULL,

  -- Limits
  formats_per_month INTEGER, -- NULL = unlimited
  covers_per_month INTEGER,
  images_per_month INTEGER,
  videos_per_month INTEGER,

  -- Features
  features JSONB DEFAULT '[]'::jsonb,

  -- Status
  is_active BOOLEAN DEFAULT true,

  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default plans
INSERT INTO subscription_plans (name, stripe_price_id, price_monthly, formats_per_month, covers_per_month, images_per_month, videos_per_month, features) VALUES
('Free', 'free', 0, 1, 0, 0, 0, '["1 format per month", "Basic quality", "Email support"]'::jsonb),
('Pro', 'price_pro', 29, NULL, NULL, NULL, NULL, '["Unlimited formats", "HD quality", "Priority support", "All export formats", "No watermarks"]'::jsonb),
('Enterprise', 'price_enterprise', 99, NULL, NULL, NULL, NULL, '["Everything in Pro", "Team accounts", "API access", "White label", "Dedicated support"]'::jsonb);

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

-- Function to increment usage counter
CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_feature TEXT -- 'formats', 'covers', 'images', 'videos'
)
RETURNS BOOLEAN AS $$
DECLARE
  v_usage_id UUID;
BEGIN
  v_usage_id := get_or_create_usage(p_user_id);

  CASE p_feature
    WHEN 'formats' THEN
      UPDATE usage SET formats_used = formats_used + 1 WHERE id = v_usage_id;
    WHEN 'covers' THEN
      UPDATE usage SET covers_used = covers_used + 1 WHERE id = v_usage_id;
    WHEN 'images' THEN
      UPDATE usage SET images_used = images_used + 1 WHERE id = v_usage_id;
    WHEN 'videos' THEN
      UPDATE usage SET videos_used = videos_used + 1 WHERE id = v_usage_id;
  END CASE;

  RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS
-- ============================================

-- View to get user subscription details
CREATE OR REPLACE VIEW user_subscription_details AS
SELECT
  u.id,
  u.clerk_id,
  u.email,
  u.subscription_tier,
  u.subscription_status,
  sp.name AS plan_name,
  sp.price_monthly,
  sp.formats_per_month,
  sp.covers_per_month,
  sp.images_per_month,
  sp.videos_per_month,
  sp.features,
  u.subscription_start_date,
  u.subscription_end_date,
  COALESCE(usage.formats_used, 0) AS formats_used_this_month,
  COALESCE(usage.covers_used, 0) AS covers_used_this_month,
  COALESCE(usage.images_used, 0) AS images_used_this_month,
  COALESCE(usage.videos_used, 0) AS videos_used_this_month,
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
