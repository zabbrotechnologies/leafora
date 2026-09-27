import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';
import type { Product } from '../types';
import {
  Search,
  Filter,
  ArrowUpRight,
  Sparkles,
  Snowflake,
  ShieldCheck,
  Check,
  RotateCcw,
} from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct?: (product: Product) => void;
  onRequestSample: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onRequestSample }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'What We Offer',
    'Staples',
    'Vegetables',
    'Purees & Grated',
    'Chef Mixes',
  ];

  // Filter products based on category and live search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'What We Offer' && product.category === 'What We Offer');

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.badge.toLowerCase().includes(query) ||
        product.culinaryPairings.some((p) => p.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <main className="relative min-h-screen pt-28 sm:pt-36 pb-24 bg-[#F8FBFC] text-[#0F172A] z-20 overflow-hidden">
      {/* Dynamic Background Glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[80vw] h-[400px] rounded-full ambient-glow-cyan opacity-25 filter blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 relative z-10">
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-4 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            <span>Complete Commercial & Retail Catalogue</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#0F172A] tracking-tight">
            Our Products.
          </h1>
          <p className="text-base sm:text-lg text-[#0F172A]/75 mt-4 leading-relaxed">
            Discover cryogenically locked vegetables, cold-pressed coconut blocks, and stone-crushed masala cubes harvested at biological peak and frozen at -40°C.
          </p>
        </div>

        {/* Filter and Search Bar Controls */}
        <div className="glass-panel rounded-3xl p-4 sm:p-6 mb-12 shadow-lg border border-[#B9E3F9]/60 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative w-full md:w-80 shrink-0">
            <Search className="w-4 h-4 text-[#0F172A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products or ingredients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/90 border border-[#B9E3F9]/60 text-xs font-medium text-[#0F172A] placeholder:text-[#0F172A]/40 focus:outline-none focus:ring-2 focus:ring-[#14B8A6]/50 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#0F172A]/40 hover:text-[#0F172A]"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            <div className="hidden lg:flex items-center gap-1 text-xs text-[#0F172A]/50 font-mono mr-2">
              <Filter className="w-3.5 h-3.5" />
              <span>CATEGORY:</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? 'bg-[#0F172A] text-white shadow-md'
                    : 'bg-white/80 hover:bg-white text-[#0F172A]/70 border border-[#B9E3F9]/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid Header Counter */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-xs font-mono font-bold tracking-widest text-[#0F172A]/60 uppercase">
            SHOWING {filteredProducts.length} OF {PRODUCTS_DATA.length} PRODUCTS
          </span>
          {(selectedCategory !== 'All' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14B8A6] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="glass-panel rounded-3xl overflow-hidden shadow-xl border border-[#B9E3F9]/60 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div>
                  {/* Product Image Stage */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-[#0F172A]/5">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent pointer-events-none" />

                    {/* Badge Overlays */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-[#0F172A]/85 backdrop-blur-md text-white text-[11px] font-mono font-semibold tracking-wider">
                        {product.badge}
                      </span>
                    </div>

                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[11px] font-mono font-bold text-[#0F172A] shadow-xs flex items-center gap-1">
                        <Snowflake className="w-3 h-3 text-[#14B8A6]" />
                        -40°C IQF
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-mono">
                      <span className="text-[#A8E6CF] font-bold">{product.category}</span>
                      <span className="text-white/60"> • {product.harvestWindow.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <h2 className="text-2xl font-heading font-black text-[#0F172A] tracking-tight">
                      {product.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-[#0F172A]/75 mt-2 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>

                    {/* 2 Key Bio-Potency Badges */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {product.nutritionalHighlights.slice(0, 2).map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-white/80 border border-[#B9E3F9]/50 shadow-2xs"
                        >
                          <span className="text-[9px] font-mono text-[#0F172A]/50 uppercase block truncate">
                            {item.label}
                          </span>
                          <span className="text-xs font-heading font-bold text-[#0F172A]">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Culinary Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {product.culinaryPairings.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-emerald-50/80 border border-[#A8E6CF]/50 text-[#0F172A] text-[11px] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer CTAs */}
                <div className="p-6 pt-0 border-t border-[#B9E3F9]/30 mt-4 flex items-center gap-3">
                  <Link
                    to={`/products/${product.id}`}
                    className="flex-1 py-3 px-4 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Inspect Details</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to={`/contact?product=${encodeURIComponent(product.name)}&type=product-sample`}
                    className="py-3 px-4 rounded-full bg-white text-[#0F172A] text-xs font-bold tracking-wide border border-[#B9E3F9]/60 hover:bg-white shadow-2xs transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                    <span>Enquire</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="glass-panel rounded-3xl p-12 text-center max-w-lg mx-auto my-12">
            <div className="w-12 h-12 rounded-full bg-[#14B8A6]/15 border border-[#14B8A6]/30 flex items-center justify-center text-[#14B8A6] mx-auto mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-[#0F172A]">
              No products found
            </h3>
            <p className="text-xs sm:text-sm text-[#0F172A]/70 mt-2">
              No products matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-6 px-6 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-bold hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all cursor-pointer"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Bottom Commercial B2B Strip */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[#A8E6CF] text-xs font-mono uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Commercial Cold-Chain Distribution</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold">
              Require Custom Pack Formats or Contract Supply?
            </h3>
            <p className="text-xs sm:text-sm text-white/75 mt-2 max-w-xl">
              We provide temperature-controlled institutional 5kg and 10kg bulk cases for luxury hotels, commercial kitchens, and cloud kitchen networks.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={onRequestSample}
              className="px-6 py-3.5 rounded-full bg-[#14B8A6] text-[#0F172A] text-xs font-bold hover:bg-white transition-all shadow-md cursor-pointer"
            >
              Request Commercial Sample Shipper
            </button>
            <Link
              to="/contact?type=business-enquiry"
              className="px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all"
            >
              Commercial B2B Inquiry
            </Link>
          </div>
        </div>

        {/* Verification Checkpoint */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-[#0F172A]/50 mt-10 pt-6 border-t border-[#B9E3F9]/40">
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
    </main>
  );
};
