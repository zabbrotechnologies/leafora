import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Sprout, ShieldCheck, HeartHandshake } from 'lucide-react';

interface AboutPageProps {
  onRequestSample?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 space-y-16">
        
        {/* Header Kicker */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-6 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>Our Story & Philosophy</span>
          </div>

          {/* 1. Large Statement */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            Good food begins in healthy soil, not in a chemistry lab.
          </h1>

          {/* 2. Short Paragraph */}
          <p className="text-lg sm:text-xl text-[#575D4E] leading-relaxed pt-2">
            Leafora Fresh was founded to eliminate the compromise between real agricultural peak flavor and everyday kitchen convenience. We believe traditional culinary heritage shouldn’t require hours of peeling, pounding, and preparation before you can even begin cooking.
          </p>
        </div>

        {/* 3. Relevant Authentic Image */}
        <div className="rounded-3xl overflow-hidden bg-white border border-[#E4DDD4] shadow-[0_16px_40px_-10px_rgba(55,67,33,0.08)]">
          <div className="aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/images/frozen_greens.jpg"
              alt="Harvested farm greens washed and flash-frozen at peak freshness"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <div className="p-6 bg-white border-t border-[#E4DDD4] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#575D4E]">
            <span className="font-semibold text-[#22241D]">
              Regional Agricultural Belts — Tamil Nadu & Kerala
            </span>
            <span>Flash-frozen within hours of morning plucking</span>
          </div>
        </div>

        {/* 4. Another Short Statement */}
        <div className="space-y-4 pt-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#22241D] tracking-tight">
            Cold temperature is our only preservative.
          </h2>
          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Raw produce sold in conventional markets often spends several days in transport and on display, gradually losing natural sweetness, crisp cell turgor, and water-soluble vitamins. By establishing freezing hubs in close proximity to regional growers, Leafora flash-freezes ingredients at -40°C directly after harvest.
          </p>
        </div>

        {/* 5. Supporting Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 rounded-3xl bg-white border border-[#E4DDD4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
              <Sprout className="w-5 h-5 text-[#8DA256]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#22241D]">
              Direct Sourcing
            </h3>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              We work directly with certified regional farms within fresh-haul radius of our freezing hubs.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4DDD4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-[#8DA256]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#22241D]">
              Zero Additives
            </h3>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              Zero sulfites, zero synthetic firming agents, and zero added water. 100% clean-label food.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-[#E4DDD4] space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
              <HeartHandshake className="w-5 h-5 text-[#8DA256]" />
            </div>
            <h3 className="text-lg font-heading font-bold text-[#22241D]">
              100% Usable Yield
            </h3>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              All peeling, de-stemming, and sorting is done at origin. Every single gram you buy goes directly into your pan.
            </p>
          </div>
        </div>

        {/* 6. Final Brand Statement & Next Steps */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#374321] text-[#F8F6F5] space-y-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-heading font-bold">
              Pure ingredients, frozen at harvest.
            </h3>
            <p className="text-sm text-[#DED6CC]/80">
              Explore our current range of frozen coconut blocks, stone-crushed masala cubes, and farm greens.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 shrink-0">
            <Link
              to="/products"
              className="px-6 py-3 rounded-full bg-[#8DA256] text-[#22241D] text-xs font-bold hover:bg-[#A3B86E] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};
