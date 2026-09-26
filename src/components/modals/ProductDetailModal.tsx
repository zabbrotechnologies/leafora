import type { Product } from '../../types';
import { X, Sparkles, Check, Utensils, ShieldCheck } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestSample: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestSample,
}) => {
  if (!product) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0F172A]/60 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#F8FBFC] rounded-3xl shadow-2xl border border-white/80 overflow-y-auto no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md border border-[#B9E3F9]/60 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-md"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
          {/* Left Column: Product Image & Badges */}
          <div className="md:col-span-5 relative bg-[#0F172A]/5 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#B9E3F9]/40">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-bold uppercase text-[#0F172A]">
                {product.badge}
              </div>
              <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-mono font-bold">
                {product.freezeTemp}
              </div>
            </div>

            {/* Quick Specs Pill */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#B9E3F9]/50">
                <span className="text-[#0F172A]/60 font-mono">Harvest Window:</span>
                <strong className="text-[#0F172A]">{product.harvestWindow}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#B9E3F9]/50">
                <span className="text-[#0F172A]/60 font-mono">Shelf Life:</span>
                <strong className="text-[#0F172A]">{product.shelfLife}</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/80 border border-[#B9E3F9]/50">
                <span className="text-[#0F172A]/60 font-mono">Freezing Method:</span>
                <strong className="text-[#14B8A6]">{product.freezeMethod}</strong>
              </div>
            </div>
          </div>

          {/* Right Column: Full Product Dossier */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-[#14B8A6] font-bold tracking-widest uppercase">
                  {product.category}
                </span>
                {product.organicCert && (
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-[10px] font-bold text-[#14B8A6] border border-[#A8E6CF]">
                    100% ORGANIC
                  </span>
                )}
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A]">
                {product.name}
              </h3>
              <p className="text-sm font-medium text-[#0F172A]/60 mt-0.5">
                {product.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#0F172A]/80 mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Nutritional & Chemical Analysis */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>NUTRITIONAL & VITAL METRICS</span>
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {product.nutritionalHighlights.map((item, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white border border-[#B9E3F9]/50 text-xs flex justify-between">
                    <span className="text-[#0F172A]/60">{item.label}</span>
                    <strong className="font-mono text-[#0F172A]">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Culinary Pairings */}
            <div>
              <h4 className="text-xs font-mono font-bold tracking-wider text-[#0F172A] uppercase mb-2 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>RECOMMENDED CULINARY APPLICATIONS</span>
              </h4>
              <div className="space-y-1.5 text-xs text-[#0F172A]/80">
                {product.culinaryPairings.map((pairing, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#14B8A6] shrink-0" />
                    <span>{pairing}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Packaging Formats */}
            <div>
              <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase block mb-1">
                AVAILABLE PACKAGING SIZES
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.packSizes.map((size, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-[11px] font-mono text-[#0F172A]"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-[#B9E3F9]/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-1 text-[11px] text-[#0F172A]/50">
                <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
                <span>Cryogenic Cold-Chain Certified</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onRequestSample();
                }}
                className="px-6 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wider uppercase hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all shadow-md"
              >
                Request Sample Pack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
