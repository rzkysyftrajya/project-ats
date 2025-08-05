-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT DEFAULT 'umum',
    author TEXT DEFAULT 'CV ATS RentCar',
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    featured BOOLEAN DEFAULT false,
    image_url TEXT,
    meta_title TEXT,
    meta_description TEXT,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    read_time TEXT DEFAULT '5 menit',
    publish_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    category TEXT DEFAULT 'armada',
    featured BOOLEAN DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    upload_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured);
CREATE INDEX IF NOT EXISTS idx_articles_publish_date ON articles(publish_date);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_featured ON gallery(featured);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_articles_updated_at ON articles;
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_updated_at ON gallery;
CREATE TRIGGER update_gallery_updated_at
    BEFORE UPDATE ON gallery
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_settings_updated_at ON settings;
CREATE TRIGGER update_settings_updated_at
    BEFORE UPDATE ON settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create functions for incrementing views
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

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Articles policies
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Public can read published articles" ON articles
    FOR SELECT USING (status = 'published');

DROP POLICY IF EXISTS "Service role can do everything on articles" ON articles;
CREATE POLICY "Service role can do everything on articles" ON articles
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Gallery policies
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
CREATE POLICY "Public can read gallery" ON gallery
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can do everything on gallery" ON gallery;
CREATE POLICY "Service role can do everything on gallery" ON gallery
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Settings policies
DROP POLICY IF EXISTS "Public can read settings" ON settings;
CREATE POLICY "Public can read settings" ON settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can do everything on settings" ON settings;
CREATE POLICY "Service role can do everything on settings" ON settings
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- Insert default settings
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
}'),
('site_settings', '{
    "siteName": "ATS RentCar Medan",
    "siteDescription": "Layanan rental mobil terpercaya di Medan dengan armada lengkap dan harga terjangkau",
    "siteKeywords": ["rental mobil medan", "sewa mobil medan", "tour medan", "travel medan"],
    "primaryColor": "#3B82F6",
    "secondaryColor": "#1E40AF"
}')
ON CONFLICT (key) DO NOTHING;

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, category, author, status, featured) VALUES
('Tips Memilih Rental Mobil yang Tepat', 'tips-memilih-rental-mobil-yang-tepat', 
'<p>Memilih rental mobil yang tepat sangat penting untuk kenyamanan perjalanan Anda. Berikut adalah beberapa tips yang dapat membantu:</p>
<h3>1. Tentukan Kebutuhan Anda</h3>
<p>Pertimbangkan jumlah penumpang, jarak perjalanan, dan jenis medan yang akan dilalui.</p>
<h3>2. Periksa Kondisi Kendaraan</h3>
<p>Pastikan mobil dalam kondisi baik, bersih, dan terawat dengan baik.</p>
<h3>3. Bandingkan Harga</h3>
<p>Jangan hanya melihat harga murah, tapi pertimbangkan juga kualitas layanan.</p>',
'Panduan lengkap memilih rental mobil yang sesuai dengan kebutuhan dan budget Anda',
'tips', 'CV ATS RentCar', 'published', true),

('Destinasi Wisata Terbaik di Medan', 'destinasi-wisata-terbaik-di-medan',
'<p>Medan memiliki banyak destinasi wisata menarik yang wajib dikunjungi. Berikut adalah rekomendasi tempat wisata terbaik:</p>
<h3>1. Istana Maimun</h3>
<p>Istana bersejarah yang menjadi simbol kebesaran Kesultanan Deli.</p>
<h3>2. Masjid Raya Al-Mashun</h3>
<p>Masjid berarsitektur Timur Tengah yang sangat indah.</p>
<h3>3. Danau Toba</h3>
<p>Danau vulkanik terbesar di dunia yang berjarak sekitar 4 jam dari Medan.</p>',
'Jelajahi keindahan Medan dan sekitarnya dengan panduan destinasi wisata terlengkap',
'wisata', 'CV ATS RentCar', 'published', false),

('Panduan Berkendara Aman di Medan', 'panduan-berkendara-aman-di-medan',
'<p>Berkendara di Medan memerlukan perhatian khusus karena kondisi lalu lintas yang padat. Berikut tips berkendara aman:</p>
<h3>1. Kenali Rute Perjalanan</h3>
<p>Pelajari rute sebelum berangkat untuk menghindari kemacetan.</p>
<h3>2. Patuhi Rambu Lalu Lintas</h3>
<p>Selalu patuhi peraturan lalu lintas untuk keselamatan bersama.</p>
<h3>3. Hindari Jam Sibuk</h3>
<p>Rencanakan perjalanan di luar jam sibuk untuk menghindari macet.</p>',
'Tips dan trik berkendara aman di jalanan Medan yang padat dan ramai',
'tips', 'CV ATS RentCar', 'published', false)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample gallery images
INSERT INTO gallery (title, description, image_url, category, featured) VALUES
('Toyota Avanza 2023', 'Mobil keluarga yang nyaman dan irit bahan bakar', '/placeholder.svg?height=400&width=600&text=Toyota+Avanza', 'armada', true),
('Honda Jazz 2023', 'Mobil compact yang cocok untuk perjalanan dalam kota', '/placeholder.svg?height=400&width=600&text=Honda+Jazz', 'armada', true),
('Toyota Innova Reborn', 'MPV premium untuk perjalanan keluarga yang nyaman', '/placeholder.svg?height=400&width=600&text=Toyota+Innova', 'armada', true),
('Wisata Danau Toba', 'Perjalanan wisata ke Danau Toba bersama ATS RentCar', '/placeholder.svg?height=400&width=600&text=Danau+Toba', 'wisata', false),
('City Tour Medan', 'Jelajahi kota Medan dengan mobil rental kami', '/placeholder.svg?height=400&width=600&text=City+Tour+Medan', 'wisata', false),
('Kantor ATS RentCar', 'Kantor pusat ATS RentCar di Medan', '/placeholder.svg?height=400&width=600&text=Kantor+ATS', 'kantor', false)
ON CONFLICT DO NOTHING;

-- Create storage bucket (if not exists)
INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT DO NOTHING;

-- Create storage policies
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
CREATE POLICY "Public can view images" ON storage.objects
    FOR SELECT USING (bucket_id = 'images');

DROP POLICY IF EXISTS "Service role can upload images" ON storage.objects;
CREATE POLICY "Service role can upload images" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'images' AND auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service role can update images" ON storage.objects;
CREATE POLICY "Service role can update images" ON storage.objects
    FOR UPDATE USING (bucket_id = 'images' AND auth.jwt() ->> 'role' = 'service_role');

DROP POLICY IF EXISTS "Service role can delete images" ON storage.objects;
CREATE POLICY "Service role can delete images" ON storage.objects
    FOR DELETE USING (bucket_id = 'images' AND auth.jwt() ->> 'role' = 'service_role');
