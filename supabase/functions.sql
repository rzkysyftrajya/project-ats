-- Function to increment article views
CREATE OR REPLACE FUNCTION increment_article_views(article_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE articles SET views = views + 1 WHERE id = article_id;
END;
$$ LANGUAGE plpgsql;

-- Function to increment gallery views
CREATE OR REPLACE FUNCTION increment_gallery_views(gallery_id INTEGER)
RETURNS void AS $$
BEGIN
  UPDATE gallery SET views = views + 1 WHERE id = gallery_id;
END;
$$ LANGUAGE plpgsql;

-- Function to get related articles
CREATE OR REPLACE FUNCTION get_related_articles(article_id INTEGER, article_category TEXT, limit_count INTEGER DEFAULT 3)
RETURNS TABLE(
  id INTEGER,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  category TEXT,
  author TEXT,
  publish_date DATE,
  read_time TEXT,
  views INTEGER,
  likes INTEGER,
  image_url TEXT,
  tags TEXT[],
  featured BOOLEAN,
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.category,
    a.author,
    a.publish_date,
    a.read_time,
    a.views,
    a.likes,
    a.image_url,
    a.tags,
    a.featured,
    a.created_at
  FROM articles a
  WHERE a.category = article_category 
    AND a.id != article_id 
    AND a.status = 'published'
  ORDER BY a.created_at DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to search articles
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS TABLE(
  id INTEGER,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  category TEXT,
  author TEXT,
  publish_date DATE,
  read_time TEXT,
  views INTEGER,
  likes INTEGER,
  image_url TEXT,
  tags TEXT[],
  featured BOOLEAN,
  created_at TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.category,
    a.author,
    a.publish_date,
    a.read_time,
    a.views,
    a.likes,
    a.image_url,
    a.tags,
    a.featured,
    a.created_at
  FROM articles a
  WHERE a.status = 'published'
    AND (
      a.title ILIKE '%' || search_query || '%' OR
      a.excerpt ILIKE '%' || search_query || '%' OR
      a.content ILIKE '%' || search_query || '%' OR
      EXISTS (
        SELECT 1 FROM unnest(a.tags) AS tag 
        WHERE tag ILIKE '%' || search_query || '%'
      )
    )
  ORDER BY a.created_at DESC;
END;
$$ LANGUAGE plpgsql;
