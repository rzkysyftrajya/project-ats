import { type NextRequest, NextResponse } from "next/server"
import { uploadFile } from "@/lib/supabase-server"

export async function POST(request: NextRequest) {
  try {
    console.log("API: Upload request received")

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      console.error("API: No file provided")
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    console.log("API: Processing file:", file.name, file.size)

    // Upload file using server function
    const result = await uploadFile(file)

    console.log("API: Upload successful:", result.url)

    return NextResponse.json({
      success: true,
      url: result.url,
      path: result.path,
    })
  } catch (error: any) {
    console.error("API: Upload error:", error)
    return NextResponse.json(
      {
        error: error.message || "Upload failed",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ message: "Upload endpoint. Use POST method." })
}
