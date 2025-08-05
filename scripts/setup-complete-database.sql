-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  category VARCHAR(100) NOT NULL,
  author VARCHAR(100) NOT NULL,
  published BOOLEAN DEFAULT false,
  featured BOOLEAN DEFAULT false,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  publish_date TIMESTAMP WITH TIME ZONE,
  read_time VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  featured BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
  key VARCHAR(100) PRIMARY KEY,
  value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at);

CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_created_at ON gallery(created_at);

-- Create RLS policies
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Articles policies
CREATE POLICY "Articles are viewable by everyone" ON articles
  FOR SELECT USING (published = true);

CREATE POLICY "Articles are manageable by service role" ON articles
  FOR ALL USING (auth.role() = 'service_role');

-- Gallery policies
CREATE POLICY "Gallery images are viewable by everyone" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Gallery images are manageable by service role" ON gallery
  FOR ALL USING (auth.role() = 'service_role');

-- Settings policies
CREATE POLICY "Settings are viewable by everyone" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Settings are manageable by service role" ON settings
  FOR ALL USING (auth.role() = 'service_role');

-- Create storage bucket for article images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage bucket for gallery images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('gallery-images', 'gallery-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for article images
CREATE POLICY "Article images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'article-images');

CREATE POLICY "Anyone can upload article images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'article-images');

CREATE POLICY "Anyone can update article images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'article-images');

CREATE POLICY "Anyone can delete article images" ON storage.objects
  FOR DELETE USING (bucket_id = 'article-images');

-- Storage policies for gallery images
CREATE POLICY "Gallery images are publicly accessible" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery-images');

CREATE POLICY "Anyone can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-images');

-- Create functions for incrementing views
CREATE OR REPLACE FUNCTION increment_article_views(article_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION increment_gallery_views(gallery_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE gallery SET views = views + 1 WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Insert sample data
INSERT INTO articles (title, slug, content, excerpt, category, author, published, featured, read_time) VALUES
('Tips Memilih Mobil Rental yang Tepat', 'tips-memilih-mobil-rental-yang-tepat', 
 '<p>Memilih mobil rental yang tepat adalah kunci untuk perjalanan yang nyaman dan aman. Berikut adalah beberapa tips yang dapat membantu Anda:</p><h2>1. Tentukan Kebutuhan Anda</h2><p>Pertimbangkan jumlah penumpang, jarak perjalanan, dan jenis medan yang akan dilalui.</p><h2>2. Periksa Kondisi Kendaraan</h2><p>Pastikan mobil dalam kondisi prima sebelum digunakan.</p>', 
 'Panduan lengkap untuk memilih mobil rental yang sesuai dengan kebutuhan perjalanan Anda.',
 'Tips & Panduan', 'Admin CV ATS', true, true, '5 min read'),

('Destinasi Wisata Terbaik di Sumatera Utara', 'destinasi-wisata-terbaik-sumatera-utara',
 '<p>Sumatera Utara memiliki banyak destinasi wisata menakjubkan yang wajib dikunjungi. Mari jelajahi keindahan alam dan budaya yang ditawarkan.</p><h2>Danau Toba</h2><p>Danau vulkanik terbesar di dunia dengan pemandangan yang memukau.</p><h2>Bukit Lawang</h2><p>Tempat terbaik untuk melihat orangutan di habitat aslinya.</p>',
 'Jelajahi keindahan destinasi wisata terbaik di Sumatera Utara bersama CV ATS RentCar.',
 'Wisata', 'Admin CV ATS', true, false, '7 min read'),

('Panduan Berkendara Aman di Medan', 'panduan-berkendara-aman-di-medan',
 '<p>Berkendara di Medan memerlukan perhatian khusus karena kondisi lalu lintas yang padat. Berikut tips berkendara aman:</p><h2>Kenali Rute</h2><p>Pelajari rute perjalanan sebelum berangkat.</p><h2>Patuhi Rambu Lalu Lintas</h2><p>Selalu patuhi peraturan lalu lintas yang berlaku.</p>',
 'Tips dan panduan untuk berkendara dengan aman di kota Medan dan sekitarnya.',
 'Tips & Panduan', 'Admin CV ATS', true, false, '4 min read')

ON CONFLICT (slug) DO NOTHING;

INSERT INTO settings (key, value, description) VALUES
('site_title', 'CV ATS RentCar', 'Website title'),
('site_description', 'Layanan rental mobil terpercaya di Sumatera Utara', 'Website description'),
('contact_phone', '+62 812-3456-7890', 'Contact phone number'),
('contact_email', 'info@cvatsrentcar.com', 'Contact email address'),
('contact_address', 'Jl. Contoh No. 123, Medan, Sumatera Utara', 'Business address'),
('whatsapp_number', '+6281234567890', 'WhatsApp contact number')

ON CONFLICT (key) DO NOTHING;

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
