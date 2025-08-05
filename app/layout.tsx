// app/layout.tsx
// Ini adalah Server Component. TIDAK ADA "use client".
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout"; // Ini mengimpor layout yang akan menangani logika client

const inter = Inter({ subsets: ["latin"] });

// Metadata WAJIB di sini (Server Component)
export const metadata: Metadata = {
  title: "CV ATS RentCar",
  description: "Rental Mobil & Tour",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        {/* Child component akan di-wrap oleh ClientLayout */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
