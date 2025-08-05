"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MessageCircle,
  Phone,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { getSettings, WebsiteSettings } from "@/lib/settings";

/**
 * Data untuk setiap slide di hero section.
 * Properti mobileImage ditambahkan untuk gambar yang lebih dioptimalkan di perangkat seluler.
 */
const heroSlides = [
  {
    image: "/images/hero-section/toyota-avanza.jpg",
    mobileImage: "/images/hero-section/toyota-avanza-mobile.jpg",
    title: "TOYOTA AVANZA",
    subtitle: "MPV Keluarga Terpopuler",
    price: "Mulai Rp 400.000/hari",
    category: "FAMILY MPV",
  },
  {
    image: "/images/hero-section/TOYOTA-INNOVA-REBORN.jpg",
    mobileImage: "/images/hero-section/Toyota-innova-reborn-mobile.jpg",
    title: "TOYOTA INNOVA REBORN",
    subtitle: "Executive MPV Premium",
    price: "Mulai Rp 600.000/hari",
    category: "EXECUTIVE MPV",
  },
  {
    image: "/images/hero-section/TOYOTA-FORTUNER.jpg",
    mobileImage: "/images/hero-section/toyota-fortuner-mobile.jpg",
    title: "TOYOTA FORTUNER",
    subtitle: "Premium SUV 4x4",
    price: "Mulai Rp 1.300.000/hari",
    category: "PREMIUM SUV",
  },
  {
    image: "/images/hero-section/TOYOTA-ALPHARD.jpg",
    mobileImage: "/images/hero-section/Toyota-alphard-mobile.jpg",
    title: "TOYOTA ALPHARD",
    subtitle: "Luxury Executive MPV",
    price: "Mulai Rp 3.000.000/hari",
    category: "LUXURY VIP",
  },
];

// Custom hook untuk mendeteksi ukuran layar
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      // Menggunakan breakpoint Tailwind (md: 768px)
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);
  const isMobile = useIsMobile();

  // Memuat data pengaturan website saat komponen di-mount
  useEffect(() => {
    setSettings(getSettings());
  }, []);

  // Mengatur slideshow otomatis
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000); // Ganti slide setiap 6 detik
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );

  // Menggunakan useMemo untuk mengoptimalkan pengambilan data slide saat ini
  const currentSlideData = useMemo(
    () => heroSlides[currentSlide],
    [currentSlide]
  );

  const handleWhatsAppBooking = () => {
    const message = `Halo ${
      settings?.site_name || "CV ATS RentCar"
    }! Saya tertarik dengan ${
      currentSlideData.title
    }. Mohon info lebih lanjut.`;
    // Menggunakan nomor WhatsApp yang baru secara langsung
    const whatsappUrl = `https://wa.me/6282115471992?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneCall = () => {
    // Menggunakan nomor telepon yang baru secara langsung
    window.open(`tel:+6282115471992`);
  };

  return (
    <section className="relative min-h-screen md:min-h-0 md:h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => {
          // Tentukan jalur gambar yang benar, pastikan case-sensitivity
          const imageUrl = isMobile ? slide.mobileImage : slide.image;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                // Memberikan key yang unik agar React me-render ulang saat path berubah
                key={imageUrl}
                src={imageUrl}
                alt={slide.title}
                fill
                className="object-cover"
                // Prioritaskan gambar pertama untuk mempercepat waktu render
                priority={index === 0}
                quality={90}
                // Tambahkan fetchPriority untuk memastikan browser mengutamakan gambar hero
                fetchPriority={index === currentSlide ? "high" : "low"}
                // Menambahkan onError untuk penanganan error
                onError={(e) => console.error(`Failed to load image: ${imageUrl}`, e)}
              />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          );
        })}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Slide sebelumnya"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
        aria-label="Slide berikutnya"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      <div className="container mx-auto px-4 py-24 relative z-10 flex flex-col items-center justify-center text-white text-center">
        <Badge className="bg-white/10 backdrop-blur-sm text-white border-white/20 px-4 py-2 mb-4 animate-fade-in animate-slide-up">
          <Zap className="w-4 h-4 mr-2" />
          {currentSlideData.category}
        </Badge>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-lg animate-fade-in animate-slide-up">
          {currentSlideData.title}
        </h1>
        <p className="text-xl sm:text-2xl font-semibold text-gray-200 mb-8 drop-shadow-lg animate-fade-in animate-slide-up animate-delay-200">
          {settings?.site_description || "Rental Mobil Terpercaya #1 di Medan"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-slide-up animate-delay-500">
          <Button
            onClick={handleWhatsAppBooking}
            size="lg"
            className="bg-emerald-500 text-white hover:bg-emerald-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Booking via WhatsApp
          </Button>
          <Button
            onClick={handlePhoneCall}
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-emerald-600 font-semibold px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all bg-transparent"
          >
            <Phone className="w-5 h-5 mr-2" />
            Hubungi Langsung
          </Button>
        </div>
      </div>
    </section>
  );
}

