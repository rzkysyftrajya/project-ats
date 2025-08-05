// page.tsx (Versi Final & Responsif)

"use client";

import { useState, useEffect, useMemo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, SortAsc, X } from "lucide-react";
import { getAllFleet, getFleetByCategory, type FleetCar } from "@/lib/fleet";
import { CarCard } from "@/components/car-card";
import { ComparisonBar } from "@/components/comparison-bar";
import { CarComparison } from "@/components/car-comparison";

export default function ArmadaPage() {
  const [fleetData, setFleetData] = useState<FleetCar[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [priceRange, setPriceRange] = useState([0, 3000000]);
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedFuel, setSelectedFuel] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // State for comparison feature
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [showComparisonModal, setShowComparisonModal] = useState(false);

  useEffect(() => {
    const allFleet = getAllFleet();
    setFleetData(allFleet);
    setLoading(false);
  }, []);

  const filteredData = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? [...fleetData]
        : getFleetByCategory(selectedCategory);

    if (searchTerm) {
      filtered = filtered.filter(
        (car) =>
          car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          car.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((car) => {
      const priceString =
        car.manualPrice ||
        car.maticPrice ||
        car.allInPrice ||
        car.driverWithFuelPrice ||
        "0";
      const price = Number.parseInt(priceString.replace(/\D/g, ""), 10);
      return price >= priceRange[0] && price <= priceRange[1];
    });

    if (selectedYear !== "all") {
      filtered = filtered.filter((car) => car.year.toString() === selectedYear);
    }

    if (selectedFuel !== "all") {
      filtered = filtered.filter(
        (car) => car.fuel.toLowerCase() === selectedFuel.toLowerCase()
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          const priceA = Number.parseInt(
            (
              a.manualPrice ||
              a.maticPrice ||
              a.driverWithFuelPrice ||
              "9999999"
            ).replace(/\D/g, ""),
            10
          );
          const priceB = Number.parseInt(
            (
              b.manualPrice ||
              b.maticPrice ||
              b.driverWithFuelPrice ||
              "9999999"
            ).replace(/\D/g, ""),
            10
          );
          return priceA - priceB;
        case "year":
          return b.year - a.year;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.bookings - a.bookings;
      }
    });

    return filtered;
  }, [
    fleetData,
    searchTerm,
    selectedCategory,
    sortBy,
    priceRange,
    selectedYear,
    selectedFuel,
  ]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("popularity");
    setPriceRange([0, 3000000]);
    setSelectedYear("all");
    setSelectedFuel("all");
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== "all" ? selectedCategory : null,
    selectedYear !== "all" ? selectedYear : null,
    selectedFuel !== "all" ? selectedFuel : null,
    priceRange[0] > 0 || priceRange[1] < 3000000 ? "price" : null,
  ].filter(Boolean).length;

  // Comparison handlers
  const handleCompareToggle = (carId: string) => {
    setComparisonList((prev) => {
      if (prev.includes(carId)) {
        return prev.filter((id) => id !== carId);
      }
      if (prev.length < 4) {
        // Limit comparison to 4 cars
        return [...prev, carId];
      }
      // Optionally, add a toast notification here for the limit
      return prev;
    });
  };

  const comparisonCars = useMemo(
    () => fleetData.filter((car) => comparisonList.includes(car.id.toString())),
    [fleetData, comparisonList]
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 overflow-x-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-16 animate-pulse">
            <div className="h-8 bg-gray-200 rounded-full w-48 mx-auto mb-4"></div>
            <div className="h-12 bg-gray-300 rounded-md w-1/2 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-md w-2/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 12 }, (_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white rounded-2xl shadow-md p-4 space-y-4"
              >
                <div className="bg-gray-200 rounded-xl h-40"></div>
                <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>
                <div className="h-16 bg-gray-200 rounded"></div>
                <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    // Tambahkan class overflow-x-hidden di sini
    <div className="min-h-screen bg-gray-50 pt-28 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <header className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Daftar Armada Kami
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Pilih, bandingkan, dan sewa mobil terbaik di Medan. Semua unit
            terawat, bersih, dan siap pakai.
          </p>
        </header>

        {/* Enhanced Search & Filter Section */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg p-6 mb-12 border border-gray-200">
          {/* Main Search Bar */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Cari mobil berdasarkan nama atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 text-base border-gray-300 focus:border-emerald-500 focus:ring-emerald-500 rounded-xl"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mb-4">
            <Button
              variant={showFilters ? "default" : "outline"}
              onClick={() => setShowFilters(!showFilters)}
              className="h-10"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filter Lanjutan
              {activeFiltersCount > 0 && (
                <Badge className="ml-2 bg-emerald-600 text-white text-xs px-2 py-0.5">
                  {activeFiltersCount}
                </Badge>
              )}
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="h-10 text-gray-600"
              >
                <X className="w-4 h-4 mr-2" />
                Hapus Filter
              </Button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-gray-50 rounded-xl">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih Kategori" />
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tahun
                </label>
                <Select value={selectedYear} onValueChange={setSelectedYear}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2020">2020</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bahan Bakar
                </label>
                <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder="Pilih Bahan Bakar" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Jenis</SelectItem>
                    <SelectItem value="Bensin">Bensin</SelectItem>
                    <SelectItem value="Diesel">Diesel</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Urutkan
                </label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="h-10">
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Paling Populer</SelectItem>
                    <SelectItem value="price">Harga Terendah</SelectItem>
                    <SelectItem value="rating">Rating Tertinggi</SelectItem>
                    <SelectItem value="year">Tahun Terbaru</SelectItem>
                    <SelectItem value="name">Nama A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range Slider */}
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rentang Harga: Rp {priceRange[0].toLocaleString()} - Rp{" "}
                  {priceRange[1].toLocaleString()}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={3000000}
                  min={0}
                  step={50000}
                  className="w-full"
                />
              </div>
            </div>
          )}
        </div>

        <main>
          {filteredData.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredData.map((car) => (
                <CarCard
                  key={car.id}
                  car={car}
                  onCompareToggle={handleCompareToggle}
                  isCompared={comparisonList.includes(car.id.toString())}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 col-span-full">
              <div className="text-gray-300 mb-4">
                <Search className="w-24 h-24 mx-auto" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Mobil Tidak Ditemukan
              </h3>
              <p className="text-gray-500 mb-6">
                Maaf, kami tidak dapat menemukan mobil yang cocok dengan filter
                Anda.
              </p>
              <Button
                onClick={clearFilters}
                variant="outline"
                className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                Reset Semua Filter
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Container baru untuk memposisikan ComparisonBar di tengah */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center p-4">
        <ComparisonBar
          cars={comparisonCars}
          onCompare={() => setShowComparisonModal(true)}
          onRemove={handleCompareToggle}
          onClear={() => setComparisonList([])}
        />
      </div>

      <CarComparison
        cars={comparisonCars}
        isOpen={showComparisonModal}
        onClose={() => setShowComparisonModal(false)}
      />
    </div>
  );
}
