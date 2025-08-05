-- Create or update the articles table with the correct schema
-- This ensures all columns exist and match the TypeScript types

-- Drop and recreate the articles table with the correct schema
DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    category TEXT DEFAULT 'tips',
    author TEXT DEFAULT 'CV ATS RentCar',
    read_time TEXT DEFAULT '5 menit',
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_featured ON articles(featured);
CREATE INDEX idx_articles_created_at ON articles(created_at);
CREATE INDEX idx_articles_slug ON articles(slug);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read published articles" ON articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage articles" ON articles
    FOR ALL USING (true);

-- Insert sample data
INSERT INTO articles (title, slug, content, excerpt, category, author, status, featured, tags, read_time) VALUES
(
    'Tips Memilih Rental Mobil Terbaik di Medan',
    'tips-memilih-rental-mobil-terbaik-di-medan',
    '<h2>Panduan Lengkap Memilih Rental Mobil</h2>
    <p>Memilih rental mobil yang tepat sangat penting untuk kenyamanan perjalanan Anda. Berikut adalah tips-tips yang perlu diperhatikan:</p>
    <h3>1. Periksa Kondisi Kendaraan</h3>
    <p>Pastikan mobil dalam kondisi prima sebelum menyewa. Periksa ban, rem, lampu, dan sistem AC.</p>
    <h3>2. Bandingkan Harga</h3>
    <p>Jangan langsung memilih yang termurah. Bandingkan fasilitas dan layanan yang ditawarkan.</p>
    <h3>3. Baca Syarat dan Ketentuan</h3>
    <p>Pahami dengan baik kebijakan sewa, termasuk biaya tambahan dan asuransi.</p>',
    'Panduan lengkap untuk memilih layanan rental mobil terbaik di Medan dengan tips praktis dan mudah diikuti.',
    'tips',
    'CV ATS RentCar',
    'published',
    true,
    ARRAY['rental mobil', 'tips', 'medan', 'travel'],
    '7 menit'
),
(
    'Destinasi Wisata Terbaik di Sumatera Utara',
    'destinasi-wisata-terbaik-di-sumatera-utara',
    '<h2>Jelajahi Keindahan Sumatera Utara</h2>
    <p>Sumatera Utara memiliki banyak destinasi wisata menakjubkan yang wajib dikunjungi:</p>
    <h3>1. Danau Toba</h3>
    <p>Danau vulkanik terbesar di dunia dengan pemandangan yang memukau.</p>
    <h3>2. Bukit Lawang</h3>
    <p>Tempat terbaik untuk melihat orangutan Sumatera di habitat aslinya.</p>
    <h3>3. Istana Maimun</h3>
    <p>Istana bersejarah dengan arsitektur yang menawan di Medan.</p>',
    'Temukan destinasi wisata terbaik di Sumatera Utara yang dapat Anda kunjungi dengan layanan rental mobil kami.',
    'wisata',
    'CV ATS RentCar',
    'published',
    false,
    ARRAY['wisata', 'sumatera utara', 'travel', 'destinasi'],
    '10 menit'
),
(
    'Panduan Lengkap Sewa Mobil untuk Pemula',
    'panduan-lengkap-sewa-mobil-untuk-pemula',
    '<h2>Sewa Mobil untuk Pertama Kali?</h2>
    <p>Jika ini pertama kali Anda menyewa mobil, berikut panduan lengkapnya:</p>
    <h3>Dokumen yang Diperlukan</h3>
    <ul>
    <li>SIM yang masih berlaku</li>
    <li>KTP asli</li>
    <li>Kartu kredit atau deposit</li>
    </ul>
    <h3>Proses Penyewaan</h3>
    <p>Proses penyewaan biasanya memakan waktu 15-30 menit untuk verifikasi dokumen dan inspeksi kendaraan.</p>',
    'Panduan step-by-step untuk pemula yang ingin menyewa mobil pertama kali dengan aman dan nyaman.',
    'panduan',
    'CV ATS RentCar',
    'published',
    false,
    ARRAY['panduan', 'pemula', 'sewa mobil', 'tips'],
    '5 menit'
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at 
    BEFORE UPDATE ON articles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT ALL ON articles TO authenticated;
GRANT ALL ON articles TO anon;
GRANT USAGE, SELECT ON SEQUENCE articles_id_seq TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE articles_id_seq TO anon;
