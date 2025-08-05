// lib/storage.ts
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export async function uploadNewFeaturedImage(
  file: File,
  slug: string
): Promise<string> {
  const supabase = createSupabaseAdminClient();
  const fileExt = file.name.split(".").pop();
  const fileName = `${slug}-${Date.now()}.${fileExt}`;
  const filePath = `articles/${fileName}`;

  const { data, error } = await supabase.storage
    .from("rentcar-images") // Pastikan nama bucketnya benar
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Error uploading image:", error.message);
    throw new Error("Gagal mengunggah gambar unggulan.");
  }

  const { data: publicUrl } = supabase.storage
    .from("rentcar-images")
    .getPublicUrl(filePath);

  return publicUrl.publicUrl;
}

export async function deleteOldFeaturedImage(imageUrl: string) {
  const supabase = createSupabaseAdminClient();

  const urlParts = imageUrl.split("/");
  const fileName = urlParts.pop();

  if (!fileName) return;

  const filePath = `articles/${fileName}`;

  const { data, error } = await supabase.storage
    .from("rentcar-images")
    .remove([filePath]);

  if (error) {
    console.error("Error deleting old image:", error.message);
  }
}
