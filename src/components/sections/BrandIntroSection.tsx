import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const BrandIntroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const watermarkRef = useRef<HTMLDivElement | null>(null);

  const pillars = [
    {
      num: '01',
      title: 'Pure Coconut Blocks',
      description:
        'Freshly extracted coastal coconut cryo-molded into ready portions. Eliminates grating and preserves sweet natural lauric oils.',
      tag: 'No Grating Needed',
    },
    {
      num: '02',
      title: 'Stone-Crushed Masala',
      description:
        'Whole ginger, peeled garlic, and green chillies crushed and frozen into calibrated cubes. Drops directly into hot oil with zero prep dishes.',
      tag: 'Melt-in-Pan Cubes',
    },
    {
      num: '03',
      title: 'Blanched Farm Greens',
      description:
        'Hand-harvested tender spinach, methi, and coriander washed in chilled streams and frozen to keep vibrant chlorophyll and mineral crunch.',
      tag: '100% Edible Yield',
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const watermark = watermarkRef.current;
    if (!section || !watermark) return;

    // Smooth horizontal parallax scroll animation on faded background text
    // Centered when the section is in view, gliding smoothly on scroll
    const ctx = gsap.context(() => {
      gsap.fromTo(
        watermark,
        { x: '5vw' },
        {
          x: '-5vw',
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
      className="relative py-20 md:py-28 bg-[#F3EFEA] border-y border-[#E4DDD4] overflow-hidden"
    >
      {/* Subtle Environmental Watermark: "LEAFORA FRESH" centered and smoothly responsive */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none z-0"
      >
        <div
          ref={watermarkRef}
          className="whitespace-nowrap font-black leading-none bg-watermark-text select-none pointer-events-none tracking-tight will-change-transform text-[clamp(2.5rem,7.2vw,7rem)] text-center px-4"
        >
          LEAFORA FRESH
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Editorial Section Introduction */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>THE LEAFORA PROMISE</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            We eliminate the compromise between real field flavor and kitchen convenience.
          </h2>
          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Everyday Indian cooking shouldn't require an hour of peeling, pounding, and cleaning before the pan even gets hot. Leafora does all the prep work at harvest so you can cook with pure ingredients in minutes.
          </p>
        </div>

        {/* 3 Editorial Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {pillars.map((pillar) => (
            <div
              key={pillar.num}
              className="flex flex-col justify-between p-8 rounded-3xl bg-[#F8F6F5] border border-[#E4DDD4] transition-transform duration-300 hover:-translate-y-1 shadow-[0_4px_20px_-2px_rgba(55,67,33,0.03)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono text-[#8DA256]">
                    {pillar.num}
                  </span>
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#8DA256]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-xl font-heading font-bold text-[#22241D]">
                  {pillar.title}
                </h3>
                <p className="text-sm text-[#575D4E] leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-5 mt-5">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#374321] hover:text-[#586E2B] transition-colors"
                >
                  <span>Explore Harvest Range</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
