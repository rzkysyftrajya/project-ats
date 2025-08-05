-- Fix all database errors and setup complete schema

-- 1. Ensure articles table has all required columns
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS slug TEXT,
ADD COLUMN IF NOT EXISTS excerpt TEXT DEFAULT '',
ADD COLUMN IF NOT EXISTS image_url TEXT DEFAULT '';

-- 2. Create unique index on slug
CREATE UNIQUE INDEX IF NOT EXISTS articles_slug_idx ON articles(slug) WHERE slug IS NOT NULL;

-- 3. Update existing articles to have slugs if they don't
UPDATE articles 
SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '''', ''))
WHERE slug IS NULL OR slug = '';

-- 4. Ensure gallery table exists
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  image_url TEXT NOT NULL,
  alt_text TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Ensure settings table exists
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Insert default settings if they don't exist
INSERT INTO settings (key, value, description) VALUES
('site_title', 'CV ATS Rent Car', 'Website title')
ON CONFLICT (key) DO NOTHING;

INSERT INTO settings (key, value, description) VALUES
('site_description', 'Layanan sewa mobil terpercaya', 'Website description')
ON CONFLICT (key) DO NOTHING;

INSERT INTO settings (key, value, description) VALUES
('contact_phone', '+62 123 456 7890', 'Contact phone number')
ON CONFLICT (key) DO NOTHING;

INSERT INTO settings (key, value, description) VALUES
('contact_email', 'info@cvats-rentcar.com', 'Contact email address')
ON CONFLICT (key) DO NOTHING;

-- 7. Enable RLS on all tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- 8. Create policies for public read access
CREATE POLICY IF NOT EXISTS "Public can read published articles" ON articles
FOR SELECT USING (published = true);

CREATE POLICY IF NOT EXISTS "Public can read gallery" ON gallery
FOR SELECT USING (true);

CREATE POLICY IF NOT EXISTS "Public can read settings" ON settings
FOR SELECT USING (true);

-- 9. Create policies for service role (admin) access
CREATE POLICY IF NOT EXISTS "Service role can manage articles" ON articles
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage gallery" ON gallery
FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY IF NOT EXISTS "Service role can manage settings" ON settings
FOR ALL USING (auth.role() = 'service_role');

-- 10. Create storage bucket for article images if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- 11. Create storage policies
CREATE POLICY IF NOT EXISTS "Public can view article images" ON storage.objects
FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY IF NOT EXISTS "Service role can manage article images" ON storage.objects
FOR ALL USING (bucket_id = 'article-images' AND auth.role() = 'service_role');

-- 12. Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 13. Create triggers for updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 14. Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON articles, gallery, settings TO anon, authenticated;
GRANT ALL ON articles, gallery, settings TO service_role;
GRANT USAGE ON SCHEMA storage TO anon, authenticated, service_role;
GRANT SELECT ON storage.objects TO anon, authenticated;
GRANT ALL ON storage.objects TO service_role;
