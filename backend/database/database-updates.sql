-- Update increment_usage function to support count parameter
-- This allows incrementing by more than 1 (e.g., for multiple audiobook chapters)

CREATE OR REPLACE FUNCTION increment_usage(
  p_user_id UUID,
  p_feature TEXT, -- 'formats', 'audiobooks', 'covers', 'images', 'cookbooks', 'health_content', 'marketing_content'
  p_count INTEGER DEFAULT 1
)
RETURNS BOOLEAN AS $$
DECLARE
  v_usage_id UUID;
BEGIN
  v_usage_id := get_or_create_usage(p_user_id);

  CASE p_feature
    -- Phase 1
    WHEN 'formats' THEN
      UPDATE usage SET formats_used = formats_used + p_count WHERE id = v_usage_id;
    WHEN 'audiobooks' THEN
      UPDATE usage SET audiobooks_used = audiobooks_used + p_count WHERE id = v_usage_id;
    -- Phase 2
    WHEN 'covers' THEN
      UPDATE usage SET covers_used = covers_used + p_count WHERE id = v_usage_id;
    WHEN 'images' THEN
      UPDATE usage SET images_used = images_used + p_count WHERE id = v_usage_id;
    -- Phase 3
    WHEN 'cookbooks' THEN
      UPDATE usage SET cookbooks_used = cookbooks_used + p_count WHERE id = v_usage_id;
    WHEN 'health_content' THEN
      UPDATE usage SET health_content_used = health_content_used + p_count WHERE id = v_usage_id;
    WHEN 'marketing_content' THEN
      UPDATE usage SET marketing_content_used = marketing_content_used + p_count WHERE id = v_usage_id;
    ELSE
      RAISE EXCEPTION 'Unknown feature: %', p_feature;
  END CASE;

  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create storage buckets for audiobooks and covers
-- Run these in Supabase SQL Editor or via migrations

INSERT INTO storage.buckets (id, name, public)
VALUES
  ('audiobooks', 'audiobooks', true),
  ('covers', 'covers', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for audiobooks bucket
CREATE POLICY "Users can upload their own audiobooks"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'audiobooks' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own audiobooks"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'audiobooks' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can read audiobooks"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'audiobooks');

-- Set up storage policies for covers bucket
CREATE POLICY "Users can upload their own covers"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read their own covers"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'covers' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Public can read covers"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'covers');
