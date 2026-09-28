import React from 'react';
import { HeroSection } from '../components/sections/HeroSection';
import { MarqueeBanner } from '../components/common/MarqueeBanner';
import { BrandIntroSection } from '../components/sections/BrandIntroSection';
import { WhyFrozenSection } from '../components/sections/WhyFrozenSection';
import { ProductShowcaseSection } from '../components/sections/ProductShowcaseSection';
import { BrandStorySection } from '../components/sections/BrandStorySection';
import { TestimonialsSection } from '../components/sections/TestimonialsSection';
import { ContactSection } from '../components/sections/ContactSection';
import { FinalCtaSection } from '../components/sections/FinalCtaSection';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10">
      {/* 1. What is Leafora? Clear hero statement with Image 4 card design */}
      <HeroSection />

      {/* Subtle continuous CSS marquee divider */}
      <MarqueeBanner />

      {/* 2. What does Leafora offer? 3 core editorial pillars & brand approach */}
      <BrandIntroSection />

      {/* 3. Why does it matter? 3 verified value points & source visual */}
      <WhyFrozenSection />

      {/* 4. What products are available? Flagship harvest essentials linking to detail pages */}
      <ProductShowcaseSection />

      {/* 5. Who is behind the brand? Editorial philosophy teaser linking to /about */}
      <BrandStorySection />

      {/* 6. Verified Chef & Kitchen Reviews / Testimonials */}
      <TestimonialsSection />

      {/* 7. Direct Contact & Supply Inquiries */}
      <ContactSection />

      {/* 8. Ready to Cook Final Call to Action */}
      <FinalCtaSection />
    </main>
  );
};
