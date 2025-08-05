"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  Phone,
  MessageCircle,
  Instagram,
  MapPin,
  Clock,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { getSettings } from "@/lib/settings";

export function Footer() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleWhatsAppContact = () => {
    // Menggunakan data settings atau fallback default
    window.open(
      `https://wa.me/${settings?.whatsapp_number || "6282115471992"}`,
      "_blank"
    );
  };

  const handleInstagramContact = () => {
    // Menggunakan data settings atau URL hardcoded
    window.open(
      "https://www.instagram.com/atsrentalmedan_?igsh=c2FvNmkxaW1uejF1",
      "_blank"
    );
  };

  const handleTiktokContact = () => {
    // Menambahkan fungsi untuk TikTok
    window.open(
      "https://www.tiktok.com/@ats_rentcarmedan?_t=ZS-8ycDbndiE8m&_r=1",
      "_blank"
    );
  };

  return (
    <footer className="bg-gray-900 text-white border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-emerald-600">
                <Car className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">
                  {settings?.site_name || "CV ATS RentCar"}
                </div>
                <div className="text-sm text-emerald-400">
                  {settings?.site_description || "CV Anak Tunggal Sejahtera"}
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {
                "Jasa rental mobil terbaik dan murah di Medan dengan pengalaman 8+ tahun. Melayani Medan, Silangit, Danau Toba, dan sekitarnya dengan armada premium dan driver bersertifikat."
              }
            </p>
            <div className="flex space-x-4">
              <Button
                onClick={handleWhatsAppContact}
                size="sm"
                className="bg-green-600 hover:bg-green-700"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </Button>
              <Button
                onClick={handleInstagramContact}
                size="sm"
                variant="outline"
                className="border-pink-500 text-pink-400 hover:bg-pink-500/20 bg-transparent"
              >
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-6">
              Menu Utama
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Beranda" },
                { href: "/tentang", label: "Tentang Kami" },
                { href: "/armada", label: "Armada" },
                { href: "/layanan", label: "Layanan" },
                { href: "/galeri", label: "Galeri" },
                { href: "/testimoni", label: "Testimoni" },
                { href: "/kontak", label: "Kontak" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-emerald-400 transition-colors text-sm"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold text-blue-400 mb-6">
              Kontak Kami
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">
                    {"+62 821-1547-1992"}
                  </div>
                  <div className="text-gray-400 text-xs">
                    Telepon & WhatsApp
                  </div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">
                    {"cvanaktunggalsejahtera@gmail.com"}
                  </div>
                  <div className="text-gray-400 text-xs">Email Resmi</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">
                    {"Jl. Pringgan no 11 gg Bung Boniran, Medan"}
                  </div>
                  <div className="text-gray-400 text-xs">Alamat Kantor</div>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-white font-medium">24/7 Service</div>
                  <div className="text-gray-400 text-xs">
                    Selalu siap melayani
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* Payment Methods & Social Media */}
          <div>
            <h3 className="text-lg font-bold text-emerald-400 mb-6">
              Metode Pembayaran
            </h3>
            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-white font-medium mb-2">Transfer Bank</h4>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>• BCA</div>
                  <div>• Mandiri</div>
                  <div>• BRI</div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Digital Payment</h4>
                <div className="text-gray-400 text-sm space-y-1">
                  <div>• GoPay</div>
                  <div>• OVO</div>
                  <div>• DANA</div>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Tunai</h4>
                <div className="text-gray-400 text-sm">
                  Pembayaran cash saat pengambilan
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-medium mb-3">Follow Us</h4>
              <div className="flex space-x-3">
                <button
                  onClick={handleInstagramContact}
                  className="p-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors"
                  title="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </button>
                <button
                  onClick={handleTiktokContact}
                  className="p-2 bg-black hover:bg-gray-800 rounded-lg transition-colors"
                  title="TikTok"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-tiktok"
                  >
                    <path d="M9 12v6a1.5 1.5 0 0 0 1.5-1.5V11a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v5.5a1.5 1.5 0 0 0 1.5 1.5V12a6 6 0 0 0-6-6v6a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
                    <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-3v4" />
                  </svg>
                </button>
                <button
                  onClick={handleWhatsAppContact}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                  title="WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2024 {settings?.site_name || "CV ATS RentCar"}. All rights
              reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span>Pengalaman 8+ Tahun</span>
              <span>•</span>
              <span>1000+ Pelanggan Puas</span>
              <span>•</span>
              <span>Layanan 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
