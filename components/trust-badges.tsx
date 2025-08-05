import { Shield, Users, Clock, Award, Car, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function TrustBadges() {
  const badges = [
    {
      icon: Award,
      title: "Pengalaman 8+ Tahun",
      description: "Melayani ribuan pelanggan dengan kepuasan terjamin",
      color: "emerald",
    },
    {
      icon: Clock,
      title: "Layanan 24/7",
      description: "Siap melayani Anda kapan saja, termasuk hari libur",
      color: "blue",
    },
    {
      icon: Shield,
      title: "Asuransi Lengkap",
      description: "Semua kendaraan dilengkapi asuransi comprehensive",
      color: "emerald",
    },
    {
      icon: Car,
      title: "Driver Bersertifikat",
      description: "Driver berpengalaman dengan sertifikat resmi",
      color: "blue",
    },
    {
      icon: Users,
      title: "1000+ Pelanggan Puas",
      description: "Testimoni nyata dari pelanggan yang puas",
      color: "emerald",
    },
    {
      icon: Star,
      title: "Rating 4.9/5",
      description: "Penilaian tertinggi dari pelanggan setia",
      color: "blue",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Mengapa Pilih CVATS RentCar?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kepercayaan pelanggan adalah prioritas utama kami. Inilah yang membuat kami berbeda dari yang lain.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {badges.map((badge, index) => (
            <Card
              key={index}
              className="bg-white border border-gray-200 hover:border-emerald-300 transition-all car-card text-center shadow-sm hover:shadow-md"
            >
              <CardContent className="p-8">
                <div className="p-4 rounded-full bg-emerald-100 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                  <badge.icon className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-900">{badge.title}</h3>
                <p className="text-gray-600 leading-relaxed">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
