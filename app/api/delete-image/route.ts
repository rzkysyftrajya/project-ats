import { type NextRequest, NextResponse } from "next/server"
import { deleteFile } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    console.log("API: Delete request received")

    const { url } = await request.json()

    if (!url) {
      console.error("API: No URL provided")
      return NextResponse.json({ error: "No URL provided" }, { status: 400 })
    }

    console.log("API: Processing delete for URL:", url)

    // Extract file path from URL
    const urlParts = url.split("/")
    const fileName = urlParts[urlParts.length - 1]
    const folder = urlParts[urlParts.length - 2] || "images"
    const filePath = `${folder}/${fileName}`

    console.log("API: Extracted file path:", filePath)

    // Delete file using server function
    const success = await deleteFile(filePath)

    console.log("API: Delete result:", success)

    return NextResponse.json({
      success,
      message: success ? "File deleted successfully" : "Failed to delete file",
    })
  } catch (error: any) {
    console.error("API: Delete error:", error)
    return NextResponse.json(
      {
        error: error.message || "Delete failed",
        success: false,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Delete endpoint. Use POST method." })
}
