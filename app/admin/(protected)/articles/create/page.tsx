// app/admin/(protected)/articles/create/page.tsx
"use client";

import React, { useState } from "react";
import { createArticle } from "../actions";
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
import TiptapEditor from "@/components/tiptap-editor"; // <-- Import Tiptap Editor

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="flex items-center gap-2"
      disabled={pending}
    >
      <Save className="h-4 w-4" />
      {pending ? "Menyimpan..." : "Simpan Artikel"}
    </Button>
  );
}

export default function CreateArticlePage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [content, setContent] = useState<string>(""); // <-- State untuk konten editor

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    } else {
      setPreviewImage(null);
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
        <h1 className="text-2xl font-bold text-gray-900">Buat Artikel Baru</h1>
      </div>

      <Card className="p-6">
        <form
          action={createArticle}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Main Content Column */}
          <div className="md:col-span-2 space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Artikel</Label>
              <Input
                id="title"
                name="title"
                type="text"
                placeholder="Judul artikel Anda..."
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                name="excerpt"
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
              <input type="hidden" name="content" value={content} />{" "}
              {/* <-- Kirim HTML ke Server Action */}
            </div>
          </div>

          {/* Sidebar Column */}
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
                    placeholder="Nama penulis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Kategori</Label>
                  <Input
                    id="category"
                    name="category"
                    type="text"
                    placeholder="Contoh: Tips, Informasi"
                  />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox id="status" name="status" value="published" />
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
                    placeholder="Meta title untuk SEO"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="meta_description">Meta Description</Label>
                  <Textarea
                    id="meta_description"
                    name="meta_description"
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
