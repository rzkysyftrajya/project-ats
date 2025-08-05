// app/admin/(protected)/gallery/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseAdminClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export type GalleryImage = {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category: string;
  tags?: string[];
  featured: boolean;
  created_at: string;
};

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching gallery images:", error.message);
    return [];
  }

  return data as GalleryImage[];
}

export async function getGalleryImageById(
  id: string
): Promise<GalleryImage | null> {
  const supabase = await createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching gallery image:", error.message);
    return null;
  }

  return data as GalleryImage;
}

export async function createGalleryImage(formData: FormData) {
  const supabase = await createSupabaseAdminClient();

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const category = (formData.get("category") as string) || "umum";
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  if (!title || !imageFile) {
    throw new Error("Judul dan gambar tidak boleh kosong.");
  }

  // Upload gambar ke Supabase Storage
  const fileExtension = imageFile.name.split(".").pop();
  const fileName = `${title
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")}-${Date.now()}.${fileExtension}`;
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("gallery-images")
    .upload(fileName, imageFile);

  if (uploadError) {
    console.error("Error uploading image:", uploadError.message);
    throw new Error("Gagal mengunggah gambar. Silakan coba lagi.");
  }

  // Dapatkan URL gambar
  const { data: publicUrlData } = supabase.storage
    .from("gallery-images")
    .getPublicUrl(fileName);

  // Simpan data gambar ke database
  const { error: insertError } = await supabase.from("gallery_images").insert({
    title,
    description,
    category,
    tags,
    featured,
    image_url: publicUrlData.publicUrl,
  });

  if (insertError) {
    // Hapus gambar yang sudah diunggah jika gagal menyimpan data ke database
    await supabase.storage.from("gallery-images").remove([fileName]);
    console.error("Error inserting gallery image:", insertError.message);
    throw new Error("Gagal menyimpan data gambar. Silakan coba lagi.");
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/galeri");
  redirect("/admin/gallery");
}

export async function updateGalleryImage(id: string, formData: FormData) {
  const supabase = await createSupabaseAdminClient();

  const title = formData.get("title") as string;
  const description = (formData.get("description") as string) || null;
  const category = (formData.get("category") as string) || "umum";
  const tags = (formData.get("tags") as string)
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  const featured = formData.get("featured") === "on";
  const imageFile = formData.get("image") as File;

  if (!title) {
    throw new Error("Judul tidak boleh kosong.");
  }

  const updateData: Partial<GalleryImage> = {
    title,
    description,
    category,
    tags,
    featured,
  };

  if (imageFile && imageFile.size > 0) {
    // Hapus gambar lama
    const { data: oldImage } = await supabase
      .from("gallery_images")
      .select("image_url")
      .eq("id", id)
      .single();
    if (oldImage && oldImage.image_url) {
      const oldFileName = oldImage.image_url.split("/").pop();
      if (oldFileName) {
        await supabase.storage.from("gallery-images").remove([oldFileName]);
      }
    }

    // Unggah gambar baru
    const fileExtension = imageFile.name.split(".").pop();
    const fileName = `${title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}-${Date.now()}.${fileExtension}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("gallery-images")
      .upload(fileName, imageFile);

    if (uploadError) {
      console.error("Error uploading new image:", uploadError.message);
      throw new Error("Gagal mengunggah gambar baru. Silakan coba lagi.");
    }

    const { data: publicUrlData } = supabase.storage
      .from("gallery-images")
      .getPublicUrl(fileName);

    updateData.image_url = publicUrlData.publicUrl;
  }

  const { error: updateError } = await supabase
    .from("gallery_images")
    .update(updateData)
    .eq("id", id);

  if (updateError) {
    console.error("Error updating gallery image:", updateError.message);
    throw new Error("Gagal memperbarui data gambar. Silakan coba lagi.");
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/galeri");
  redirect("/admin/gallery");
}

export async function deleteGalleryImage(id: string) {
  const supabase = await createSupabaseAdminClient();

  // Ambil URL gambar untuk dihapus dari storage
  const { data: image, error: fetchError } = await supabase
    .from("gallery_images")
    .select("image_url")
    .eq("id", id)
    .single();

  if (fetchError || !image) {
    console.error(
      "Error fetching image for deletion:",
      fetchError?.message || "Image not found."
    );
    throw new Error("Gagal menghapus gambar: data tidak ditemukan.");
  }

  if (image.image_url) {
    const fileName = image.image_url.split("/").pop();
    if (fileName) {
      // Hapus gambar dari Supabase Storage
      const { error: deleteError } = await supabase.storage
        .from("gallery-images")
        .remove([fileName]);
      if (deleteError) {
        console.error(
          "Error deleting image from storage:",
          deleteError.message
        );
      }
    }
  }

  // Hapus data dari database
  const { error: dbError } = await supabase
    .from("gallery_images")
    .delete()
    .eq("id", id);

  if (dbError) {
    console.error("Error deleting image from database:", dbError.message);
    throw new Error("Gagal menghapus data gambar.");
  }

  revalidatePath("/admin/gallery");
  revalidatePath("/galeri");
}
