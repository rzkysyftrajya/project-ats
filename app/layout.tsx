// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  
  title: "Rental Mobil Medan Murah & Terpercaya | CV ATS RentCar",
  description: "Sewa mobil Medan lepas kunci dan dengan supir. Tersedia layanan rental mobil harian, bulanan, dan paket tour Danau Toba. Harga terjangkau, armada lengkap.",

  keywords: [
    "rental mobil medan",
    "sewa mobil medan",
    "rental mobil di medan",
    "sewa mobil di medan",
    "rental mobil medan murah",
    "rental mobil medan lepas kunci",
    "sewa mobil medan dengan supir",
    "rental mobil medan kualanamu",
    "sewa mobil bandara kualanamu",
    "sewa innova medan",
    "rental hiace medan",
    "rental mobil medan harian",
    "paket tour danau toba",
  ],

  authors: [{ name: "CV ATS RentCar" }],
  openGraph: {
    title: "Rental Mobil Medan Murah & Terpercaya | CV ATS RentCar",
    description: "Sewa mobil Medan lepas kunci dan dengan supir. Tersedia layanan rental mobil harian, bulanan, dan paket tour Danau Toba. Harga terjangkau, armada lengkap.",
    url: "https://www.atsrentcar.com", // Ganti dengan URL website Anda
    images: [
      {
        url: "https://www.atsrentcar.com/images/mobil-medan.jpg", // Ganti dengan URL gambar utama website Anda
        alt: "Rental Mobil di Medan",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
