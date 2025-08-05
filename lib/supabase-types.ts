export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: number
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          category: string
          author: string
          read_time: string
          views: number
          likes: number
          image_url: string | null
          tags: string[]
          featured: boolean
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          category?: string
          author?: string
          read_time?: string
          views?: number
          likes?: number
          image_url?: string | null
          tags?: string[]
          featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          category?: string
          author?: string
          read_time?: string
          views?: number
          likes?: number
          image_url?: string | null
          tags?: string[]
          featured?: boolean
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: number
          title: string
          description: string | null
          image_url: string
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          title: string
          description?: string | null
          image_url: string
          category?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          title?: string
          description?: string | null
          image_url?: string
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      settings: {
        Row: {
          id: number
          key: string
          value: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          key: string
          value: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          key?: string
          value?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type Article = Database["public"]["Tables"]["articles"]["Row"]
export type ArticleInsert = Database["public"]["Tables"]["articles"]["Insert"]
export type ArticleUpdate = Database["public"]["Tables"]["articles"]["Update"]

export type GalleryItem = Database["public"]["Tables"]["gallery"]["Row"]
export type GalleryInsert = Database["public"]["Tables"]["gallery"]["Insert"]
export type GalleryUpdate = Database["public"]["Tables"]["gallery"]["Update"]

export type Setting = Database["public"]["Tables"]["settings"]["Row"]
export type SettingInsert = Database["public"]["Tables"]["settings"]["Insert"]
export type SettingUpdate = Database["public"]["Tables"]["settings"]["Update"]
