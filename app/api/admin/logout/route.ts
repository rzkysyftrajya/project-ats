// app/api/admin/logout/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // Implementasi logout kustom lo di sini
  // Misalnya, clear cookie sesi kustom yang lo set saat login
  // Jika pakai Supabase Auth, lo bisa logout user dari sisi server juga
  // await supabaseAdmin.auth.signOut();

  const response = NextResponse.json({ success: true, message: "Logged out" });
  // Contoh clear cookie jika lo pakai cookie kustom
  // response.cookies.delete('nama_cookie_sesi_lo');
  return response;
}
