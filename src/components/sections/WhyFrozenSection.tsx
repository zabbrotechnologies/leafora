import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { COMPARISON_DATA } from '../../data/mockData';
import { CheckCircle2, XCircle, Sparkles, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const WhyFrozenSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineLeftRef = useRef<HTMLDivElement | null>(null);
  const lineRightRef = useRef<HTMLDivElement | null>(null);
  const lineCenterRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Kinetic text motion on scroll
      if (lineLeftRef.current) {
        gsap.fromTo(
          lineLeftRef.current,
          { x: -120 },
          {
            x: 60,
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

      if (lineRightRef.current) {
        gsap.fromTo(
          lineRightRef.current,
          { x: 120 },
          {
            x: -60,
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

      if (lineCenterRef.current) {
        gsap.fromTo(
          lineCenterRef.current,
          { scale: 0.9, opacity: 0.4 },
          {
            scale: 1.05,
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'center bottom',
              end: 'center center',
              scrub: 0.5,
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
      id="why-frozen"
      className="relative w-full py-28 sm:py-36 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Background Ambient Blooms */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full ambient-glow-green opacity-25 pointer-events-none" />

      {/* Kinetic Typography Banners */}
      <div className="w-full flex flex-col gap-2 pointer-events-none select-none opacity-20 overflow-hidden mb-16">
        <div
          ref={lineLeftRef}
          className="whitespace-nowrap text-6xl sm:text-8xl md:text-9xl font-heading font-black tracking-tight uppercase text-[#0F172A]"
        >
          FRESHNESS • BIOLOGICAL RETENTION • ZERO PRESERVATIVES •
        </div>
        <div
          ref={lineRightRef}
          className="whitespace-nowrap text-6xl sm:text-8xl md:text-9xl font-heading font-black tracking-tight uppercase text-[#14B8A6]"
        >
          CONVENIENCE • ZERO TRIM WASTE • CONSISTENCY 365 DAYS •
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        {/* Main Section Statement */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-bold tracking-widest text-[#0F172A] uppercase mb-4">
            <Zap className="w-3.5 h-3.5 text-[#14B8A6]" />
            <span>THE SCIENCE OF CRYOGENIC SUPERIORITY</span>
          </div>

          <h2
            ref={lineCenterRef}
            className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight uppercase leading-[1.05]"
          >
            TIME CHANGES.
            <br />
            <span className="text-gradient-ice">QUALITY DOESN'T HAVE TO.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#0F172A]/75 mt-6 leading-relaxed">
            Produce categorized as "fresh" in supermarkets was typically picked days or weeks earlier, losing up to 50% of its vitamin content during freight and display. GLACIAL™ flash-freezing captures nutrients at peak biological potency within 110 minutes of dawn harvest.
          </p>
        </div>

        {/* Interactive Comparison Table / Cards */}
        <div className="max-w-5xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pb-6 border-b border-[#B9E3F9]/60 items-center">
            <div className="md:col-span-4">
              <span className="text-xs font-mono font-bold tracking-widest text-[#0F172A]/50 uppercase">
                COMPARISON METRIC
              </span>
            </div>
            <div className="md:col-span-4 p-3 rounded-2xl bg-emerald-50/80 border border-[#A8E6CF] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#14B8A6]" />
                <span className="text-xs font-bold text-[#0F172A] uppercase font-heading">
                  GLACIAL™ -40°C IQF
                </span>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#14B8A6] bg-white px-2 py-0.5 rounded-full shadow-xs">
                SUPERIOR
              </span>
            </div>
            <div className="md:col-span-4 p-3 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="text-xs font-bold text-slate-700 uppercase font-heading">
                  7-DAY MARKET "FRESH"
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded-full">
                CONVENTIONAL
              </span>
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-[#B9E3F9]/30">
            {COMPARISON_DATA.map((row, idx) => (
              <div key={idx} className="py-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                <div className="md:col-span-4">
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    {row.metric}
                  </h4>
                </div>
                <div className="md:col-span-4 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm font-semibold text-[#0F172A]">
                    {row.iqf}
                  </span>
                </div>
                <div className="md:col-span-4 flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-slate-600">
                    {row.marketFresh}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3 Core Scientific Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-12">
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#14B8A6]/15 flex items-center justify-center text-[#14B8A6] mb-1">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="font-heading text-lg font-bold text-[#0F172A]">Micro-Crystal Formation</h4>
            <p className="text-xs text-[#0F172A]/70 leading-relaxed">
              At -40°C, ice crystals freeze in microscopic geometries under 5 microns, eliminating needle-like puncture of plant cell membranes.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#A8E6CF]/30 flex items-center justify-center text-[#0F172A] mb-1">
              <TrendingUp className="w-4 h-4 text-[#14B8A6]" />
            </div>
            <h4 className="font-heading text-lg font-bold text-[#0F172A]">Zero Vitamin Degradation</h4>
            <p className="text-xs text-[#0F172A]/70 leading-relaxed">
              Enzymatic polyphenol oxidase is instantly deactivated, preventing vitamin C loss, browning, and starch transmutation.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#B9E3F9]/40 flex items-center justify-center text-[#0F172A] mb-1">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            </div>
            <h4 className="font-heading text-lg font-bold text-[#0F172A]">100% Usable Yield</h4>
            <p className="text-xs text-[#0F172A]/70 leading-relaxed">
              Zero kitchen prep labor. Every kilogram purchased equals one kilogram cooked and served on the guest’s plate.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
