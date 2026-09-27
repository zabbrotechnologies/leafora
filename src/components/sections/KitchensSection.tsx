import React, { useState } from 'react';
import { KITCHEN_SEGMENTS } from '../../data/mockData';
import { ArrowUpRight, Check, Clock, Quote, Package, Sparkles } from 'lucide-react';

interface KitchensSectionProps {
  onRequestSample: () => void;
  onOpenCalculator?: () => void;
}

export const KitchensSection: React.FC<KitchensSectionProps> = ({ onRequestSample, onOpenCalculator }) => {
  const [activeKitchenId, setActiveKitchenId] = useState('restaurant');
  const activeSegment =
    KITCHEN_SEGMENTS.find((s) => s.id === activeKitchenId) || KITCHEN_SEGMENTS[0];

  return (
    <section
      id="kitchens"
      className="relative w-full py-24 sm:py-36 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 -left-20 w-[500px] h-[500px] rounded-full ambient-glow-green opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            <span>Commercial B2B & Foodservice Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
            Engineered For Every Kitchen.
          </h2>
          <p className="text-base text-[#0F172A]/70 mt-3 leading-relaxed">
            From Michelin-starred fine dining kitchens and hotel banquets to fast-casual cloud kitchens and modern home dining. Select a culinary sector to view tailored formats.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {KITCHEN_SEGMENTS.map((segment) => (
            <button
              key={segment.id}
              onClick={() => setActiveKitchenId(segment.id)}
              className={`px-5 py-3 rounded-2xl text-xs font-bold tracking-wide transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                activeKitchenId === segment.id
                  ? 'bg-[#0F172A] text-white shadow-xl scale-102 border border-[#14B8A6]/40'
                  : 'bg-white/80 hover:bg-white text-[#0F172A]/70 border border-[#B9E3F9]/50'
              }`}
            >
              <span>{segment.name}</span>
              <span className="text-[10px] font-medium opacity-60 hidden sm:inline">
                • {segment.role}
              </span>
            </button>
          ))}
        </div>

        {/* Interactive Master Segment Showcase Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Narrative & Key Specs */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div>
              <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block mb-1">
                SECTOR: {activeSegment.role}
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
                {activeSegment.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#0F172A]/75 mt-3 leading-relaxed">
                {activeSegment.description}
              </p>
            </div>

            {/* Key Benefits Checklist */}
            <div className="space-y-2.5 pt-2">
              {activeSegment.keyBenefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#0F172A]/85">
                  <div className="w-5 h-5 rounded-full bg-emerald-50 border border-[#A8E6CF] flex items-center justify-center text-[#14B8A6] shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            {/* Testimonial Quote Pill */}
            <div className="p-4 rounded-2xl bg-white/90 border border-[#B9E3F9]/60 shadow-xs relative">
              <Quote className="w-6 h-6 text-[#14B8A6]/20 absolute top-3 right-3" />
              <p className="text-xs italic text-[#0F172A]/80 mb-2 leading-relaxed">
                {activeSegment.chefQuote}
              </p>
              <div className="text-[11px] font-bold text-[#0F172A]">
                {activeSegment.chefAuthor}{' '}
                <span className="font-normal text-[#0F172A]/60">({activeSegment.chefTitle})</span>
              </div>
            </div>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onRequestSample}
                className="px-6 py-3.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center gap-2 shadow-md cursor-pointer"
              >
                <span>Request {activeSegment.name} Sample Pack</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              {onOpenCalculator && (
                <button
                  onClick={onOpenCalculator}
                  className="px-5 py-3.5 rounded-full bg-white text-[#0F172A] text-xs font-bold tracking-wide border border-[#B9E3F9]/60 hover:bg-white shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Calculate Kitchen ROI</span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Hero Visual with Overlays */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative group bg-[#0F172A]/5">
              <img
                key={activeSegment.id}
                src={activeSegment.heroImage}
                alt={activeSegment.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />

              {/* Verified Yield Badge on Image */}
              <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
                  <Package className="w-4 h-4 text-[#A8E6CF]" />
                  <span className="font-mono font-bold">{activeSegment.recommendedPacks}</span>
                </div>

                <div className="flex items-center gap-1.5 bg-[#14B8A6] text-[#0F172A] px-3 py-1.5 rounded-xl font-bold font-mono text-xs shadow-md">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{activeSegment.prepTimeSaved} Saved</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
