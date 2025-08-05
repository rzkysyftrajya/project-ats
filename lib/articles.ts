// Simple localStorage-based articles management
export interface Article {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  image?: string
  published: boolean
  created_at: string
  updated_at: string
}

const ARTICLES_KEY = "articles_data"

// Sample articles
const sampleArticles: Article[] = [
  {
    id: "1",
    title: "Tips Memilih Mobil Rental yang Tepat",
    slug: "tips-memilih-mobil-rental",
    content: "<p>Memilih mobil rental yang tepat sangat penting untuk kenyamanan perjalanan Anda...</p>",
    excerpt: "Panduan lengkap memilih mobil rental yang sesuai kebutuhan",
    image: "/placeholder.jpg",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Keuntungan Sewa Mobil untuk Liburan",
    slug: "keuntungan-sewa-mobil-liburan",
    content: "<p>Sewa mobil memberikan fleksibilitas dan kenyamanan saat berlibur...</p>",
    excerpt: "Mengapa sewa mobil adalah pilihan terbaik untuk liburan",
    image: "/placeholder.jpg",
    published: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

export function getAllArticles(): Article[] {
  try {
    const stored = localStorage.getItem(ARTICLES_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
    // Initialize with sample data
    localStorage.setItem(ARTICLES_KEY, JSON.stringify(sampleArticles))
    return sampleArticles
  } catch {
    return sampleArticles
  }
}

export function getArticleBySlug(slug: string): Article | null {
  const articles = getAllArticles()
  return articles.find((article) => article.slug === slug) || null
}

export function getArticleById(id: string): Article | null {
  const articles = getAllArticles()
  return articles.find((article) => article.id === id) || null
}

export function createArticle(articleData: Omit<Article, "id" | "created_at" | "updated_at">): Article {
  const articles = getAllArticles()
  const newArticle: Article = {
    ...articleData,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }

  articles.unshift(newArticle)
  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
  return newArticle
}

export function updateArticle(id: string, updates: Partial<Article>): Article | null {
  const articles = getAllArticles()
  const index = articles.findIndex((article) => article.id === id)

  if (index === -1) return null

  articles[index] = {
    ...articles[index],
    ...updates,
    updated_at: new Date().toISOString(),
  }

  localStorage.setItem(ARTICLES_KEY, JSON.stringify(articles))
  return articles[index]
}

export function deleteArticle(id: string): boolean {
  const articles = getAllArticles()
  const filtered = articles.filter((article) => article.id !== id)

  if (filtered.length === articles.length) return false

  localStorage.setItem(ARTICLES_KEY, JSON.stringify(filtered))
  return true
}
