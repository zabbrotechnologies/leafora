import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';
import { Search, ArrowUpRight, Check, X } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Coconut & Bases',
    'Aromatics & Cubes',
    'Curry Bases',
    'Farm Greens',
    'Vegetables & Peas',
  ];

  // Filter products based on selected category and live search query
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category.toLowerCase() === selectedCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
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
    <main className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-6 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>Harvest Staples Collection</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] tracking-tight">
            Vegetables & Aromatics, Frozen at Peak Flavor.
          </h1>

          <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
            Every product is harvested at biological peak and flash-frozen within hours. Zero chemical preservatives, zero kitchen prep waste, and 100% usable food.
          </p>
        </div>

        {/* Filter Bar & Search Input */}
        <div className="p-4 sm:p-6 rounded-3xl bg-[#F3EFEA] border border-[#E4DDD4] mb-12 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      isSelected
                        ? 'bg-[#374321] text-[#F8F6F5] shadow-xs'
                        : 'bg-white text-[#22241D]/75 border border-[#E4DDD4] hover:bg-white hover:text-[#22241D]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Live Search Input */}
            <div className="relative min-w-[240px] sm:min-w-[280px]">
              <Search className="w-4 h-4 text-[#575D4E] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search ingredients..."
                className="w-full pl-9 pr-8 py-2.5 rounded-full bg-white border border-[#E4DDD4] text-xs text-[#22241D] placeholder:text-[#575D4E]/60 focus:outline-none focus:border-[#374321] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#575D4E] hover:text-[#22241D]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

          {/* Active Filter Metrics */}
          <div className="flex items-center justify-between text-xs text-[#575D4E] pt-2 border-t border-[#E4DDD4]/60">
            <span>
              Showing <strong className="text-[#22241D]">{filteredProducts.length}</strong> of{' '}
              {PRODUCTS_DATA.length} products
            </span>
            {(selectedCategory !== 'All' || searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="font-semibold text-[#374321] hover:underline cursor-pointer"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl bg-white border border-[#E4DDD4] p-8 space-y-4">
            <h3 className="text-xl font-heading font-bold text-[#22241D]">
              No harvest products found
            </h3>
            <p className="text-sm text-[#575D4E] max-w-md mx-auto">
              We couldn't find any items matching "{searchQuery}" in category "{selectedCategory}".
            </p>
            <button
              onClick={handleResetFilters}
              className="px-6 py-2.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group flex flex-col justify-between rounded-3xl bg-white border border-[#E4DDD4] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-10px_rgba(55,67,33,0.1)]"
              >
                {/* Image */}
                <Link to={`/products/${product.id}`} className="aspect-[16/11] bg-[#F8F6F5] overflow-hidden relative block">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#22241D]/80 backdrop-blur-xs text-[#F8F6F5] text-[10px] font-bold uppercase tracking-wider">
                    {product.badge}
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow space-y-5">
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-mono uppercase tracking-wider text-[#8DA256] block">
                      {product.category}
                    </span>
                    <Link to={`/products/${product.id}`}>
                      <h2 className="text-2xl font-heading font-black text-[#22241D] group-hover:text-[#374321] transition-colors">
                        {product.name}
                      </h2>
                    </Link>
                    <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed line-clamp-2">
                      {product.subtitle || product.tagline}
                    </p>
                  </div>

                  {/* Highlights */}
                  <div className="pt-3 space-y-2 text-xs text-[#575D4E]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8DA256] shrink-0" />
                      <span>{product.packSizes[0]}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#8DA256] shrink-0" />
                      <span>Shelf Life: {product.shelfLife}</span>
                    </div>
                  </div>

                  {/* Dual Action Buttons */}
                  <div className="pt-2 flex items-center gap-3">
                    <Link
                      to={`/products/${product.id}`}
                      className="flex-1 py-3 px-4 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold text-center hover:bg-[#48572B] transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>View Specs</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#8DA256]" />
                    </Link>

                    <Link
                      to={`/contact?product=${encodeURIComponent(product.name)}&type=product-sample`}
                      className="py-3 px-5 rounded-full bg-[#F3EFEA] text-[#22241D] text-xs font-bold border border-[#E4DDD4] hover:bg-white transition-colors"
                    >
                      Enquire
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
};
