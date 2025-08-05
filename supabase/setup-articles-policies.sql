-- Enable RLS on articles table
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public can view published articles" ON articles;
DROP POLICY IF EXISTS "Admin can manage all articles" ON articles;

-- Policy: Everyone can SELECT published articles
CREATE POLICY "Public can view published articles" ON articles
    FOR SELECT USING (status = 'published');

-- Policy: Only admin can INSERT, UPDATE, DELETE articles
CREATE POLICY "Admin can manage all articles" ON articles
    FOR ALL USING (auth.jwt() ->> 'email' = 'your-admin@email.com');

-- Grant necessary permissions
GRANT SELECT ON articles TO anon;
GRANT ALL ON articles TO authenticated;
