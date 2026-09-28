import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThermometerSnowflake, Sparkles, CheckCircle2 } from 'lucide-react';
import { FloatingIngredients } from '../common/FloatingIngredients';
import { CryoSnowfallCanvas } from '../common/CryoSnowfallCanvas';

gsap.registerPlugin(ScrollTrigger);

export const FreezingMomentSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frostLensRef = useRef<HTMLDivElement | null>(null);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const tempNumberRef = useRef<HTMLSpanElement | null>(null);
  const [freezeProgress, setFreezeProgress] = useState(0);

  const applyFreezeVisuals = (progress: number, isDesktop: boolean) => {
    setFreezeProgress(progress);

    // Animate temperature from +18.4 down to -40.0
    const currentTemp = (+18.4 - progress * (18.4 + 40.0)).toFixed(1);
    if (tempNumberRef.current) {
      tempNumberRef.current.innerText = `${currentTemp}°C`;
    }

    // Frost opacity and blur
    if (frostLensRef.current) {
      const blurPx = progress * (isDesktop ? 14 : 8);
      frostLensRef.current.style.opacity = String(progress * 0.95);
      frostLensRef.current.style.backdropFilter = `blur(${blurPx}px)`;
      // webkit prefix set directly on style (GSAP doesn't support vendor-prefixed camelCase)
      (frostLensRef.current.style as CSSStyleDeclaration & { webkitBackdropFilter: string }).webkitBackdropFilter = `blur(${blurPx}px)`;
    }

    // Headline reveal when progress > 0.35
    if (headlineRef.current) {
      const headlineOpacity = Math.max(0, (progress - 0.3) / 0.7);
      gsap.set(headlineRef.current, {
        opacity: headlineOpacity,
        y: (1 - headlineOpacity) * (isDesktop ? 25 : 12),
        scale: 0.96 + headlineOpacity * 0.04,
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        // Faster, brisker ScrollTrigger for freezing transformation
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=100%' : '+=70%',
          pin: true,
          scrub: 0.35,
          onUpdate: (self) => {
            applyFreezeVisuals(self.progress, isDesktop);
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  const handleManualSlider = (val: number) => {
    applyFreezeVisuals(val, window.innerWidth >= 1024);
  };

  return (
    <section
      ref={containerRef}
      id="freezing-moment"
      className="relative w-full min-h-screen md:h-screen bg-[#0F172A] text-white flex flex-col justify-between pt-24 md:pt-28 pb-6 md:pb-10 px-4 sm:px-10 md:px-14 overflow-hidden"
    >
      {/* Interactive Hover-Responsive Snowfall Canvas */}
      <CryoSnowfallCanvas />

      {/* Floating Parallax Cryo Ice Snowflakes */}
      <FloatingIngredients scene="freezing" />

      {/* Ambient Glacial Cold Light */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] rounded-full bg-radial from-[#14B8A6]/20 via-[#B9E3F9]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Top Header & Telemetry */}
      <div className="max-w-7xl mx-auto w-full flex flex-row items-center justify-between gap-3 z-20">
        <div className="flex items-center gap-2.5 sm:gap-3.5">
          <div className="w-2 h-2 rounded-full bg-[#14B8A6] shadow-[0_0_10px_rgba(20,184,166,0.8)] shrink-0" />
          <div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-widest text-[#A8E6CF] uppercase block">
              Signature Cryogenic Moment
            </span>
            <h2 className="text-base sm:text-2xl font-heading font-bold text-white tracking-tight">
              The -40°C Instant Phase Lock
            </h2>
          </div>
        </div>

        {/* Real-time Temperature Gauge */}
        <div className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-white/[0.06] border border-white/10 backdrop-blur-md shrink-0">
          <ThermometerSnowflake className="w-4 h-4 sm:w-5 sm:h-5 text-[#A8E6CF]" />
          <div className="flex flex-col">
            <span className="text-[8px] sm:text-[10px] font-mono tracking-widest text-white/50 uppercase">
              CORE TEMP
            </span>
            <span
              ref={tempNumberRef}
              className="text-sm sm:text-xl font-mono font-bold text-[#A8E6CF]"
            >
              +18.4°C
            </span>
          </div>
        </div>
      </div>

      {/* Centerpiece Hero Frost Glass Chamber */}
      <div className="max-w-5xl mx-auto w-full my-auto relative flex items-center justify-center z-20">
        {/* Large Product Container */}
        <div className="relative w-full max-w-2xl aspect-[16/10] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-white/20 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Base Product Image */}
          <img
            src="/images/freezing_moment_ice.jpg"
            alt="Ultra-fresh Sweet Peas in cryogenic freezing state"
            className="w-full h-full object-cover object-center transform scale-105"
          />

          {/* Translucent Frost Glass Layer with Crystalline Vignette & SVG Ice Needles */}
          <div
            ref={frostLensRef}
            className="absolute inset-0 bg-gradient-to-tr from-[#14B8A6]/30 via-white/20 to-[#B9E3F9]/40 pointer-events-none transition-all duration-75"
            style={{ opacity: 0 }}
          >
            {/* SVG Frost Crystal Geometries */}
            <svg
              className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="frost-mesh" width="80" height="80" patternUnits="userSpaceOnUse">
                  <path
                    d="M40 0 L40 80 M0 40 L80 40 M20 20 L60 60 M60 20 L20 60"
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth="0.75"
                    strokeDasharray="2 3"
                  />
                  <circle cx="40" cy="40" r="3" fill="rgba(185,227,249,0.5)" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#frost-mesh)" />
            </svg>

            {/* Frost Crystal Ring Graphics */}
            <div className="absolute inset-0 border-8 border-white/30 rounded-3xl opacity-70" />
            <div className="absolute inset-4 border border-[#B9E3F9]/40 rounded-2xl" />
            <div className="absolute top-4 left-4 text-[10px] font-mono text-[#A8E6CF] tracking-widest bg-black/60 px-3 py-1 rounded-md backdrop-blur-xs border border-white/10">
              CRYSTAL SIZE &lt; 4.8 MICRONS • ZERO CELL DAMAGE
            </div>
          </div>

          {/* Luxury Floating Editorial Message (Fades in on freeze lock) */}
          <div
            ref={headlineRef}
            className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-30 opacity-0 pointer-events-none"
          >
            <div className="px-4 py-1.5 rounded-full bg-black/70 border border-[#14B8A6]/40 text-[#A8E6CF] text-xs font-mono tracking-widest uppercase mb-3 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 inline mr-1.5" />
              CELLULAR MEMBRANE PRESERVED
            </div>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black tracking-tight text-white uppercase drop-shadow-2xl">
              LOCKED AT ITS BEST.
            </h3>
            <p className="text-sm sm:text-base text-white/85 max-w-lg mt-3 font-normal drop-shadow-md">
              Sub-second cryogenic transition freezes intercellular moisture without expanding or piercing cell walls. The biological clock stops.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Dial & Status */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-center justify-between gap-3 z-20 pt-3 border-t border-white/10">
        <div className="flex items-center gap-2.5 text-xs text-white/70">
          <CheckCircle2 className="w-4 h-4 text-[#14B8A6] shrink-0" />
          <span className="text-[11px] sm:text-xs">Scroll or drag to freeze:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={freezeProgress}
            onChange={(e) => handleManualSlider(parseFloat(e.target.value))}
            className="w-20 sm:w-28 accent-[#14B8A6] cursor-pointer"
            aria-label="Cryogenic freeze slider"
          />
        </div>

        {/* Phase State Indicators */}
        <div className="flex items-center gap-2 sm:gap-6 text-[10px] sm:text-xs font-mono">
          <span className={freezeProgress < 0.3 ? 'text-[#14B8A6] font-bold' : 'text-white/40'}>
            01 AMBIENT
          </span>
          <span className="text-white/20">→</span>
          <span
            className={
              freezeProgress >= 0.3 && freezeProgress < 0.7 ? 'text-[#14B8A6] font-bold' : 'text-white/40'
            }
          >
            02 BLAST
          </span>
          <span className="text-white/20">→</span>
          <span className={freezeProgress >= 0.7 ? 'text-[#A8E6CF] font-bold' : 'text-white/40'}>
            03 -40°C LOCKED
          </span>
        </div>
      </div>
    </section>
  );
};
