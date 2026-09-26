import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck, ThermometerSnowflake, Check } from 'lucide-react';

interface FinalCtaSectionProps {
  onRequestSample: () => void;
  onOpenCalculator: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onRequestSample,
  onOpenCalculator,
}) => {
  return (
    <section className="relative w-full py-28 sm:py-36 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40">
      {/* Background Ambient Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full ambient-glow-teal opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-10 relative z-10 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full frost-badge text-xs font-bold tracking-widest text-[#0F172A] uppercase mb-6 shadow-xs">
          <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
          <span>EXPERIENCE THE REVOLUTION AT -40°C</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black text-[#0F172A] tracking-tight uppercase leading-[0.95]">
          FRESHNESS IS NO LONGER
          <br />
          <span className="text-gradient-ice">BOUND BY SEASON OR TIME.</span>
        </h2>

        <p className="text-base sm:text-lg text-[#0F172A]/70 max-w-2xl mx-auto mt-6 leading-relaxed">
          Experience how GLACIAL™ cryogenic flash-freezing locks biological vibrancy, crisp texture, and zero kitchen waste for your culinary operation.
        </p>

        {/* Action Group */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button
            onClick={onRequestSample}
            className="group relative inline-flex items-center gap-3 px-9 py-4.5 rounded-full bg-[#0F172A] text-white text-sm font-semibold tracking-wide shadow-[0_12px_30px_-5px_rgba(15,23,42,0.3)] hover:shadow-[0_18px_35px_-5px_rgba(20,184,166,0.4)] transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Request Complimentary Sample Shipper</span>
            <div className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-3.5 h-3.5 text-[#A8E6CF]" />
            </div>
          </button>

          <button
            onClick={onOpenCalculator}
            className="inline-flex items-center gap-2 px-8 py-4.5 rounded-full bg-white text-[#0F172A] text-sm font-semibold tracking-wide border border-[#B9E3F9] backdrop-blur-md shadow-xs transition-all duration-300 hover:border-[#14B8A6]/60 hover:bg-slate-50"
          >
            <Sparkles className="w-4 h-4 text-[#14B8A6]" />
            <span>Calculate Kitchen Yield Savings</span>
          </button>
        </div>

        {/* Verification Guarantee */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#0F172A]/60 mt-12 font-medium">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#14B8A6]" />
            Complimentary Next-Day Cold Shipper
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-[#14B8A6]" />
            Zero Minimum Order Commitment for Testing
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            100% Unbroken -18°C Guarantee
          </span>
        </div>
      </div>
    </section>
  );
};
