"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, CheckCircle, MessageCircle } from "lucide-react"
import { BookingDateSelection } from "@/components/booking-date-selection"
import { BookingCarSelection } from "@/components/booking-car-selection"
import { BookingOptionsSelection } from "@/components/booking-options-selection"
import { BookingSummary } from "@/components/booking-summary"
import type { FleetCar } from "@/lib/fleet-data"

export default function BookingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
    selectedCar: null as FleetCar | null,
    options: {
      withDriver: false,
      fullInsurance: false,
      gps: false,
    },
    customerName: "",
    customerPhone: "",
  })

  const totalSteps = 4

  const handleNext = () => {
    // Basic validation before moving to next step
    if (currentStep === 1) {
      if (!bookingData.startDate || !bookingData.endDate || bookingData.startDate > bookingData.endDate) {
        alert("Mohon pilih tanggal mulai dan tanggal selesai yang valid.")
        return
      }
    } else if (currentStep === 2) {
      if (!bookingData.selectedCar) {
        alert("Mohon pilih mobil terlebih dahulu.")
        return
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const updateBookingData = (newData: Partial<typeof bookingData>) => {
    setBookingData((prev) => ({ ...prev, ...newData }))
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BookingDateSelection
            startDate={bookingData.startDate}
            endDate={bookingData.endDate}
            onDateChange={updateBookingData}
          />
        )
      case 2:
        return <BookingCarSelection selectedCar={bookingData.selectedCar} onCarSelect={updateBookingData} />
      case 3:
        return <BookingOptionsSelection options={bookingData.options} onOptionChange={updateBookingData} />
      case 4:
        return <BookingSummary bookingData={bookingData} onCustomerInfoChange={updateBookingData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="orbitron text-4xl md:text-5xl font-bold mb-4 gradient-text">Pesan Mobil Anda</h1>
          <p className="text-lg text-gray-600">Ikuti 4 langkah mudah untuk memesan mobil impian Anda via WhatsApp.</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between items-center mb-8">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-all duration-300 ${
                  index + 1 <= currentStep ? "bg-emerald-600" : "bg-gray-300"
                }`}
              >
                {index + 1 < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              <span
                className={`mt-2 text-sm text-center ${
                  index + 1 <= currentStep ? "text-emerald-700 font-semibold" : "text-gray-500"
                }`}
              >
                {index === 0 && "Tanggal"}
                {index === 1 && "Mobil"}
                {index === 2 && "Opsi"}
                {index === 3 && "Ringkasan"}
              </span>
              {index < totalSteps - 1 && (
                <div
                  className={`absolute h-1 w-[calc(100%/4)] top-[calc(50%+1.25rem)] -z-10 ${
                    index + 1 < currentStep ? "bg-emerald-400" : "bg-gray-200"
                  } transition-all duration-300`}
                  style={{ left: `${(index + 0.5) * (100 / totalSteps)}%`, transform: "translateX(-50%)" }}
                />
              )}
            </div>
          ))}
        </div>

        <Card className="glass-dark border-emerald-500/30 p-6">
          <CardContent className="p-0">{renderStepContent()}</CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            variant="outline"
            className="border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-transparent"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Sebelumnya
          </Button>
          {currentStep < totalSteps ? (
            <Button onClick={handleNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Selanjutnya
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => {
                // Generate WhatsApp message
                const { startDate, endDate, selectedCar, options, customerName, customerPhone } = bookingData
                const formattedStartDate = startDate ? startDate.toLocaleDateString("id-ID") : "Tidak ditentukan"
                const formattedEndDate = endDate ? endDate.toLocaleDateString("id-ID") : "Tidak ditentukan"

                let message = `Halo CVATS RentCar! Saya ingin memesan mobil dengan detail berikut:\n\n`
                message += `👤 Nama: ${customerName || "Belum diisi"}\n`
                message += `📱 Telepon: ${customerPhone || "Belum diisi"}\n`
                message += `📅 Tanggal Sewa: ${formattedStartDate} - ${formattedEndDate}\n`
                message += `🚗 Mobil: ${selectedCar?.name || "Belum dipilih"}\n`
                message += `✨ Opsi Tambahan:\n`
                message += `- Dengan Driver: ${options.withDriver ? "Ya" : "Tidak"}\n`
                message += `- Asuransi Penuh: ${options.fullInsurance ? "Ya" : "Tidak"}\n`
                message += `- GPS: ${options.gps ? "Ya" : "Tidak"}\n\n`
                message += `Mohon konfirmasi ketersediaan dan total biaya. Terima kasih!`

                const whatsappUrl = `https://wa.me/6285207265558?text=${encodeURIComponent(message)}`
                window.open(whatsappUrl, "_blank")
              }}
              className="bg-green-600 hover:bg-green-700 text-white pulse-glow"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Kirim Pesanan via WhatsApp
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
