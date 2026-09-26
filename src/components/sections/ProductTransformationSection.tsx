import React, { useState } from 'react';
import { TRANSFORMATION_STAGES } from '../../data/mockData';
import { ArrowRight, Thermometer, Clock, ShieldCheck, Activity } from 'lucide-react';

export const ProductTransformationSection: React.FC = () => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);
  const currentStage = TRANSFORMATION_STAGES[activeStageIndex];

  return (
    <section
      id="transformation"
      className="relative w-full py-24 sm:py-32 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Background Cold Bloom */}
      <div className="absolute top-1/3 -right-20 w-[500px] h-[500px] rounded-full ambient-glow-blue opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full frost-badge text-xs font-bold tracking-widest text-[#0F172A] uppercase mb-4">
              <Activity className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>CONTINUOUS BIOLOGICAL STATE SHIFT</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
              One Ingredient. Four States of Mastery.
            </h2>
            <p className="text-base text-[#0F172A]/70 mt-3">
              Witness how cryogenic flash-freezing preserves the intact cellular biology of freshly picked sweet garden peas from the dawn morning field straight into the chef’s sauté pan.
            </p>
          </div>

          {/* State Switcher Buttons */}
          <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-[#B9E3F9]/60 shadow-xs overflow-x-auto max-w-full">
            {TRANSFORMATION_STAGES.map((stage, index) => (
              <button
                key={stage.id}
                onClick={() => setActiveStageIndex(index)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap ${
                  activeStageIndex === index
                    ? 'bg-[#0F172A] text-white shadow-md scale-102'
                    : 'text-[#0F172A]/60 hover:text-[#0F172A] hover:bg-white/60'
                }`}
              >
                <span>{stage.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Transformation Interactive Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Left Media Canvas with Smooth Crossfade & Masking */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl overflow-hidden shadow-lg group">
            {TRANSFORMATION_STAGES.map((stage, idx) => (
              <div
                key={stage.id}
                className={`absolute inset-0 transition-all duration-700 ease-out ${
                  activeStageIndex === idx
                    ? 'opacity-100 scale-100 filter-none pointer-events-auto'
                    : 'opacity-0 scale-105 filter blur-xs pointer-events-none'
                }`}
              >
                <img
                  src={stage.image}
                  alt={stage.title}
                  className="w-full h-full object-cover object-center transform transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-[#0F172A]/20 to-transparent" />

                {/* Floating State Badge Inside Image */}
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#0F172A]/80 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse" />
                  <span>{stage.stateBadge}</span>
                </div>

                {/* Bottom Overlay Info Inside Image */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 text-white">
                  <span className="text-sm font-heading font-bold drop-shadow-md">
                    {stage.subtitle}
                  </span>
                  <div className="flex items-center gap-3 text-xs font-mono text-[#A8E6CF]">
                    <span className="flex items-center gap-1">
                      <Thermometer className="w-3.5 h-3.5" />
                      {stage.temperature}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {stage.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right State Details & Biological Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full gap-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#14B8A6] font-bold tracking-widest uppercase mb-2">
                <span>STAGE {currentStage.stageNumber} OF 04</span>
                <span className="text-[#0F172A]/40">{currentStage.duration}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
                {currentStage.title}
              </h3>

              <p className="text-sm sm:text-base text-[#0F172A]/75 mt-3 leading-relaxed">
                {currentStage.description}
              </p>
            </div>

            {/* Scientific Metrics Grid */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#B9E3F9]/40">
              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#B9E3F9]/50 shadow-xs">
                <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase tracking-widest block mb-1">
                  Cellular State
                </span>
                <span className="text-xs font-bold text-[#0F172A] block">
                  {currentStage.cellularState}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/70 border border-[#B9E3F9]/50 shadow-xs">
                <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase tracking-widest block mb-1">
                  {currentStage.vitalMetric}
                </span>
                <span className="text-xs font-bold text-[#14B8A6] block font-mono">
                  {currentStage.vitalValue}
                </span>
              </div>
            </div>

            {/* Next Stage Navigation Trigger */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() =>
                  setActiveStageIndex((prev) => (prev + 1) % TRANSFORMATION_STAGES.length)
                }
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#0F172A] hover:text-[#14B8A6] transition-colors group"
              >
                <span>NEXT TRANSFORMATION STAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#14B8A6] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-1 text-[11px] text-[#0F172A]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Zero cellular rupture</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
