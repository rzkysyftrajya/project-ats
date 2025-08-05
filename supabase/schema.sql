-- Create articles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'articles') THEN
        CREATE TABLE articles (
            id SERIAL PRIMARY KEY,
            title TEXT NOT NULL,
            slug TEXT UNIQUE NOT NULL,
            excerpt TEXT,
            content TEXT,
            category TEXT DEFAULT 'tips',
            author TEXT DEFAULT 'CV ATS RentCar',
            publish_date DATE DEFAULT CURRENT_DATE,
            read_time TEXT DEFAULT '5 menit',
            views INTEGER DEFAULT 0,
            likes INTEGER DEFAULT 0,
            image_url TEXT,
            tags TEXT[],
            featured BOOLEAN DEFAULT false,
            status TEXT DEFAULT 'published',
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        );
    END IF;
END $$;

-- Create gallery table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'gallery') THEN
        CREATE TABLE gallery (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            category TEXT DEFAULT 'armada',
            description TEXT,
            image_url TEXT NOT NULL,
            upload_date DATE DEFAULT CURRENT_DATE,
            tags TEXT[],
            views INTEGER DEFAULT 0,
            likes INTEGER DEFAULT 0,
            created_at TIMESTAMP DEFAULT NOW()
        );
    END IF;
END $$;

-- Create settings table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'settings') THEN
        CREATE TABLE settings (
            key TEXT PRIMARY KEY,
            value JSONB NOT NULL,
            updated_at TIMESTAMP DEFAULT NOW()
        );
    END IF;
END $$;

-- Insert default settings if they don't exist
INSERT INTO settings (key, value) VALUES
('company_info', '{
  "companyName": "ATS RentCar Medan",
  "tagline": "Rental Mobil & Tour",
  "phone": "0852-0726-5558",
  "whatsapp": "6285207265558",
  "address": "Jl. Eka Warni Komplek Rispa 1 No.23, Gedung Johor, Medan",
  "email": "info@atsrentcarmedan.com",
  "socials": {
    "facebook": "https://www.facebook.com/atsrentcarmedan/",
    "instagram": "https://www.instagram.com/sewamobilmedan_ats/"
  }
}')
ON CONFLICT (key) DO NOTHING;

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Public can read settings" ON settings;

-- Create policies
-- Public can read published articles
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT USING (status = 'published');

-- Public can read gallery
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT USING (true);

-- Public can read settings
CREATE POLICY "Public can read settings" ON settings
  FOR SELECT USING (true);

-- Note: For INSERT/UPDATE/DELETE operations from the admin panel,
-- we are now using the `SUPABASE_SERVICE_ROLE_KEY` with `supabaseAdmin` in Server Actions.
-- This key bypasses RLS, so no specific RLS policies are needed for admin mutations.
-- If you were to implement Supabase Auth for admin users, you would add policies like:
-- CREATE POLICY "Authenticated users can insert articles" ON articles
--   FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Authenticated users can update articles" ON articles
--   FOR UPDATE TO authenticated USING (true);
-- CREATE POLICY "Authenticated users can delete articles" ON articles
--   FOR DELETE TO authenticated USING (true);


-- Create or replace functions
CREATE OR REPLACE FUNCTION increment_article_views(article_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION increment_gallery_views(gallery_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE gallery SET views = views + 1 WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql;
