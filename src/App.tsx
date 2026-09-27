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
import { FreezingMomentSection } from './components/sections/FreezingMomentSection';
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
    // Detect mobile touch device
    const isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

    // Initialize smooth scrolling with Lenis (desktop wheel smooth, native touch on mobile)
    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouchDevice,
      touchMultiplier: isTouchDevice ? 1 : 1.2,
      infinite: false,
    });

    // Synchronize Lenis scroll with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    // Use safe lag smoothing to prevent animation jumps
    gsap.ticker.lagSmoothing(500, 33);

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

      {/* Main Content Sections - Storytelling Chapters */}
      <main className="relative z-20">
        {/* Chapter 01: Hero & Cryogenic Phase Lock Introduction */}
        <HeroSection
          onRequestSample={() => setIsSampleModalOpen(true)}
          onExploreRange={scrollToRange}
        />

        {/* Chapter 01.5: Freezing Moment (-40°C cryogenic instant lock) */}
        <FreezingMomentSection />

        {/* Chapter 02: Dynamic Product Discovery (Dominant Featured Hero + Selector Rail) */}
        <ProductShowcaseSection
          onSelectProduct={(prod) => setSelectedProduct(prod)}
          onRequestSample={() => setIsSampleModalOpen(true)}
        />

        {/* Chapter 03: Why Leafora (4 Interactive Value Pillars + Comparative Bio-Potency Matrix) */}
        <WhyFrozenSection />

        {/* Chapter 04: Process Story (6-Stage Pinned Harvest-to-Plate Cold Chain) */}
        <ProcessTimelineSection />

        {/* Chapter 05: Who We Serve (Multi-Segment Culinary Solutions & Sample Shippers) */}
        <KitchensSection onRequestSample={() => setIsSampleModalOpen(true)} />

        {/* Chapter 06: Commercial B2B Solutions & Yield Calculator */}
        <B2BSection
          onRequestSample={() => setIsSampleModalOpen(true)}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* Chapter 07: Brand Story & Soil Stewardship */}
        <BrandStorySection onRequestSample={() => setIsSampleModalOpen(true)} />

        {/* Chapter 08: High-Converting Final Call to Action */}
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
