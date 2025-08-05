"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Car,
  UserCheck,
  MapPin,
  Mountain,
  Shield,
  Clock,
  CreditCard,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function LayananPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleWhatsAppContact = () => {
    const message =
      "Halo CVATS RentCar! Saya ingin mengetahui lebih lanjut tentang layanan rental mobil Anda.";
    const whatsappUrl = `https://wa.me/6282115471992?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const serviceTypes = [
    {
      title: "Lepas Kunci",
      icon: Car,
      description:
        "Sewa mobil tanpa driver, bebas kemana saja dengan fleksibilitas penuh",
      features: [
        "Kebebasan mengemudi sendiri",
        "Fleksibilitas waktu dan rute",
        "Harga lebih ekonomis",
        "Cocok untuk perjalanan pribadi",
      ],
      color: "emerald",
    },
    {
      title: "Dengan Driver",
      icon: UserCheck,
      description:
        "Driver berpengalaman dan bersertifikat untuk perjalanan yang santai dan aman",
      features: [
        "Driver berpengalaman bersertifikat",
        "Mengenal rute dan destinasi lokal",
        "Perjalanan lebih santai dan aman",
        "Cocok untuk wisata dan bisnis",
      ],
      color: "blue",
    },
    {
      title: "Antar Jemput",
      icon: MapPin,
      description:
        "Layanan pickup profesional ke bandara, hotel, atau lokasi yang Anda tentukan",
      features: [
        "Pickup ke bandara Kualanamu",
        "Antar ke hotel dan destinasi",
        "Tepat waktu dan profesional",
        "Tersedia 24/7",
      ],
      color: "emerald",
    },
    {
      title: "Paket Wisata",
      icon: Mountain,
      description:
        "Paket lengkap untuk destinasi wisata populer di Sumatera Utara",
      features: [
        "Danau Toba dan Pulau Samosir",
        "Berastagi dan Gunung Sinabung",
        "Silangit dan sekitarnya",
        "Paket custom sesuai keinginan",
      ],
      color: "blue",
    },
  ];

  return (
    <div className="min-h-screen pt-20 pb-16 overflow-x-hidden">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Layanan Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Berbagai pilihan layanan rental mobil yang fleksibel sesuai
            kebutuhan perjalanan Anda
          </p>
        </div>

        {/* Service Types */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {[...serviceTypes].map((service, index) => (
            <Card
              key={index}
              className={`glass-dark border-${
                service.color
              }-500/30 hover:border-${
                service.color
              }-400/50 transition-all car-card transform ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-8 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transitionDuration: "800ms",
              }}
            >
              <CardHeader>
                <div
                  className={`p-4 rounded-full bg-${service.color}-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}
                >
                  <service.icon
                    className={`w-8 h-8 text-${service.color}-600`}
                  />
                </div>
                <CardTitle
                  className={`orbitron text-2xl text-center text-${service.color}-600`}
                >
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 text-center">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <CheckCircle
                        className={`w-5 h-5 text-${service.color}-600 flex-shrink-0`}
                      />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Terms & Conditions */}
        <div className="glass-dark rounded-2xl p-8 mb-16">
          <h2 className="orbitron text-3xl font-bold text-center mb-8 gradient-text">
            Syarat & Ketentuan
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-emerald-600 mb-4 flex items-center">
                <Shield className="w-6 h-6 mr-2" />
                Persyaratan Umum
              </h3>
              <ul className="space-y-3">
                {[
                  "KTP/SIM yang masih berlaku",
                  "Deposit sesuai kategori mobil",
                  "Minimal sewa 1 hari",
                  "Area coverage Medan dan sekitarnya",
                  "Usia minimal 21 tahun untuk lepas kunci",
                ].map((requirement, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-gray-600">{requirement}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4 flex items-center">
                <CreditCard className="w-6 h-6 mr-2" />
                Ketentuan Pembayaran
              </h3>
              <ul className="space-y-3">
                {[
                  "DP minimal 50% untuk booking",
                  "Pelunasan sebelum pengambilan mobil",
                  "Deposit dikembalikan setelah mobil kembali",
                  "Pembayaran cash atau transfer",
                  "Biaya BBM ditanggung penyewa",
                ].map((payment, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-600">{payment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Service Guarantees */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: "Asuransi Lengkap",
              description:
                "Semua kendaraan dilengkapi asuransi comprehensive untuk keamanan perjalanan Anda",
            },
            {
              icon: Clock,
              title: "Layanan 24/7",
              description:
                "Tim customer service kami siap melayani Anda kapan saja, termasuk hari libur",
            },
            {
              icon: Car,
              title: "Armada Terawat",
              description:
                "Perawatan rutin dan pengecekan berkala memastikan kondisi kendaraan prima",
            },
          ].map((guarantee, index) => (
            <Card
              key={index}
              className="glass-effect border-emerald-500/30 text-center hover:border-emerald-400/50 transition-all"
            >
              <CardContent className="p-6">
                <div className="p-4 rounded-full bg-emerald-500/20 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <guarantee.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-3">
                  {guarantee.title}
                </h3>
                <p className="text-gray-600 text-sm">{guarantee.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="glass-dark rounded-2xl p-8 text-center">
          <h2 className="orbitron text-3xl font-bold mb-4 gradient-text">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan dapatkan penawaran
            terbaik untuk kebutuhan rental mobil Anda
          </p>
          <Button
            onClick={handleWhatsAppContact}
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-lg flex items-center space-x-3 mx-auto pulse-glow"
          >
            <MessageCircle className="w-6 h-6" />
            <span>KONSULTASI GRATIS VIA WHATSAPP</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
