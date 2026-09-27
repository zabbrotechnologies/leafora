import React, { useState } from 'react';
import { CheckCircle2, XCircle, Zap, TrendingUp, Clock, Scale } from 'lucide-react';

interface ValuePillar {
  id: string;
  stepNumber: string;
  title: string;
  headline: string;
  description: string;
  image: string;
  icon: typeof Zap;
  metricComparison: {
    leafora: string;
    leaforaLabel: string;
    supermarket: string;
    supermarketLabel: string;
  };
  keyAdvantages: string[];
}

const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'freshness',
    stepNumber: '01',
    title: 'Peak Bio-Potency',
    headline: 'Nutritional Potency Locked at Sunrise Dawn.',
    description: 'Produce categorized as "fresh" in supermarkets was typically picked days or weeks earlier, losing up to 50% of its vitamin content during ambient freight. Leafora cryogenic flash-freezing locks cellular vitality within 110 minutes of dawn harvest.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1200&auto=format&fit=crop',
    icon: Zap,
    metricComparison: {
      leafora: '99.4%',
      leaforaLabel: 'Active Vitamin & Enzyme Retention',
      supermarket: '48.2%',
      supermarketLabel: 'Average Supermarket Shelf Retention',
    },
    keyAdvantages: [
      'Zero cellular membrane rupture',
      'Intact chlorophyll and natural aroma',
      'No chemical wax or artificial gases',
    ],
  },
  {
    id: 'zero-waste',
    stepNumber: '02',
    title: '100% Edible Yield',
    headline: 'Zero Peeling. Zero Stems. 100% Usable Mass.',
    description: 'Raw kitchen prep discards up to 35% of fresh vegetables in stems, roots, coconut shells, and garlic skins. Every gram of Leafora produce is 100% edible yield—you pay strictly for food that reaches the plate.',
    image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop',
    icon: Scale,
    metricComparison: {
      leafora: '100%',
      leaforaLabel: 'Net Edible Yield Per Kilogram',
      supermarket: '64.5%',
      supermarketLabel: 'Average Raw Produce Usable Yield',
    },
    keyAdvantages: [
      'Eliminates organic prep disposal costs',
      'Predictable culinary portion cost control',
      'Pre-washed in triple chilled vortex streams',
    ],
  },
  {
    id: 'convenience',
    stepNumber: '03',
    title: 'Pan-Melt Speed',
    headline: '30-Second Pan Dissolution. Zero Kitchen Prep.',
    description: 'Stone-crushed ginger, garlic, green chilli, and coastal coconut blocks melt seamlessly in hot oil or ghee. Eliminate 30-45 minutes of daily peeling, pounding, and prep time with calibrated gourmet cubes.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1200&auto=format&fit=crop',
    icon: Clock,
    metricComparison: {
      leafora: '25 Secs',
      leaforaLabel: 'Direct Pan Melt Dissolution',
      supermarket: '35 Mins',
      supermarketLabel: 'Traditional Peeling & Grinding Prep',
    },
    keyAdvantages: [
      'Direct-to-pan from freezer (-18°C)',
      'Zero thawing or waterlogging',
      'Fast service turnaround in rush hours',
    ],
  },
  {
    id: 'consistency',
    stepNumber: '04',
    title: '365-Day Consistency',
    headline: 'Fixed Cost & Identical Flavor 365 Days a Year.',
    description: 'Weather fluctuations and off-season cycles cause erratic produce pricing and watery texture. Leafora contracts harvest volume at peak biological yield, guaranteeing uniform brix sweetness, color, and price stability year-round.',
    image: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?q=80&w=1200&auto=format&fit=crop',
    icon: TrendingUp,
    metricComparison: {
      leafora: '0% Fluctuation',
      leaforaLabel: 'Year-Round Flavor & Texture Variance',
      supermarket: '±45%',
      supermarketLabel: 'Seasonal Price & Quality Volatility',
    },
    keyAdvantages: [
      'Consistent culinary menu standards',
      'Protected profit margins for F&B businesses',
      '18-24 month certified shelf life',
    ],
  },
];

export const WhyFrozenSection: React.FC = () => {
  const [activePillarId, setActivePillarId] = useState<string>('freshness');
  const activePillar =
    VALUE_PILLARS.find((p) => p.id === activePillarId) || VALUE_PILLARS[0];

  return (
    <section
      id="why-frozen"
      className="relative w-full py-24 sm:py-36 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full ambient-glow-green opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            <span>The Science of Cryogenic Superiority</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight uppercase leading-[1.05]">
            WHY LEAFORA.
            <br />
            <span className="text-gradient-ice">PROVEN GASTRONOMY ADVANTAGES.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#0F172A]/75 mt-4 leading-relaxed">
            Discover why leading executive chefs and modern home kitchens choose cryogenic preservation over perishable market produce. Select a value pillar below to inspect comparative telemetry.
          </p>
        </div>

        {/* Interactive Master Stage: Left Visual + Right Pillar Selectors */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Dynamic Visual & Comparative Gauge */}
          <div className="lg:col-span-6">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              {/* Dynamic Image with Crossfade */}
              <div className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-6 bg-[#0F172A]/5 shadow-md">
                <img
                  key={activePillar.id}
                  src={activePillar.image}
                  alt={activePillar.headline}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-4 left-4 z-20 px-3.5 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-[#A8E6CF] text-xs font-mono font-bold border border-white/20">
                  PILLAR {activePillar.stepNumber} • {activePillar.title.toUpperCase()}
                </div>

                <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
                  <h4 className="font-heading text-lg sm:text-xl font-bold drop-shadow-md">
                    {activePillar.headline}
                  </h4>
                </div>
              </div>

              {/* Comparative Metrics Head-to-Head */}
              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-[#A8E6CF]/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#14B8A6] shrink-0" />
                    <span className="text-xs font-semibold text-[#0F172A]">
                      {activePillar.metricComparison.leaforaLabel}
                    </span>
                  </div>
                  <span className="text-lg font-mono font-black text-[#14B8A6] shrink-0">
                    {activePillar.metricComparison.leafora}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 flex items-center justify-between opacity-80">
                  <div className="flex items-center gap-3">
                    <XCircle className="w-5 h-5 text-slate-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-600">
                      {activePillar.metricComparison.supermarketLabel}
                    </span>
                  </div>
                  <span className="text-base font-mono font-bold text-slate-600 shrink-0">
                    {activePillar.metricComparison.supermarket}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Interactive Value Pillar Cards */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            {VALUE_PILLARS.map((pillar) => {
              const isActive = pillar.id === activePillar.id;
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  onClick={() => setActivePillarId(pillar.id)}
                  className={`p-6 rounded-3xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-xl border-2 border-[#14B8A6] translate-x-2'
                      : 'bg-white/60 hover:bg-white/90 border border-[#B9E3F9]/50 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-sm ${
                          isActive
                            ? 'bg-[#14B8A6] text-white shadow-md'
                            : 'bg-[#0F172A]/5 text-[#0F172A]/70'
                        }`}
                      >
                        {pillar.stepNumber}
                      </div>

                      <div>
                        <span className="text-[11px] font-mono font-bold text-[#14B8A6] uppercase tracking-wider block">
                          ADVANTAGE {pillar.stepNumber}
                        </span>
                        <h3 className="text-lg sm:text-xl font-heading font-black text-[#0F172A]">
                          {pillar.title}
                        </h3>
                      </div>
                    </div>

                    <Icon
                      className={`w-5 h-5 ${
                        isActive ? 'text-[#14B8A6]' : 'text-[#0F172A]/30'
                      }`}
                    />
                  </div>

                  {/* Expanded info on active */}
                  {isActive && (
                    <div className="mt-4 pt-4 border-t border-[#B9E3F9]/40 space-y-3 transition-all duration-300">
                      <p className="text-xs sm:text-sm text-[#0F172A]/75 leading-relaxed">
                        {pillar.description}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-1">
                        {pillar.keyAdvantages.map((adv, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-lg bg-[#F8FBFC] border border-[#B9E3F9]/60 text-[11px] font-semibold text-[#0F172A]/80"
                          >
                            ✓ {adv}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
