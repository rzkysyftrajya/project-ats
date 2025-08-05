-- Drop existing policies if any
DROP POLICY IF EXISTS "Enable read access for all users" ON articles;
DROP POLICY IF EXISTS "Enable insert for service role" ON articles;
DROP POLICY IF EXISTS "Enable update for service role" ON articles;
DROP POLICY IF EXISTS "Enable delete for service role" ON articles;

DROP POLICY IF EXISTS "Enable read access for all users" ON gallery;
DROP POLICY IF EXISTS "Enable insert for service role" ON gallery;
DROP POLICY IF EXISTS "Enable update for service role" ON gallery;
DROP POLICY IF EXISTS "Enable delete for service role" ON gallery;

DROP POLICY IF EXISTS "Enable read access for all users" ON settings;
DROP POLICY IF EXISTS "Enable insert for service role" ON settings;
DROP POLICY IF EXISTS "Enable update for service role" ON settings;
DROP POLICY IF EXISTS "Enable delete for service role" ON settings;

-- Create policies for articles table
CREATE POLICY "Enable read access for all users" ON articles
FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON articles
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON articles
FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON articles
FOR DELETE USING (true);

-- Create policies for gallery table
CREATE POLICY "Enable read access for all users" ON gallery
FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON gallery
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON gallery
FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON gallery
FOR DELETE USING (true);

-- Create policies for settings table
CREATE POLICY "Enable read access for all users" ON settings
FOR SELECT USING (true);

CREATE POLICY "Enable insert for service role" ON settings
FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for service role" ON settings
FOR UPDATE USING (true);

CREATE POLICY "Enable delete for service role" ON settings
FOR DELETE USING (true);

-- Grant necessary permissions
GRANT ALL ON articles TO anon, authenticated;
GRANT ALL ON gallery TO anon, authenticated;
GRANT ALL ON settings TO anon, authenticated;

-- Grant sequence permissions
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
