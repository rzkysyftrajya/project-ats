// actions/article-actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from "@/lib/articles-supabase";
import type { Article } from "@/lib/articles-supabase";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { uploadFile } from "@/lib/storage";

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function validateArticleData(formData: FormData) {
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const imageFile = formData.get("image_file") as File;
  const image_url = formData.get("image_url") as string;
  const current_image_url = formData.get("current_image_url") as string;

  if (!title || title.trim().length < 3) {
    throw new Error("Title must be at least 3 characters long");
  }

  if (!content || content.trim().length < 10) {
    throw new Error("Content must be at least 10 characters long");
  }

  // Determine the final image_url
  let finalImageUrl = current_image_url || null;
  if (image_url) {
    finalImageUrl = image_url.trim();
  } else if (imageFile && imageFile.size > 0) {
    // This case will be handled separately in the actions to upload the file
    // For now, we just indicate a file exists
    finalImageUrl = "pending_upload";
  }

  return {
    title: title.trim(),
    content: content.trim(),
    excerpt: (formData.get("excerpt") as string)?.trim() || null,
    category: (formData.get("category") as string) || "tips",
    author: (formData.get("author") as string) || "CV ATS RentCar",
    image_url: finalImageUrl,
    tags:
      (formData.get("tags") as string)
        ?.split(",")
        .map((tag) => tag.trim())
        .filter(Boolean) || [],
    featured: formData.get("featured") === "on",
    status: (formData.get("status") as "draft" | "published") || "draft",
    imageFile: imageFile && imageFile.size > 0 ? imageFile : null,
  };
}

export async function createArticleAction(formData: FormData) {
  try {
    const validatedData = validateArticleData(formData);
    const slug = generateSlug(validatedData.title);

    let imageUrl = validatedData.image_url;

    if (validatedData.imageFile) {
      const fileExtension = validatedData.imageFile.name.split(".").pop();
      const fileName = `${slug}-${Date.now()}.${fileExtension}`;
      imageUrl = await uploadFile(
        validatedData.imageFile,
        "article-images",
        fileName
      );
    }

    const articleData: Omit<Article, "id" | "created_at" | "updated_at"> = {
      ...validatedData,
      slug,
      image_url: imageUrl,
    };

    await createArticle(articleData);

    revalidatePath("/admin/articles");
    revalidatePath("/artikel");
    redirect("/admin/articles");
  } catch (error) {
    console.error("Error creating article:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to create article"
    );
  }
}

export async function updateArticleAction(id: number, formData: FormData) {
  try {
    const validatedData = validateArticleData(formData);
    const supabase = await createSupabaseAdminClient();
    const slug = generateSlug(validatedData.title);

    let imageUrl = validatedData.image_url;

    if (validatedData.imageFile) {
      // Delete old image from storage if it exists
      const { data: oldArticle } = await supabase
        .from("articles")
        .select("image_url")
        .eq("id", id)
        .single();
      if (oldArticle && oldArticle.image_url) {
        const oldFileName = oldArticle.image_url.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("article-images").remove([oldFileName]);
        }
      }

      const fileExtension = validatedData.imageFile.name.split(".").pop();
      const fileName = `${slug}-${Date.now()}.${fileExtension}`;
      imageUrl = await uploadFile(
        validatedData.imageFile,
        "article-images",
        fileName
      );
    } else if (!validatedData.image_url) {
      // If image is removed, delete it from storage
      const { data: oldArticle } = await supabase
        .from("articles")
        .select("image_url")
        .eq("id", id)
        .single();
      if (oldArticle && oldArticle.image_url) {
        const oldFileName = oldArticle.image_url.split("/").pop();
        if (oldFileName) {
          await supabase.storage.from("article-images").remove([oldFileName]);
        }
      }
    }

    const updateData = {
      ...validatedData,
      slug,
      image_url: imageUrl,
    };

    await updateArticle(id, updateData);

    revalidatePath("/admin/articles");
    revalidatePath("/artikel");
    revalidatePath(`/artikel/${slug}`);
    redirect("/admin/articles");
  } catch (error) {
    console.error("Error updating article:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to update article"
    );
  }
}

export async function deleteArticleAction(id: number) {
  try {
    const supabase = await createSupabaseAdminClient();
    // Delete image from storage
    const { data: article } = await supabase
      .from("articles")
      .select("image_url")
      .eq("id", id)
      .single();
    if (article && article.image_url) {
      const fileName = article.image_url.split("/").pop();
      if (fileName) {
        await supabase.storage.from("article-images").remove([fileName]);
      }
    }

    await deleteArticle(id);

    revalidatePath("/admin/articles");
    revalidatePath("/artikel");
  } catch (error) {
    console.error("Error deleting article:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete article"
    );
  }
}

export async function toggleArticleStatusAction(
  id: number,
  currentStatus: string
) {
  try {
    const supabase = await createSupabaseAdminClient();
    const newStatus = currentStatus === "published" ? "draft" : "published";

    await updateArticle(id, { status: newStatus });

    revalidatePath("/admin/articles");
    revalidatePath("/artikel");
  } catch (error) {
    console.error("Error toggling article status:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to toggle article status"
    );
  }
}
