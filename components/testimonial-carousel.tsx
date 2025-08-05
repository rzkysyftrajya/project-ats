"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, Users } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    name: "Budi Santoso",
    role: "Pengusaha",
    location: "Medan",
    rating: 5,
    comment:
      "Pelayanan CV ATS RentCar sangat memuaskan! Mobil bersih, terawat, dan driver sangat profesional. Sudah 3 kali sewa untuk acara keluarga, selalu puas dengan pelayanannya.",
    image: "/placeholder.svg?height=80&width=80&text=BS",
    carRented: "Toyota Innova Reborn",
    rentalType: "Dengan Driver",
    date: "2024-01-15",
  },
  {
    id: 2,
    name: "Sari Dewi",
    role: "Manager Marketing",
    location: "Medan",
    rating: 5,
    comment:
      "Sewa mobil untuk keperluan bisnis jadi lebih mudah dengan CV ATS. Proses booking cepat via WhatsApp, mobil selalu on time, dan harga sangat kompetitif. Highly recommended!",
    image: "/placeholder.svg?height=80&width=80&text=SD",
    carRented: "Toyota Avanza",
    rentalType: "Lepas Kunci",
    date: "2024-01-10",
  },
  {
    id: 3,
    name: "Ahmad Rizki",
    role: "Wisatawan",
    location: "Jakarta",
    rating: 5,
    comment:
      "Liburan ke Medan jadi lebih nyaman dengan sewa mobil di CV ATS. Mobil bagus, driver ramah dan tahu tempat wisata. Pasti akan sewa lagi kalau ke Medan!",
    image: "/placeholder.svg?height=80&width=80&text=AR",
    carRented: "Toyota Fortuner",
    rentalType: "Dengan Driver + BBM",
    date: "2024-01-05",
  },
  {
    id: 4,
    name: "Linda Maharani",
    role: "Event Organizer",
    location: "Medan",
    rating: 5,
    comment:
      "Untuk kebutuhan event, CV ATS selalu jadi pilihan utama. Armada lengkap, kondisi prima, dan tim yang responsif. Terima kasih sudah mendukung kesuksesan event kami!",
    image: "/placeholder.svg?height=80&width=80&text=LM",
    carRented: "Toyota Alphard",
    rentalType: "Dengan Driver",
    date: "2023-12-28",
  },
  {
    id: 5,
    name: "Doni Pratama",
    role: "Karyawan Swasta",
    location: "Medan",
    rating: 5,
    comment:
      "Harga terjangkau, pelayanan prima! Sewa mobil untuk mudik lebaran, prosesnya mudah dan mobil dalam kondisi sangat baik. CV ATS memang terpercaya!",
    image: "/placeholder.svg?height=80&width=80&text=DP",
    carRented: "Toyota Avanza",
    rentalType: "Lepas Kunci",
    date: "2023-12-20",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-yellow-100 text-yellow-800 border-yellow-200 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Users className="w-5 h-5 mr-2 fill-yellow-600 text-yellow-600" />
            Testimoni Pelanggan
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Apa Kata Pelanggan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Kepuasan pelanggan adalah prioritas utama kami. Berikut testimoni
            dari pelanggan setia yang telah mempercayakan kebutuhan transportasi
            mereka kepada CV ATS RentCar.
          </p>
        </header>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <Card className="bg-white shadow-xl border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-700 p-8 text-white">
                <Quote className="absolute top-4 right-4 w-12 h-12 text-emerald-300 opacity-50" />
                <div className="flex items-start gap-6">
                  <div className="relative">
                    {/* Menggunakan tag <img> sebagai fallback untuk kompatibilitas yang lebih luas */}
                    <img
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      width={80}
                      height={80}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 rounded-full p-1">
                      <Star className="w-4 h-4 text-yellow-800 fill-current" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-1">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-emerald-100 mb-2">
                      {currentTestimonial.role}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-emerald-100">
                      <span>{currentTestimonial.location}</span>
                      <span>•</span>
                      <span>
                        {new Date(currentTestimonial.date).toLocaleDateString(
                          "id-ID"
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < currentTestimonial.rating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    ({currentTestimonial.rating}.0)
                  </span>
                </div>

                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6">
                  "{currentTestimonial.comment}"
                </blockquote>

                <div className="flex flex-wrap gap-3">
                  <Badge
                    variant="outline"
                    className="bg-blue-50 text-blue-700 border-blue-200"
                  >
                    {currentTestimonial.carRented}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {currentTestimonial.rentalType}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full bg-white shadow-lg border-gray-200 hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? "bg-emerald-600 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Auto-play indicator */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isAutoPlaying ? "⏸️ Pause" : "▶️ Play"} Auto-slide
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Pelanggan Puas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">4.9</div>
            <div className="text-gray-600">Rating Rata-rata</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">Repeat Customer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
