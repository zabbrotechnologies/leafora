import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';

interface HeroSectionProps {
  onRequestSample?: () => void;
  onExploreRange?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = () => {
  return (
    <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 lg:pt-40 lg:pb-20 bg-[#F8F6F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Wide Hero Enclosed Banner Card — Modeled directly after Reference Design */}
        <div className="relative rounded-3xl bg-white border border-[#E4DDD4] overflow-hidden shadow-[0_12px_44px_-10px_rgba(55,67,33,0.08)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] lg:min-h-[580px] items-stretch">
            
            {/* Left Content Area: Typography & Call to Actions */}
            <div className="lg:col-span-7 p-7 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between z-10 bg-white relative">
              <div className="space-y-6">
                
                {/* Reference Pill Eyebrow */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F3EFEA] border border-[#8DA256]/30 text-[#374321] text-xs font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8DA256]" />
                  <span>Flash-Frozen at Morning Harvest</span>
                </div>

                {/* Punchy 3-Line Headline with Periods (Matching Reference Style) */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-[#22241D] leading-[1.08] tracking-tight">
                  Real Harvest.<br />
                  Instant Lock.<br />
                  Ready to Cook.
                </h1>

                {/* Clear, Human Editorial Description */}
                <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed max-w-xl">
                  Pure coastal coconut blocks, stone-crushed masala cubes, and blanched farm greens flash-frozen at -40°C within hours of picking. 100% usable food with zero kitchen prep waste.
                </p>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link
                    to="/products"
                    className="px-7 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs sm:text-sm font-bold tracking-wide hover:bg-[#48572B] transition-all duration-200 shadow-md flex items-center gap-2"
                  >
                    <span>Explore Products</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8DA256]" />
                  </Link>

                  <Link
                    to="/culinary-guide"
                    className="px-6 py-3.5 rounded-full bg-[#F3EFEA] text-[#22241D] text-xs sm:text-sm font-bold tracking-wide border border-[#E4DDD4] hover:bg-white transition-all duration-200"
                  >
                    <span>Culinary Guide</span>
                  </Link>
                </div>
              </div>

              {/* Verified Value Checkmarks at Card Bottom */}
              <div className="pt-8 mt-8 border-t border-[#E4DDD4]/70 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#575D4E]">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                  <span>Zero Preservatives</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                  <span>100% Usable Yield</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#8DA256] shrink-0 stroke-[2.5]" />
                  <span>Melts in 25s</span>
                </div>
              </div>
            </div>

            {/* Right Media Area: Authentic Photography with Seamless Horizontal Fade */}
            <div className="lg:col-span-5 relative min-h-[280px] sm:min-h-[340px] lg:min-h-full overflow-hidden bg-[#F3EFEA]">
              <img
                src="/images/hero_frozen_macro.jpg"
                alt="Leafora Fresh cryogenic sweet garden peas with flash frost crystals"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
                loading="eager"
              />

              {/* Seamless Horizontal Gradient Fade (Left Edge Fades into White Card) */}
              <div className="absolute inset-y-0 left-0 w-24 sm:w-36 lg:w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none hidden lg:block" />

              {/* Mobile Top Gradient Fade */}
              <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none lg:hidden" />

              {/* Subtle Floating Editorial Tag on Photo */}
              <div className="absolute bottom-5 right-5 sm:bottom-6 sm:right-6 bg-[#22241D]/80 backdrop-blur-md text-[#F8F6F5] px-4 py-2 rounded-2xl border border-white/15 text-[11px] font-bold tracking-wider uppercase select-none pointer-events-none">
                -40°C Instant Cryo-Lock
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
