import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Sprout, HeartHandshake } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandStorySection: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const visualRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const ethosRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Visual card entrance
      if (visualRef.current) {
        gsap.fromTo(
          visualRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: visualRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Content narrative fade up
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 3 Ethos markers stagger
      if (ethosRef.current && ethosRef.current.children.length > 0) {
        gsap.fromTo(
          ethosRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ethosRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F8F6F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Editorial Story Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Authentic Brand Story Visual */}
          <div ref={visualRef} className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E4DDD4] shadow-[0_12px_40px_-10px_rgba(55,67,33,0.08)]">
              <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden">
                <img
                  src="/images/frozen_coconut.jpg"
                  alt="Pure organic coconut harvested from coastal palms and flash-frozen"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
              </div>
              <div className="p-6 bg-white space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8DA256]">
                  COASTAL GROVES
                </span>
                <h4 className="text-base font-bold text-[#22241D]">
                  Tamil Nadu & Kerala Agricultural Belts
                </h4>
                <p className="text-xs text-[#575D4E] leading-relaxed">
                  Cold-pressed and frozen without added water, artificial emulsifiers, or sulfites.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Human Story Narrative */}
          <div ref={contentRef} className="lg:col-span-7 order-1 lg:order-2 space-y-6 sm:space-y-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
                <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
                <span>Our Philosophy</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
                Traditional cooking shouldn’t demand hours of prep before the pan gets hot.
              </h2>
            </div>

            <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
              We started Leafora Fresh with a straightforward belief: fresh food shouldn’t degrade during days of transport, and authentic homestyle cooking shouldn’t feel like a chore.
            </p>

            <p className="text-sm sm:text-base text-[#575D4E] leading-relaxed">
              By placing our cryogenic hubs in direct proximity to regional growers, we flash-freeze produce within hours of early morning picking. The cellular water locks into microscopic crystals under 5 microns, protecting cell wall crispness, natural sugars, and vitamins as if picked this morning.
            </p>

            {/* 3 Human Ethos Markers */}
            <div ref={ethosRef} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E4DDD4]">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#374321] font-bold text-sm">
                  <Sprout className="w-4 h-4 text-[#8DA256]" />
                  <span>Farm-Direct</span>
                </div>
                <p className="text-xs text-[#575D4E]">
                  Regional growers within fresh-haul radius of cryo-hubs.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#374321] font-bold text-sm">
                  <ShieldCheck className="w-4 h-4 text-[#8DA256]" />
                  <span>Clean Label</span>
                </div>
                <p className="text-xs text-[#575D4E]">
                  Zero chemical stabilizers, waxes, or artificial colors.
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[#374321] font-bold text-sm">
                  <HeartHandshake className="w-4 h-4 text-[#8DA256]" />
                  <span>Cook-Friendly</span>
                </div>
                <p className="text-xs text-[#575D4E]">
                  100% usable net weight directly ready for hot pans.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] hover:shadow-md transition-all duration-200 shadow-xs"
              >
                <span>Read Our Full Story</span>
                <ArrowUpRight className="w-4 h-4 text-[#8DA256] transform transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
