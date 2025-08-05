// app/artikel/[slug]/page.tsx
import { Suspense } from "react";
import { getArticleBySlug, getRelatedArticles } from "@/lib/articles-supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;

  return (
    <div className="min-h-screen bg-gray-50">
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent slug={slug} />
      </Suspense>
    </div>
  );
}

async function ArticleContent({ slug }: { slug: string }) {
  try {
    const article = await getArticleBySlug(slug);

    if (!article) {
      notFound();
    }

    const relatedArticles = await getRelatedArticles(slug, article.category, 3);

    return (
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/artikel">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Kembali ke Artikel
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Article */}
          <div className="lg:col-span-2">
            <Card>
              {article.featured_image && ( // <-- PERBAIKAN: Menggunakan featured_image
                <div className="relative h-64 md:h-80 w-full">
                  <Image
                    src={article.featured_image || "/placeholder.svg"} // <-- PERBAIKAN: Menggunakan featured_image
                    alt={article.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="secondary">{article.category}</Badge>
                  {article.featured && (
                    <Badge className="bg-yellow-500">Unggulan</Badge>
                  )}
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold">
                  {article.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-sm text-gray-500 mt-4">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(article.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {article.excerpt && (
                  <div className="bg-blue-50 p-4 rounded-lg mb-6">
                    <p className="text-blue-800 font-medium">
                      {article.excerpt}
                    </p>
                  </div>
                )}

                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="font-semibold mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-6 border-t">
                  <Button variant="outline" className="w-full bg-transparent">
                    <Share2 className="w-4 h-4 mr-2" />
                    Bagikan Artikel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Related Articles */}
            {relatedArticles.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Artikel Terkait</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedArticles.map((related) => (
                    <Link key={related.id} href={`/artikel/${related.slug}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        {related.featured_image && ( // <-- PERBAIKAN: Menggunakan featured_image
                          <div className="relative w-16 h-16 flex-shrink-0">
                            <Image
                              src={related.featured_image || "/placeholder.svg"} // <-- PERBAIKAN: Menggunakan featured_image
                              alt={related.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {related.title}
                          </h4>
                          <p className="text-xs text-gray-500">
                            {new Date(related.created_at).toLocaleDateString(
                              "id-ID"
                            )}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* CTA */}
            <Card>
              <CardContent className="p-6 text-center">
                <h3 className="font-bold mb-2">Butuh Mobil Rental?</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Hubungi kami untuk mendapatkan penawaran terbaik
                </p>
                <Link href="/kontak">
                  <Button className="w-full">Hubungi Kami</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading article:", error);
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-600">
            Error loading article. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}

function ArticleSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-32 mb-6" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <div className="h-80 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-20 mb-4" />
                <div className="h-8 bg-gray-200 rounded w-full mb-4" />
                <div className="h-4 bg-gray-200 rounded w-48" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-4 bg-gray-200 rounded w-full" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-32" />
              </CardHeader>
              <CardContent>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex gap-3 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
