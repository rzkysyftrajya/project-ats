"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, GitCompareArrows } from "lucide-react"
import type { FleetCar } from "@/lib/fleet"

interface ComparisonBarProps {
  cars: FleetCar[]
  onCompare: () => void
  onRemove: (carId: string) => void
  onClear: () => void
}

export function ComparisonBar({ cars, onCompare, onRemove, onClear }: ComparisonBarProps) {
  if (cars.length === 0) return null

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50">
      <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-xl shadow-2xl p-3 sm:p-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto flex-grow">
          <span className="hidden sm:block font-semibold text-gray-700 flex-shrink-0">Bandingkan:</span>
          {cars.map((car) => (
            <div key={car.id} className="relative flex-shrink-0 bg-gray-100 rounded-lg p-1 flex items-center gap-2">
              <div className="w-12 h-8 sm:w-16 sm:h-10 relative">
                <Image src={car.image || "/placeholder.svg"} alt={car.name} layout="fill" objectFit="contain" />
              </div>
              <div className="hidden md:block pr-6">
                <p className="text-sm font-medium text-gray-800 leading-tight">{car.name}</p>
              </div>
              <button
                onClick={() => onRemove(car.id)}
                className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full p-0.5 hover:bg-red-500 transition-colors"
                aria-label={`Hapus ${car.name} dari perbandingan`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <Button onClick={onCompare} disabled={cars.length < 2} className="bg-emerald-600 hover:bg-emerald-700">
            <GitCompareArrows className="w-4 h-4 mr-2" />
            Bandingkan ({cars.length})
          </Button>
          <Button variant="ghost" size="icon" onClick={onClear} aria-label="Hapus semua perbandingan">
            <X className="w-5 h-5 text-gray-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}
