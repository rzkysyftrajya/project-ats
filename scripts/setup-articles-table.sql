-- Drop existing table if exists and recreate with correct schema
DROP TABLE IF EXISTS articles CASCADE;

-- Create articles table with simple, consistent schema
CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    category TEXT DEFAULT 'tips',
    author TEXT DEFAULT 'CV ATS RentCar',
    image_url TEXT,
    tags TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT false,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_articles_featured ON articles(featured);

-- Enable RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read published articles" ON articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Admin can do everything" ON articles
    FOR ALL USING (true);

-- Insert sample articles
INSERT INTO articles (title, slug, excerpt, content, category, featured) VALUES
('Tips Memilih Mobil Rental yang Tepat', 'tips-memilih-mobil-rental', 'Panduan lengkap memilih mobil rental sesuai kebutuhan perjalanan Anda', '<h2>Memilih Mobil Rental yang Tepat</h2><p>Memilih mobil rental yang tepat sangat penting untuk kenyamanan perjalanan Anda. Berikut adalah tips yang perlu diperhatikan:</p><h3>1. Tentukan Kebutuhan</h3><p>Pertimbangkan jumlah penumpang, jarak tempuh, dan jenis perjalanan yang akan dilakukan.</p><h3>2. Budget</h3><p>Sesuaikan pilihan mobil dengan budget yang tersedia, termasuk biaya bahan bakar.</p><h3>3. Kondisi Jalan</h3><p>Pilih mobil yang sesuai dengan kondisi jalan yang akan dilalui.</p>', 'tips', true),
('Keuntungan Sewa Mobil untuk Liburan', 'keuntungan-sewa-mobil-liburan', 'Mengapa sewa mobil adalah pilihan terbaik untuk liburan keluarga', '<h2>Keuntungan Sewa Mobil untuk Liburan</h2><p>Sewa mobil memberikan banyak keuntungan untuk liburan keluarga:</p><h3>Fleksibilitas Waktu</h3><p>Anda bebas menentukan jadwal perjalanan tanpa terikat transportasi umum.</p><h3>Kenyamanan</h3><p>Perjalanan lebih nyaman dengan AC dan ruang yang cukup untuk keluarga.</p><h3>Hemat Biaya</h3><p>Untuk perjalanan grup, sewa mobil lebih ekonomis dibanding transportasi lain.</p>', 'tips', false),
('Panduan Berkendara Aman di Jalan Raya', 'panduan-berkendara-aman', 'Tips dan trik berkendara aman untuk perjalanan yang nyaman', '<h2>Panduan Berkendara Aman</h2><p>Keselamatan berkendara adalah prioritas utama. Berikut panduannya:</p><h3>Persiapan Sebelum Berkendara</h3><p>Cek kondisi mobil, ban, rem, dan lampu sebelum berangkat.</p><h3>Selama Berkendara</h3><p>Patuhi rambu lalu lintas, jaga jarak aman, dan hindari menggunakan HP.</p><h3>Istirahat Berkala</h3><p>Beristirahat setiap 2 jam untuk menghindari kelelahan.</p>', 'panduan', false);
