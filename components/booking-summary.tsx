"use client"

import { CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { id } from "date-fns/locale"
import Image from "next/image"
import { Car, Calendar, CheckCircle } from "lucide-react"

interface BookingSummaryProps {
  bookingData: {
    startDate: Date | null
    endDate: Date | null
    selectedCar: any | null
    options: {
      withDriver: boolean
      fullInsurance: boolean
      gps: boolean
    }
    customerName: string
    customerPhone: string
  }
  onCustomerInfoChange: (data: { customerName: string; customerPhone: string }) => void
}

export function BookingSummary({ bookingData, onCustomerInfoChange }: BookingSummaryProps) {
  const { startDate, endDate, selectedCar, options, customerName, customerPhone } = bookingData

  const formattedStartDate = startDate ? format(startDate, "PPP", { locale: id }) : "Belum dipilih"
  const formattedEndDate = endDate ? format(endDate, "PPP", { locale: id }) : "Belum dipilih"

  return (
    <div className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Ringkasan Pesanan Anda</CardTitle>
      <CardDescription className="text-gray-600">
        Periksa kembali detail pesanan Anda sebelum mengirimkan ke WhatsApp.
      </CardDescription>

      {/* Customer Info */}
      <div className="space-y-4">
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
            Nama Lengkap Anda
          </label>
          <Input
            id="customerName"
            placeholder="Masukkan nama lengkap"
            value={customerName}
            onChange={(e) => onCustomerInfoChange({ customerName: e.target.value, customerPhone })}
            className="h-10 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-2">
            Nomor Telepon Anda (WhatsApp)
          </label>
          <Input
            id="customerPhone"
            placeholder="08xxxxxxxxxx"
            value={customerPhone}
            onChange={(e) => onCustomerInfoChange({ customerName, customerPhone: e.target.value })}
            className="h-10 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
          />
        </div>
      </div>

      <Separator className="my-6" />

      {/* Booking Details */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-emerald-600" /> Detail Sewa
        </h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <p className="font-medium">Tanggal Mulai:</p>
            <p className="text-emerald-600 font-semibold">{formattedStartDate}</p>
          </div>
          <div>
            <p className="font-medium">Tanggal Selesai:</p>
            <p className="text-emerald-600 font-semibold">{formattedEndDate}</p>
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      {/* Selected Car */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <Car className="w-5 h-5 mr-2 text-blue-600" /> Mobil Pilihan
        </h3>
        {selectedCar ? (
          <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="relative w-24 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <Image
                src={selectedCar.image || "/placeholder.svg"}
                alt={selectedCar.name}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="font-bold text-lg text-gray-900">{selectedCar.name}</p>
              <p className="text-sm text-gray-600">
                {selectedCar.category.toUpperCase()} | {selectedCar.year} | {selectedCar.fuel}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-600 italic">Belum ada mobil yang dipilih.</p>
        )}
      </div>

      <Separator className="my-6" />

      {/* Selected Options */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2 text-purple-600" /> Opsi Tambahan
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-center space-x-2">
            <span className={`font-medium ${options.withDriver ? "text-emerald-600" : "text-gray-500"}`}>
              {options.withDriver ? "✅" : "❌"} Dengan Driver Profesional
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className={`font-medium ${options.fullInsurance ? "text-emerald-600" : "text-gray-500"}`}>
              {options.fullInsurance ? "✅" : "❌"} Asuransi Penuh (All Risk)
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <span className={`font-medium ${options.gps ? "text-emerald-600" : "text-gray-500"}`}>
              {options.gps ? "✅" : "❌"} Sistem Navigasi GPS
            </span>
          </li>
        </ul>
      </div>
    </div>
  )
}
