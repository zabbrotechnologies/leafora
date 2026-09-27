import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROCESS_STEPS } from '../../data/mockData';
import { ShieldCheck, ThermometerSnowflake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ProcessTimelineSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeStepIndex, setActiveStepIndex] = useState(0);

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

        // Pinned timeline with scrub
        ScrollTrigger.create({
          trigger: container,
          start: 'top top',
          end: isDesktop ? '+=350%' : '+=220%',
          pin: true,
          scrub: 0.8,
          onUpdate: (self) => {
            const stepIndex = Math.min(
              PROCESS_STEPS.length - 1,
              Math.floor(self.progress * PROCESS_STEPS.length)
            );
            setActiveStepIndex(stepIndex);
          },
        });
      }
    );

    return () => mm.revert();
  }, []);

  const currentStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full min-h-screen lg:h-screen bg-[#F8FBFC] flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-10 px-4 sm:px-10 md:px-14 overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Top Header & Section Title */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            <span>Harvest-to-Freezer Journey • 6-Step Protocol</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
            The Cryogenic Cold-Chain Protocol.
          </h2>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#B9E3F9]/60 shadow-xs">
          <ThermometerSnowflake className="w-4 h-4 text-[#14B8A6]" />
          <span className="text-xs font-mono font-bold text-[#0F172A]">
            {currentStep.coldStat}
          </span>
        </div>
      </div>

      {/* Center Interactive Stage Card */}
      <div className="max-w-7xl mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-20">
        {/* Left Visual Stage Imagery with Crossfade */}
        <div className="lg:col-span-7 relative aspect-[16/10] rounded-3xl overflow-hidden glass-panel shadow-2xl group">
          {PROCESS_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                activeStepIndex === idx
                  ? 'opacity-100 scale-100 filter-none pointer-events-auto'
                  : 'opacity-0 scale-105 filter blur-xs pointer-events-none'
              }`}
            >
              <img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-black/20" />

              {/* Step Stamp inside image */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
                <span className="px-3.5 py-1.5 rounded-xl bg-[#0F172A]/85 backdrop-blur-md text-[#A8E6CF] font-mono text-xs font-bold border border-white/20">
                  STAGE {step.step} / 06
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-white/80 backdrop-blur-md text-[#0F172A] font-bold text-xs uppercase shadow-xs">
                  {step.title}
                </span>
              </div>

              {/* Bottom Telemetry Overlay */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-white text-xs">
                <span className="font-heading text-base font-bold drop-shadow-md">
                  {step.tagline}
                </span>
                <span className="font-mono text-[11px] text-[#A8E6CF] bg-black/40 px-2.5 py-1 rounded-md">
                  {step.coldStat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Right Stage Narrative & Specifications */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#14B8A6] font-bold tracking-widest uppercase mb-2">
              <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
              <span>STAGE {currentStep.step} SPECIFICATIONS</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
              {currentStep.step}. {currentStep.title}
            </h3>

            <p className="text-sm sm:text-base text-[#0F172A]/75 mt-3 leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Spec Details Table */}
          <div className="space-y-2 pt-4 border-t border-[#B9E3F9]/40">
            {currentStep.specDetails.map((spec, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/70 border border-[#B9E3F9]/50 text-xs"
              >
                <span className="font-mono text-[#0F172A]/60 uppercase">{spec.label}</span>
                <span className="font-bold font-mono text-[#0F172A]">{spec.value}</span>
              </div>
            ))}
          </div>

          {/* Verification badge */}
          <div className="flex items-center gap-2 text-xs font-semibold text-[#14B8A6]">
            <ShieldCheck className="w-4 h-4" />
            <span>Fully audited under ISO 22000 & HACCP standards</span>
          </div>
        </div>
      </div>

      {/* Bottom Physically Animated Laser Progress Line */}
      <div className="max-w-7xl mx-auto w-full z-20">
        <div className="relative w-full h-2 bg-[#B9E3F9]/30 rounded-full overflow-hidden mb-3">
          {/* Laser Track */}
          <div
            className="h-full bg-gradient-to-r from-[#A8E6CF] via-[#14B8A6] to-[#B9E3F9] transition-all duration-300 ease-out shadow-[0_0_12px_rgba(20,184,166,0.8)]"
            style={{
              width: `${((activeStepIndex + 1) / PROCESS_STEPS.length) * 100}%`,
            }}
          />
        </div>

        {/* 6 Step Nodes Selector */}
        <div className="grid grid-cols-6 gap-2 text-center text-[10px] sm:text-xs font-mono font-bold tracking-wider">
          {PROCESS_STEPS.map((step, idx) => (
            <button
              key={step.step}
              onClick={() => setActiveStepIndex(idx)}
              className={`py-1 rounded-md transition-all duration-200 ${
                activeStepIndex === idx
                  ? 'text-[#14B8A6] bg-[#14B8A6]/10 font-black'
                  : 'text-[#0F172A]/40 hover:text-[#0F172A]'
              }`}
            >
              {step.step} {step.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
