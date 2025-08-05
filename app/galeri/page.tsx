// app/galeri/page.tsx
import { Suspense } from "react";
import { getGalleryImages } from "@/app/admin/(protected)/gallery/actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageIcon, Search, Filter, Star, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ImageWithFallback from "@/components/image-with-fallback";
import { format } from "date-fns";
import { id } from "date-fns/locale";

// Komponen client yang menangani interaksi pengguna (filter, search)
import GalleryClientContent from "./gallery-client-content";

export const revalidate = 60; // Revalidate cache every 60 seconds

export default async function GaleriPage() {
  const images = await getGalleryImages();

  const categories = [
    { value: "all", label: "Semua Foto", icon: "🖼️" },
    { value: "armada", label: "Armada", icon: "🚗" },
    { value: "pelanggan", label: "Pelanggan", icon: "👥" },
    { value: "wisata", label: "Wisata", icon: "🏞️" },
    { value: "kantor", label: "Kantor", icon: "🏢" },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-purple-100 text-purple-800 px-6 py-2 text-lg mb-6">
            Galeri Foto
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
            Galeri <span className="text-purple-600">Foto</span> Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Koleksi foto armada premium, testimoni pelanggan, dan momen
            perjalanan bersama CV ATS RentCar
          </p>
        </div>

        <GalleryClientContent images={images} categories={categories} />
      </div>
    </div>
  );
}
