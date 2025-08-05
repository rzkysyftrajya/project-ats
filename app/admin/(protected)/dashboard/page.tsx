// app/admin/(protected)/dashboard/page.tsx
import React from "react";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <p className="text-gray-700">
        Selamat datang di panel administrasi CV ATS RentCar.
      </p>
      <p className="mt-4 text-gray-600">
        Ini adalah halaman utama setelah Anda berhasil login. Di sini Anda bisa
        menampilkan ringkasan data, statistik, atau tautan cepat ke fitur-fitur
        penting lainnya.
      </p>
      {/* Tambahkan komponen atau informasi dashboard lainnya di sini */}
    </div>
  );
}
