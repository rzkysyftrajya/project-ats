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
      {/* HeroSection harus memiliki H1 yang relevan dengan keyword utama */}
      <HeroSection
        title="Rental Mobil Medan Murah & Terpercaya"
        subtitle="Solusi terbaik untuk sewa mobil lepas kunci dan dengan supir di Medan. Layanan 24 jam, armada terawat, dan harga terjangkau."
      />

      {/* Bagian lainnya bisa menggunakan H2 dan H3 */}
      <TrustBadges />
      <StatsCounter />

      <h2 className="text-3xl font-bold text-center my-8">Pilihan Armada Terbaik untuk Sewa Mobil di Medan</h2>
      <FleetPreview />

      <h2 className="text-3xl font-bold text-center my-8">Hitung Biaya Rental Mobil di Medan dengan Cepat</h2>
      <PriceCalculator />

      <h2 className="text-3xl font-bold text-center my-8">Kenapa Harus Pilih Rental Mobil Kami?</h2>
      <WhyChooseUs />

      <h2 className="text-3xl font-bold text-center my-8">Testimoni Pelanggan Rental Mobil Medan</h2>
      <TestimonialCarousel />

      <h2 className="text-3xl font-bold text-center my-8">Pertanyaan Umum Seputar Sewa Mobil di Medan</h2>
      <FAQSection />
      <CallToAction />
    </div>
  );
}
