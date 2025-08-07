// HomePage.tsx (dengan overflow-x-hidden)

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
    // Tambahkan class overflow-x-hidden di sini
    <div className="min-h-screen overflow-x-hidden">
      <HeroSection />
      <TrustBadges />
      <StatsCounter />
      <FleetPreview />
      <PriceCalculator />
      <WhyChooseUs />
      <TestimonialCarousel />
      <FAQSection />
      <CallToAction />
    </div>
  );
}
