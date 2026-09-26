import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Sparkles, Compass } from 'lucide-react';
import { FloatingIngredients } from '../common/FloatingIngredients';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onRequestSample: () => void;
  onExploreRange: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onRequestSample, onExploreRange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const heroImageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroImageRef = useRef<HTMLImageElement | null>(null);
  const headlinePart1Ref = useRef<HTMLHeadingElement | null>(null);
  const headlinePart2Ref = useRef<HTMLHeadingElement | null>(null);
  const subcopyRef = useRef<HTMLParagraphElement | null>(null);
  const ctaGroupRef = useRef<HTMLDivElement | null>(null);
  const badgesGroupRef = useRef<HTMLDivElement | null>(null);
  const ambientGlowRef = useRef<HTMLDivElement | null>(null);

  // 3D Tilt State
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = heroImageContainerRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = -(y / (rect.height / 2)) * 10;
    const ry = (x / (rect.width / 2)) * 10;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Intro timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Phase 1: Ambient glow
      tl.fromTo(
        ambientGlowRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 1.2 }
      );

      // Phase 2: Product enters from slight depth (1.08 -> 1, blur -> sharp)
      tl.fromTo(
        heroImageRef.current,
        { scale: 1.08, opacity: 0, filter: 'blur(8px)', y: 30 },
        { scale: 1, opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.3 },
        '-=0.8'
      );

      // Phase 3: Headlines staggered
      tl.fromTo(
        headlinePart1Ref.current,
        { y: 40, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.9 },
        '-=0.9'
      );

      tl.fromTo(
        headlinePart2Ref.current,
        { y: 40, opacity: 0, clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' },
        { y: 0, opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', duration: 0.9 },
        '-=0.7'
      );

      // Phase 4: Supporting copy
      tl.fromTo(
        subcopyRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        '-=0.6'
      );

      // Phase 5: CTA group & Badges
      tl.fromTo(
        [ctaGroupRef.current, badgesGroupRef.current],
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.8 },
        '-=0.5'
      );

      // Hero Scroll Transformation (Scoped to desktop to prevent mobile overlap)
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (heroImageContainerRef.current) {
          gsap.to(heroImageContainerRef.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 0.8,
            },
            y: 120,
            scale: 1.08,
            ease: 'none',
          });
        }

        if (heroContentRef.current) {
          gsap.to(heroContentRef.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '60% top',
              scrub: 0.5,
            },
            y: -60,
            opacity: 0.15,
            ease: 'none',
          });
        }

        if (ambientGlowRef.current) {
          gsap.to(ambientGlowRef.current, {
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
            scale: 1.3,
            opacity: 0.7,
          });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100vh] w-full flex items-center justify-center pt-28 pb-16 overflow-hidden"
    >
      {/* Floating Ingredient Parallax Layer */}
      <FloatingIngredients scene="hero" />

      {/* Dynamic Ambient Background Glow */}
      <div
        ref={ambientGlowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-[900px] h-[70vw] max-h-[900px] rounded-full pointer-events-none -z-10 opacity-70"
        style={{
          background:
            'radial-gradient(circle, rgba(168, 230, 207, 0.45) 0%, rgba(185, 227, 249, 0.35) 45%, rgba(248, 251, 252, 0) 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Editorial Content */}
        <div ref={heroContentRef} className="lg:col-span-7 flex flex-col gap-6 z-20">
          {/* Micro Tag / Editorial Label */}
          <div ref={badgesGroupRef} className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider uppercase text-[#0F172A] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
              <span>Gourmet Cold-Press Art • Authentic Indian Soul</span>
            </div>
          </div>

          {/* Staggered Cinematic Headlines */}
          <div className="flex flex-col">
            <h1
              ref={headlinePart1Ref}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-[#0F172A] uppercase leading-[0.92]"
            >
              LUXURY CUISINE.
            </h1>
            <h1
              ref={headlinePart2Ref}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight text-gradient-ice uppercase leading-[0.92] mt-1"
            >
              AUTHENTIC SOUL.
            </h1>
          </div>

          {/* Supporting Copy */}
          <p
            ref={subcopyRef}
            className="text-base sm:text-lg text-[#0F172A]/75 max-w-xl font-normal leading-relaxed"
          >
            <strong>Leafora Fresh</strong> delivers luxury frozen cuisine, capturing authentic Indian soul using gourmet cold-press art. 
            From stone-crushed masala cubes and rich curry base reductions to blanched farm greens and pure coastal coconut blocks.
          </p>

          {/* CTA Group */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreRange}
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#0F172A] text-white text-sm font-semibold tracking-wide shadow-[0_10px_25px_-5px_rgba(15,23,42,0.25)] hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.35)] transition-all duration-300 hover:scale-[1.02]"
            >
              <span>Explore What We Offer</span>
              <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                <ArrowRight className="w-3.5 h-3.5 text-[#A8E6CF]" />
              </div>
            </button>

            <button
              onClick={onRequestSample}
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/80 hover:bg-white text-[#0F172A] text-sm font-semibold tracking-wide border border-[#B9E3F9]/60 backdrop-blur-md shadow-xs transition-all duration-300 hover:border-[#14B8A6]/60"
            >
              <Sparkles className="w-4 h-4 text-[#14B8A6]" />
              <span>Browse Wholesale & Retail Packs</span>
            </button>
          </div>

          {/* Spec Badges Line */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#B9E3F9]/40 max-w-lg">
            <div>
              <div className="text-xl sm:text-2xl font-heading font-black text-[#0F172A]">
                30 <span className="text-xs font-mono font-medium text-[#14B8A6]">SECS</span>
              </div>
              <div className="text-[11px] text-[#0F172A]/60 font-medium">Pan Melt Time</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-heading font-black text-[#0F172A]">
                -40°C
              </div>
              <div className="text-[11px] text-[#0F172A]/60 font-medium">Cold-Press Freeze</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-heading font-black text-[#0F172A]">
                100%
              </div>
              <div className="text-[11px] text-[#0F172A]/60 font-medium">Pure Ingredients</div>
            </div>
          </div>
        </div>

        {/* Right Floating Product Hero Composition with 3D Tilt */}
        <div className="lg:col-span-5 relative flex items-center justify-center z-20">
          <div
            ref={heroImageContainerRef}
            data-cursor-type="product"
            data-cursor-label="EXPLORE"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="relative w-full max-w-[440px] aspect-square flex items-center justify-center cursor-pointer"
          >
            {/* Ambient Glass Frame */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/70 via-white/40 to-white/90 border border-white/80 shadow-[0_30px_70px_-20px_rgba(15,23,42,0.12)] backdrop-blur-xl -rotate-2 transform transition-transform duration-700" />

            {/* Inner Frost Spec Glass Tag */}
            <div className="absolute top-6 left-6 z-30 px-3.5 py-1.5 rounded-xl bg-white/90 backdrop-blur-md border border-[#B9E3F9]/60 shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-ping" />
              <span className="text-[11px] font-mono font-bold tracking-wider text-[#0F172A]">
                LEAFORA • READY-TO-MELT CUBES
              </span>
            </div>

            {/* Floating Hero Product Image */}
            <div className="relative w-[88%] h-[88%] rounded-2xl overflow-hidden shadow-[0_20px_40px_-10px_rgba(15,23,42,0.15)] z-20 bg-white">
              <img
                ref={heroImageRef}
                src="/images/masala_cubes.jpg"
                alt="Leafora Fresh Masala Cubes with ginger-garlic and green chilli aromatics"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/40 via-transparent to-white/10 pointer-events-none" />
            </div>

            {/* Floating Glass Metadata Pill Bottom */}
            <div className="absolute -bottom-4 right-4 z-30 px-4 py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-[#B9E3F9] shadow-[0_12px_24px_rgba(15,23,42,0.08)] flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-[#14B8A6]">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono font-semibold text-[#0F172A]/50 uppercase tracking-widest">
                  Cellular Structure
                </span>
                <span className="text-xs font-bold text-[#0F172A]">
                  Zero Cell Membrane Rupture
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
