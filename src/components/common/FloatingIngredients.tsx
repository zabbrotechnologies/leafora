import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingIngredientsProps {
  scene?: 'hero' | 'freezing' | 'why-frozen' | 'story' | 'b2b';
}

export const FloatingIngredients: React.FC<FloatingIngredientsProps> = ({ scene = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<HTMLDivElement | null>(null);
  const mgRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Foreground parallax (Speed: 1.0)
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: -180,
          rotate: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Midground parallax (Speed: 0.6)
      if (mgRef.current) {
        gsap.to(mgRef.current, {
          y: -100,
          rotate: -18,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Background parallax (Speed: 0.25)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -45,
          rotate: 12,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  if (scene === 'hero') {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {/* Foreground: Floating Pea with frost crystal (Speed: 1.0) */}
        <div
          ref={fgRef}
          className="absolute top-[18%] right-[8%] w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg p-1.5 bg-white/40 backdrop-blur-xs border border-white/60 -rotate-12 animate-pulse"
          style={{ animationDuration: '6s' }}
        >
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#14B8A6] to-[#A8E6CF] flex items-center justify-center shadow-inner relative overflow-hidden">
            <div className="absolute top-1 left-1.5 w-3 h-2 rounded-full bg-white/70 filter blur-[0.5px]" />
            <span className="text-[10px] font-mono font-bold text-[#0F172A]/80 tracking-tighter">
              -40°C
            </span>
          </div>
        </div>

        {/* Midground: Floating Golden Sweet Corn Kernel (Speed: 0.6) */}
        <div
          ref={mgRef}
          className="absolute top-[68%] left-[2%] w-10 h-10 sm:w-12 sm:h-12 rounded-xl shadow-md p-1 bg-white/40 backdrop-blur-xs border border-white/50 rotate-12"
        >
          <div className="w-full h-full rounded-lg bg-gradient-to-tr from-amber-400 to-amber-200 flex items-center justify-center relative overflow-hidden">
            <div className="absolute top-0.5 left-1 w-2 h-1 rounded-full bg-white/70" />
            <div className="w-1.5 h-1.5 rounded-full bg-white/90" />
          </div>
        </div>

        {/* Background: Micro Ice Crystal Spec (Speed: 0.25) */}
        <div
          ref={bgRef}
          className="absolute top-[65%] right-[24%] w-8 h-8 rounded-lg bg-white/50 backdrop-blur-sm border border-[#B9E3F9] rotate-45 flex items-center justify-center opacity-60"
        >
          <div className="w-2 h-2 bg-[#14B8A6] rounded-full" />
        </div>
      </div>
    );
  }

  if (scene === 'freezing') {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {/* Floating Cryogenic Hex Crystal */}
        <div
          ref={fgRef}
          className="absolute top-[25%] left-[6%] w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-[#14B8A6]/40 flex items-center justify-center shadow-xl rotate-12"
        >
          <div className="w-6 h-6 rounded-full bg-radial from-[#A8E6CF] to-transparent animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div
          ref={mgRef}
          className="absolute bottom-[28%] right-[8%] w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 -rotate-45 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-[#B9E3F9]" />
        </div>
      </div>
    );
  }

  return null;
};
