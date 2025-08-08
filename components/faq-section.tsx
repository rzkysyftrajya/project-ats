"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    category: "Umum",
    questions: [
      {
        question: "Bagaimana cara memesan mobil rental?",
        answer:
          "Anda bisa memesan melalui WhatsApp di nomor 082115471992 atau melalui website kami. Tim kami akan membantu proses pemesanan dan memberikan informasi lengkap mengenai ketersediaan mobil.",
      },
      {
        question: "Apakah tersedia layanan antar-jemput?",
        answer:
          "Ya, kami menyediakan layanan antar-jemput ke lokasi yang Anda tentukan di area Medan dan sekitarnya. Biaya antar-jemput akan disesuaikan dengan jarak lokasi.",
      },
      {
        question: "Berapa lama minimal sewa mobil?",
        answer:
          "Minimal sewa mobil adalah 12 jam. Untuk sewa harian, perhitungan dimulai dari 24 jam. Kami juga melayani sewa mingguan dan bulanan dengan harga khusus.",
      },
    ],
  },
  {
    category: "Harga & Pembayaran",
    questions: [
      {
        question: "Bagaimana sistem pembayaran di CV ATS RentCar?",
        answer:
          "Kami menerima pembayaran tunai, transfer bank, dan e-wallet. Untuk sewa jangka panjang, bisa dilakukan pembayaran bertahap sesuai kesepakatan.",
      },
      {
        question: "Apakah ada deposit yang harus dibayar?",
        answer:
          "Ya, ada deposit sebesar Rp 500.000 - Rp 2.000.000 tergantung jenis mobil. Deposit akan dikembalikan setelah mobil dikembalikan dalam kondisi baik.",
      },
      {
        question: "Apakah harga sudah termasuk BBM?",
        answer:
          "Untuk paket 'Lepas Kunci', BBM ditanggung penyewa. Untuk paket 'All In' atau 'Mobil + Supir Include BBM', BBM sudah termasuk dalam harga sewa.",
      },
    ],
  },
  {
    category: "Syarat & Ketentuan",
    questions: [
      {
        question: "Apa saja syarat untuk menyewa mobil?",
        answer:
          "Syarat: KTP asli, SIM A yang masih berlaku, deposit sesuai ketentuan, dan mengisi formulir sewa. Untuk WNA diperlukan passport dan visa yang masih berlaku.",
      },
      {
        question: "Apakah bisa sewa mobil untuk keluar kota?",
        answer:
          "Ya, mobil bisa dibawa keluar kota dengan pemberitahuan terlebih dahulu. Ada biaya tambahan untuk perjalanan keluar kota sesuai dengan jarak dan durasi.",
      },
      {
        question: "Bagaimana jika terjadi kerusakan atau kecelakaan?",
        answer:
          "Segera hubungi kami jika terjadi kerusakan atau kecelakaan. Kami memiliki asuransi untuk kendaraan. Biaya perbaikan akan disesuaikan dengan kondisi dan penyebab kerusakan.",
      },
    ],
  },
];

export function FAQSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const toggleItem = (id: string) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const categories = ["Semua", ...faqData.map((cat) => cat.category)];

  const filteredFAQ =
    selectedCategory === "Semua"
      ? faqData
      : faqData.filter((cat) => cat.category === selectedCategory);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-800 border-blue-200 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <HelpCircle className="w-5 h-5 mr-2 fill-blue-600 text-blue-600" />
            Frequently Asked Questions
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar layanan sewa mobil
            kami. Jika tidak menemukan jawaban yang Anda cari, jangan ragu untuk
            menghubungi kami.
          </p>
        </header>

        { }
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-6 py-2 transition-all ${
                selectedCategory === category
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        { }
        <div className="max-w-4xl mx-auto space-y-4">
          {filteredFAQ.map((category) => (
            <div key={category.category}>
              {selectedCategory === "Semua" && (
                <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8 first:mt-0">
                  {category.category}
                </h3>
              )}
              {category.questions.map((faq, index) => {
                const itemId = `${category.category}-${index}`;
                const isOpen = openItems.includes(itemId);

                return (
                  <Card
                    key={itemId}
                    className="overflow-hidden transition-all duration-300 hover:shadow-md border-gray-200"
                  >
                    <button
                      onClick={() => toggleItem(itemId)}
                      className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-inset"
                    >
                      <div className="flex justify-between items-center">
                        <h4 className="text-lg font-semibold text-gray-800 pr-4">
                          {faq.question}
                        </h4>
                        <div className="flex-shrink-0">
                          {isOpen ? (
                            <ChevronUp className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </button>

                    {isOpen && (
                      <CardContent className="px-6 pb-6 pt-0">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          ))}
        </div>

        { }
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Masih ada pertanyaan lain?
            </h3>
            <p className="text-gray-600 mb-6">
              Tim customer service kami siap membantu Anda 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() =>
                  window.open("https://wa.me/6282115471992", "_blank")
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat WhatsApp
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open("tel:6282115471992")}
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Phone className="w-5 h-5 mr-2" />
                Telepon Langsung
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
