"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const ADMIN_USERNAME = process.env.NEXT_PUBLIC_ADMIN_USERNAME || "admin"
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123"

export async function login(username: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      const cookieStore = await cookies()
      cookieStore.set("admin_session", "authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60, // 24 hours
      })

      return { success: true }
    } else {
      return { success: false, error: "Username atau password salah" }
    }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Terjadi kesalahan saat login" }
  }
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin")
}

export async function checkAdminAuth(): Promise<boolean> {
  try {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    return session?.value === "authenticated"
  } catch (error) {
    console.error("Auth check error:", error)
    return false
  }
}
