-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON articles;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON articles;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON articles;

DROP POLICY IF EXISTS "Enable read access for all users" ON gallery;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON gallery;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON gallery;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON gallery;

DROP POLICY IF EXISTS "Enable read access for all users" ON settings;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON settings;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON settings;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON settings;

-- Disable RLS temporarily to allow all operations
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE gallery DISABLE ROW LEVEL SECURITY;
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;

-- Create simple policies that allow all operations
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Articles policies - allow all operations
CREATE POLICY "Allow all operations on articles" ON articles
FOR ALL USING (true) WITH CHECK (true);

-- Gallery policies - allow all operations
CREATE POLICY "Allow all operations on gallery" ON gallery
FOR ALL USING (true) WITH CHECK (true);

-- Settings policies - allow all operations
CREATE POLICY "Allow all operations on settings" ON settings
FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions to anon and authenticated users
GRANT ALL ON articles TO anon, authenticated;
GRANT ALL ON gallery TO anon, authenticated;
GRANT ALL ON settings TO anon, authenticated;

-- Grant usage on sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
