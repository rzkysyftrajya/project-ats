// app/admin/(protected)/layout.tsx
import { createSupabaseServerClient } from "@/lib/supabase/server";
import AdminLayoutClient from "../admin-layout-client";
import { redirect } from "next/navigation";
import React from "react";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // PENTING: TAMBAHKAN `await` DI SINI UNTUK MEMASTIKAN `supabase` TERISI
  const supabase = await createSupabaseServerClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    if (error) {
      console.error("Error getting session:", error.message);
    }
    redirect("/admin/login");
  }

  return <AdminLayoutClient session={session}>{children}</AdminLayoutClient>;
}
