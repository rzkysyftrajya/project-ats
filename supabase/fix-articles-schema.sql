-- Drop existing tables if they exist
DROP TABLE IF EXISTS articles CASCADE;
DROP TABLE IF EXISTS gallery CASCADE;
DROP TABLE IF EXISTS settings CASCADE;

-- Create articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR(100) DEFAULT 'Admin',
  category VARCHAR(50) DEFAULT 'umum',
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured_image TEXT,
  meta_title VARCHAR(255),
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  image_path TEXT,
  category VARCHAR(50) DEFAULT 'umum',
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create settings table
CREATE TABLE settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_featured ON gallery(featured);
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);
CREATE INDEX idx_settings_key ON settings(key);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_articles_updated_at BEFORE UPDATE ON articles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gallery_updated_at BEFORE UPDATE ON gallery
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access to published articles" ON articles
    FOR SELECT USING (status = 'published');

CREATE POLICY "Allow public read access to gallery" ON gallery
    FOR SELECT USING (true);

CREATE POLICY "Allow public read access to settings" ON settings
    FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Allow authenticated users full access to articles" ON articles
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to gallery" ON gallery
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users full access to settings" ON settings
    FOR ALL USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO articles (title, slug, content, excerpt, category, status, author) VALUES
('Selamat Datang di CV ATS RentCar', 'selamat-datang-di-cv-ats-rentcar', 
 'CV ATS RentCar adalah perusahaan penyewaan mobil terpercaya yang telah melayani pelanggan selama bertahun-tahun. Kami menyediakan berbagai jenis kendaraan untuk kebutuhan perjalanan Anda, mulai dari mobil keluarga hingga kendaraan mewah untuk acara khusus.

Dengan armada yang terawat dan pelayanan yang profesional, kami berkomitmen untuk memberikan pengalaman berkendara yang aman dan nyaman bagi setiap pelanggan. Tim kami yang berpengalaman siap membantu Anda memilih kendaraan yang tepat sesuai dengan kebutuhan dan budget Anda.

Hubungi kami sekarang untuk mendapatkan penawaran terbaik dan nikmati kemudahan dalam menyewa kendaraan berkualitas tinggi.', 
 'CV ATS RentCar adalah perusahaan penyewaan mobil terpercaya dengan armada lengkap dan pelayanan profesional.', 
 'informasi', 'published', 'Admin'),

('Tips Memilih Mobil Rental yang Tepat', 'tips-memilih-mobil-rental-yang-tepat',
 'Memilih mobil rental yang tepat sangat penting untuk kenyamanan perjalanan Anda. Berikut adalah beberapa tips yang dapat membantu Anda:

1. **Tentukan Kebutuhan**: Pertimbangkan jumlah penumpang, jarak perjalanan, dan jenis medan yang akan dilalui.

2. **Periksa Kondisi Kendaraan**: Pastikan mobil dalam kondisi baik, bersih, dan terawat.

3. **Bandingkan Harga**: Jangan hanya melihat harga murah, tapi pertimbangkan juga kualitas layanan.

4. **Baca Syarat dan Ketentuan**: Pahami dengan baik aturan sewa, termasuk kebijakan bahan bakar dan asuransi.

5. **Pilih Penyedia Terpercaya**: Pilih perusahaan rental yang memiliki reputasi baik dan pelayanan profesional.

Dengan mengikuti tips di atas, Anda dapat memilih mobil rental yang sesuai dengan kebutuhan dan mendapatkan pengalaman berkendara yang menyenangkan.', 
 'Tips praktis untuk memilih mobil rental yang tepat sesuai kebutuhan perjalanan Anda.', 
 'tips', 'published', 'Admin'),

('Layanan Unggulan CV ATS RentCar', 'layanan-unggulan-cv-ats-rentcar',
 'CV ATS RentCar menawarkan berbagai layanan unggulan untuk memenuhi kebutuhan transportasi Anda:

## Rental Harian
Sewa mobil untuk kebutuhan harian dengan harga terjangkau dan fleksibilitas waktu.

## Rental Mingguan & Bulanan
Paket khusus untuk penyewaan jangka panjang dengan harga lebih ekonomis.

## Layanan Antar Jemput
Kami menyediakan layanan antar jemput ke lokasi yang Anda tentukan.

## Sopir Profesional
Tersedia sopir berpengalaman dan berlisensi untuk kenyamanan perjalanan Anda.

## Asuransi Komprehensif
Semua kendaraan dilengkapi dengan asuransi untuk keamanan dan ketenangan pikiran.

## Support 24/7
Tim customer service kami siap membantu Anda kapan saja.

Hubungi kami untuk informasi lebih lanjut dan dapatkan penawaran terbaik!', 
 'Berbagai layanan unggulan CV ATS RentCar untuk memenuhi kebutuhan transportasi Anda.', 
 'layanan', 'published', 'Admin');

INSERT INTO gallery (title, description, image_url, category, featured) VALUES
('Armada Toyota Avanza', 'Mobil keluarga yang nyaman dan irit bahan bakar', '/placeholder.svg?height=300&width=400&text=Toyota+Avanza', 'mobil-keluarga', true),
('Armada Honda Jazz', 'Mobil compact yang stylish dan mudah dikendarai', '/placeholder.svg?height=300&width=400&text=Honda+Jazz', 'mobil-compact', true),
('Armada Toyota Innova', 'MPV premium untuk perjalanan keluarga besar', '/placeholder.svg?height=300&width=400&text=Toyota+Innova', 'mpv', true),
('Kantor CV ATS RentCar', 'Kantor pusat CV ATS RentCar yang nyaman dan modern', '/placeholder.svg?height=300&width=400&text=Kantor+ATS', 'kantor', false),
('Tim Profesional', 'Tim customer service yang ramah dan profesional', '/placeholder.svg?height=300&width=400&text=Tim+ATS', 'tim', false);

INSERT INTO settings (key, value, description) VALUES
('site_title', 'CV ATS RentCar', 'Judul website'),
('site_description', 'Penyewaan mobil terpercaya dengan armada lengkap dan pelayanan profesional', 'Deskripsi website'),
('contact_phone', '+62 812-3456-7890', 'Nomor telepon kontak'),
('contact_email', 'info@atsrentcar.com', 'Email kontak'),
('contact_address', 'Jl. Raya No. 123, Jakarta Selatan', 'Alamat kantor'),
('whatsapp_number', '+6281234567890', 'Nomor WhatsApp'),
('facebook_url', 'https://facebook.com/atsrentcar', 'URL Facebook'),
('instagram_url', 'https://instagram.com/atsrentcar', 'URL Instagram'),
('business_hours', 'Senin - Minggu: 08:00 - 22:00', 'Jam operasional'),
('featured_text', 'Rental Mobil Terpercaya #1 di Jakarta', 'Teks unggulan di homepage');

-- Grant necessary permissions
GRANT ALL ON articles TO authenticated;
GRANT ALL ON gallery TO authenticated;
GRANT ALL ON settings TO authenticated;
GRANT SELECT ON articles TO anon;
GRANT SELECT ON gallery TO anon;
GRANT SELECT ON settings TO anon;
