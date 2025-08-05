"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Car,
  Users,
  Gauge,
  Fuel,
  GitCommitHorizontal,
  Star,
  CheckCircle,
  MessageCircle,
} from "lucide-react";
import type { FleetCar } from "@/lib/fleet";

interface CarComparisonProps {
  cars: FleetCar[];
  isOpen: boolean;
  onClose: () => void;
}

export function CarComparison({ cars, isOpen, onClose }: CarComparisonProps) {
  const features = [
    { key: "image", label: "Gambar", icon: Car },
    { key: "name", label: "Model", icon: Car },
    { key: "category", label: "Kategori", icon: Car },
    { key: "price", label: "Harga", icon: Car },
    { key: "year", label: "Tahun", icon: Car },
    { key: "passengers", label: "Penumpang", icon: Users },
    { key: "engine", label: "Mesin", icon: Gauge },
    { key: "fuel", label: "BBM", icon: Fuel },
    { key: "transmission", label: "Transmisi", icon: GitCommitHorizontal },
    { key: "rating", label: "Rating", icon: Star },
    { key: "features", label: "Fitur Utama", icon: CheckCircle },
  ];

  const handleWhatsAppBooking = (car: FleetCar) => {
    const whatsAppNumber = "6282115471992";
    const urlWhatsApp = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(
      car.whatsappText
    )}`;
    window.open(urlWhatsApp, "_blank");
  };

  const renderPrice = (car: FleetCar) => {
    if (car.priceType === "all-in" && car.allInPrice) {
      return (
        <p className="font-bold text-emerald-600">{car.allInPrice}/hari</p>
      );
    }
    if (car.priceType === "lepas-kunci") {
      return (
        <div className="text-xs">
          {car.manualPrice && (
            <p>
              Manual: <span className="font-semibold">{car.manualPrice}</span>
            </p>
          )}
          {car.maticPrice && (
            <p>
              Matic: <span className="font-semibold">{car.maticPrice}</span>
            </p>
          )}
        </div>
      );
    }
    return <p>Hubungi kami</p>;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Perbandingan Mobil
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Lihat detail perbandingan antara mobil-mobil yang Anda pilih.
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-x-auto">
          {/* Desktop View */}
          <div className="hidden lg:block min-w-[1000px]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left font-semibold text-gray-600 w-[200px]">
                    Fitur
                  </th>
                  {cars.map((car) => (
                    <th key={car.id} className="p-4 border-l">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-32 h-20 relative mb-2">
                          <Image
                            src={car.image || "/placeholder.svg"}
                            alt={car.name}
                            layout="fill"
                            objectFit="contain"
                          />
                        </div>
                        <h3 className="font-bold text-gray-800">{car.name}</h3>
                        <Badge variant="secondary">{car.category}</Badge>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.slice(3).map((feature) => (
                  <tr key={feature.key} className="border-t">
                    <td className="p-4 font-medium text-gray-700">
                      {feature.label}
                    </td>
                    {cars.map((car) => (
                      <td key={car.id} className="p-4 text-center border-l">
                        {feature.key === "price" && renderPrice(car)}
                        {feature.key === "rating" && (
                          <div className="flex items-center justify-center gap-1">
                            {car.rating.toFixed(1)}{" "}
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                        )}
                        {feature.key === "features" && (
                          <ul className="text-xs text-left list-disc list-inside">
                            {car.features.slice(0, 3).map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        )}
                        {feature.key !== "price" &&
                          feature.key !== "rating" &&
                          feature.key !== "features" && (
                            <span>
                              {car[feature.key as keyof FleetCar]?.toString()}
                            </span>
                          )}
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="border-t">
                  <td className="p-4 font-medium text-gray-700"></td>
                  {cars.map((car) => (
                    <td key={car.id} className="p-4 text-center border-l">
                      <Button
                        onClick={() => handleWhatsAppBooking(car)}
                        className="w-full bg-emerald-600 hover:bg-emerald-700"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" /> Pesan
                      </Button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden p-4 space-y-6">
            {cars.map((car) => (
              <div key={car.id} className="border rounded-lg p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-16 relative flex-shrink-0">
                    <Image
                      src={car.image || "/placeholder.svg"}
                      alt={car.name}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {car.name}
                    </h3>
                    <Badge variant="secondary">{car.category}</Badge>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  {features.slice(3).map((feature) => (
                    <div
                      key={feature.key}
                      className="flex justify-between items-start"
                    >
                      <span className="font-medium text-gray-600 w-1/3">
                        {feature.label}
                      </span>
                      <div className="text-right w-2/3">
                        {feature.key === "price" && renderPrice(car)}
                        {feature.key === "rating" && (
                          <div className="flex items-center justify-end gap-1">
                            {car.rating.toFixed(1)}{" "}
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          </div>
                        )}
                        {feature.key === "features" && (
                          <ul className="text-xs text-right">
                            {car.features.map((f) => (
                              <li key={f}>{f}</li>
                            ))}
                          </ul>
                        )}
                        {feature.key !== "price" &&
                          feature.key !== "rating" &&
                          feature.key !== "features" && (
                            <span>
                              {car[feature.key as keyof FleetCar]?.toString()}
                            </span>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={() => handleWhatsAppBooking(car)}
                  className="w-full mt-4 bg-emerald-600 hover:bg-emerald-700"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Pesan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
