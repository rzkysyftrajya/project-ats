-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, author, category, status, featured, views, likes, read_time, publish_date) VALUES
('Tips Memilih Mobil Rental', 'tips-memilih-mobil-rental', '<p>Tips lengkap memilih mobil rental yang tepat...</p>', 'Panduan memilih mobil rental', 'Admin CV ATS', 'Tips', 'published', true, 150, 12, '5 menit', NOW()),
('Destinasi Wisata Medan', 'destinasi-wisata-medan', '<p>Destinasi wisata menarik di sekitar Medan...</p>', 'Wisata menarik di Medan', 'Admin CV ATS', 'Wisata', 'published', false, 89, 7, '4 menit', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert sample gallery
INSERT INTO gallery (title, description, image_url, category, featured) VALUES
('Toyota Avanza 2023', 'Mobil keluarga nyaman', '/placeholder.svg?height=400&width=600&text=Avanza', 'MPV', true),
('Honda Brio 2023', 'City car ekonomis', '/placeholder.svg?height=400&width=600&text=Brio', 'Hatchback', false),
('Toyota Innova 2023', 'MPV premium', '/placeholder.svg?height=400&width=600&text=Innova', 'MPV', true)
ON CONFLICT DO NOTHING;

-- Insert sample settings
INSERT INTO settings (key, value, type, description) VALUES
('site_title', 'CV ATS RentCar Medan', 'text', 'Nama website'),
('contact_phone', '+62-852-0726-5558', 'text', 'Nomor telepon'),
('contact_email', 'info@cvatsrentcar.com', 'text', 'Email kontak'),
('address', 'Jl. Pringgan no 11 gg Bung Boniran, Medan', 'text', 'Alamat perusahaan')
ON CONFLICT (key) DO NOTHING;
