import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../../types';
import { PRODUCTS_DATA } from '../../data/mockData';
import { ArrowUpRight, Eye, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductShowcaseProps {
  onSelectProduct: (product: Product) => void;
  onRequestSample: () => void;
}

export const ProductShowcaseSection: React.FC<ProductShowcaseProps> = ({
  onSelectProduct,
  onRequestSample,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', 'What We Offer', 'Staples'];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS_DATA
      : PRODUCTS_DATA.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean; isMobile: boolean };

        if (isDesktop) {
          // Calculate total horizontal scroll width on desktop
          const getScrollAmount = () => -(track.scrollWidth - window.innerWidth + 140);

          gsap.to(track, {
            x: getScrollAmount,
            ease: 'none',
            scrollTrigger: {
              trigger: container,
              start: 'top top',
              end: () => `+=${track.scrollWidth - window.innerWidth + 400}`,
              pin: true,
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          });
        }
      }
    );

    return () => mm.revert();
  }, [selectedCategory]);

  const scrollTrack = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const offset = direction === 'left' ? -340 : 340;
    
    if (window.innerWidth < 1024) {
      const parent = trackRef.current.parentElement;
      if (parent) {
        parent.scrollBy({ left: offset, behavior: 'smooth' });
      }
    } else {
      gsap.to(trackRef.current, {
        x: `+=${-offset}`,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="products"
      className="relative w-full min-h-screen lg:h-screen bg-[#F8FBFC] flex flex-col justify-between pt-24 md:pt-28 pb-8 md:pb-10 overflow-hidden border-t border-[#B9E3F9]/40"
    >
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 z-20">
        <div>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full frost-badge text-xs font-semibold tracking-wider text-[#0F172A] uppercase mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.6)]" />
            <span>Gourmet Cold-Press Cuisine • Leafora Fresh</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#0F172A] tracking-tight">
            What We Offer
          </h2>
          <p className="text-sm text-[#0F172A]/70 mt-1 max-w-xl">
            Capturing authentic Indian soul using gourmet cold-press art. Ready-to-melt aromatics, blanched farm greens, and pure coastal coconut blocks.
          </p>
        </div>

        {/* Category Filter Pills & Arrow Controls */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 bg-white/80 backdrop-blur-md p-1 rounded-full border border-[#B9E3F9]/60 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'text-[#0F172A]/60 hover:text-[#0F172A]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
            <button
              onClick={() => scrollTrack('left')}
              className="w-9 h-9 rounded-full bg-white/90 border border-[#B9E3F9]/60 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-xs"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollTrack('right')}
              className="w-9 h-9 rounded-full bg-white/90 border border-[#B9E3F9]/60 flex items-center justify-center text-[#0F172A] hover:bg-[#0F172A] hover:text-white transition-all shadow-xs"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      {/* Horizontal Scrolling Track */}
      <div className="w-full my-auto overflow-x-auto lg:overflow-visible no-scrollbar z-20 scroll-smooth">
        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-8 px-4 sm:px-6 md:px-16 w-max items-center py-4"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              data-cursor-type="product"
              data-cursor-label="INSPECT"
              onClick={() => onSelectProduct(product)}
              className="group relative w-[285px] xs:w-[320px] sm:w-[360px] md:w-[410px] shrink-0 glass-panel rounded-3xl p-5 sm:p-6 transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
            >
              {/* Top Meta Bar */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-white/90 border border-[#B9E3F9]/60 text-[10px] font-mono font-bold tracking-wider text-[#0F172A] uppercase shadow-xs">
                  {product.badge}
                </span>
                <span className="text-[11px] font-mono text-[#14B8A6] font-bold">
                  {product.freezeTemp.split(' ')[0]}
                </span>
              </div>

              {/* Product Image Container */}
              <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#0F172A]/5 shadow-inner">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-108 group-hover:-translate-y-1.5"
                  loading="lazy"
                />

                {/* Frost Glow Edge on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Inspect Button Pill */}
                <div className="absolute bottom-3 right-3 z-20 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[#0F172A] text-xs font-bold flex items-center gap-1.5 shadow-md transform translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <Eye className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Inspect Specs</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col gap-1.5 mb-4">
                <span className="text-[11px] font-mono text-[#0F172A]/50 uppercase tracking-widest">
                  {product.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-black text-[#0F172A] tracking-tight group-hover:text-[#14B8A6] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#0F172A]/70 line-clamp-2 leading-relaxed">
                  {product.tagline}
                </p>
              </div>

              {/* Nutrients / Highlights Bar */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#B9E3F9]/40 text-xs">
                {product.nutritionalHighlights.slice(0, 2).map((item, i) => (
                  <div key={i} className="p-2 rounded-xl bg-white/60 border border-[#B9E3F9]/40">
                    <span className="text-[9px] font-mono text-[#0F172A]/50 uppercase block">
                      {item.label}
                    </span>
                    <span className="text-xs font-bold text-[#0F172A] font-mono">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom Trigger Action */}
              <div className="mt-4 pt-3 flex items-center justify-between text-xs font-semibold text-[#0F172A]">
                <span className="group-hover:text-[#14B8A6] transition-colors">
                  View Full Specifications
                </span>
                <div className="w-7 h-7 rounded-full bg-white border border-[#B9E3F9]/60 flex items-center justify-center group-hover:bg-[#14B8A6] group-hover:text-white group-hover:border-[#14B8A6] transition-all">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}

          {/* End of Gallery Call to Action Card */}
          <div className="w-[300px] shrink-0 p-8 rounded-3xl bg-gradient-to-br from-[#0F172A] to-[#14B8A6]/80 text-white flex flex-col justify-between shadow-2xl h-[480px]">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono font-bold tracking-widest text-[#A8E6CF] uppercase">
                COMMERCIAL SAMPLE PROGRAM
              </span>
              <h3 className="text-2xl font-heading font-black">
                Taste the Difference in Your Kitchen.
              </h3>
              <p className="text-xs text-white/80 leading-relaxed">
                Qualified executive chefs, foodservice operators, and purchasing managers receive a curated cryogenic sample shipper at zero charge.
              </p>
            </div>

            <button
              onClick={onRequestSample}
              className="w-full py-3.5 rounded-2xl bg-white text-[#0F172A] text-xs font-bold tracking-wider uppercase hover:bg-[#A8E6CF] transition-colors shadow-lg flex items-center justify-center gap-2"
            >
              <span>Order Free Sample Box</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Progress hint */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-10 flex items-center justify-between text-[11px] font-mono text-[#0F172A]/50 z-20">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
          <span>Non-GMO Project Verified • 100% Traceable Harvest</span>
        </div>
        <span>{filteredProducts.length} SPECIALTY LINES ACTIVE</span>
      </div>
    </section>
  );
};
