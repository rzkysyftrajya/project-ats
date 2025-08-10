// app/layout.tsx

import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";

const inter = Inter({ subsets: ["latin"] });

// Metadata SEO untuk website
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
    "sewa mobil bandara Soekarno Hatta",
    "sewa mobil bandara Hang Nadim",
    "sewa mobil bandara Halim Perdanakusuma",
    "sewa mobil bandara Minangkabau",
    "sewa mobil bandara Sultan Syarif Kasim II",
    "sewa mobil bandara Sultan Mahmud Badaruddin II",
    "sewa mobil bandara Husein Sastranegara",
    "sewa mobil bandara Yogyakarta",
    "sewa mobil bandara Jendral Ahmad Yani",
    "sewa mobil bandara Juanda",
    "sewa mobil bandara Gusti Ngurah Rai",
    "sewa mobil bandara Sultan Hasanuddin",
    "sewa mobil bandara Sam Ratulangi",
    "sewa mobil bandara Iskandar",
    "sewa mobil bandara Sultan Aji Muhammad Sulaiman",
    "sewa mobil bandara Sultan Iskandar Muda",
    "rental mobil di bandara Soekarno Hatta",
    "rental mobil di bandara Hang Nadim",
    "rental mobil di bandara Halim Perdanakusuma",
    "rental mobil di bandara Minangkabau",
    "rental mobil di bandara Sultan Syarif Kasim II",
    "rental mobil di bandara Sultan Mahmud Badaruddin II",
    "rental mobil di bandara Husein Sastranegara",
    "rental mobil di bandara Yogyakarta",
    "rental mobil di bandara Jendral Ahmad Yani",
    "rental mobil di bandara Juanda",
    "rental mobil di bandara Gusti Ngurah Rai",
    "rental mobil di bandara Sultan Hasanuddin",
    "rental mobil di bandara Sam Ratulangi",
    "rental mobil di bandara Iskandar",
    "rental mobil di bandara Sultan Aji Muhammad Sulaiman",
    "rental mobil di bandara Sultan Iskandar Muda",
  ],
  authors: [{ name: "CV ATS RentCar" }],
  openGraph: {
    title: "Rental Mobil Medan Murah & Terpercaya | CV ATS RentCar",
    description: "Sewa mobil Medan lepas kunci dan dengan supir. Tersedia layanan rental mobil harian, bulanan, dan paket tour Danau Toba. Harga terjangkau, armada lengkap.",
    url: "https://www.atsrentcar.com",
    images: [
      {
        url: "https://www.atsrentcar.com/images/mobil-medan.jpg",
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
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17448458706"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17448458706');
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
