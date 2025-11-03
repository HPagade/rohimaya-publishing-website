-- ============================================================================
-- PhoenixForge Platform Database Migrations
-- Following SOLID principles with proper table design
-- ============================================================================

-- ============================================================================
-- 1. Referrals Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  referee_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  referral_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'rewarded')),
  reward_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  CONSTRAINT unique_referral_code UNIQUE(referral_code)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_user_id ON referrals(referrer_user_id);
CREATE INDEX IF NOT EXISTS idx_referrals_referral_code ON referrals(referral_code);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);

-- Row Level Security
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own referrals"
  ON referrals FOR SELECT
  USING (auth.uid() = referrer_user_id);

CREATE POLICY "Users can create referrals"
  ON referrals FOR INSERT
  WITH CHECK (auth.uid() = referrer_user_id);

-- ============================================================================
-- 2. Projects Table (Save Work-in-Progress)
-- ============================================================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_type TEXT NOT NULL CHECK (product_type IN ('formatter', 'audiobook', 'covers', 'images', 'cookbook', 'health', 'marketing')),
  title TEXT NOT NULL,
  data JSONB NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'generating', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_product_type ON projects(product_type);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_updated_at ON projects(updated_at DESC);

-- Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own projects"
  ON projects FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own projects"
  ON projects FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own projects"
  ON projects FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own projects"
  ON projects FOR DELETE
  USING (auth.uid() = user_id);

-- Auto-update timestamp trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 3. Templates Table
-- ============================================================================

CREATE TABLE IF NOT EXISTS templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_type TEXT NOT NULL CHECK (product_type IN ('formatter', 'audiobook', 'covers', 'images', 'cookbook', 'health', 'marketing')),
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  data JSONB NOT NULL DEFAULT '{}',
  preview_image TEXT,
  is_premium BOOLEAN NOT NULL DEFAULT false,
  price INTEGER DEFAULT 0, -- in cents
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_templates_product_type ON templates(product_type);
CREATE INDEX IF NOT EXISTS idx_templates_is_premium ON templates(is_premium);
CREATE INDEX IF NOT EXISTS idx_templates_category ON templates(category);

-- Row Level Security (templates are public readable)
ALTER TABLE templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Templates are viewable by everyone"
  ON templates FOR SELECT
  TO authenticated
  USING (true);

-- ============================================================================
-- 4. Credits Tables
-- ============================================================================

-- Credit packs available for purchase
CREATE TABLE IF NOT EXISTS credit_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL CHECK (type IN ('formats', 'audiobooks', 'covers', 'images', 'cookbooks', 'health_content', 'marketing_content')),
  amount INTEGER NOT NULL,
  price INTEGER NOT NULL, -- in cents
  name TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credit_packs_type ON credit_packs(type);
CREATE INDEX IF NOT EXISTS idx_credit_packs_is_active ON credit_packs(is_active);

-- Row Level Security
ALTER TABLE credit_packs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Credit packs are viewable by everyone"
  ON credit_packs FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Credit purchases
CREATE TABLE IF NOT EXISTS credit_purchases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  pack_id UUID NOT NULL REFERENCES credit_packs(id),
  credits_purchased INTEGER NOT NULL,
  credits_type TEXT NOT NULL,
  amount_paid INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credit_purchases_user_id ON credit_purchases(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_purchases_created_at ON credit_purchases(created_at DESC);

-- Row Level Security
ALTER TABLE credit_purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credit purchases"
  ON credit_purchases FOR SELECT
  USING (auth.uid() = user_id);

-- Credit usage tracking
CREATE TABLE IF NOT EXISTS credit_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  credits_used INTEGER NOT NULL,
  feature_type TEXT NOT NULL,
  project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_credit_usage_user_id ON credit_usage(user_id);
CREATE INDEX IF NOT EXISTS idx_credit_usage_created_at ON credit_usage(created_at DESC);

-- Row Level Security
ALTER TABLE credit_usage ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own credit usage"
  ON credit_usage FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- 5. User Profile Extensions
-- ============================================================================

-- Add new columns to existing users table (if not exists)
-- Note: This assumes you have a user_profiles or similar table
-- Adjust based on your actual schema

-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS credits_balance INTEGER DEFAULT 0;
-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;
-- ALTER TABLE user_profiles ADD COLUMN IF NOT EXISTS trial_ends_at TIMESTAMPTZ;

-- ============================================================================
-- 6. Teams Tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS teams (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  owner_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('team', 'enterprise')),
  seats_total INTEGER NOT NULL,
  seats_used INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_teams_owner_user_id ON teams(owner_user_id);

-- Row Level Security
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team owners can view their teams"
  ON teams FOR SELECT
  USING (auth.uid() = owner_user_id);

CREATE POLICY "Team owners can update their teams"
  ON teams FOR UPDATE
  USING (auth.uid() = owner_user_id);

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_team_members_team_id ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user_id ON team_members(user_id);

-- Row Level Security
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team members can view their team membership"
  ON team_members FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() IN (
    SELECT owner_user_id FROM teams WHERE id = team_id
  ));

-- Team invites
CREATE TABLE IF NOT EXISTS team_invites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES teams(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('admin', 'member')),
  invite_code TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'expired')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '7 days')
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_team_invites_team_id ON team_invites(team_id);
CREATE INDEX IF NOT EXISTS idx_team_invites_invite_code ON team_invites(invite_code);
CREATE INDEX IF NOT EXISTS idx_team_invites_email ON team_invites(email);

-- Row Level Security
ALTER TABLE team_invites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Team owners can view their invites"
  ON team_invites FOR SELECT
  USING (auth.uid() IN (
    SELECT owner_user_id FROM teams WHERE id = team_id
  ));

-- ============================================================================
-- 7. Analytics Tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS user_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_user_events_user_id ON user_events(user_id);
CREATE INDEX IF NOT EXISTS idx_user_events_event_name ON user_events(event_name);
CREATE INDEX IF NOT EXISTS idx_user_events_created_at ON user_events(created_at DESC);

-- Row Level Security
ALTER TABLE user_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own events"
  ON user_events FOR SELECT
  USING (auth.uid() = user_id);

-- ============================================================================
-- 8. Sample Data for Templates
-- ============================================================================

-- Insert default free templates for each product type

-- Formatter templates
INSERT INTO templates (product_type, name, description, category, data, is_premium, price)
VALUES
  ('formatter', 'Fiction Novel', 'Standard format for fiction novels', 'Novel',
   '{"format": "trade_paperback", "pageSize": "us_trade", "font": "Georgia", "fontSize": 12}',
   false, 0),
  ('formatter', 'Non-Fiction Book', 'Professional format for non-fiction', 'Non-Fiction',
   '{"format": "trade_paperback", "pageSize": "us_trade", "font": "Times New Roman", "fontSize": 11}',
   false, 0),
  ('formatter', 'Poetry Collection', 'Elegant format for poetry', 'Poetry',
   '{"format": "digest", "pageSize": "digest", "font": "Palatino", "fontSize": 10}',
   false, 0);

-- Audiobook templates
INSERT INTO templates (product_type, name, description, category, data, is_premium, price)
VALUES
  ('audiobook', 'Mystery Thriller', 'Suspenseful narration style', 'Fiction',
   '{"voice": "onyx", "speed": 1.0}',
   false, 0),
  ('audiobook', 'Self-Help Guide', 'Clear, motivational narration', 'Non-Fiction',
   '{"voice": "nova", "speed": 0.95}',
   false, 0);

-- Cookbook templates
INSERT INTO templates (product_type, name, description, category, data, is_premium, price)
VALUES
  ('cookbook', 'Modern Cookbook', 'Clean, contemporary layout', 'Modern',
   '{"layout": "modern", "includeImages": true, "recipesPerPage": 1}',
   false, 0),
  ('cookbook', 'Classic Cookbook', 'Traditional cookbook format', 'Classic',
   '{"layout": "classic", "includeImages": true, "recipesPerPage": 2}',
   false, 0);

-- Health templates
INSERT INTO templates (product_type, name, description, category, data, is_premium, price)
VALUES
  ('health', 'Beginner Workout Plan', '30-day workout plan for beginners', 'Fitness',
   '{"contentType": "workout", "level": "beginner", "duration": "30-days"}',
   false, 0),
  ('health', 'Keto Meal Plan', '7-day keto meal plan', 'Nutrition',
   '{"contentType": "meal", "goal": "keto", "days": 7}',
   false, 0);

-- Marketing templates
INSERT INTO templates (product_type, name, description, category, data, is_premium, price)
VALUES
  ('marketing', 'Book Launch Campaign', 'Complete book launch marketing', 'Campaign',
   '{"contentType": "email", "format": "campaign", "emails": 5}',
   false, 0),
  ('marketing', 'Social Media Kit', 'Ready-to-post social content', 'Social',
   '{"contentType": "social", "platform": "multi", "posts": 10}',
   false, 0);

-- ============================================================================
-- 9. Sample Data for Credit Packs
-- ============================================================================

INSERT INTO credit_packs (type, amount, price, name, description, is_active)
VALUES
  ('formats', 10, 500, '10 Extra Formats', 'Add 10 format credits to your account', true),
  ('audiobooks', 5, 1000, '5 Extra Audiobooks', 'Add 5 audiobook credits to your account', true),
  ('images', 10, 800, '10 Extra Images', 'Add 10 AI image credits to your account', true),
  ('covers', 5, 700, '5 Extra Covers', 'Add 5 book cover credits to your account', true),
  ('cookbooks', 3, 700, '3 Extra Cookbooks', 'Add 3 cookbook credits to your account', true),
  ('health_content', 10, 500, '10 Health Content Pieces', 'Add 10 health content credits', true),
  ('marketing_content', 20, 700, '20 Marketing Assets', 'Add 20 marketing credits', true);

-- ============================================================================
-- 10. Helper Functions
-- ============================================================================

-- Function to get user's credit balance
CREATE OR REPLACE FUNCTION get_user_credits_balance(p_user_id UUID)
RETURNS INTEGER AS $$
DECLARE
  v_purchased INTEGER;
  v_used INTEGER;
BEGIN
  -- Sum all purchased credits
  SELECT COALESCE(SUM(credits_purchased), 0)
  INTO v_purchased
  FROM credit_purchases
  WHERE user_id = p_user_id;

  -- Sum all used credits
  SELECT COALESCE(SUM(credits_used), 0)
  INTO v_used
  FROM credit_usage
  WHERE user_id = p_user_id;

  RETURN v_purchased - v_used;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to use credits
CREATE OR REPLACE FUNCTION use_credits(
  p_user_id UUID,
  p_feature_type TEXT,
  p_amount INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
  v_balance INTEGER;
BEGIN
  -- Get current balance
  v_balance := get_user_credits_balance(p_user_id);

  -- Check if user has enough credits
  IF v_balance < p_amount THEN
    RETURN false;
  END IF;

  -- Record usage
  INSERT INTO credit_usage (user_id, credits_used, feature_type)
  VALUES (p_user_id, p_amount, p_feature_type);

  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- END OF MIGRATIONS
-- ============================================================================

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;
