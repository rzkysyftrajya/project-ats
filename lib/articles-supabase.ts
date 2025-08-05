// lib/articles-supabase.ts
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getArticles() {
  const supabase = await createSupabaseServerClient();
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, slug, title, excerpt, category, created_at, featured_image")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error);
    return [];
  }

  return articles;
}

export async function getPublishedArticles() {
  const supabase = await createSupabaseServerClient();
  const { data: articles, error } = await supabase
    .from("articles")
    .select(
      "id, slug, title, excerpt, category, created_at, featured_image, featured"
    )
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching published articles:", error);
    return [];
  }

  return articles;
}

export async function getArticleBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data: article, error } = await supabase
    .from("articles")
    .select(
      `id, created_at, title, slug, content, excerpt, author, category, status, featured_image, meta_title, meta_description, updated_at, featured`
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error) {
    console.error("Error fetching article by slug:", error);
    return null;
  }

  return article;
}

export async function getRelatedArticles(
  currentSlug: string,
  category: string,
  limit: number
) {
  const supabase = await createSupabaseServerClient();
  const { data: articles, error } = await supabase
    .from("articles")
    .select("id, slug, title, created_at, featured_image")
    .eq("status", "published")
    .eq("category", category)
    .neq("slug", currentSlug)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching related articles:", error);
    return [];
  }

  return articles;
}
