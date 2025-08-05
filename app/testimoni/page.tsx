"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle } from "lucide-react";
import { getSettings } from "@/lib/settings";

interface Settings {
  companyName: string;
  whatsapp_number: string;
}

// Data testimonial yang dibuat statis tanpa nama dan jabatan,
// dilengkapi dengan gambar placeholder tanpa teks
const testimonials = [
  {
    rating: 5,
    review:
      "Pelayanan sangat memuaskan, mobil bersih dan terawat dengan baik! Driver juga profesional dan sangat membantu.",
    color: "blue",
    image: "/testimoni/testimoni.jpg",
  },
  {
    rating: 5,
    review:
      "Armada premium dengan harga terjangkau. Selalu menjadi pilihan utama untuk perjalanan bisnis saya di Medan.",
    color: "lime",
    image: "/testimoni/testimoni-2.jpg",
  },
  {
    rating: 5,
    review:
      "Proses booking cepat, responsif, dan mobilnya nyaman banget. Sangat direkomendasikan untuk traveling bareng teman-teman!",
    color: "purple",
    image: "/testimoni/testimoni-3.jpg",
  },
  {
    rating: 5,
    review:
      "Mobil kondisi prima, driver profesional. Pasti akan sewa lagi di sini untuk acara keluarga. Terima kasih CV ATS RentCar!",
    color: "emerald",
    image: "/testimoni/testimoni-4.jpg",
  },
  {
    rating: 5,
    review:
      "Pengalaman sewa mobil terbaik. Layanan 24 jam sangat membantu saat ada kendala di jalan. Sangat puas!",
    color: "pink",
    image: "/testimoni/testimoni-5.jpg",
  },
  {
    rating: 5,
    review:
      "Kami dari luar kota, berkat driver yang ramah kami bisa explore Medan dengan nyaman. Mobil bersih dan wangi.",
    color: "yellow",
    image: "/testimoni/testimoni-6.jpg",
  },
];

export default function TestimoniPage() {
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    // Memuat settings dari localStorage di sisi klien
    setSettings(getSettings() as Settings | null);
  }, []);

  const handleWhatsAppContact = () => {
    const message = `Halo ${
      settings?.companyName || "CV ATS RentCar"
    }! Saya ingin memberikan testimonial dan saran untuk layanan Anda.`;
    window.open(
      `https://wa.me/${
        settings?.whatsapp_number || "6282115471992"
      }?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const getGlassEffectClass = (color: string) => {
    return `glass-effect bg-white/30 backdrop-blur-md border border-${color}-100/50`;
  };

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* HERO SECTION */}
        <div className="text-center mb-16 relative">
          <Badge className="bg-blue-100 text-blue-800 px-6 py-2 text-lg mb-6">
            Testimoni Pelanggan
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 animate-fade-in animate-slide-up">
            Apa Kata Mereka <span className="text-blue-700">Tentang Kami</span>
          </h1>
          <p className="text-xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed animate-fade-in animate-slide-up animate-delay-200">
            Dengarkan langsung dari pelanggan setia kami yang telah merasakan
            kenyamanan dan kepuasan layanan rental mobil terbaik.
          </p>
        </div>

        {/* TESTIMONIALS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={`${getGlassEffectClass(
                testimonial.color
              )} hover:shadow-2xl transition-all duration-500 hover:scale-105`}
            >
              <CardContent className="p-6 text-center">
                {/* Rating Stars */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 fill-${testimonial.color}-500 text-${testimonial.color}-500`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  "{testimonial.review}"
                </p>

                {/* Customer Label and Image */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-blue-600 font-semibold mb-2">
                    Pelanggan {settings?.companyName || "CV ATS RentCar"}
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                    {/* Mengganti next/image dengan tag img biasa untuk menghindari error konfigurasi domain */}
                    <img
                      src={testimonial.image}
                      alt="Placeholder pengguna"
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA SECTION */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-lime-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siap Beri Ulasan? Bagikan Pengalaman Anda
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Kami senang mendengar masukan dan pengalaman Anda bersama kami.
          </p>

          <div className="flex justify-center">
            <Button
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-white text-lime-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              BERIKAN ULASAN VIA WHATSAPP
            </Button>
          </div>
        </div>
      </div>
      {/* Custom CSS untuk efek kaca */}
      <style jsx global>{`
        .glass-effect {
          background-color: rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }
        .glass-effect:hover {
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
