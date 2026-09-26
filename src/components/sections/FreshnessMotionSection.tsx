import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Snowflake, ShieldCheck, SunMedium } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORY_STEPS = [
  {
    word: 'Selected.',
    stepNumber: '01',
    label: 'DAWN HARVEST',
    tagline: 'Picked at the exact biological moment of peak sugar and mineral density.',
    icon: SunMedium,
    color: '#14B8A6',
    detail: 'Fields located within 50km of cryo-hub. Hand-harvested during early morning dew.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1000&auto=format&fit=crop',
  },
  {
    word: 'Prepared.',
    stepNumber: '02',
    label: 'PURE HYDRO-WASH',
    tagline: 'Washed in triple-vortex alpine spring water and gentle steam blanched.',
    icon: Sparkles,
    color: '#A8E6CF',
    detail: 'Enzymes deactivated in 45 seconds without stripping cellular color or crunch.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1000&auto=format&fit=crop',
  },
  {
    word: 'Frozen.',
    stepNumber: '03',
    label: 'CRYOGENIC IQF',
    tagline: 'Suspended in -40°C fluidized cryogenic air to freeze in individual suspension.',
    icon: Snowflake,
    color: '#B9E3F9',
    detail: 'Micro-crystals form under 5 microns, preserving cell wall turgor completely.',
    image: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=1000&auto=format&fit=crop',
  },
  {
    word: 'Preserved.',
    stepNumber: '04',
    label: 'LOCKED INTEGRITY',
    tagline: 'Zero preservatives, zero food waste, 100% ready for culinary masterpiece.',
    icon: ShieldCheck,
    color: '#14B8A6',
    detail: 'Packed under nitrogen barrier seal. 98.4% vitamin retention intact for 24 months.',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1000&auto=format&fit=crop',
  },
];

export const FreshnessMotionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const wordsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Create pinned ScrollTrigger for the 4 words progression
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=320%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const stepIndex = Math.min(
              STORY_STEPS.length - 1,
              Math.floor(self.progress * STORY_STEPS.length)
            );
            setActiveStep(stepIndex);
          },
        },
      });

      // Animate steps sequentially
      STORY_STEPS.forEach((_, i) => {
        const stepEl = container.querySelector(`.story-step-${i}`);
        if (stepEl && i > 0) {
          tl.fromTo(
            stepEl,
            {
              opacity: 0,
              y: 80,
              scale: 0.9,
              filter: 'blur(10px)',
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: 'blur(0px)',
              duration: 1,
            }
          );
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const currentData = STORY_STEPS[activeStep];
  const StepIcon = currentData.icon;

  return (
    <section
      ref={containerRef}
      id="story"
      className="relative w-full h-screen bg-[#F8FBFC] flex flex-col justify-between pt-28 pb-10 px-6 sm:px-10 md:px-14 overflow-hidden border-t border-[#B9E3F9]/30"
    >
      {/* Dynamic Background Backdrop with Image Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 opacity-15 transition-opacity duration-700">
        <img
          src={currentData.image}
          alt={currentData.label}
          className="w-full h-full object-cover filter blur-3xl scale-110 transition-all duration-1000"
        />
      </div>

      {/* Top Header Statement */}
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-4 z-20">
        <div>
          <span className="text-xs font-semibold tracking-widest text-[#14B8A6] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            Freshness In Motion • Scroll Journey
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0F172A] tracking-tight mt-1">
            Freshness doesn't stop at harvest.
          </h2>
        </div>

        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#B9E3F9]/60 shadow-xs">
          {STORY_STEPS.map((step, idx) => (
            <button
              key={step.stepNumber}
              onClick={() => setActiveStep(idx)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                activeStep === idx
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#0F172A]/50 hover:text-[#0F172A]'
              }`}
            >
              <span>{step.stepNumber}</span>
              <span className="hidden sm:inline text-[10px] uppercase">{step.word.replace('.', '')}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Center Cinematic Giant Word Transition */}
      <div
        ref={wordsContainerRef}
        className="max-w-7xl mx-auto w-full my-auto flex flex-col lg:flex-row items-center justify-between gap-8 z-20"
      >
        {/* Giant Kinetic Word */}
        <div className="flex flex-col items-start lg:w-3/5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#14B8A6]/15 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6]">
              <StepIcon className="w-4 h-4" />
            </div>
            <span className="text-xs font-semibold tracking-wider text-[#0F172A]/70 uppercase">
              Phase {currentData.stepNumber} • {currentData.label}
            </span>
          </div>

          <div className="relative overflow-hidden py-2">
            <h3
              key={currentData.word}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-heading font-black tracking-tight text-[#0F172A] uppercase leading-none transition-all duration-500"
              style={{
                background: `linear-gradient(135deg, #0F172A 30%, ${currentData.color} 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {currentData.word}
            </h3>
          </div>

          <p className="text-lg sm:text-xl text-[#0F172A]/80 font-medium max-w-xl mt-4 leading-snug">
            {currentData.tagline}
          </p>
        </div>

        {/* Right Glass Visual Card */}
        <div className="lg:w-2/5 w-full max-w-md">
          <div className="glass-panel rounded-3xl p-6 relative overflow-hidden shadow-xl">
            {/* Step Image Thumbnail */}
            <div className="w-full h-44 rounded-2xl overflow-hidden mb-5 relative">
              <img
                src={currentData.image}
                alt={currentData.label}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="font-mono font-bold text-[#A8E6CF] tracking-wider uppercase">
                  {currentData.label}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[10px]">
                  STEP {currentData.stepNumber}/04
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#0F172A]/75 leading-relaxed mb-4">
              {currentData.detail}
            </p>

            {/* Micro verification checklist */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#14B8A6] pt-3 border-t border-[#B9E3F9]/40">
              <Check className="w-4 h-4" />
              <span>Continuous Cryogenic Cold-Chain Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Timeline Bar */}
      <div className="max-w-7xl mx-auto w-full z-20">
        <div className="w-full h-1 bg-[#B9E3F9]/40 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#A8E6CF] via-[#14B8A6] to-[#B9E3F9] transition-all duration-300 ease-out"
            style={{ width: `${((activeStep + 1) / STORY_STEPS.length) * 100}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] font-mono text-[#0F172A]/50 mt-2">
          <span>01 DAWN PICK</span>
          <span>02 HYDRO-CHILL</span>
          <span>03 -40°C IQF</span>
          <span>04 TABLE READY</span>
        </div>
      </div>
    </section>
  );
};
