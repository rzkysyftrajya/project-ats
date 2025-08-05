"use client"

import { CardTitle, CardDescription } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { UserCheck, ShieldCheck, MapPin } from "lucide-react"

interface BookingOptionsSelectionProps {
  options: {
    withDriver: boolean
    fullInsurance: boolean
    gps: boolean
  }
  onOptionChange: (data: { options: { withDriver: boolean; fullInsurance: boolean; gps: boolean } }) => void
}

export function BookingOptionsSelection({ options, onOptionChange }: BookingOptionsSelectionProps) {
  const handleCheckboxChange = (optionName: keyof typeof options) => {
    onOptionChange({
      options: {
        ...options,
        [optionName]: !options[optionName],
      },
    })
  }

  return (
    <div className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pilih Opsi Tambahan</CardTitle>
      <CardDescription className="text-gray-600">
        Sesuaikan pesanan Anda dengan layanan tambahan yang kami sediakan.
      </CardDescription>

      <div className="space-y-4">
        {/* Option: With Driver */}
        <div
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-emerald-400 transition-colors cursor-pointer"
          onClick={() => handleCheckboxChange("withDriver")}
        >
          <div className="p-3 rounded-full bg-emerald-100">
            <UserCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-grow">
            <Label htmlFor="withDriver" className="text-lg font-semibold text-gray-800 cursor-pointer">
              Dengan Driver Profesional
            </Label>
            <p className="text-sm text-gray-600">Perjalanan lebih santai dan aman dengan driver berpengalaman.</p>
          </div>
          <Checkbox
            id="withDriver"
            checked={options.withDriver}
            onCheckedChange={() => handleCheckboxChange("withDriver")}
            className="h-6 w-6 border-emerald-500 data-[state=checked]:bg-emerald-600 data-[state=checked]:text-white"
          />
        </div>

        {/* Option: Full Insurance */}
        <div
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-blue-400 transition-colors cursor-pointer"
          onClick={() => handleCheckboxChange("fullInsurance")}
        >
          <div className="p-3 rounded-full bg-blue-100">
            <ShieldCheck className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-grow">
            <Label htmlFor="fullInsurance" className="text-lg font-semibold text-gray-800 cursor-pointer">
              Asuransi Penuh (All Risk)
            </Label>
            <p className="text-sm text-gray-600">Perlindungan maksimal untuk ketenangan pikiran Anda.</p>
          </div>
          <Checkbox
            id="fullInsurance"
            checked={options.fullInsurance}
            onCheckedChange={() => handleCheckboxChange("fullInsurance")}
            className="h-6 w-6 border-blue-500 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
          />
        </div>

        {/* Option: GPS */}
        <div
          className="flex items-center space-x-4 p-4 rounded-lg border border-gray-200 hover:border-purple-400 transition-colors cursor-pointer"
          onClick={() => handleCheckboxChange("gps")}
        >
          <div className="p-3 rounded-full bg-purple-100">
            <MapPin className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-grow">
            <Label htmlFor="gps" className="text-lg font-semibold text-gray-800 cursor-pointer">
              Sistem Navigasi GPS
            </Label>
            <p className="text-sm text-gray-600">Panduan rute akurat untuk perjalanan tanpa khawatir.</p>
          </div>
          <Checkbox
            id="gps"
            checked={options.gps}
            onCheckedChange={() => handleCheckboxChange("gps")}
            className="h-6 w-6 border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
          />
        </div>
      </div>
    </div>
  )
}
