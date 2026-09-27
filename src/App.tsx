import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { ScrollToTop } from './components/common/ScrollToTop';

import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

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

    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: isTouchDevice ? 0.8 : 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !isTouchDevice,
      touchMultiplier: isTouchDevice ? 1 : 1.2,
      infinite: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(updateLenis);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#F8FBFC] text-[#0F172A] selection:bg-[#14B8A6]/20 selection:text-[#0F172A]">
        {/* Reset window scroll to top on route change */}
        <ScrollToTop />

        {/* Loading Screen Experience on Initial Mount */}
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

        {/* Global Ambient Canvas Atmosphere */}
        <CustomCursor />
        <ScrollProgress />
        <AmbientBackground />
        <IceParticlesCanvas />

        {/* Dynamic Global Navbar */}
        <Navbar
          onRequestSample={() => setIsSampleModalOpen(true)}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* Dynamic Multi-Page Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onRequestSample={() => setIsSampleModalOpen(true)}
                onOpenCalculator={() => setIsCalculatorModalOpen(true)}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductsPage
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onRequestSample={() => setIsSampleModalOpen(true)}
              />
            }
          />
          <Route
            path="/products/:id"
            element={
              <ProductDetailPage
                onRequestSample={() => setIsSampleModalOpen(true)}
              />
            }
          />
          <Route
            path="/about"
            element={
              <AboutPage
                onRequestSample={() => setIsSampleModalOpen(true)}
              />
            }
          />
          <Route
            path="/contact"
            element={<ContactPage />}
          />
          {/* Catch-all redirect to Home */}
          <Route
            path="*"
            element={
              <HomePage
                onSelectProduct={(prod) => setSelectedProduct(prod)}
                onRequestSample={() => setIsSampleModalOpen(true)}
                onOpenCalculator={() => setIsCalculatorModalOpen(true)}
              />
            }
          />
        </Routes>

        {/* Global Footer & Live Cold-Chain Telemetry */}
        <Footer
          onRequestSample={() => setIsSampleModalOpen(true)}
          onOpenCalculator={() => setIsCalculatorModalOpen(true)}
        />

        {/* Global Interactive Modals */}
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
    </BrowserRouter>
  );
}

export default App;
