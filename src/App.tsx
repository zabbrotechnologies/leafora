import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import type { Product } from './types';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';
import { AmbientBackground } from './components/common/AmbientBackground';
import { IceParticlesCanvas } from './components/common/IceParticlesCanvas';
import { LoadingScreen } from './components/common/LoadingScreen';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';

import { HeroSection } from './components/sections/HeroSection';
import { FreshnessMotionSection } from './components/sections/FreshnessMotionSection';
import { FreezingMomentSection } from './components/sections/FreezingMomentSection';
import { ProductTransformationSection } from './components/sections/ProductTransformationSection';
import { ProductShowcaseSection } from './components/sections/ProductShowcaseSection';
import { WhyFrozenSection } from './components/sections/WhyFrozenSection';
import { ProcessTimelineSection } from './components/sections/ProcessTimelineSection';
import { KitchensSection } from './components/sections/KitchensSection';
import { B2BSection } from './components/sections/B2BSection';
import { BrandStorySection } from './components/sections/BrandStorySection';
import { FinalCtaSection } from './components/sections/FinalCtaSection';

import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { SampleRequestModal } from './components/modals/SampleRequestModal';
import { ColdChainCalculatorModal } from './components/modals/ColdChainCalculatorModal';

gsap.registerPlugin(ScrollTrigger);

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isSampleModalOpen, setIsSampleModalOpen] = useState(false);
  const [isCalculatorModalOpen, setIsCalculatorModalOpen] = useState(false);

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollToRange = () => {
    const el = document.getElementById('products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FBFC] text-[#0F172A] selection:bg-[#14B8A6]/20 selection:text-[#0F172A]">
      {/* 06: Loading Screen Experience */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      {/* 05: Global Ambient Atmosphere */}
      <CustomCursor />
      <ScrollProgress />
      <AmbientBackground />
      <IceParticlesCanvas />

      {/* 27: Frosted Glass Dynamic Navbar */}
      <Navbar
        onRequestSample={() => setIsSampleModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-20">
        {/* 07 & 08: Cinematic Hero & Scroll Transformation */}
        <HeroSection
          onRequestSample={() => setIsSampleModalOpen(true)}
          onExploreRange={scrollToRange}
        />

        {/* 09: Freshness in Motion (Pinned Scroll Story) */}
        <FreshnessMotionSection />

        {/* 10: Freezing Moment (Signature -40°C Phase Lock Animation) */}
        <FreezingMomentSection />

        {/* 11: Product Transformation State Machine (Raw -> Prepared -> Frozen -> Ready) */}
        <ProductTransformationSection />

        {/* 12 & 13: Product Showcase (Pinned Horizontal Gallery) */}
        <ProductShowcaseSection
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onRequestSample={() => setIsSampleModalOpen(true)}
        />

        {/* 14: Why Frozen Kinetic Typography & Scientific Matrix */}
        <WhyFrozenSection />

        {/* 15: 6-Stage Pinned Process Timeline */}
        <ProcessTimelineSection />

        {/* 16 & 17: For Every Kitchen Multi-Segment Culinary Showcase */}
        <KitchensSection onRequestSample={() => setIsSampleModalOpen(true)} />

        {/* 18: B2B & Wholesale Solutions */}
        <B2BSection
          onRequestSample={() => setIsSampleModalOpen(true)}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* 19, 20 & 21: Brand Story, Expanding Image Masks & Fullscreen Sensory Moment */}
        <BrandStorySection onRequestSample={() => setIsSampleModalOpen(true)} />

        {/* 25: High-Converting Final Call to Action */}
        <FinalCtaSection
          onRequestSample={() => setIsSampleModalOpen(true)}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />
      </main>

      {/* Footer & Live Cold-Chain Telemetry Ticker */}
      <Footer
        onRequestSample={() => setIsSampleModalOpen(true)}
        onOpenCalculator={() => setIsCalculatorModalOpen(true)}
      />

      {/* Interactive Modals */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestSample={() => setIsSampleModalOpen(true)}
      />

      <SampleRequestModal
        isOpen={isSampleModalOpen}
        onClose={() => setIsSampleModalOpen(false)}
      />

      <ColdChainCalculatorModal
        isOpen={isCalculatorModalOpen}
        onClose={() => setIsCalculatorModalOpen(false)}
        onRequestSample={() => setIsSampleModalOpen(true)}
      />
    </div>
  );
}

export default App;
