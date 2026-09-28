import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { PRODUCTS_DATA } from '../../data/mockData';

export const ProductShowcaseSection: React.FC = () => {
  // Show the 4 flagship verified products on the homepage
  const flagshipProducts = PRODUCTS_DATA.slice(0, 4);

  return (
    <section id="featured-products" className="py-20 md:py-28 bg-[#F3EFEA] border-t border-[#E4DDD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
              <span>Flagship Harvest Staples</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] tracking-tight">
              Essential Ingredients, Prepped at Source.
            </h2>
            <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
              Organically grown, cold-pressed, or stone-crushed, then flash-frozen at -40°C to lock in real agricultural flavor.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#374321] hover:text-[#586E2B] transition-colors py-2 shrink-0"
          >
            <span>View All 6 Products & Specs</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid: Large, Clean, Visual, Easy to Understand */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {flagshipProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group flex flex-col justify-between rounded-3xl bg-white border border-[#E4DDD4] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-10px_rgba(55,67,33,0.1)]"
            >
              {/* Product Image */}
              <div className="aspect-[4/3] bg-[#F8F6F5] overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#22241D]/80 backdrop-blur-xs text-[#F8F6F5] text-[10px] font-bold uppercase tracking-wider">
                  {product.badge}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col justify-between flex-grow space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-wider text-[#8DA256] block">
                    {product.category}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-[#22241D] group-hover:text-[#374321] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-[#575D4E] leading-relaxed line-clamp-2">
                    {product.subtitle || product.tagline}
                  </p>
                </div>

                {/* Practical Verified Highlights */}
                <div className="pt-4 border-t border-[#E4DDD4] flex items-center justify-between text-xs font-semibold text-[#374321]">
                  <span>View Product Details</span>
                  <div className="w-7 h-7 rounded-full bg-[#F3EFEA] border border-[#E4DDD4] group-hover:bg-[#374321] group-hover:text-white transition-colors flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom Editorial Callout */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-[#E4DDD4] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base font-bold text-[#22241D]">
              Need Custom Pack Sizes or Commercial Foodservice Supply?
            </h4>
            <p className="text-xs sm:text-sm text-[#575D4E]">
              We supply retail packs (200g–500g) and chef cartons (2.5kg–10kg) with unbroken cold-chain logistics.
            </p>
          </div>
          <Link
            to="/contact?type=commercial-supply"
            className="px-6 py-3 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-all shrink-0"
          >
            Commercial Supply Inquiry
          </Link>
        </div>

      </div>
    </section>
  );
};
