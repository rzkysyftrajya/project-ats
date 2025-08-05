// app/galeri/gallery-client-content.tsx
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ImageIcon,
  Grid,
  List,
  Search,
  Filter,
  Eye,
  Share2,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ImageWithFallback from "@/components/image-with-fallback";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Definisikan tipe untuk gambar
interface GalleryImage {
  id: string;
  title: string;
  description?: string;
  image_url: string;
  category?: string;
  tags?: string[];
  created_at: string;
  views?: number;
  likes?: number;
  featured?: boolean;
}

// Definisikan tipe untuk properti komponen
interface GalleryClientContentProps {
  images: GalleryImage[];
  categories: { value: string; label: string; icon: string }[];
}

export default function GalleryClientContent({
  images,
  categories,
}: GalleryClientContentProps) {
  const [filteredGallery, setFilteredGallery] =
    useState<GalleryImage[]>(images);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Efek untuk memfilter galeri saat prop images atau state berubah
  useEffect(() => {
    filterGallery(selectedCategory, searchQuery);
  }, [images, selectedCategory, searchQuery]);

  const filterGallery = (category: string, search: string) => {
    let filtered = images;

    if (category !== "all") {
      filtered = filtered.filter((item) => item.category === category);
    }

    if (search.trim()) {
      const searchLower = search.toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.title.toLowerCase().includes(searchLower) ||
          (item.description &&
            item.description.toLowerCase().includes(searchLower)) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(searchLower)))
      );
    }

    setFilteredGallery(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterGallery(category, searchQuery);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    filterGallery(selectedCategory, e.target.value);
  };

  const openImageModal = (image: GalleryImage) => {
    setSelectedImage(image);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  const handleShare = (image: GalleryImage) => {
    if (navigator.share) {
      navigator.share({
        title: image.title,
        text: image.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(`${image.title} - ${window.location.href}`);
      alert("Link berhasil disalin ke clipboard!");
    }
  };

  return (
    <>
      {/* Search and Filters */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border">
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari foto (nama, deskripsi, tag...)"
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 h-12 text-lg"
            />
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="h-12 px-6 border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              <Filter className="w-5 h-5 mr-2" />
              Filter
            </Button>
            <Button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              variant="outline"
              className="h-12 px-6 border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
            >
              {viewMode === "grid" ? (
                <List className="w-5 h-5" />
              ) : (
                <Grid className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Categories Filter */}
        {showFilters && (
          <div className="flex flex-wrap gap-2 transition-all duration-300 ease-in-out">
            {categories.map((category) => (
              <Button
                key={category.value}
                variant={
                  selectedCategory === category.value ? "default" : "outline"
                }
                onClick={() => handleCategoryChange(category.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  selectedCategory === category.value
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "border-purple-300 text-purple-600 hover:bg-purple-50"
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                <Badge
                  variant="secondary"
                  className={`ml-2 rounded-full ${
                    selectedCategory === category.value
                      ? "bg-white/20 text-white"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {
                    images.filter((item) =>
                      category.value === "all"
                        ? true
                        : item.category === category.value
                    ).length
                  }
                </Badge>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Gallery Grid/List */}
      {filteredGallery.length > 0 ? (
        <div
          className={`grid gap-8 transition-all duration-300 ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}
        >
          {filteredGallery.map((image) => (
            <Card
              key={image.id}
              className={`group overflow-hidden relative shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl cursor-pointer ${
                viewMode === "list" ? "flex items-center gap-6" : ""
              }`}
              onClick={() => openImageModal(image)}
            >
              <div
                className={`relative overflow-hidden ${
                  viewMode === "grid" ? "h-48" : "w-48 h-32 flex-shrink-0"
                }`}
              >
                <ImageWithFallback
                  src={image.image_url}
                  alt={image.title}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    viewMode === "grid" ? "group-hover:scale-105" : ""
                  }`}
                  fallbackSrc="/placeholder-image.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {image.featured && (
                  <div className="absolute top-3 right-3 p-1 bg-yellow-400 text-white rounded-full">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                )}
              </div>
              <CardContent
                className={`p-5 flex-1 ${viewMode === "list" ? "py-4" : ""}`}
              >
                <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 border-0">
                  {image.category || "umum"}
                </Badge>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {image.title}
                </h3>
                {viewMode === "grid" && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {image.description}
                  </p>
                )}
                <div
                  className={`flex items-center justify-between text-xs text-gray-500 mt-2 ${
                    viewMode === "list" ? "mt-4" : ""
                  }`}
                >
                  <div className="flex items-center">
                    <ImageIcon className="w-3 h-3 mr-1" />
                    <span>
                      {format(new Date(image.created_at), "dd MMM yyyy", {
                        locale: id,
                      })}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Eye className="w-3 h-3 mr-1" />
                      <span>{image.views || 0}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Tidak Ada Gambar Ditemukan
          </h3>
          <p className="text-gray-600">
            Coba gunakan kata kunci lain atau periksa kembali filter Anda.
          </p>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={closeImageModal}>
          <DialogContent className="sm:max-w-[800px] p-0">
            <div className="relative h-[60vh] w-full">
              <Image
                src={selectedImage.image_url}
                alt={selectedImage.title}
                fill
                className="object-contain rounded-t-lg"
              />
            </div>
            <div className="p-6">
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold mb-2">
                  {selectedImage.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedImage.description}
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <ImageIcon className="w-4 h-4" />
                  <span>
                    {format(
                      new Date(selectedImage.created_at),
                      "dd MMMM yyyy",
                      {
                        locale: id,
                      }
                    )}
                  </span>
                </div>
                {selectedImage.category && (
                  <Badge variant="secondary">{selectedImage.category}</Badge>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedImage.views || 0} Dilihat</span>
                </div>
              </div>
              {selectedImage.tags && selectedImage.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => handleShare(selectedImage)}
                >
                  <Share2 className="mr-2 h-4 w-4" /> Bagikan
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
