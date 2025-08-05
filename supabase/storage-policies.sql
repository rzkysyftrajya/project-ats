-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete images" ON storage.objects;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create storage policies for images bucket
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Service role can upload images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'images');

CREATE POLICY "Service role can update images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'images');

CREATE POLICY "Service role can delete images" ON storage.objects
  FOR DELETE USING (bucket_id = 'images');

-- Drop existing policies on tables if they exist
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
DROP POLICY IF EXISTS "Service role can manage articles" ON articles;
DROP POLICY IF EXISTS "Public can read gallery" ON gallery;
DROP POLICY IF EXISTS "Service role can manage gallery" ON gallery;
DROP POLICY IF EXISTS "Public can read settings" ON settings;
DROP POLICY IF EXISTS "Service role can manage settings" ON settings;

-- Enable RLS on tables
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies for articles table
CREATE POLICY "Public can read published articles" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Service role can manage articles" ON articles
  FOR ALL USING (true);

-- Create policies for gallery table
CREATE POLICY "Public can read gallery" ON gallery
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage gallery" ON gallery
  FOR ALL USING (true);

-- Create policies for settings table
CREATE POLICY "Public can read settings" ON settings
  FOR SELECT USING (true);

CREATE POLICY "Service role can manage settings" ON settings
  FOR ALL USING (true);
