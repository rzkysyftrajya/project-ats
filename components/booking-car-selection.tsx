"use client"

import { useState, useEffect } from "react"
import { CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Car, CheckCircle } from "lucide-react"
import { getAllFleet, getFleetByCategory, type FleetCar } from "@/lib/fleet-data"
import { CarCard } from "@/components/car-card" // Reusing existing CarCard

interface BookingCarSelectionProps {
  selectedCar: FleetCar | null
  onCarSelect: (data: { selectedCar: FleetCar | null }) => void
}

export function BookingCarSelection({ selectedCar, onCarSelect }: BookingCarSelectionProps) {
  const [fleetData, setFleetData] = useState<FleetCar[]>([])
  const [filteredData, setFilteredData] = useState<FleetCar[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const allFleet = getAllFleet()
    setFleetData(allFleet)
    setFilteredData(allFleet)
    setLoading(false)
  }, [])

  useEffect(() => {
    let filtered = selectedCategory === "all" ? [...fleetData] : getFleetByCategory(selectedCategory)

    if (searchTerm) {
      filtered = filtered.filter((car) => car.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }
    setFilteredData(filtered)
  }, [fleetData, searchTerm, selectedCategory])

  if (loading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto"></div>
          <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <div className="h-10 bg-gray-200 rounded"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <div className="h-64 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pilih Mobil Anda</CardTitle>
      <CardDescription className="text-gray-600">
        Jelajahi armada kami dan pilih mobil yang sesuai dengan kebutuhan Anda.
      </CardDescription>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Cari mobil (e.g. Avanza)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="h-12 text-base border-gray-300 focus:ring-emerald-500">
            <Filter className="w-5 h-5 mr-2" />
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="city">City Car</SelectItem>
            <SelectItem value="mpv">MPV</SelectItem>
            <SelectItem value="suv">SUV</SelectItem>
            <SelectItem value="executive">Executive</SelectItem>
            <SelectItem value="premium">Premium</SelectItem>
            <SelectItem value="luxury">Luxury</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filteredData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredData.map((car) => (
            <div
              key={car.id}
              className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 ${
                selectedCar?.id === car.id
                  ? "border-4 border-emerald-500 shadow-lg scale-[1.02]"
                  : "border border-gray-200 hover:border-emerald-300 hover:shadow-md"
              }`}
              onClick={() => onCarSelect({ selectedCar: car })}
            >
              <CarCard car={car} />
              {selectedCar?.id === car.id && (
                <div className="absolute inset-0 flex items-center justify-center bg-emerald-500/20 text-white text-2xl font-bold">
                  <CheckCircle className="w-12 h-12 text-emerald-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Mobil Tidak Ditemukan</h3>
          <p className="text-gray-500">Coba ubah filter atau kata kunci pencarian Anda.</p>
        </div>
      )}
    </div>
  )
}
