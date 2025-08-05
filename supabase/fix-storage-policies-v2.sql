-- Fix storage policies untuk production
-- Drop semua policies yang ada
DROP POLICY IF EXISTS "Public can view images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can update images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can delete images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can update images" ON storage.objects;
DROP POLICY IF EXISTS "Service role can delete images" ON storage.objects;

-- Create new policies yang lebih aman
CREATE POLICY "Public can view images" ON storage.objects
  FOR SELECT USING (bucket_id = 'images');

CREATE POLICY "Service role can manage images" ON storage.objects
  FOR ALL USING (bucket_id = 'images');

-- Pastikan bucket images ada dan public
UPDATE storage.buckets 
SET public = true 
WHERE id = 'images';
