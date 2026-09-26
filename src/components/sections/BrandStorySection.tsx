import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, HeartHandshake, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BrandStorySectionProps {
  onRequestSample: () => void;
}

export const BrandStorySection: React.FC<BrandStorySectionProps> = ({ onRequestSample }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageMaskRef = useRef<HTMLDivElement | null>(null);
  const fullscreenTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const imageMask = imageMaskRef.current;
    if (!container || !imageMask) return;

    const ctx = gsap.context(() => {
      // Expanding image mask on scroll
      gsap.fromTo(
        imageMask,
        {
          borderRadius: '48px',
          scale: 0.9,
        },
        {
          borderRadius: '0px',
          scale: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: imageMask,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 0.8,
          },
        }
      );

      // Fullscreen text reveal
      if (fullscreenTextRef.current) {
        gsap.fromTo(
          fullscreenTextRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: fullscreenTextRef.current,
              start: 'top 85%',
              end: 'top 45%',
              scrub: 0.6,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="brand-story"
      className="relative w-full py-28 sm:py-36 bg-[#F8FBFC] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-20">
        {/* Editorial Brand Narrative */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-6 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            <span>Our Philosophy • Leafora Fresh</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight uppercase leading-[1.05]">
            LUXURY FROZEN CUISINE.
            <br />
            <span className="text-gradient-ice">AUTHENTIC INDIAN SOUL.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 text-base text-[#0F172A]/75 leading-relaxed">
            <p>
              <strong>Leafora Fresh</strong> delivers luxury frozen cuisine, capturing authentic Indian soul using gourmet cold-press art. We believe traditional culinary heritage shouldn't demand hours of peeling, pounding, and preparation in the kitchen.
            </p>
            <p>
              Crafted with care in Mumbai and rooted in Chennai, our ready-to-melt cold-pressed cubes, blanched farm greens, and pure coastal coconut blocks dissolve straight into your pan, delivering homestyle warmth and rich depth in mere minutes.
            </p>
          </div>
      </div>

      {/* Fullscreen Expanding Image Moment (Section 20 & 21) */}
      <div
        ref={imageMaskRef}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[700px] overflow-hidden shadow-2xl transition-all duration-700 mx-auto"
      >
        <img
          src="https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?q=80&w=1800&auto=format&fit=crop"
          alt="Culinary pasta dish prepared with GLACIAL sweet peas and crisp farm vegetables"
          className="w-full h-full object-cover object-center transform scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/85 via-[#0F172A]/30 to-transparent flex items-center justify-center p-6 text-center" />

        {/* Sensory Fullscreen Text Overlay */}
        <div
          ref={fullscreenTextRef}
          className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-20"
        >
          <span className="text-xs font-mono font-bold tracking-widest text-[#A8E6CF] uppercase mb-2">
            MICHELIN-READY CULINARY PRECISION
          </span>
          <h3 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-white uppercase tracking-tight drop-shadow-2xl">
            READY WHEN YOU ARE.
          </h3>
          <p className="text-sm sm:text-base text-white/80 max-w-md mt-3 font-normal drop-shadow-md">
            Zero peeling. Zero trimming. 100% natural crunch and sweet flavor preserved at -40°C.
          </p>
        </div>
      </div>

      {/* 3 Pillars of Stewardship */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
        <div className="p-8 rounded-3xl bg-white border border-[#B9E3F9]/60 shadow-lg flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#A8E6CF]/30 flex items-center justify-center text-[#14B8A6]">
            <Leaf className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-xl font-bold text-[#0F172A]">Regenerative Soil Charter</h4>
          <p className="text-xs text-[#0F172A]/70 leading-relaxed">
            We partner with independent farming families who practice crop rotation and zero synthetic pesticide protocols.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B9E3F9]/60 shadow-lg flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#B9E3F9]/40 flex items-center justify-center text-[#14B8A6]">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-xl font-bold text-[#0F172A]">Direct Grower Contracts</h4>
          <p className="text-xs text-[#0F172A]/70 leading-relaxed">
            Fair guaranteed multi-year pricing models provide financial resilience and long-term sustainability to our farming partners.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white border border-[#B9E3F9]/60 shadow-lg flex flex-col gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#14B8A6]/20 flex items-center justify-center text-[#14B8A6]">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-heading text-xl font-bold text-[#0F172A]">Zero Landfill Packaging</h4>
          <p className="text-xs text-[#0F172A]/70 leading-relaxed">
            Our multi-barrier pouches are constructed with 100% recyclable mono-PE film, reducing environmental footprint by 40%.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-12 text-center">
        <button
          onClick={onRequestSample}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all shadow-md"
        >
          <span>Experience Our Harvest Firsthand</span>
        </button>
      </div>
    </section>
  );
};
