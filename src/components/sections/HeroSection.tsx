import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onRequestSample?: () => void;
  onExploreRange?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[#F8F6F5] overflow-hidden">
      {/* Subtle Warm Greige Accent Plane */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#F3EFEA] -z-10 hidden lg:block" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Clear Brand Communication */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Minimal Editorial Kicker */}
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <span className="w-6 h-[1.5px] bg-[#8DA256] rounded-full" />
              <span>Flash-Frozen at Morning Harvest</span>
            </div>

            {/* Clear, Human Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] leading-[1.08] tracking-tight">
              Real Vegetables & Kitchen Staples, Frozen at Peak Flavor.
            </h1>

            {/* Direct, Honest Brand Statement */}
            <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed max-w-xl">
              <strong className="text-[#22241D] font-semibold">Leafora Fresh</strong> brings you pure coconut blocks, stone-crushed masala cubes, and tender farm greens flash-frozen within hours of picking. 100% usable food, zero prep waste, direct into your pan.
            </p>

            {/* Clear Action CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/products"
                className="px-7 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-md flex items-center gap-2"
              >
                <span>Explore Our Products</span>
                <ArrowUpRight className="w-4 h-4 text-[#8DA256]" />
              </Link>

              <Link
                to="/about"
                className="px-6 py-3.5 rounded-full bg-white text-[#22241D] text-xs font-bold tracking-wide border border-[#E4DDD4] hover:bg-[#F3EFEA] transition-all duration-200"
              >
                <span>Our Story</span>
              </Link>
            </div>

            {/* Verified Food Values */}
            <div className="pt-6 border-t border-[#E4DDD4] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-[#575D4E]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                <span>Zero Chemical Preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                <span>100% Edible Kitchen Yield</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                <span>Melts in Hot Pan in 25s</span>
              </div>
            </div>
          </div>

          {/* Right Column: Authentic Food Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden bg-white border border-[#E4DDD4] shadow-[0_20px_50px_-15px_rgba(55,67,33,0.12)]">
              {/* Product Photography */}
              <div className="aspect-[4/3] sm:aspect-[1/1] overflow-hidden relative">
                <img
                  src="/images/hero_frozen_macro.jpg"
                  alt="Leafora Fresh flash-frozen produce preserved at peak harvest"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-103"
                  loading="eager"
                />
              </div>

              {/* Informative Editorial Caption */}
              <div className="p-6 bg-white border-t border-[#E4DDD4] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#8DA256]">
                    HARVEST STAPLE
                  </span>
                  <span className="text-[11px] font-semibold text-[#575D4E]">
                    -40°C Instant Lock
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#22241D]">
                  Grade-A Sweet Peas & Fresh Aromatics
                </h3>
                <p className="text-xs text-[#575D4E] leading-relaxed">
                  Frozen within hours of field harvest to lock in natural sweetness, chlorophyll green, and cellular crunch.
                </p>
              </div>
            </div>

            {/* Subtle floating feature callout */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-5 sm:-left-5 bg-[#374321] text-[#F8F6F5] px-5 py-3 rounded-2xl shadow-xl border border-[#8DA256]/30 hidden sm:flex flex-col text-left">
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#8DA256] font-bold">
                Field to Freezer
              </span>
              <span className="text-xs font-extrabold text-[#F8F6F5] tracking-wide">
                Under 2 Hours
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
