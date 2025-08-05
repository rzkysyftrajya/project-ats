import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: email, // Ubah username menjadi email karena Supabase menggunakan email
    password: password,
  });

  if (error || !user) {
    console.error("Error signing in:", error?.message);
    return NextResponse.json(
      { success: false, message: error?.message || "Invalid credentials" },
      { status: 401 }
    );
  }

  // Jika login berhasil, Supabase secara otomatis akan mengatur cookie session.
  return NextResponse.json({ success: true, message: "Login successful" });
}
