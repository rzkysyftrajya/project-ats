"use client"

import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { id } from "date-fns/locale" // Import locale for Indonesian formatting

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CardTitle, CardDescription } from "@/components/ui/card"

interface BookingDateSelectionProps {
  startDate: Date | null
  endDate: Date | null
  onDateChange: (data: { startDate: Date | null; endDate: Date | null }) => void
}

export function BookingDateSelection({ startDate, endDate, onDateChange }: BookingDateSelectionProps) {
  return (
    <div className="space-y-6 p-6">
      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">Pilih Tanggal Sewa</CardTitle>
      <CardDescription className="text-gray-600">Tentukan periode sewa mobil Anda.</CardDescription>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Start Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Mulai</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-12 text-base",
                  !startDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {startDate ? format(startDate, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={startDate || undefined}
                onSelect={(date) => onDateChange({ startDate: date || null, endDate })}
                initialFocus
                locale={id}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* End Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal Selesai</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-12 text-base",
                  !endDate && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                {endDate ? format(endDate, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={endDate || undefined}
                onSelect={(date) => onDateChange({ startDate, endDate: date || null })}
                initialFocus
                locale={id}
                // Disable dates before start date
                disabled={(date) => (startDate ? date < startDate : false)}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  )
}
