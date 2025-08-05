import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticles, deleteArticle } from "./actions";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check, Edit, Eye, Trash, Plus } from "lucide-react";

export default async function ArticlesPage() {
  const articles = await getArticles();

  if (!articles) {
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      {/* Header and Add Button */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Daftar Artikel</h1>
        <Button asChild className="flex items-center gap-2">
          <Link href="/admin/articles/create">
            <Plus className="h-4 w-4" />
            Tambah Artikel
          </Link>
        </Button>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block border rounded-lg overflow-hidden bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Judul</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Tanggal Publikasi</TableHead>
              <TableHead className="w-[120px] text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length > 0 ? (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="font-medium">{article.title}</TableCell>
                  <TableCell>{article.category || "-"}</TableCell>
                  <TableCell>
                    {article.status === "published" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-800">
                        <Check className="h-3 w-3" />
                        Publikasi
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-800">
                        Draft
                      </span>
                    )}
                  </TableCell>
                  <TableCell>{article.author || "Admin"}</TableCell>
                  <TableCell>
                    {article.published_at
                      ? format(new Date(article.published_at), "d MMM yyyy", {
                          locale: id,
                        })
                      : "Belum dipublikasi"}
                  </TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form
                      action={async () => {
                        "use server";
                        await deleteArticle(article.id);
                      }}
                    >
                      <Button variant="destructive" size="icon" type="submit">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-gray-500"
                >
                  Belum ada artikel yang tersedia.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <Card key={article.id} className="shadow-sm">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{article.title}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <Link href={`/admin/articles/${article.id}/edit`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <form
                      action={async () => {
                        "use server";
                        await deleteArticle(article.id);
                      }}
                    >
                      <Button variant="destructive" size="icon" type="submit">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Kategori:</span>{" "}
                    {article.category || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Status:</span>{" "}
                    {article.status === "published" ? (
                      <span className="text-emerald-600 font-semibold">
                        Publikasi
                      </span>
                    ) : (
                      <span className="text-gray-600">Draft</span>
                    )}
                  </p>
                  <p>
                    <span className="font-medium">Author:</span>{" "}
                    {article.author || "Admin"}
                  </p>
                  <p>
                    <span className="font-medium">Publikasi:</span>{" "}
                    {article.published_at
                      ? format(new Date(article.published_at), "d MMM yyyy", {
                          locale: id,
                        })
                      : "Belum dipublikasi"}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <h3 className="text-lg font-semibold">Belum ada artikel.</h3>
            <p>Klik "Tambah Artikel" untuk membuat artikel baru.</p>
          </div>
        )}
      </div>
    </div>
  );
}
