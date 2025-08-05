// Simple localStorage-based gallery management
export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  description?: string;
  created_at: string;
}

const GALLERY_KEY = "gallery_data";

const sampleImages: GalleryImage[] = [
  {
    id: "1",
    title: "Toyota Avanza",
    image_url: "/placeholder.jpg",
    description: "Mobil keluarga yang nyaman",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Honda Jazz",
    image_url: "/placeholder.jpg",
    description: "Mobil city car yang efisien",
    created_at: new Date().toISOString(),
  },
];

export function getAllGalleryImages(): GalleryImage[] {
  try {
    const stored = localStorage.getItem(GALLERY_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    localStorage.setItem(GALLERY_KEY, JSON.stringify(sampleImages));
    return sampleImages;
  } catch {
    return sampleImages;
  }
}

export function addGalleryImage(
  imageData: Omit<GalleryImage, "id" | "created_at">
): GalleryImage {
  const images = getAllGalleryImages();
  const newImage: GalleryImage = {
    ...imageData,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  };

  images.unshift(newImage);
  localStorage.setItem(GALLERY_KEY, JSON.stringify(images));
  return newImage;
}

export function deleteGalleryImage(id: string): boolean {
  const images = getAllGalleryImages();
  const filtered = images.filter((img) => img.id !== id);

  if (filtered.length === images.length) return false;

  localStorage.setItem(GALLERY_KEY, JSON.stringify(filtered));
  return true;
}
