// app/client-layout.tsx
"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import { Navigation } from "@/components/navigation"; // Menggunakan komponen Navigation yang lo miliki
import { Footer } from "@/components/footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith("/admin");

  return (
    <>
      {isAdminPage ? (
        // Jika halaman admin, render hanya children dan toaster
        <>
          <main>{children}</main>
          <Toaster />
        </>
      ) : (
        // Jika halaman publik, render navigation, children, footer, dan floating WhatsApp
        <>
          <Navigation />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <WhatsAppFloat />
          <Toaster />
        </>
      )}
    </>
  );
}
