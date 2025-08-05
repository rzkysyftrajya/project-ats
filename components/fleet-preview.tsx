"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { getFeaturedFleet, type FleetCar } from "@/lib/fleet"
import { CarCard } from "@/components/car-card"

export function FleetPreview() {
  const [fleetData, setFleetData] = useState<FleetCar[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      const featured = getFeaturedFleet()
      setFleetData(featured)
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-300 rounded-md w-1/2 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="w-full aspect-video bg-gray-200"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                  <div className="h-16 bg-gray-200 rounded"></div>
                  <div className="flex justify-center gap-4">
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <Badge
            variant="outline"
            className="bg-emerald-100 text-emerald-800 border-emerald-200 text-sm font-semibold px-4 py-2 rounded-full mb-4"
          >
            <Star className="w-5 h-5 mr-2 fill-emerald-600 text-emerald-600" />
            Armada Paling Populer
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Pilihan Terbaik Pelanggan
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Berikut adalah mobil-mobil yang paling sering disewa dan menjadi favorit pelanggan setia kami.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {fleetData.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-8 py-3 text-base"
          >
            <Link href="/armada">
              Lihat & Bandingkan Armada
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
