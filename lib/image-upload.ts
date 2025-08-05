import { supabaseServer } from "./supabase-server"
import { validateImageFile } from "./validation"
import { AppError } from "./error-handler"

export async function uploadImageToSupabase(file: File, bucket = "article-images", folder?: string): Promise<string> {
  try {
    // Validate file
    validateImageFile(file)

    // Generate unique filename
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    // Upload file to Supabase Storage
    const { data, error } = await supabaseServer.storage.from(bucket).upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      throw new AppError(`Upload failed: ${error.message}`, 400)
    }

    // Get public URL
    const { data: urlData } = supabaseServer.storage.from(bucket).getPublicUrl(data.path)

    return urlData.publicUrl
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError("Failed to upload image", 500)
  }
}

export async function deleteImageFromSupabase(url: string, bucket = "article-images"): Promise<void> {
  try {
    // Extract file path from URL
    const urlParts = url.split("/")
    const bucketIndex = urlParts.findIndex((part) => part === bucket)

    if (bucketIndex === -1) {
      throw new AppError("Invalid image URL", 400)
    }

    const filePath = urlParts.slice(bucketIndex + 1).join("/")

    // Delete file from Supabase Storage
    const { error } = await supabaseServer.storage.from(bucket).remove([filePath])

    if (error) {
      throw new AppError(`Delete failed: ${error.message}`, 400)
    }
  } catch (error) {
    if (error instanceof AppError) {
      throw error
    }
    throw new AppError("Failed to delete image", 500)
  }
}

export function getImageUrl(path: string, bucket = "article-images"): string {
  const { data } = supabaseServer.storage.from(bucket).getPublicUrl(path)

  return data.publicUrl
}
