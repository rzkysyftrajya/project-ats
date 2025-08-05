"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Award,
  Car,
  MapPin,
  Phone,
  MessageCircle,
  Target,
  Eye,
  Heart,
  Clock,
} from "lucide-react";
import Image from "next/image";
import { getSettings } from "@/lib/settings";

interface Settings {
  companyName: string;
  whatsapp: string;
  phone: string;
  tagline: string;
  description: string;
  address: string;
}

export default function TentangPage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ years: 0, customers: 0, cars: 0 });
  const [hoveredTimeline, setHoveredTimeline] = useState<number | null>(null);
  const [settings, setSettings] = useState<Settings | null>(null);

  useEffect(() => {
    setIsVisible(true);
    setSettings(getSettings() as Settings | null);

    // Auto timeline progression
    const interval = setInterval(() => {
      setActiveTimeline((prev) => (prev + 1) % 4);
    }, 3000);

    // Animated counters
    const animateCounters = () => {
      const targets = { years: 8, customers: 1000, cars: 24 };
      const duration = 2000;
      const steps = 60;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        setCounters({
          years: Math.floor(targets.years * progress),
          customers: Math.floor(targets.customers * progress),
          cars: Math.floor(targets.cars * progress),
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, duration / steps);
    };

    setTimeout(animateCounters, 500);

    return () => clearInterval(interval);
  }, []);

  const timeline = [
    {
      year: "2016",
      title: "Berdiri",
      description: `${
        settings?.companyName || "CV ATS RentCar"
      } didirikan dengan 3 mobil pertama`,
      color: "blue",
    },
    {
      year: "2018",
      title: "Ekspansi",
      description: "Menambah armada hingga 10 mobil dan layanan driver",
      color: "lime",
    },
    {
      year: "2020",
      title: "Digital",
      description: "Meluncurkan layanan booking online dan WhatsApp",
      color: "purple",
    },
    {
      year: "2024",
      title: "Premium",
      description: "24 armada premium dengan sertifikasi internasional",
      color: "emerald",
    },
  ];

  const handleWhatsAppContact = () => {
    const message = `Halo ${
      settings?.companyName || "CV ATS RentCar"
    }! Saya ingin mengetahui lebih lanjut tentang perusahaan dan layanan Anda.`;
    window.open(
      `https://wa.me/${
        settings?.whatsapp || "6282115471992"
      }?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    // Tambahkan class overflow-x-hidden di sini untuk mencegah horizontal scroll
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* HERO SECTION */}
        <div className="text-center mb-20 relative">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Badge className="bg-lime-100 text-lime-800 px-6 py-2 text-lg mb-6">
              Tentang Kami
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900">
              Tentang{" "}
              <span className="text-lime-600">
                {settings?.companyName?.split(" ")[0] || "CV"}
              </span>{" "}
              <span className="text-blue-700">
                {settings?.companyName?.split(" ")[1] || "ATS"}{" "}
                {settings?.companyName?.split(" ")[2] || "RentCar"}
              </span>
            </h1>
            <p className="text-xl text-gray-700 font-medium max-w-4xl mx-auto leading-relaxed">
              {settings?.description ||
                "Lebih dari 8 tahun melayani kebutuhan rental mobil terbaik di Medan dan sekitarnya dengan komitmen kualitas dan kepuasan pelanggan"}
            </p>
          </div>
        </div>

        {/* ANIMATED STATS */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[
            {
              number: counters.years,
              suffix: "+",
              label: "Tahun Pengalaman",
              icon: Award,
              color: "lime",
            },
            {
              number: counters.customers,
              suffix: "+",
              label: "Pelanggan Puas",
              icon: Users,
              color: "blue",
            },
            {
              number: counters.cars,
              suffix: "",
              label: "Armada Premium",
              icon: Car,
              color: "purple",
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className="text-center hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              // Fix: Tambahkan style={{}} untuk menghandle animasi di JSX
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div
                  className={`p-4 rounded-full bg-${stat.color}-100 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`w-10 h-10 text-${stat.color}-600`} />
                </div>
                <div
                  className={`text-4xl font-bold mb-2 text-${stat.color}-600`}
                >
                  {stat.number}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* COMPANY TIMELINE */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Perjalanan <span className="text-lime-600">Perusahaan</span>
          </h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-lime-400 to-blue-600"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  } transition-all duration-500 ${
                    activeTimeline === index || hoveredTimeline === index
                      ? "scale-105"
                      : "scale-100"
                  }`}
                  onMouseEnter={() => setHoveredTimeline(index)}
                  onMouseLeave={() => setHoveredTimeline(null)}
                >
                  <div
                    className={`w-1/2 ${
                      index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"
                    }`}
                  >
                    <Card
                      className={`${
                        activeTimeline === index
                          ? "shadow-2xl border-2 border-lime-400"
                          : "shadow-lg"
                      } transition-all duration-500 hover:shadow-xl`}
                    >
                      <CardContent className="p-6">
                        <Badge
                          className={`bg-${item.color}-100 text-${item.color}-800 mb-4`}
                        >
                          {item.year}
                        </Badge>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-full border-4 border-white shadow-lg z-10 ${
                      activeTimeline === index
                        ? "bg-lime-500 scale-125"
                        : "bg-gray-400"
                    } transition-all duration-500`}
                  ></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VISION MISSION VALUES */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: Eye,
              title: "Visi",
              content:
                "Menjadi penyedia jasa rental mobil terdepan di Sumatera Utara dengan standar pelayanan internasional",
              color: "blue",
            },
            {
              icon: Target,
              title: "Misi",
              content:
                "Memberikan layanan rental mobil berkualitas tinggi dengan harga terjangkau dan kepuasan pelanggan sebagai prioritas utama",
              color: "lime",
            },
            {
              icon: Heart,
              title: "Values",
              content:
                "Integritas, Profesionalisme, Inovasi, dan Komitmen untuk memberikan yang terbaik bagi setiap pelanggan",
              color: "purple",
            },
          ].map((item, index) => (
            <Card
              key={index}
              className="relative overflow-hidden group hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <CardContent className="p-8 text-center relative z-10">
                <div
                  className={`p-4 rounded-full bg-${item.color}-100 w-20 h-20 mx-auto mb-6 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <item.icon className={`w-10 h-10 text-${item.color}-600`} />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* ACHIEVEMENTS - NO IMAGES */}
        <div className="bg-gradient-to-r from-lime-50 to-blue-50 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Pencapaian <span className="text-lime-600">Kami</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Award,
                title: "Best Service 2023",
                desc: "Penghargaan pelayanan terbaik",
                color: "lime",
              },
              {
                icon: Shield,
                title: "ISO Certified",
                desc: "Sertifikasi standar internasional",
                color: "blue",
              },
              {
                icon: Users,
                title: "1000+ Happy Customers",
                desc: "Lebih dari 1000 pelanggan puas",
                color: "purple",
              },
              {
                icon: Car,
                title: "Premium Fleet",
                desc: "24 armada premium terawat",
                color: "emerald",
              },
            ].map((achievement, index) => (
              <div key={index} className="text-center group">
                <div
                  className={`p-4 rounded-xl bg-${achievement.color}-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:bg-${achievement.color}-200 transition-colors group-hover:scale-110 transition-transform`}
                >
                  <achievement.icon
                    className={`w-8 h-8 text-${achievement.color}-600`}
                  />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-gray-600 text-sm">{achievement.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* OFFICE LOCATION - MAIN OFFICE ONLY */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Lokasi <span className="text-lime-600">Kantor</span>
          </h2>

          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500">
              <div className="relative h-64 w-full">
                {/* Perbaikan di sini: Menghapus /public dari path gambar */}
                <Image
                  src="/images/lokasi-kantor.jpg"
                  alt={`Kantor Utama ${
                    settings?.companyName || "CV ATS RentCar"
                  }`}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <MapPin className="w-8 h-8 text-lime-600" />
                  <h3 className="text-2xl font-bold text-gray-900">
                    Kantor Utama
                  </h3>
                </div>
                <p className="text-lg text-gray-600 mb-6">
                  {settings?.address ||
                    "Jl. Pringgan No. 11 gg Bung Boniran, Medan"}
                </p>
                <div className="grid md:grid-cols-2 gap-4 text-gray-600">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-lime-600" />
                    {/* Perbaikan di sini: Menggunakan nomor telepon yang benar */}
                    <span>{settings?.phone || "+62 821 1547 1992"}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <span>Buka 24/7</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Car className="w-5 h-5 text-purple-600" />
                    <span>Showroom & Service</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                    <span>WhatsApp Ready</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA SECTION */}
        <div className="text-center bg-gradient-to-r from-lime-600 to-blue-600 rounded-3xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Siap Bergabung dengan Keluarga Besar Kami?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rasakan pengalaman rental mobil terbaik bersama{" "}
            {settings?.companyName || "CV ATS RentCar"}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleWhatsAppContact}
              size="lg"
              className="bg-white text-lime-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              HUBUNGI KAMI SEKARANG
            </Button>
            <Button
              onClick={() =>
                // Perbaikan di sini: Menggunakan nomor telepon yang benar
                window.open(`tel:${settings?.phone || "+6282115471992"}`)
              }
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-lime-600 font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              <Phone className="w-5 h-5 mr-2" />
              TELEPON LANGSUNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
