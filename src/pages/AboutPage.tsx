import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Snowflake,
  Sprout,
  Check,
  ArrowUpRight,
  HeartHandshake,
} from 'lucide-react';

interface AboutPageProps {
  onRequestSample: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onRequestSample }) => {
  const brandPillars = [
    {
      icon: Sprout,
      title: 'Direct Grower Stewardship',
      description:
        'We partner directly with certified regional farms located within micro-radiuses of our cold-hubs, ensuring harvests are transported immediately after early morning dew plucking.',
    },
    {
      icon: Snowflake,
      title: 'Sub-Second Cryogenic Freezing',
      description:
        'Our fluidized IQF tunnels plunge produce to -40°C within seconds. Ice crystals remain under 5 microns, protecting cell wall turgor and locking botanical crunch permanently.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Chemical Preservatives',
      description:
        'Cold temperature is our only preservative. Zero added sulfur, zero chemical stabilizers, and zero synthetic firming agents. 100% clean-label ingredient integrity.',
    },
    {
      icon: HeartHandshake,
      title: '100% Edible Kitchen Yield',
      description:
        'All peeling, de-stemming, grating, and sorting is completed at the source. Chefs and home cooks receive 100% usable net weight with zero kitchen waste or prep labor.',
    },
  ];

  const milestones = [
    {
      stage: '01',
      title: 'Precision Farm Sourcing',
      detail: 'Daily harvest cycles matched to peak Brix sugar and chlorophyll density.',
    },
    {
      stage: '02',
      title: 'Alpine Stream Hydro-Wash',
      detail: 'Triple-vortex gentle washing eliminates field debris without bruising cellular structure.',
    },
    {
      stage: '03',
      title: 'Fluidized -40°C Cryo-Lock',
      detail: 'Every pea, corn kernel, and coconut block is individually frozen in suspended cold air.',
    },
    {
      stage: '04',
      title: 'Hermetic Nitrogen Packing',
      detail: 'Multi-layer barrier pouches prevent moisture sublimity and freezer burn for up to 24 months.',
    },
  ];

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#F8FBFC] text-[#0F172A] z-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full ambient-glow-green opacity-25 filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Page Hero */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            <span>Our Heritage & Purpose • Leafora Fresh</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight">
            Freshness Preserved At Biological Peak.
          </h1>
          <p className="text-base sm:text-lg text-[#0F172A]/75 mt-4 leading-relaxed">
            Leafora Fresh was created to eliminate the compromise between real agricultural peak flavor and modern kitchen convenience.
          </p>
        </div>

        {/* Big Editorial Narrative Grid */}
        <div className="glass-panel rounded-3xl p-6 sm:p-12 shadow-2xl border border-[#B9E3F9]/60 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-20">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block">
              WHO WE ARE & WHY WE EXIST
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0F172A] tracking-tight">
              Stopping the Biological Clock at the Farm Gate.
            </h2>
            <p className="text-sm sm:text-base text-[#0F172A]/80 leading-relaxed">
              When vegetables and fruits are transported across traditional ambient supply chains, they lose up to 40% of their vitamin potency and cellular firmness within 48 hours of harvest.
            </p>
            <p className="text-sm sm:text-base text-[#0F172A]/80 leading-relaxed">
              By establishing our cryogenic freezing hubs in close proximity to regional growers, Leafora Fresh flash-freezes produce within hours of picking. The cellular moisture instantly locks into microscopic crystals, preserving crispness, natural sugars, and vitamins as if freshly picked this morning.
            </p>

            <div className="pt-2 flex items-center gap-4">
              <Link
                to="/products"
                className="px-6 py-3 rounded-full bg-[#0F172A] text-white text-xs font-bold hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center gap-1.5 shadow-xs"
              >
                <span>Discover Our Harvests</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={onRequestSample}
                className="px-5 py-3 rounded-full bg-white text-[#0F172A] text-xs font-bold border border-[#B9E3F9]/60 hover:bg-white shadow-2xs transition-all cursor-pointer"
              >
                Request Sample
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl relative bg-[#0F172A]/5">
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1200&auto=format&fit=crop"
                alt="Agricultural farm harvest"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-mono">
                <span className="text-[#A8E6CF] font-bold">100% NON-GMO CROPS</span>
                <span>HARVESTED AT SUNRISE</span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Brand Pillars */}
        <div className="mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block mb-1">
              OUR CORE CHARTER
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-[#0F172A] tracking-tight">
              Built on 4 Uncompromised Standards
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel rounded-3xl p-6 shadow-xl border border-[#B9E3F9]/60 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/15 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6] mb-5">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-heading font-black text-[#0F172A] mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0F172A]/75 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#B9E3F9]/40 flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6]">
                    <Check className="w-3.5 h-3.5" />
                    <span>Verified Protocol</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Process Roadmap */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 shadow-2xl border border-[#B9E3F9]/60 mb-20">
          <div className="max-w-2xl mb-10">
            <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase block mb-1">
              THE LEAFORA PROTOCOL
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
              From Soil to Sauté in 4 Verified Stages
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative p-5 rounded-2xl bg-white/80 border border-[#B9E3F9]/50 shadow-xs">
                <span className="text-2xl font-mono font-black text-[#14B8A6] block mb-2">
                  {m.stage}
                </span>
                <h4 className="text-base font-heading font-bold text-[#0F172A] mb-1">
                  {m.title}
                </h4>
                <p className="text-xs text-[#0F172A]/70 leading-relaxed">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA Strip */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-xs font-mono text-[#A8E6CF] uppercase tracking-wider block mb-1">
              PARTNER WITH LEAFORA
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold">
              Ready to Upgrade Your Kitchen's Quality & Yield?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-xl">
              Connect with our culinary specialists to receive trial shippers or schedule commercial supply onboarding.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="px-6 py-3.5 rounded-full bg-[#14B8A6] text-[#0F172A] text-xs font-bold hover:bg-white transition-all shadow-md"
            >
              Contact Our Team
            </Link>
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
