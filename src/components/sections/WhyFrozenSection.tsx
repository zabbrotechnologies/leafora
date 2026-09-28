import React from 'react';

export const WhyFrozenSection: React.FC = () => {
  const points = [
    {
      title: 'Peak Harvest Nutrition Locked in Hours',
      explanation:
        'Vegetables begin losing water-soluble vitamins and natural sugars the moment they are harvested. By flash-freezing at -40°C directly near regional farms, we stop enzyme breakdown and seal in garden-fresh taste naturally.',
    },
    {
      title: 'Zero Waste — Every Gram is Usable Food',
      explanation:
        'Peeling garlic, trimming herb stems, and grating fresh coconut typically produces 25% to 35% food waste in your trash. Leafora handles all prep at origin, meaning 100% of the pack goes straight into your recipe.',
    },
    {
      title: 'Pan-Ready Convenience in 25 Seconds',
      explanation:
        'No defrosting required overnight. Pure coconut blocks and stone-crushed aromatics are calibrated to melt smoothly into hot ghee, oil, or gravies in seconds, keeping cooking authentic yet effortless.',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F8F6F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>Why Leafora</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            Real food loses vitality in transit. We lock it before it leaves the harvest belt.
          </h2>
          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Flash-freezing is nature’s pause button. It allows us to deliver field-quality taste to your kitchen without adding a single artificial preservative.
          </p>
        </div>

        {/* Editorial Layout: Points + Large Supporting Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* 3 Meaningful Points */}
          <div className="lg:col-span-7 space-y-8">
            {points.map((pt, idx) => (
              <div key={pt.title} className="flex gap-4 sm:gap-6 items-start">
                <div className="shrink-0 mt-0.5">
                  <span className="text-sm font-bold font-mono text-[#8DA256] tracking-wider block">
                    0{idx + 1}.
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-heading font-bold text-[#22241D]">
                    {pt.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#575D4E] leading-relaxed">
                    {pt.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Supporting Visual: Genuine Food Photography */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden bg-white border border-[#E4DDD4] shadow-[0_12px_36px_-10px_rgba(55,67,33,0.08)]">
              <div className="aspect-[4/3] sm:aspect-[5/4] overflow-hidden">
                <img
                  src="/images/frozen_greens.jpg"
                  alt="Farm greens harvested and steam-blanched to lock chlorophyll vitality"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                  loading="lazy"
                />
              </div>
              <div className="p-6 bg-white border-t border-[#E4DDD4] space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8DA256]">
                  SOURCE INTEGRITY
                </span>
                <p className="text-xs text-[#575D4E] leading-relaxed">
                  Tender spinach, fenugreek, and coriander blanched and frozen in suspended cold air within hours of plucking.
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
