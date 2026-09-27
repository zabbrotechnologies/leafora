import React from 'react';
import type { Product } from '../types';
import { HeroSection } from '../components/sections/HeroSection';
import { FreezingMomentSection } from '../components/sections/FreezingMomentSection';
import { ProductScrollDeckSection } from '../components/sections/ProductScrollDeckSection';
import { WhyFrozenSection } from '../components/sections/WhyFrozenSection';
import { ProcessTimelineSection } from '../components/sections/ProcessTimelineSection';
import { KitchensSection } from '../components/sections/KitchensSection';
import { B2BSection } from '../components/sections/B2BSection';
import { BrandStorySection } from '../components/sections/BrandStorySection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onRequestSample: () => void;
  onOpenCalculator: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  onRequestSample,
  onOpenCalculator,
}) => {
  const scrollToProducts = () => {
    const el = document.getElementById('product-deck');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative z-20">
      {/* Chapter 01: Hero & Cryogenic Brand Entry */}
      <HeroSection
        onRequestSample={onRequestSample}
        onExploreRange={scrollToProducts}
      />

      {/* Chapter 02: -40°C Instant Phase Lock Interactive Sensor */}
      <FreezingMomentSection />

      {/* Chapter 03: Exclusive Products Scroll Showcase (Right-to-Left Single Card Scrub) */}
      <ProductScrollDeckSection
        onSelectProduct={onSelectProduct}
        onRequestSample={onRequestSample}
      />

      {/* Chapter 04: Why Leafora - 4 Value Pillars & Comparative Bio-Potency Matrix */}
      <WhyFrozenSection />

      {/* Chapter 05: The Cold-Chain Protocol - 6-Stage Process Journey */}
      <ProcessTimelineSection />

      {/* Chapter 06: For Every Kitchen - Multi-Segment Foodservice Solutions */}
      <KitchensSection
        onRequestSample={onRequestSample}
        onOpenCalculator={onOpenCalculator}
      />

      {/* Chapter 07: B2B Commercial Supply & Instant Kitchen ROI Calculator */}
      <B2BSection
        onRequestSample={onRequestSample}
        onOpenCalculator={onOpenCalculator}
      />

      {/* Chapter 08: Heritage Philosophy & Soil Stewardship */}
      <BrandStorySection onRequestSample={onRequestSample} />

      {/* Chapter 09: Final High-Converting Call to Action */}
      <FinalCtaSection
        onRequestSample={onRequestSample}
        onOpenCalculator={onOpenCalculator}
      />
    </main>
  );
};
