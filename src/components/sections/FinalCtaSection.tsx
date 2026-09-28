import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mail } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FinalCtaSectionProps {
  onRequestSample?: () => void;
  onOpenCalculator?: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const watermark = watermarkRef.current;
    if (!section || !watermark) return;

    // Smooth horizontal parallax scroll animation on faded background text
    // Centered when the section is in view, gliding smoothly on scroll
    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermark,
        { x: '-5vw' },
        {
          x: '5vw',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-[#374321] text-[#F8F6F5] relative overflow-hidden"
    >
      {/* Subtle Environmental Watermark: "PURE HARVEST" centered and smoothly responsive */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
      >
        <div
          ref={watermarkRef}
          className="whitespace-nowrap font-black leading-none text-white/[0.045] select-none pointer-events-none tracking-tight will-change-transform text-[clamp(2.5rem,7.5vw,7.5rem)] text-center px-4"
        >
          PURE HARVEST
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 text-center relative z-10 space-y-8">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>READY TO COOK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#F8F6F5] leading-tight tracking-tight">
            Taste the difference of vegetables and aromatics frozen at harvest peak.
          </h2>
          <p className="text-base sm:text-lg text-[#DED6CC]/85 max-w-2xl mx-auto leading-relaxed">
            Zero prep waste, no chemical preservatives, and real garden flavor locked into every pack. Explore our harvest catalog or talk directly with our team.
          </p>
        </div>

        {/* Dual Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/products"
            className="px-8 py-4 rounded-full bg-[#8DA256] text-[#22241D] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#A3B86E] transition-all duration-200 shadow-lg flex items-center gap-2"
          >
            <span>Explore All Products</span>
            <ArrowUpRight className="w-4 h-4 text-[#22241D]" />
          </Link>

          <Link
            to="/contact"
            className="px-8 py-4 rounded-full bg-white/10 text-white text-xs sm:text-sm font-bold tracking-wide border border-white/20 hover:bg-white/20 transition-all duration-200 flex items-center gap-2"
          >
            <Mail className="w-4 h-4 text-[#8DA256]" />
            <span>Contact Leafora Fresh</span>
          </Link>
        </div>

        {/* Quiet Verified Reassurance */}
        <div className="pt-6 text-xs text-[#DED6CC]/60 flex items-center justify-center gap-6">
          <span>HACCP Compliant Cold-Chain</span>
          <span>•</span>
          <span>100% Usable Yield</span>
          <span>•</span>
          <span>Clean Label Guaranteed</span>
        </div>

      </div>
    </section>
  );
};
