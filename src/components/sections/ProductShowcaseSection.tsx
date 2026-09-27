import React, { useState } from 'react';
import type { Product } from '../../types';
import { PRODUCTS_DATA } from '../../data/mockData';
import { ArrowUpRight, Eye, ShieldCheck, Sparkles, Check, ThermometerSnowflake, Utensils } from 'lucide-react';

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onRequestSample: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseProps> = ({
  onSelectProduct,
  onRequestSample,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeProductId, setActiveProductId] = useState<string>('frozen-coconut');
  
  const categories = ['All', 'Staples', 'Masala & Gravy', 'Farm Greens'];

  const getFilteredProducts = () => {
    if (selectedCategory === 'All') return PRODUCTS_DATA;
    if (selectedCategory === 'Staples') {
      return PRODUCTS_DATA.filter((p) =>
        ['sweet-peas', 'sweet-corn', 'frozen-coconut', 'mixed-vegetables', 'broccoli'].includes(p.id)
      );
    }
    if (selectedCategory === 'Masala & Gravy') {
      return PRODUCTS_DATA.filter((p) =>
        ['masala-cubes', 'curry-base-cubes'].includes(p.id)
      );
    }
    if (selectedCategory === 'Farm Greens') {
      return PRODUCTS_DATA.filter((p) =>
        ['frozen-greens', 'broccoli'].includes(p.id)
      );
    }
    return PRODUCTS_DATA;
  };

  const filteredProducts = getFilteredProducts();

  // Find active product
  const activeProduct =
    PRODUCTS_DATA.find((p) => p.id === activeProductId) || filteredProducts[0] || PRODUCTS_DATA[0];

  const handleSelectProduct = (product: Product) => {
    setActiveProductId(product.id);
  };

  return (
    <section
      id="products"
      className="relative w-full py-24 sm:py-32 bg-[#F8FBFC] overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Subtle Dynamic Ambient Color Bloom matching active product */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[70vw] h-[70vw] rounded-full filter blur-3xl pointer-events-none opacity-25 transition-all duration-700 -z-10"
        style={{
          backgroundColor: activeProduct.heroColor || '#14B8A6',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-20">
        {/* Top Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-3 shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
              <span>Gourmet Cold-Press Cuisine • Leafora Fresh</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
              Interactive Product Discovery.
            </h2>
            <p className="text-sm sm:text-base text-[#0F172A]/70 mt-2 max-w-xl leading-relaxed">
              Explore stone-crushed masala cubes, pure coastal coconut blocks, and blanched farm greens frozen at -40°C. Select any specialty line to inspect culinary pairs and bio-potency.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-1.5 rounded-full border border-[#B9E3F9]/60 shadow-xs overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  const firstInCat = getFilteredProducts()[0];
                  if (firstInCat) setActiveProductId(firstInCat.id);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#0F172A]/60 hover:text-[#0F172A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Featured Hero Product Showcase (Dominant Presentation) */}
        <div className="glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl mb-10 transition-all duration-500 border border-[#B9E3F9]/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Featured Product Visual Canvas */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden bg-[#0F172A]/5 shadow-lg group">
                <img
                  key={activeProduct.id}
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />

                {/* Badges Over Image */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                  <span className="px-3.5 py-1.5 rounded-full bg-[#0F172A]/85 backdrop-blur-md border border-white/20 text-white text-xs font-mono font-semibold tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
                    {activeProduct.badge}
                  </span>
                </div>

                <div className="absolute top-4 right-4 z-20">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-[#0F172A] shadow-xs flex items-center gap-1">
                    <ThermometerSnowflake className="w-3.5 h-3.5 text-[#14B8A6]" />
                    {activeProduct.freezeTemp.split(' ')[0]}
                  </span>
                </div>

                {/* Inspect Button Pill on Image */}
                <button
                  onClick={() => onSelectProduct(activeProduct)}
                  className="absolute bottom-4 right-4 z-20 px-4 py-2 rounded-xl bg-white/95 hover:bg-white text-[#0F172A] text-xs font-bold flex items-center gap-2 shadow-md transition-transform duration-200 hover:scale-105 cursor-pointer"
                >
                  <Eye className="w-4 h-4 text-[#14B8A6]" />
                  <span>Inspect Full Specs</span>
                </button>
              </div>
            </div>

            {/* Right: Featured Product Specifications & Pairing Details */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase mb-1">
                  <span>SPECIALTY LINE</span>
                  <span>•</span>
                  <span>{activeProduct.harvestWindow}</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-heading font-black text-[#0F172A] tracking-tight">
                  {activeProduct.name}
                </h3>

                <p className="text-sm sm:text-base text-[#0F172A]/75 mt-3 leading-relaxed">
                  {activeProduct.description}
                </p>
              </div>

              {/* 4 Nutritional & Operational Highlights */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                {activeProduct.nutritionalHighlights.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-white/80 border border-[#B9E3F9]/50 shadow-xs flex flex-col justify-between"
                  >
                    <span className="text-[10px] font-mono text-[#0F172A]/55 uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-sm sm:text-base font-heading font-black text-[#0F172A] mt-0.5">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Culinary Pairings Chips */}
              <div className="space-y-2 pt-2 border-t border-[#B9E3F9]/40">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#0F172A]/70 uppercase tracking-wider">
                  <Utensils className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Ideal Culinary Applications</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.culinaryPairings.slice(0, 3).map((pair, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-emerald-50/80 border border-[#A8E6CF]/60 text-[#0F172A] text-xs font-medium"
                    >
                      {pair}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onSelectProduct(activeProduct)}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide shadow-md hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all cursor-pointer"
                >
                  <span>Inspect Full Specifications</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onRequestSample}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#0F172A] text-xs font-bold tracking-wide border border-[#B9E3F9]/60 hover:bg-white shadow-xs transition-all cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Request Sample Shipper</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Selector Rail (Interactive Thumbnail Cards) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono font-bold tracking-widest text-[#0F172A]/60 uppercase">
              SELECT SPECIALTY LINE TO PREVIEW ({filteredProducts.length} AVAILABLE)
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {filteredProducts.map((product) => {
              const isActive = product.id === activeProduct.id;
              return (
                <button
                  key={product.id}
                  onClick={() => handleSelectProduct(product)}
                  className={`relative p-3 rounded-2xl transition-all duration-300 flex flex-col items-center text-center cursor-pointer ${
                    isActive
                      ? 'bg-white shadow-lg border-2 border-[#14B8A6] scale-102'
                      : 'bg-white/60 hover:bg-white/90 border border-[#B9E3F9]/50 hover:shadow-md'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-[#0F172A]/5 relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />
                    {isActive && (
                      <div className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#14B8A6] ring-2 ring-white" />
                    )}
                  </div>

                  <span className="text-xs font-heading font-bold text-[#0F172A] truncate w-full">
                    {product.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#14B8A6] font-semibold mt-0.5">
                    {product.badge}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Trust Line */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#0F172A]/50 mt-12 pt-6 border-t border-[#B9E3F9]/40">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#14B8A6]" />
            <span>Non-GMO Project Verified • 100% Traceable Harvest • Zero Additives</span>
          </div>
          <div className="flex items-center gap-2 text-[#14B8A6] font-semibold">
            <Check className="w-3.5 h-3.5" />
            <span>Continuous -40°C Cryogenic Cold-Chain Certified</span>
          </div>
        </div>
      </div>
    </section>
  );
};
