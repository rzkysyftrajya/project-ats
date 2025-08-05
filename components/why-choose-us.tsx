import { Card, CardContent } from "@/components/ui/card"
import {
  Shield,
  DollarSign,
  Wrench,
  UserCheck,
  Clock,
  MapPin,
  Star,
  Phone,
  Award,
  Zap,
  CheckCircle,
} from "lucide-react"

export function WhyChooseUs() {
  const reasons = [
    {
      icon: UserCheck,
      title: "Pelayanan Profesional",
      description: "Tim customer service yang responsif dan driver berpengalaman dengan sertifikat resmi",
      color: "lime",
    },
    {
      icon: DollarSign,
      title: "Harga Kompetitif",
      description: "Tarif terjangkau dengan kualitas premium, tanpa biaya tersembunyi",
      color: "blue",
    },
    {
      icon: Wrench,
      title: "Armada Terawat",
      description: "Perawatan rutin dan pengecekan berkala memastikan kondisi kendaraan selalu prima",
      color: "black",
    },
    {
      icon: Shield,
      title: "Asuransi Lengkap",
      description: "Semua kendaraan dilengkapi asuransi comprehensive untuk keamanan perjalanan",
      color: "blue",
    },
    {
      icon: Clock,
      title: "Layanan 24/7",
      description: "Siap melayani Anda kapan saja, termasuk hari libur dan situasi darurat",
      color: "lime",
    },
    {
      icon: MapPin,
      title: "Coverage Luas",
      description: "Melayani Medan, Silangit, Danau Toba, Berastagi, dan destinasi wisata lainnya",
      color: "black",
    },
    {
      icon: Star,
      title: "Rating Tinggi",
      description: "Kepuasan pelanggan terbukti dengan rating 4.9/5 dari 1000+ pelanggan",
      color: "lime",
    },
    {
      icon: Phone,
      title: "Booking Mudah",
      description: "Proses reservasi yang simpel via WhatsApp dengan konfirmasi cepat",
      color: "blue",
    },
  ]

  return (
    <section className="py-20 relative bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Mengapa Pilih CVATS RentCar?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Komitmen kami adalah memberikan pengalaman rental mobil terbaik dengan standar pelayanan tertinggi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card
              key={index}
              className={`bg-white border-2 transition-all duration-300 group ${
                reason.color === "lime"
                  ? "border-lime-200 hover:border-lime-400 hover:shadow-lime-200/50"
                  : reason.color === "blue"
                    ? "border-blue-200 hover:border-blue-400 hover:shadow-blue-200/50"
                    : "border-gray-200 hover:border-gray-400 hover:shadow-gray-200/50"
              } hover:shadow-lg hover:-translate-y-1`}
            >
              <CardContent className="p-6 text-center">
                <div
                  className={`p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center transition-colors duration-300 ${
                    reason.color === "lime"
                      ? "bg-lime-100 group-hover:bg-lime-200"
                      : reason.color === "blue"
                        ? "bg-blue-100 group-hover:bg-blue-200"
                        : "bg-gray-100 group-hover:bg-gray-200"
                  }`}
                >
                  <reason.icon
                    className={`w-8 h-8 transition-colors duration-300 ${
                      reason.color === "lime"
                        ? "text-lime-600 group-hover:text-lime-700"
                        : reason.color === "blue"
                          ? "text-blue-800 group-hover:text-blue-900"
                          : "text-gray-800 group-hover:text-gray-900"
                    }`}
                  />
                </div>
                <h3
                  className={`font-bold mb-3 transition-colors duration-300 ${
                    reason.color === "lime"
                      ? "text-lime-600 group-hover:text-lime-700"
                      : reason.color === "blue"
                        ? "text-blue-800 group-hover:text-blue-900"
                        : "text-gray-800 group-hover:text-gray-900"
                  }`}
                >
                  {reason.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Professional Trust Elements - No Emojis */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="p-4 rounded-full bg-lime-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Award className="w-8 h-8 text-lime-600" />
              </div>
              <h3 className="text-xl font-bold text-lime-600 mb-2">Penghargaan Terpercaya</h3>
              <p className="text-gray-600 text-sm">Diakui sebagai penyedia jasa rental mobil terbaik di Medan</p>
            </div>
            <div>
              <div className="p-4 rounded-full bg-blue-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-800" />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Keamanan Terjamin</h3>
              <p className="text-gray-600 text-sm">Sistem keamanan berlapis dan tracking GPS untuk semua kendaraan</p>
            </div>
            <div>
              <div className="p-4 rounded-full bg-gray-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-gray-800" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Kualitas Premium</h3>
              <p className="text-gray-600 text-sm">Armada terbaru dengan fasilitas lengkap dan interior bersih</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
