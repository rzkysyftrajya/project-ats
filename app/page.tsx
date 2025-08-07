// HomePage.tsx
import { HeroSection } from "@/components/hero-section";
import { TrustBadges } from "@/components/trust-badges";
import { StatsCounter } from "@/components/stats-counter";
import { FleetPreview } from "@/components/fleet-preview";
import { PriceCalculator } from "@/components/price-calculator";
import { WhyChooseUs } from "@/components/why-choose-us";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { FAQSection } from "@/components/faq-section";
import { CallToAction } from "@/components/call-to-action";

export default function HomePage() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* H1 untuk SEO: Judul utama halaman ini.
        Class 'sr-only' menyembunyikan H1 secara visual tapi tetap terbaca oleh Google.
        Ini adalah cara terbaik untuk memberi tahu mesin pencari keyword utama Anda tanpa merusak desain.
      */}
      <h1 className="sr-only">Rental Mobil Medan Lepas Kunci & dengan Supir | CV ATS RentCar</h1>

      <HeroSection />
      <TrustBadges />
      <StatsCounter />

      {/* H2 untuk struktur konten: Judul untuk bagian Armada.
        Judul ini akan menjadi bagian dari komponen FleetPreview,
        tapi kita bisa menambahkannya di luar untuk memastikan hierarki heading yang benar.
      */}
      <h2 className="sr-only">Armada Rental Mobil Terlengkap di Medan</h2>
      <FleetPreview />

      <h2 className="sr-only">Hitung Biaya Sewa Mobil di Medan</h2>
      <PriceCalculator />

      <h2 className="sr-only">Mengapa Memilih Kami untuk Rental Mobil di Medan?</h2>
      <WhyChooseUs />

      <h2 className="sr-only">Testimoni Pelanggan Rental Mobil Terpercaya</h2>
      <TestimonialCarousel />

      <h2 className="sr-only">Pertanyaan Umum (FAQ) Seputar Sewa Mobil Medan</h2>
      <FAQSection />

      <CallToAction />
    </div>
  );
}
