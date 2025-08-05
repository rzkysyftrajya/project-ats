// app/artikel/page.tsx
import { Suspense } from "react";
import type { Metadata } from "next";
import { getPublishedArticles } from "@/lib/articles-supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Eye,
  Heart,
  Search,
  Filter,
  Star,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/loading-spinner";

export const metadata: Metadata = {
  title: "Artikel & Tips - CV ATS Rent Car",
  description:
    "Temukan tips, panduan, dan informasi terbaru seputar rental mobil dan perjalanan",
  keywords: "artikel rental mobil, tips perjalanan, panduan sewa mobil, CV ATS",
};

async function ArticlesList() {
  try {
    const articles = await getPublishedArticles();
    const featuredArticles = articles.filter((article) => article.featured);
    const regularArticles = articles.filter((article) => !article.featured);

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white transition-colors duration-300">
        {/* Hero Section */}
        <section className="pt-32 lg:pt-36 pb-16 px-4 lg:px-6">
          <div className="container mx-auto text-center">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Artikel &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-600">
                  Tips
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 mb-8 leading-relaxed">
                Temukan tips, panduan, dan informasi terbaru seputar rental
                mobil dan perjalanan
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto mb-12">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Cari artikel, tips, atau panduan..."
                    className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-emerald-500 bg-white shadow-lg"
                  />
                  <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <section className="pb-16 px-4 lg:px-6">
            <div className="container mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900 flex items-center">
                  <Star className="w-8 h-8 text-yellow-500 mr-3" />
                  Artikel Pilihan
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredArticles.slice(0, 2).map((article) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={article.featured_image || "/placeholder.jpg"} // <-- PERBAIKAN DI SINI
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
                        {article.category}
                      </Badge>
                      <div className="absolute top-4 right-4">
                        <Star className="w-6 h-6 text-yellow-400 fill-current" />
                      </div>
                    </div>

                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(article.created_at).toLocaleDateString(
                              "id-ID"
                            )}
                          </div>
                          {/* Asumsi read_time, views, dan likes sudah ada di database atau tidak */}
                          {/* <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.read_time}
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            {article.views}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-4 h-4 mr-1" />
                            {article.likes}
                          </div> */}
                        </div>
                      </div>

                      <Link href={`/artikel/${article.slug}`}>
                        <Button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-300 transform hover:scale-105">
                          Baca Selengkapnya
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Regular Articles */}
        <section className="pb-16 px-4 lg:px-6">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Semua Artikel
            </h2>

            {regularArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularArticles.map((article) => (
                  <Card
                    key={article.id}
                    className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white rounded-xl"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.featured_image || "/placeholder.jpg"} // <-- PERBAIKAN DI SINI
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <Badge className="absolute top-3 left-3 bg-white/90 text-gray-800 border-0">
                        {article.category}
                      </Badge>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(article.created_at).toLocaleDateString(
                            "id-ID"
                          )}
                        </div>
                        {/* Asumsi views dan likes tidak ada di database atau tidak */}
                        {/* <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Eye className="w-3 h-3 mr-1" />
                            {article.views}
                          </div>
                          <div className="flex items-center">
                            <Heart className="w-3 h-3 mr-1" />
                            {article.likes}
                          </div>
                        </div> */}
                      </div>

                      <Link href={`/artikel/${article.slug}`}>
                        <Button
                          variant="outline"
                          className="w-full border-emerald-200 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors bg-transparent"
                        >
                          Baca Artikel
                        </Button>
                      </Link>
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
                  Belum Ada Artikel
                </h3>
                <p className="text-gray-600">
                  Artikel akan segera hadir. Pantau terus halaman ini!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error("Error fetching articles:", error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Terjadi Kesalahan
          </h2>
          <p className="text-gray-600 mb-6">
            Gagal memuat artikel. Silakan coba lagi nanti.
          </p>
          <Button asChild>
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    );
  }
}

export default function ArtikelPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <LoadingSpinner />
        </div>
      }
    >
      <ArticlesList />
    </Suspense>
  );
}
