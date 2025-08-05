"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCircle, Phone, Clock, Star } from "lucide-react";

export function CallToAction() {
  const handleWhatsAppBooking = () => {
    const message =
      "Halo CVATS RentCar! Saya ingin melakukan booking rental mobil. Mohon informasi lebih lanjut mengenai armada yang tersedia dan prosedur booking.";
    const whatsappUrl = `https://wa.me/6282115471992?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneCall = () => {
    window.open("tel:6282115471992", "_self");
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <Card className="glass-dark border-emerald-500/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <div className="mb-8">
              <h2 className="orbitron text-3xl md:text-4xl font-bold mb-6 gradient-text">
                Siap Memulai Perjalanan Anda?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Jangan tunggu lagi! Hubungi kami sekarang dan dapatkan penawaran
                terbaik untuk kebutuhan rental mobil Anda. Tim profesional kami
                siap melayani 24/7.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid md:grid-cols-4 gap-6 mb-12">
              {[
                { icon: Clock, text: "Respon Cepat", subtext: "< 5 menit" },
                { icon: Star, text: "Rating Tinggi", subtext: "4.9/5" },
                {
                  icon: MessageCircle,
                  text: "WhatsApp",
                  subtext: "24/7 Online",
                },
                { icon: Phone, text: "Telepon", subtext: "Langsung Terhubung" },
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="p-3 rounded-full bg-emerald-500/20 w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div className="font-semibold text-white text-sm">
                    {item.text}
                  </div>
                  <div className="text-emerald-400 text-xs">{item.subtext}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button
                onClick={handleWhatsAppBooking}
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-10 py-4 rounded-lg flex items-center space-x-3 pulse-glow text-lg"
              >
                <MessageCircle className="w-6 h-6" />
                <span>BOOKING VIA WHATSAPP</span>
              </Button>
              <Button
                onClick={handlePhoneCall}
                size="lg"
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/20 font-semibold px-10 py-4 rounded-lg flex items-center space-x-3 text-lg bg-transparent"
              >
                <Phone className="w-6 h-6" />
                <span>HUBUNGI LANGSUNG</span>
              </Button>
            </div>

            {/* Contact Info */}
            <div className="glass-effect rounded-xl p-6 max-w-2xl mx-auto">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="text-gray-300">+62 821-1547-1992</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <MessageCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">@atsrentalmedan_</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-emerald-500/30">
                <p className="text-emerald-400 font-semibold text-sm">
                  "Jasa Rental Mobil Terbaik dan Murah di Medan"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
