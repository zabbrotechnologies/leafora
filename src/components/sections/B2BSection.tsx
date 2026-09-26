import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { B2B_SOLUTIONS } from '../../data/mockData';
import { Package, ShieldCheck, Scissors, Layers, ArrowUpRight, FileSpreadsheet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface B2BSectionProps {
  onRequestSample: () => void;
  onOpenCalculator: () => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onRequestSample, onOpenCalculator }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const bigTextRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Big background typography parallax slide
      if (bigTextRef.current) {
        gsap.fromTo(
          bigTextRef.current,
          { x: -100 },
          {
            x: 100,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.8,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Package':
        return <Package className="w-5 h-5 text-[#14B8A6]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#14B8A6]" />;
      case 'Scissors':
        return <Scissors className="w-5 h-5 text-[#14B8A6]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#14B8A6]" />;
      default:
        return <Package className="w-5 h-5 text-[#14B8A6]" />;
    }
  };

  return (
    <section
      ref={containerRef}
      id="b2b"
      className="relative w-full py-28 sm:py-36 bg-[#0F172A] text-white overflow-hidden"
    >
      {/* Background Oversized Sliding Typography */}
      <div
        ref={bigTextRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap text-[12vw] font-heading font-black tracking-tighter text-white/[0.03] select-none pointer-events-none uppercase"
      >
        BUILT FOR BUSY KITCHENS • ZERO WASTE • -40°C LOGISTICS
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-bold tracking-widest text-[#A8E6CF] uppercase mb-4">
              <span>COMMERCIAL FOODSERVICE & INDUSTRIAL SUPPLY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-white tracking-tight uppercase leading-[0.95]">
              BUILT FOR BUSY KITCHENS.
            </h2>
            <p className="text-base text-white/70 mt-4 leading-relaxed">
              Industrial reliability meets culinary precision. We provide guaranteed harvest volumes, customized ingredient cuts, private label packaging, and continuous cold-chain compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenCalculator}
              className="px-5 py-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold tracking-wide transition-all flex items-center gap-2"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#A8E6CF]" />
              <span>Yield & ROI Calculator</span>
            </button>
            <button
              onClick={onRequestSample}
              className="px-6 py-3 rounded-2xl bg-[#14B8A6] text-[#0F172A] hover:bg-[#A8E6CF] text-xs font-bold tracking-wide transition-all shadow-lg flex items-center gap-2"
            >
              <span>Wholesale Quotation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Core B2B Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {B2B_SOLUTIONS.map((solution) => (
            <div
              key={solution.code}
              className="glass-panel-dark rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#14B8A6]/50 hover:-translate-y-1.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                    {getIcon(solution.iconName)}
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest text-[#A8E6CF]">
                    {solution.code}
                  </span>
                </div>

                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {solution.title}
                </h3>
                <p className="text-xs text-white/70 leading-relaxed mb-6">
                  {solution.description}
                </p>
              </div>

              {/* Specs Checklist */}
              <div className="space-y-1.5 pt-4 border-t border-white/10 text-xs">
                {solution.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2 text-white/80">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                    <span className="text-[11px] font-mono">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Visual Bulk Infrastructure Banner */}
        <div className="rounded-3xl overflow-hidden relative aspect-[21/9] sm:aspect-[24/8] border border-white/15 shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1600&auto=format&fit=crop"
            alt="State-of-the-art cold logistics warehouse"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A] via-[#0F172A]/80 to-transparent p-6 sm:p-12 flex flex-col justify-center max-w-xl">
            <span className="text-xs font-mono font-bold text-[#A8E6CF] uppercase tracking-widest mb-1">
              GUARANTEED ANNUAL ALLOCATIONS
            </span>
            <h4 className="text-2xl sm:text-3xl font-heading font-black text-white leading-tight">
              Lock in Volume & Price Stability for 12 Months.
            </h4>
            <p className="text-xs sm:text-sm text-white/70 mt-2 mb-4">
              Eliminate volatile spot-market produce pricing. Contract directly with our cryogenic farm network.
            </p>
            <div>
              <button
                onClick={onRequestSample}
                className="px-5 py-2.5 rounded-xl bg-white text-[#0F172A] text-xs font-bold tracking-wide hover:bg-[#A8E6CF] transition-colors"
              >
                Inquire For Corporate Allocation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
