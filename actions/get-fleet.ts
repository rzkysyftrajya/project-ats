"use server"

export interface FleetCar {
  id: number
  name: string
  category: "city" | "mpv" | "suv" | "executive" | "premium" | "luxury"
  seats: string
  fuel: string
  year: string
  features: string
  maticPrice?: string
  manualPrice?: string
  allInPrice?: string
  lepasKunci?: string
  rating: number
  bookings: number
  available: boolean
  description: string
  image: string
}

// Data armada sebagai plain object
const fleetDatabase = [
  {
    id: 1,
    name: "Toyota Avanza",
    category: "mpv" as const,
    seats: "7",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Audio System, Power Steering",
    maticPrice: "Rp 350.000",
    manualPrice: "Rp 300.000",
    rating: 4.5,
    bookings: 245,
    available: true,
    description: "MPV keluarga yang nyaman dan ekonomis untuk perjalanan bersama keluarga",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Avanza",
  },
  {
    id: 2,
    name: "Honda Brio",
    category: "city" as const,
    seats: "5",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Audio System, Central Lock",
    maticPrice: "Rp 280.000",
    manualPrice: "Rp 250.000",
    rating: 4.3,
    bookings: 189,
    available: true,
    description: "City car yang lincah dan hemat BBM untuk perjalanan dalam kota",
    image: "/placeholder.svg?height=300&width=400&text=Honda+Brio",
  },
  {
    id: 3,
    name: "Toyota Innova Reborn",
    category: "executive" as const,
    seats: "8",
    fuel: "Solar",
    year: "2023",
    features: "AC, Audio System, Captain Seat, USB Port",
    allInPrice: "Rp 650.000",
    lepasKunci: "Rp 500.000",
    rating: 4.8,
    bookings: 312,
    available: true,
    description: "MPV executive dengan kenyamanan premium dan captain seat",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Innova+Reborn",
  },
  {
    id: 4,
    name: "Toyota Fortuner",
    category: "premium" as const,
    seats: "7",
    fuel: "Solar",
    year: "2023",
    features: "AC, Audio System, 4WD, Leather Seat",
    allInPrice: "Rp 850.000",
    lepasKunci: "Rp 700.000",
    rating: 4.7,
    bookings: 156,
    available: true,
    description: "SUV tangguh untuk segala medan dengan teknologi 4WD",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Fortuner",
  },
  {
    id: 5,
    name: "Daihatsu Xenia",
    category: "mpv" as const,
    seats: "7",
    fuel: "Bensin",
    year: "2022",
    features: "AC, Audio System, Power Window",
    maticPrice: "Rp 320.000",
    manualPrice: "Rp 280.000",
    rating: 4.2,
    bookings: 198,
    available: true,
    description: "MPV ekonomis untuk keluarga dengan harga terjangkau",
    image: "/placeholder.svg?height=300&width=400&text=Daihatsu+Xenia",
  },
  {
    id: 6,
    name: "Honda Jazz",
    category: "city" as const,
    seats: "5",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Audio System, Keyless Entry",
    maticPrice: "Rp 320.000",
    manualPrice: "Rp 290.000",
    rating: 4.4,
    bookings: 167,
    available: true,
    description: "Hatchback premium dengan fitur lengkap dan desain modern",
    image: "/placeholder.svg?height=300&width=400&text=Honda+Jazz",
  },
  {
    id: 7,
    name: "Toyota Alphard",
    category: "luxury" as const,
    seats: "8",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Premium Audio, Captain Seat, Sunroof",
    allInPrice: "Rp 1.500.000",
    lepasKunci: "Rp 1.200.000",
    rating: 4.9,
    bookings: 89,
    available: true,
    description: "Luxury MPV dengan kenyamanan maksimal untuk VIP",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Alphard",
  },
  {
    id: 8,
    name: "Mitsubishi Pajero Sport",
    category: "suv" as const,
    seats: "7",
    fuel: "Solar",
    year: "2023",
    features: "AC, Audio System, 4WD, Cruise Control",
    allInPrice: "Rp 750.000",
    lepasKunci: "Rp 600.000",
    rating: 4.6,
    bookings: 134,
    available: true,
    description: "SUV premium dengan performa tinggi dan teknologi canggih",
    image: "/placeholder.svg?height=300&width=400&text=Mitsubishi+Pajero+Sport",
  },
  {
    id: 9,
    name: "Suzuki Ertiga",
    category: "mpv" as const,
    seats: "7",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Audio System, Airbag",
    maticPrice: "Rp 340.000",
    manualPrice: "Rp 310.000",
    rating: 4.3,
    bookings: 223,
    available: true,
    description: "MPV compact dengan efisiensi tinggi dan interior luas",
    image: "/placeholder.svg?height=300&width=400&text=Suzuki+Ertiga",
  },
  {
    id: 10,
    name: "Honda CR-V",
    category: "suv" as const,
    seats: "5",
    fuel: "Bensin",
    year: "2023",
    features: "AC, Premium Audio, Sunroof, Leather Seat",
    allInPrice: "Rp 700.000",
    lepasKunci: "Rp 550.000",
    rating: 4.7,
    bookings: 145,
    available: true,
    description: "SUV premium dengan teknologi canggih dan kenyamanan maksimal",
    image: "/placeholder.svg?height=300&width=400&text=Honda+CR-V",
  },
  {
    id: 11,
    name: "Toyota Hiace",
    category: "luxury" as const,
    seats: "16",
    fuel: "Solar",
    year: "2023",
    features: "AC, Audio System, Comfortable Seat",
    allInPrice: "Rp 900.000",
    lepasKunci: "Rp 750.000",
    rating: 4.5,
    bookings: 78,
    available: true,
    description: "Bus mini untuk group travel dengan kapasitas besar",
    image: "/placeholder.svg?height=300&width=400&text=Toyota+Hiace",
  },
  {
    id: 12,
    name: "Daihatsu Ayla",
    category: "city" as const,
    seats: "5",
    fuel: "Bensin",
    year: "2022",
    features: "AC, Audio System",
    maticPrice: "Rp 260.000",
    manualPrice: "Rp 230.000",
    rating: 4.1,
    bookings: 156,
    available: true,
    description: "City car ekonomis dan praktis untuk perjalanan sehari-hari",
    image: "/placeholder.svg?height=300&width=400&text=Daihatsu+Ayla",
  },
]

export async function getFleetData(): Promise<FleetCar[]> {
  // Simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Return plain object dengan JSON parse/stringify untuk memastikan tidak ada reference
  return JSON.parse(JSON.stringify(fleetDatabase))
}

export async function getFeaturedFleet(): Promise<FleetCar[]> {
  // Simulasi delay API
  await new Promise((resolve) => setTimeout(resolve, 100))

  // Ambil 6 mobil terpopuler berdasarkan bookings
  const sortedFleet = [...fleetDatabase].sort((a, b) => b.bookings - a.bookings)
  const featured = sortedFleet.slice(0, 6)

  // Return plain object dengan JSON parse/stringify
  return JSON.parse(JSON.stringify(featured))
}

export async function getFleetById(id: number): Promise<FleetCar | null> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  const car = fleetDatabase.find((car) => car.id === id)
  if (!car) return null

  // Return plain object
  return JSON.parse(JSON.stringify(car))
}

export async function getFleetByCategory(category: string): Promise<FleetCar[]> {
  await new Promise((resolve) => setTimeout(resolve, 100))

  let filtered
  if (category === "all") {
    filtered = [...fleetDatabase]
  } else {
    filtered = fleetDatabase.filter((car) => car.category === category)
  }

  // Return plain object
  return JSON.parse(JSON.stringify(filtered))
}
