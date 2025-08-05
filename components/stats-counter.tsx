"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Car, Award, Clock } from "lucide-react"

export function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const [counts, setCounts] = useState({
    customers: 0,
    cars: 0,
    experience: 0,
    service: 0,
  })
  const sectionRef = useRef<HTMLDivElement>(null)

  const stats = [
    {
      icon: Users,
      target: 1000,
      suffix: "+",
      label: "Pelanggan Puas",
      color: "emerald",
      key: "customers",
    },
    {
      icon: Car,
      target: 24,
      suffix: "",
      label: "Armada Premium",
      color: "blue",
      key: "cars",
    },
    {
      icon: Award,
      target: 8,
      suffix: "+",
      label: "Tahun Pengalaman",
      color: "emerald",
      key: "experience",
    },
    {
      icon: Clock,
      target: 24,
      suffix: "/7",
      label: "Layanan Tersedia",
      color: "blue",
      key: "service",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return

    const animateCounters = () => {
      stats.forEach((stat) => {
        let current = 0
        const increment = stat.target / 50
        const timer = setInterval(() => {
          current += increment
          if (current >= stat.target) {
            current = stat.target
            clearInterval(timer)
          }
          setCounts((prev) => ({
            ...prev,
            [stat.key]: Math.floor(current),
          }))
        }, 40)
      })
    }

    animateCounters()
  }, [isVisible])

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="orbitron text-3xl md:text-4xl font-bold mb-6 gradient-text">Pencapaian Kami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Angka-angka yang membuktikan dedikasi dan komitmen kami dalam memberikan pelayanan terbaik
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`glass-dark border-${stat.color}-500/30 hover:border-${stat.color}-400/50 transition-all text-center car-card`}
            >
              <CardContent className="p-8">
                <div
                  className={`p-4 rounded-full bg-${stat.color}-500/20 w-16 h-16 mx-auto mb-6 flex items-center justify-center`}
                >
                  <stat.icon className={`w-8 h-8 text-${stat.color}-600`} />
                </div>
                <div className={`orbitron text-4xl font-bold mb-2 text-${stat.color}-600`}>
                  {counts[stat.key as keyof typeof counts]}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
