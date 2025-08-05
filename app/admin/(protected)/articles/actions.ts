// app/admin/(protected)/articles/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { deleteOldFeaturedImage, uploadNewFeaturedImage } from "@/lib/storage";
import slugify from "slugify";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string | null;
  author: string | null;
  status: string;
  featured_image: string | null;
  meta_title: string | null;
  meta_description: string | null;
  featured: boolean;
  created_at: string;
  updated_at: string | null;
  published_at: string | null;
}

export async function getArticles(): Promise<Article[]> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("articles")
    .select(
      "id, title, slug, category, author, status, featured_image, created_at, updated_at, published_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching articles:", error.message);
    return [];
  }
  return data;
}

export async function getArticleById(id: string): Promise<Article | null> {
  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching article by id:", error.message);
    return null;
  }
  return data;
}

export async function createArticle(formData: FormData) {
  console.log("-> Starting createArticle action...");
  const supabase = createSupabaseAdminClient();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") === "published" ? "published" : "draft";
  const meta_title = formData.get("meta_title") as string;
  const meta_description = formData.get("meta_description") as string;
  const featured_image_file = formData.get("featured_image") as File;

  if (!title) {
    console.error("Error creating article: Title is missing.");
    return;
  }

  const slug = slugify(title, { lower: true, strict: true });

  let featured_image = null;
  if (featured_image_file && featured_image_file.size > 0) {
    console.log("-> Uploading new featured image...");
    featured_image = await uploadNewFeaturedImage(featured_image_file, slug);
  }

  console.log("-> Inserting new article to database...");
  const { error } = await supabase.from("articles").insert([
    {
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      status,
      featured_image,
      meta_title,
      meta_description,
      published_at: status === "published" ? new Date().toISOString() : null,
    },
  ]);

  if (error) {
    console.error("Error creating article:", error.message);
  } else {
    console.log("-> Article created successfully!");
  }

  revalidatePath("/admin/articles");
  revalidatePath("/artikel");
  redirect("/admin/articles");
}

export async function updateArticle(id: string, formData: FormData) {
  console.log(`-> Starting updateArticle action for ID: ${id}...`);
  const supabase = createSupabaseAdminClient();

  const title = formData.get("title") as string;
  const excerpt = formData.get("excerpt") as string;
  const content = formData.get("content") as string;
  const author = formData.get("author") as string;
  const category = formData.get("category") as string;
  const status = formData.get("status") === "published" ? "published" : "draft";
  const meta_title = formData.get("meta_title") as string;
  const meta_description = formData.get("meta_description") as string;
  const featured_image_file = formData.get("featured_image") as File;

  if (!id) {
    console.error("Error updating article: ID is missing.");
    return;
  }

  const slug = slugify(title, { lower: true, strict: true });
  const oldArticle = await getArticleById(id);

  let featured_image = oldArticle?.featured_image;

  if (featured_image_file && featured_image_file.size > 0) {
    console.log("-> Found new image. Deleting old and uploading new...");
    if (oldArticle?.featured_image) {
      await deleteOldFeaturedImage(oldArticle.featured_image);
    }
    featured_image = await uploadNewFeaturedImage(featured_image_file, slug);
  } else {
    console.log("-> No new image uploaded. Keeping existing.");
  }

  const { error } = await supabase
    .from("articles")
    .update({
      title,
      slug,
      excerpt,
      content,
      author,
      category,
      status,
      featured_image,
      meta_title,
      meta_description,
      updated_at: new Date().toISOString(),
      published_at:
        status === "published" && !oldArticle?.published_at
          ? new Date().toISOString()
          : oldArticle?.published_at,
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating article:", error.message);
  } else {
    console.log(`-> Article ${id} updated successfully!`);
  }

  revalidatePath("/admin/articles");
  revalidatePath("/artikel");
  revalidatePath(`/artikel/${slug}`);
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  console.log(`-> Starting deleteArticle action for ID: ${id}...`);
  const supabase = createSupabaseAdminClient();
  const oldArticle = await getArticleById(id);

  if (oldArticle?.featured_image) {
    console.log("-> Deleting associated featured image...");
    await deleteOldFeaturedImage(oldArticle.featured_image);
  }

  const { error } = await supabase.from("articles").delete().eq("id", id);

  if (error) {
    console.error("Error deleting article:", error.message);
  } else {
    console.log(`-> Article ${id} deleted successfully!`);
  }

  revalidatePath("/admin/articles");
  revalidatePath("/artikel");
}
