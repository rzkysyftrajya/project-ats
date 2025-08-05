// app/admin/(protected)/page.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>

      <Card>
        <CardHeader>
          <CardTitle>
            Selamat Datang di Panel Administrasi CV ATS RentCar
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Ini adalah halaman utama setelah Anda berhasil login. Gunakan menu
            di samping untuk mengelola konten seperti artikel, galeri, dan
            pengaturan.
          </p>
          <p className="mt-4 text-gray-500">
            Saat ini, tidak ada tampilan untuk mengedit, menghapus, atau
            mengunggah artikel di halaman ini.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
