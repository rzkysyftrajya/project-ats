// app/admin/(protected)/articles/[id]/edit/EditArticleForm.tsx
"use client";

import React, { useState } from "react";
import { updateArticle } from "../../actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save, Upload } from "lucide-react";
import Image from "next/image";
import { useFormStatus } from "react-dom";
import TiptapEditor from "@/components/tiptap-editor";
import { Article } from "@/app/admin/(protected)/articles/actions";

interface EditArticleFormProps {
  article: Article;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex items-center gap-2"
      disabled={pending}
    >
      <Save className="h-4 w-4" />
      {pending ? "Menyimpan..." : "Simpan Perubahan"}
    </Button>
  );
}

export default function EditArticleForm({ article }: EditArticleFormProps) {
  const updateArticleWithId = updateArticle.bind(null, article.id);

  const [content, setContent] = useState<string>(article.content);
  const [previewImage, setPreviewImage] = useState<string | null>(
    article.featured_image
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(article.featured_image);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <div className="flex items-center justify-between mb-6">
        <Link href="/admin/articles">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Kembali
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Edit Artikel</h1>
      </div>

      <Card className="p-6">
        <form
          action={updateArticleWithId}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input
                id="title"
                name="title"
                type="text"
                defaultValue={article.title}
                placeholder="Judul artikel Anda..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={article.excerpt}
                placeholder="Ringkasan singkat artikel..."
                className="min-h-[100px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Isi Artikel</Label>
              <TiptapEditor
                content={content}
                onChange={(html: string) => setContent(html)}
              />
              <input type="hidden" name="content" value={content} />
            </div>
          </div>

          <div className="md:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gambar Unggulan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-full h-48 border rounded-md overflow-hidden relative bg-gray-100 flex items-center justify-center">
                    {previewImage ? (
                      <Image
                        src={previewImage}
                        alt="Preview Gambar"
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-500">
                        Belum ada gambar
                      </span>
                    )}
                  </div>
                  <div className="w-full">
                    <Label htmlFor="featured_image" className="sr-only">
                      Pilih Gambar
                    </Label>
                    <Input
                      id="featured_image"
                      name="featured_image"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <Button asChild className="w-full">
                      <label htmlFor="featured_image">
                        <Upload className="h-4 w-4 mr-2" />
                        Pilih Gambar
                      </label>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Detail Artikel</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="author">Penulis</Label>
                  <Input
                    id="author"
                    name="author"
                    type="text"
                    defaultValue={article.author}
                    placeholder="Nama penulis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    defaultValue={article.category}
                    placeholder="Contoh: Tips, Informasi"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="status"
                    name="status"
                    value="published"
                    defaultChecked={article.status === "published"}
                  />
                  <Label htmlFor="status">Publikasikan Artikel</Label>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SEO Metadata</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="meta_title">Meta Title</Label>
                  <Input
                    id="meta_title"
                    name="meta_title"
                    type="text"
                    defaultValue={article.meta_title}
                    placeholder="Meta title untuk SEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
                    defaultValue={article.meta_description}
                    placeholder="Deskripsi meta untuk SEO..."
                    className="min-h-[80px]"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <SubmitButton />
              <Link href="/admin/articles">
                <Button type="button" variant="outline">
                  Batal
                </Button>
              </Link>
            </div>
          </div>
        </form>
      </Card>
    </div>
  );
}
