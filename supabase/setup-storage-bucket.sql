-- Create article-images bucket
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view article images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload article images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can delete article images" ON storage.objects;

-- Policy: Public can view images in article-images bucket
CREATE POLICY "Public can view article images" ON storage.objects
    FOR SELECT USING (bucket_id = 'article-images');

-- Policy: Only admin can upload images
CREATE POLICY "Admin can upload article images" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'article-images' 
        AND auth.jwt() ->> 'email' = 'your-admin@email.com'
    );

-- Policy: Only admin can delete images
CREATE POLICY "Admin can delete article images" ON storage.objects
    FOR DELETE USING (
        bucket_id = 'article-images' 
        AND auth.jwt() ->> 'email' = 'your-admin@email.com'
    );

-- Policy: Only admin can update images
CREATE POLICY "Admin can update article images" ON storage.objects
    FOR UPDATE USING (
        bucket_id = 'article-images' 
        AND auth.jwt() ->> 'email' = 'your-admin@email.com'
    );
