import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, ShieldCheck, HeartHandshake, Snowflake, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutPageProps {
  onRequestSample?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-16 sm:space-y-24">
        
        {/* Wide Header Section */}
        <div className="space-y-6 max-w-4xl">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-6 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>OUR STORY & PHILOSOPHY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            Good food begins in healthy soil, not in a chemistry lab.
          </h1>

          <p className="text-lg sm:text-xl text-[#575D4E] leading-relaxed">
            Leafora Fresh was founded to eliminate the compromise between real agricultural peak flavor and everyday kitchen convenience. We believe traditional culinary heritage shouldn’t require hours of peeling, pounding, and preparation before you can even begin cooking.
          </p>
        </div>

        {/* Full-Width Origin Feature Card (Clean Single Border) */}
        <div className="rounded-3xl bg-white border border-[#E4DDD4] overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            
            {/* Left Story Narrative */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-14 space-y-6">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8DA256]">
                FIELD TO FREEZER PROTOCOL
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#22241D] leading-tight">
                Why conventional market vegetables lose their soul in transit.
              </h2>

              <p className="text-sm sm:text-base text-[#575D4E] leading-relaxed">
                Raw vegetables sold in conventional retail and city mandis often spend 4 to 6 days moving through multiple intermediaries, sitting in humid transport trucks and open-air display stalls. During this journey, natural brix sugars oxidize, water-soluble vitamins degrade by up to 40%, and crisp cell walls turn limp.
              </p>

              <p className="text-sm sm:text-base text-[#575D4E] leading-relaxed">
                To counter this, industrial processors often resort to synthetic firming agents, sulfite bleaches, or surface waxes. At Leafora, we took a fundamentally different approach: <strong>place cryogenic freezing hubs directly inside rural agricultural belts</strong>.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-[#374321]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DA256]" />
                  <span>Harvest to Freeze: Under 2 Hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8DA256]" />
                  <span>Zero Added Chemicals or Water</span>
                </div>
              </div>
            </div>

            {/* Right Media Area */}
            <div className="lg:col-span-5 relative h-80 sm:h-96 lg:h-full min-h-[320px] bg-[#F3EFEA] overflow-hidden">
              <img
                src="/images/frozen_greens.jpg"
                alt="Leafora farm greens harvested in early morning hours"
                className="w-full h-full object-cover object-center transform transition-transform duration-1000 hover:scale-105"
              />
              <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent pointer-events-none hidden lg:block" />
              <div className="absolute bottom-4 left-4 right-4 bg-[#22241D]/80 backdrop-blur-md text-[#F8F6F5] p-3.5 rounded-2xl border border-white/15 text-xs">
                <span className="font-bold block text-[#A8E6CF]">Pollachi & Palakkad Agronomic Belts</span>
                <span className="text-[11px] text-[#DED6CC]/80">Harvested at 6:00 AM • Flash-frozen at -40°C by 7:45 AM</span>
              </div>
            </div>

          </div>
        </div>

        {/* 4 Core Agricultural Values (Wide 4-Column Grid, Clean Single Border Cards) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#22241D] tracking-tight">
              Our Foundational Standards
            </h2>
            <p className="text-sm text-[#575D4E]">
              The principles that govern every product, farm partnership, and cryogenic facility we operate.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-7 rounded-3xl bg-white border border-[#E4DDD4] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <Sprout className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                Farm-Direct Gate
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                We contract directly with regional growers located within a 30-kilometer radius of our cryogenic blast facilities.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E4DDD4] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                Zero Additives
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                Zero sulfites, zero artificial firming chemicals, and zero diluted water. Pure edible plant matter only.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E4DDD4] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <HeartHandshake className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                100% Edible Yield
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                All stem removal, skin peeling, and quality sorting occurs at origin. Every gram purchased goes straight to your pan.
              </p>
            </div>

            <div className="p-7 rounded-3xl bg-white border border-[#E4DDD4] space-y-4 shadow-xs">
              <div className="w-10 h-10 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] flex items-center justify-center">
                <Snowflake className="w-5 h-5 text-[#8DA256]" />
              </div>
              <h3 className="text-lg font-heading font-bold text-[#22241D]">
                Cryo Micro-Crystals
              </h3>
              <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                -40°C instant lock freezes cell water into micro-crystals under 5 microns, protecting cell wall crispness and color.
              </p>
            </div>
          </div>
        </div>

        {/* 5-Step Farm-To-Freezer Journey (Wide Full-Width Card) */}
        <div className="rounded-3xl bg-white border border-[#E4DDD4] p-8 sm:p-12 space-y-10 shadow-xs">
          <div className="max-w-2xl space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8DA256]">
              DAILY CHRONOLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#22241D] tracking-tight">
              The 2-Hour Sunrise Journey
            </h2>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              How our regional processing facilities operate every morning from dawn plucking to cryogenic lock.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#8DA256] block">06:00 AM</span>
              <h4 className="text-sm font-bold text-[#22241D]">Sunrise Harvest</h4>
              <p className="text-xs text-[#575D4E] leading-relaxed">
                Hand-picked at peak moisture before midday heat stresses the crop.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#8DA256] block">06:45 AM</span>
              <h4 className="text-sm font-bold text-[#22241D]">Cold Vortex Wash</h4>
              <p className="text-xs text-[#575D4E] leading-relaxed">
                Chilled triple-stream washing to remove field soil while retaining skin integrity.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#8DA256] block">07:15 AM</span>
              <h4 className="text-sm font-bold text-[#22241D]">Origin Prep & Sorting</h4>
              <p className="text-xs text-[#575D4E] leading-relaxed">
                Roots, stems, and shells removed by trained artisans. 100% edible yield isolated.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#8DA256] block">07:45 AM</span>
              <h4 className="text-sm font-bold text-[#22241D]">-40°C Cryo Lock</h4>
              <p className="text-xs text-[#575D4E] leading-relaxed">
                IQF blast tunnels lock in vitamins, cellular crispness, and chlorophyll in minutes.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-[#8DA256] block">09:00 AM</span>
              <h4 className="text-sm font-bold text-[#22241D]">Cold-Chain Logistics</h4>
              <p className="text-xs text-[#575D4E] leading-relaxed">
                Packed into temperature-logged refrigerated reefers maintained at a strict -18°C.
              </p>
            </div>
          </div>
        </div>

        {/* Final CTA Banner (Full Width) */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#374321] text-[#F8F6F5] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-white">
              Taste the difference of true harvest freezing.
            </h3>
            <p className="text-sm text-[#DED6CC]/80">
              Explore our current range of frozen coconut blocks, stone-crushed masala cubes, and farm greens.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/products"
              className="px-7 py-3.5 rounded-full bg-[#8DA256] text-[#22241D] text-xs font-bold hover:bg-[#A3B86E] transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/#reach-us"
              className="px-7 py-3.5 rounded-full bg-white/10 text-white text-xs font-bold border border-white/20 hover:bg-white/20 transition-colors"
            >
              Reach Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};
