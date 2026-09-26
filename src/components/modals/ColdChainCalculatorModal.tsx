import React, { useState } from 'react';
import { X, Sparkles, DollarSign, Clock, Trash2, ArrowRight, ShieldCheck } from 'lucide-react';

interface ColdChainCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestSample: () => void;
}

export const ColdChainCalculatorModal: React.FC<ColdChainCalculatorModalProps> = ({
  isOpen,
  onClose,
  onRequestSample,
}) => {
  const [monthlyVolumeKg, setMonthlyVolumeKg] = useState<number>(450);
  const [hourlyLaborRate, setHourlyLaborRate] = useState<number>(24);
  const [wastePercentage, setWastePercentage] = useState<number>(28);

  if (!isOpen) return null;

  // Calculations
  const annualVolumeKg = monthlyVolumeKg * 12;
  const annualWastePreventedKg = Math.round(annualVolumeKg * (wastePercentage / 100));
  // Prep labor saved: roughly 0.08 hours per kg of peeling/trimming/washing
  const annualLaborHoursSaved = Math.round(annualVolumeKg * 0.08);
  const annualLaborCostSaved = Math.round(annualLaborHoursSaved * hourlyLaborRate);
  // Ingredient cost waste saved (assuming avg $3.80/kg raw produce cost)
  const annualIngredientWasteDollars = Math.round(annualWastePreventedKg * 3.8);
  const totalAnnualSavings = annualLaborCostSaved + annualIngredientWasteDollars;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/70 backdrop-blur-md transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#F8FBFC] rounded-3xl shadow-2xl border border-white/80 overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-[#B9E3F9]/60 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-sm"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-10">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full frost-badge text-[11px] font-mono font-bold tracking-wider text-[#0F172A] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>COMMERCIAL GASTRONOMY ROI MODEL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
              Calculate Your Kitchen Savings
            </h3>
            <p className="text-xs sm:text-sm text-[#0F172A]/70 mt-1">
              See the exact financial and labor savings of transitioning from perishable raw produce to 100% edible yield GLACIAL™ IQF ingredients.
            </p>
          </div>

          {/* Interactive Sliders */}
          <div className="space-y-5 mb-8">
            {/* Slider 1: Monthly Volume */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                <span className="uppercase">Monthly Produce Usage (kg):</span>
                <span className="px-2.5 py-1 rounded-md bg-[#0F172A] text-white">
                  {monthlyVolumeKg.toLocaleString()} kg / month
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="5000"
                step="50"
                value={monthlyVolumeKg}
                onChange={(e) => setMonthlyVolumeKg(Number(e.target.value))}
                className="w-full accent-[#14B8A6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#0F172A]/40 mt-1">
                <span>50 kg (Boutique)</span>
                <span>2,500 kg (Restaurant)</span>
                <span>5,000+ kg (Hotel/Catering)</span>
              </div>
            </div>

            {/* Slider 2: Kitchen Labor Rate */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                <span className="uppercase">Kitchen Prep Cook Hourly Rate ($):</span>
                <span className="px-2.5 py-1 rounded-md bg-[#0F172A] text-white font-mono">
                  ${hourlyLaborRate} / hr
                </span>
              </div>
              <input
                type="range"
                min="12"
                max="45"
                step="1"
                value={hourlyLaborRate}
                onChange={(e) => setHourlyLaborRate(Number(e.target.value))}
                className="w-full accent-[#14B8A6] cursor-pointer"
              />
            </div>

            {/* Slider 3: Current Market Fresh Trim Waste */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono font-bold text-[#0F172A] mb-1.5">
                <span className="uppercase">Current Raw Waste & Trimmings (%):</span>
                <span className="px-2.5 py-1 rounded-md bg-[#14B8A6] text-[#0F172A] font-bold font-mono">
                  {wastePercentage}% Trim Loss
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="45"
                step="1"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(Number(e.target.value))}
                className="w-full accent-[#14B8A6] cursor-pointer"
              />
            </div>
          </div>

          {/* Results Display Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0F172A] to-[#1e293b] text-white shadow-xl mb-6">
            <span className="text-[10px] font-mono font-bold tracking-widest text-[#A8E6CF] uppercase block mb-1">
              ESTIMATED ANNUAL FINANCIAL IMPACT
            </span>
            <div className="text-4xl sm:text-5xl font-heading font-black text-white tracking-tight mb-4">
              ${totalAnnualSavings.toLocaleString()}
              <span className="text-sm font-normal text-white/60 ml-2 font-mono">/ year saved</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#A8E6CF] mb-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase">Labor Saved</span>
                </div>
                <strong className="text-base font-heading">{annualLaborHoursSaved} Hours</strong>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#B9E3F9] mb-1">
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase">Waste Prevented</span>
                </div>
                <strong className="text-base font-heading">{annualWastePreventedKg.toLocaleString()} kg</strong>
              </div>

              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 text-[#A8E6CF] mb-1">
                  <DollarSign className="w-3.5 h-3.5" />
                  <span className="text-[10px] font-mono uppercase">Yield Ratio</span>
                </div>
                <strong className="text-base font-heading">100% Usable</strong>
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#0F172A]/60">
              <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
              <span>Based on commercial foodservice hospitality benchmarks</span>
            </div>

            <button
              onClick={() => {
                onClose();
                onRequestSample();
              }}
              className="w-full sm:w-auto px-7 py-3 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center justify-center gap-2 shadow-md"
            >
              <span>Request Kitchen Sample Pack</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
