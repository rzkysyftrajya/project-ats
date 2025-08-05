import { NextResponse } from "next/server"
import { getAllArticles } from "@/lib/articles-supabase"
import { getAllGalleryImages } from "@/lib/gallery-supabase"

export async function GET() {
  try {
    const [articles, gallery] = await Promise.all([
      getAllArticles(),
      getAllGalleryImages()
    ])

    return NextResponse.json({
      articles,
      gallery,
      success: true
    })
  } catch (error) {
    console.error("Dashboard API error:", error)
    return NextResponse.json(
      { 
        error: "Failed to fetch dashboard data",
        success: false 
      },
      { status: 500 }
    )
  }
}
