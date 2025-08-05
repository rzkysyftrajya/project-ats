import { createClient } from "@supabase/supabase-js"

// Fallback values for preview/development
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://dummy-project.supabase.co"
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR1bW15LXByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NTQwOTY4MCwiZXhwIjoxOTYwOTg1NjgwfQ.dummy-key-for-preview"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Mock data for preview when Supabase is not available
const isMockMode = !process.env.NEXT_PUBLIC_SUPABASE_URL
export { isMockMode }

export interface Article {
  id: number
  title: string
  slug: string
  content: string
  excerpt?: string
  category: string
  author: string
  status: "draft" | "published"
  featured: boolean
  image_url?: string
  tags?: string[]
  views: number
  likes: number
  publish_date: Date
  read_time?: string
  created_at: Date
  updated_at: Date
}

export interface GalleryImage {
  id: number
  title: string
  description?: string
  image_url: string
  category: string
  featured: boolean
  views: number
  likes: number
  created_at: Date
  updated_at: Date
}

export interface WebsiteSetting {
  key: string
  value: string
  description?: string
  updated_at: Date
}

// Mock data for preview mode
export const mockArticles: Article[] = [
  {
    id: 1,
    title: "Tips Memilih Mobil Rental Terbaik",
    slug: "tips-memilih-mobil-rental-terbaik",
    content: "<p>Memilih mobil rental yang tepat sangat penting untuk kenyamanan perjalanan Anda...</p>",
    excerpt: "Panduan lengkap memilih mobil rental yang sesuai kebutuhan",
    category: "Tips",
    author: "Admin",
    status: "published",
    featured: true,
    image_url: "/placeholder.jpg",
    tags: ["rental", "tips", "mobil"],
    views: 150,
    likes: 25,
    publish_date: new Date("2024-01-15"),
    read_time: "5 min read",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Panduan Berkendara Aman di Jalan Raya",
    slug: "panduan-berkendara-aman-di-jalan-raya",
    content: "<p>Keselamatan berkendara adalah prioritas utama...</p>",
    excerpt: "Tips dan trik berkendara aman untuk perjalanan yang nyaman",
    category: "Safety",
    author: "Admin",
    status: "published",
    featured: false,
    image_url: "/placeholder.jpg",
    tags: ["safety", "berkendara", "tips"],
    views: 89,
    likes: 12,
    publish_date: new Date("2024-01-10"),
    read_time: "3 min read",
    created_at: new Date("2024-01-10"),
    updated_at: new Date("2024-01-10"),
  },
]

export const mockGalleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Toyota Avanza 2023",
    description: "Mobil keluarga yang nyaman dan irit",
    image_url: "/placeholder.jpg",
    category: "MPV",
    featured: true,
    views: 200,
    likes: 45,
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    title: "Honda Jazz 2023",
    description: "Mobil city car yang stylish",
    image_url: "/placeholder.jpg",
    category: "Hatchback",
    featured: false,
    views: 150,
    likes: 30,
    created_at: new Date("2024-01-02"),
    updated_at: new Date("2024-01-02"),
  },
]

export const mockSettings: WebsiteSetting[] = [
  {
    key: "site_title",
    value: "Cvats Rent Car",
    description: "Website title",
    updated_at: new Date("2024-01-01"),
  },
  {
    key: "contact_phone",
    value: "+62 812-3456-7890",
    description: "Contact phone number",
    updated_at: new Date("2024-01-01"),
  },
  {
    key: "contact_email",
    value: "info@cvatsrentcar.com",
    description: "Contact email address",
    updated_at: new Date("2024-01-01"),
  },
]
