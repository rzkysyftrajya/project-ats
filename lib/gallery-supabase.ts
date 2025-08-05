import { supabaseServer, executeQuery, handleDatabaseError } from "./supabase-server"
import type { GalleryImage } from "./supabase-types"

export async function getAllGalleryImages(): Promise<GalleryImage[]> {
  return executeQuery(
    () => supabaseServer.from("gallery").select("*").order("created_at", { ascending: false }),
    "getAllGalleryImages",
  )
}

export async function getGalleryImageById(id: string): Promise<GalleryImage | null> {
  try {
    const { data, error } = await supabaseServer.from("gallery").select("*").eq("id", id).single()

    if (error) {
      if (error.code === "PGRST116") {
        return null // Image not found
      }
      throw error
    }

    return data
  } catch (error) {
    handleDatabaseError(error, "getGalleryImageById")
  }
}

export async function createGalleryImage(image: Omit<GalleryImage, "id" | "created_at">): Promise<GalleryImage> {
  return executeQuery(() => supabaseServer.from("gallery").insert(image).select().single(), "createGalleryImage")
}

export async function updateGalleryImage(
  id: string,
  updates: Partial<Omit<GalleryImage, "id" | "created_at">>,
): Promise<GalleryImage> {
  return executeQuery(
    () => supabaseServer.from("gallery").update(updates).eq("id", id).select().single(),
    "updateGalleryImage",
  )
}

export async function deleteGalleryImage(id: string): Promise<void> {
  try {
    const { error } = await supabaseServer.from("gallery").delete().eq("id", id)

    if (error) {
      throw error
    }
  } catch (error) {
    handleDatabaseError(error, "deleteGalleryImage")
  }
}
