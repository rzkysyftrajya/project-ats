"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Fuel,
  MessageCircle,
  Star,
  Users,
  GitCompareArrows,
} from "lucide-react";
import type { FleetCar } from "@/lib/fleet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface CarCardProps {
  car: FleetCar;
  onCompareToggle?: (carId: string) => void;
  isCompared?: boolean;
}

export function CarCard({ car, onCompareToggle, isCompared }: CarCardProps) {
  const handleWhatsAppBooking = () => {
    const whatsAppNumber = "6282115471992";
    const urlWhatsApp = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      car.whatsappText
    )}`;
    window.open(urlWhatsApp, "_blank");
  };

  const renderPrice = () => {
    switch (car.priceType) {
      case "lepas-kunci":
        return (
          <div className="text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-3">
              Harga Sewa Lepas Kunci
            </p>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                <p className="font-bold text-emerald-600">Manual</p>
                <p className="text-gray-600">{car.manualPrice || "-"}</p>
              </div>
              <div className="bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                <p className="font-bold text-emerald-600">Matic</p>
                <p className="text-gray-600">{car.maticPrice || "-"}</p>
              </div>
            </div>
          </div>
        );
      case "all-in":
        return (
          <div className="text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-3">
              Harga Sewa ALL IN
            </p>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 w-full">
              <p className="text-lg font-bold text-emerald-700">
                {car.allInPrice}
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <p className="text-sm font-semibold text-emerald-600 mb-3">
              Hubungi Kami
            </p>
            <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100 w-full">
              <p className="text-lg font-bold text-emerald-700">
                Kontak untuk Harga
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border border-gray-100 flex flex-col group">
      <div className="w-full aspect-video relative">
        <Image
          src={car.image || "/placeholder.svg"}
          alt={`Sewa mobil ${car.name} di Medan`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
        {onCompareToggle && (
          <div className="absolute top-2 right-2">
            <Label
              htmlFor={`compare-${car.id}`}
              className={`flex items-center gap-2 bg-white/80 backdrop-blur-sm p-2 rounded-full cursor-pointer transition-all ${
                isCompared
                  ? "text-white bg-emerald-600"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <GitCompareArrows className="w-4 h-4" />
              <span className="text-xs font-semibold">Bandingkan</span>
              <Checkbox
                id={`compare-${car.id}`}
                checked={isCompared}
                onCheckedChange={() => onCompareToggle(car.id)}
                className="sr-only"
              />
            </Label>
          </div>
        )}
      </div>
      <div className="p-5 space-y-4 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-center text-gray-800 group-hover:text-emerald-600 transition-colors">
          {car.name}
        </h3>
        <div className="flex items-center justify-center text-yellow-500 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(car.rating) ? "fill-current" : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-sm text-gray-600">
            ({car.rating.toFixed(1)})
          </span>
        </div>
        <div className="flex-grow">{renderPrice()}</div>
        {car.driverWithFuelPrice && (
          <div className="text-center mt-4">
            <p className="text-sm font-semibold text-orange-600 mb-3">
              Mobil + Supir Include BBM
            </p>
            <div className="bg-orange-50 p-3 rounded-lg border border-orange-100 w-full">
              <p className="text-lg font-bold text-orange-700">
                {car.driverWithFuelPrice}
              </p>
            </div>
          </div>
        )}
        {!car.driverWithFuelPrice && car.note && (
          <p className="text-xs text-gray-500 text-center italic">{car.note}</p>
        )}
        <div className="flex justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full group-hover:bg-emerald-50 transition-colors">
            <Users className="w-4 h-4 text-emerald-600" />
            <span>{car.passengers}</span>
          </div>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full group-hover:bg-emerald-50 transition-colors">
            <Fuel className="w-4 h-4 text-emerald-600" />
            <span>{car.fuel}</span>
          </div>
        </div>
        <Button
          onClick={handleWhatsAppBooking}
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 group-hover:scale-[1.02] group-hover:shadow-md"
        >
          <MessageCircle className="w-5 h-5" /> Pesan via WA
        </Button>
      </div>
    </div>
  );
}
