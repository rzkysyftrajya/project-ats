"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  MessageCircle,
  Instagram,
  Clock,
  Car,
  CheckCircle,
} from "lucide-react";

export default function KontakPage() {
  // Tambahkan state untuk form validation dan animasi
  const [isVisible, setIsVisible] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<
    "success" | "error" | null
  >(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    jenisMobil: "",
    tanggal: "",
    pesan: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for the field when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Tambahkan validation function
  const validateForm = () => {
    const errors: { [key: string]: string } = {};

    if (!formData.nama.trim()) errors.nama = "Nama wajib diisi";
    if (!formData.telepon.trim()) errors.telepon = "Nomor telepon wajib diisi";
    if (formData.telepon && !/^08\d{8,11}$/.test(formData.telepon)) {
      errors.telepon =
        "Format nomor telepon tidak valid (contoh: 081234567890)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWhatsAppSubmit = () => {
    setSubmissionStatus(null); // Reset status
    setSubmissionMessage(""); // Reset message

    if (!validateForm()) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "Mohon lengkapi semua kolom yang wajib diisi dengan benar."
      );
      return;
    }

    setIsSubmitting(true);
    const { nama, telepon, jenisMobil, tanggal, pesan } = formData;

    const message = `Halo CVATS RentCar!

Saya ingin melakukan booking rental mobil dengan detail berikut:

👤 Nama: ${nama}
📱 Telepon: ${telepon}
🚗 Jenis Mobil: ${jenisMobil || "Belum ditentukan"}
📅 Tanggal: ${tanggal || "Fleksibel"}
💬 Pesan: ${pesan || "Tidak ada pesan tambahan"}

Mohon informasi lebih lanjut mengenai ketersediaan dan prosedur booking. Terima kasih!`;

    const whatsappUrl = `https://wa.me/6282115471992?text=${encodeURIComponent(
      message
    )}`;

    try {
      window.open(whatsappUrl, "_blank");
      setSubmissionStatus("success");
      setSubmissionMessage(
        "Pesan Anda berhasil dikirim ke WhatsApp! Kami akan segera menghubungi Anda."
      );
      setFormData({
        nama: "",
        telepon: "",
        jenisMobil: "",
        tanggal: "",
        pesan: "",
      });
      setFormErrors({}); // Clear errors on success
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        "Gagal membuka WhatsApp. Pastikan aplikasi WhatsApp terinstal atau coba lagi nanti."
      );
      console.error("Failed to open WhatsApp:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="orbitron text-4xl md:text-6xl font-bold mb-6 gradient-text">
            Hubungi Kami
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Siap melayani Anda 24/7 untuk semua kebutuhan rental mobil di Medan
            dan sekitarnya
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="space-y-8">
            <Card className="glass-dark border-emerald-500/30">
              <CardHeader>
                <CardTitle className="orbitron text-2xl text-emerald-600 flex items-center">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Form Booking WhatsApp
                </CardTitle>
                <p className="text-gray-600">
                  Isi form di bawah ini dan kami akan menghubungi Anda via
                  WhatsApp
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-600 mb-2">
                      Nama Lengkap *
                    </label>
                    <Input
                      placeholder="Masukkan nama lengkap"
                      value={formData.nama}
                      onChange={(e) =>
                        handleInputChange("nama", e.target.value)
                      }
                      className={`bg-gray-800/50 border-emerald-500/50 text-gray-900 ${
                        formErrors.nama ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.nama && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.nama}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-600 mb-2">
                      Nomor Telepon *
                    </label>
                    <Input
                      placeholder="08xxxxxxxxxx"
                      value={formData.telepon}
                      onChange={(e) =>
                        handleInputChange("telepon", e.target.value)
                      }
                      className={`bg-gray-800/50 border-blue-500/50 text-gray-900 ${
                        formErrors.telepon ? "border-red-500" : ""
                      }`}
                    />
                    {formErrors.telepon && (
                      <p className="text-red-500 text-xs mt-1">
                        {formErrors.telepon}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-600 mb-2">
                    Jenis Mobil
                  </label>
                  <Select
                    value={formData.jenisMobil}
                    onValueChange={(value) =>
                      handleInputChange("jenisMobil", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-800/50 border-emerald-500/50 text-gray-900">
                      <SelectValue placeholder="Pilih jenis mobil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="city-car">
                        City Car (Honda Brio, Daihatsu Ayla)
                      </SelectItem>
                      <SelectItem value="mpv-keluarga">
                        MPV Keluarga (Avanza, Xenia, Ertiga)
                      </SelectItem>
                      <SelectItem value="suv-compact">
                        SUV Compact (XL7, Terios, Rush)
                      </SelectItem>
                      <SelectItem value="executive-mpv">
                        Executive MPV (Innova, Zenix)
                      </SelectItem>
                      <SelectItem value="premium-suv">
                        Premium SUV (Fortuner, Pajero)
                      </SelectItem>
                      <SelectItem value="luxury">
                        Luxury (Alphard, Hiace Premio)
                      </SelectItem>
                      <SelectItem value="belum-tentukan">
                        Belum Menentukan
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-600 mb-2">
                    Tanggal Sewa
                  </label>
                  <Input
                    type="date"
                    value={formData.tanggal}
                    onChange={(e) =>
                      handleInputChange("tanggal", e.target.value)
                    }
                    className="bg-gray-800/50 border-blue-500/50 text-gray-900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-emerald-600 mb-2">
                    Pesan Tambahan
                  </label>
                  <Textarea
                    placeholder="Ceritakan kebutuhan perjalanan Anda..."
                    value={formData.pesan}
                    onChange={(e) => handleInputChange("pesan", e.target.value)}
                    className="bg-gray-800/50 border-emerald-500/50 text-gray-900 min-h-[100px]"
                  />
                </div>

                <Button
                  onClick={handleWhatsAppSubmit}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 pulse-glow"
                  size="lg"
                  disabled={isSubmitting}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>
                    {isSubmitting ? "MENGIRIM..." : "KIRIM VIA WHATSAPP"}
                  </span>
                </Button>

                {submissionStatus && (
                  <div
                    className={`mt-4 p-3 rounded-lg text-center text-sm ${
                      submissionStatus === "success"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-red-100 text-red-800 border border-red-300"
                    }`}
                  >
                    {submissionMessage}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className="glass-dark border-blue-500/30">
              <CardHeader>
                <CardTitle className="orbitron text-2xl text-blue-600">
                  Informasi Kontak
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Telepon & WhatsApp",
                    content: "+62 82115471992",
                    action: () => window.open("tel:+62 82115471992"),
                    color: "emerald",
                  },
                  {
                    icon: MessageCircle,
                    title: "WhatsApp",
                    content: "Chat Langsung",
                    action: () => window.open("https://wa.me/6282115471992"),
                    color: "green",
                  },
                  {
                    icon: Instagram,
                    title: "Instagram",
                    content: "@atsrentalmedan_",
                    action: () =>
                      window.open("https://instagram.com/atsrentalmedan_"),
                    color: "pink",
                  },
                  {
                    icon: MapPin,
                    title: "Alamat",
                    content:
                      "Jl. Pringgan no 11 gg Bung Boniran Medan, Indonesia",
                    action: () =>
                      window.open("https://maps.app.goo.gl/TvxzUJ7J9w7DyGWo9"),
                    color: "blue",
                  },
                ].map((contact, index) => (
                  <div
                    key={index}
                    onClick={contact.action}
                    className="flex items-center space-x-4 p-4 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all cursor-pointer border border-gray-700/50 hover:border-emerald-500/50 group"
                  >
                    <div
                      className={`p-3 rounded-full bg-${contact.color}-500/20 group-hover:bg-${contact.color}-500/30 transition-colors`}
                    >
                      <contact.icon
                        className={`w-6 h-6 text-${contact.color}-600 group-hover:text-${contact.color}-700 transition-colors`}
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {contact.title}
                      </h3>
                      <p className="text-gray-600 text-sm">{contact.content}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Operating Hours */}
            <Card className="glass-dark border-emerald-500/30">
              <CardHeader>
                <CardTitle className="orbitron text-2xl text-emerald-600 flex items-center">
                  <Clock className="w-6 h-6 mr-2" />
                  Jam Operasional
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <Badge className="bg-emerald-500 text-white text-lg px-6 py-2 mb-4">
                    BUKA 24/7
                  </Badge>
                  <p className="text-gray-600 mb-4">
                    Kami melayani Anda setiap hari, 24 jam non-stop
                  </p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600">Senin - Minggu</span>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-gray-600">Hari Libur</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Service Areas */}
            <Card className="glass-dark border-blue-500/30">
              <CardHeader>
                <CardTitle className="orbitron text-2xl text-blue-600 flex items-center">
                  <Car className="w-6 h-6 mr-2" />
                  Area Layanan
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Medan Kota",
                    "Bandara Kualanamu",
                    "Silangit",
                    "Danau Toba",
                    "Berastagi",
                    "Parapat",
                    "Samosir",
                    "Sekitarnya",
                  ].map((area, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-gray-600 text-sm">{area}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Google Maps */}
        <div className="mt-16">
          <Card className="glass-dark border-emerald-500/30">
            <CardHeader>
              <CardTitle className="orbitron text-2xl text-center gradient-text">
                Lokasi Kami
              </CardTitle>
              <p className="text-center text-gray-600">
                JVPH+5MQ, Beringin, Kec. Beringin, Kabupaten Deli Serdang,
                Sumatera Utara 20553
              </p>
            </CardHeader>
            <CardContent>
              <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.789038391561!2d98.8793158!3d3.6355681000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30314b006e9ecc9d%3A0x5d7429661578e7d2!2sCV%20ats%20rentla%20mobil%20terpercaya!5e0!3m2!1sid!2sid!4v1754374397907!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi CVATS RentCar"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
