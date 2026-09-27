import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Product } from '../../types';
import { PRODUCTS_DATA } from '../../data/mockData';
import { ArrowUpRight, Snowflake, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProductScrollDeckProps {
  onSelectProduct: (product: Product) => void;
  onRequestSample: () => void;
}

export const ProductScrollDeckSection: React.FC<ProductScrollDeckProps> = ({
  onSelectProduct,
  onRequestSample,
}) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // Take the 6 signature products for the minimal scroll deck
  const deckProducts = PRODUCTS_DATA.slice(0, 6);

  useEffect(() => {
    const section = sectionRef.current;
    const cardsContainer = cardsContainerRef.current;
    if (!section || !cardsContainer) return;

    const cards = gsap.utils.toArray<HTMLElement>('.deck-card', cardsContainer);
    if (cards.length === 0) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isDesktop: '(min-width: 1024px)',
        isMobile: '(max-width: 1023px)',
      },
      () => {
        // Initial setup: First card at center (xPercent: 0), subsequent cards positioned off-screen to the right (xPercent: 120)
        cards.forEach((card, i) => {
          if (i === 0) {
            gsap.set(card, {
              xPercent: 0,
              opacity: 1,
              scale: 1,
              zIndex: 10,
              filter: 'blur(0px)',
            });
          } else {
            gsap.set(card, {
              xPercent: 120,
              opacity: 0,
              scale: 0.92,
              zIndex: 5,
              filter: 'blur(8px)',
            });
          }
        });

        // Timeline with pin scrub
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${cards.length * 85}%`,
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
            onUpdate: (self) => {
              const idx = Math.min(
                cards.length - 1,
                Math.floor(self.progress * cards.length)
              );
              setActiveIndex(idx);
            },
          },
        });

        // Sequence: card 0 slides out to left while card 1 enters from right, etc.
        for (let i = 0; i < cards.length - 1; i++) {
          const currentCard = cards[i];
          const nextCard = cards[i + 1];

          // Current card slides out to the left
          tl.to(
            currentCard,
            {
              xPercent: -120,
              opacity: 0,
              scale: 0.92,
              filter: 'blur(8px)',
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          // Next card slides in from the right to center
          tl.to(
            nextCard,
            {
              xPercent: 0,
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
              zIndex: 10 + i + 1,
              duration: 1,
              ease: 'power2.inOut',
            },
            `step-${i}`
          );

          // Hold slightly at center stage for comfortable reading
          tl.to({}, { duration: 0.35 });
        }
      }
    );

    return () => mm.revert();
  }, [deckProducts.length]);

  return (
    <section
      ref={sectionRef}
      id="product-deck"
      className="relative w-full h-screen bg-[#F8FBFC] flex flex-col justify-between pt-24 pb-10 px-4 sm:px-8 md:px-14 overflow-hidden border-t border-[#B9E3F9]/40 z-20"
    >
      {/* Background Soft Glow matching active card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] h-[65vw] rounded-full filter blur-3xl pointer-events-none opacity-20 transition-all duration-700 -z-10"
        style={{
          backgroundColor: deckProducts[activeIndex]?.heroColor || '#14B8A6',
        }}
      />

      {/* Header Minimal Title Bar */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between z-20">
        <div>
          <span className="text-xs font-mono font-bold tracking-widest text-[#14B8A6] uppercase flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] shadow-[0_0_8px_rgba(20,184,166,0.8)]" />
            Exclusive Selection • Cryo-Locked Integrity
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-[#0F172A] tracking-tight mt-1">
            Our Exclusive Products
          </h2>
        </div>

        {/* Minimal Progress Step Indicator */}
        <div className="flex items-center gap-3 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-[#B9E3F9]/60 shadow-xs">
          <span className="text-xs font-mono font-bold text-[#0F172A]">
            0{activeIndex + 1} <span className="text-[#0F172A]/40">/ 0{deckProducts.length}</span>
          </span>
          <div className="flex items-center gap-1.5">
            {deckProducts.map((_, idx) => (
              <div
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  activeIndex === idx
                    ? 'w-6 bg-[#14B8A6]'
                    : 'w-1.5 bg-[#0F172A]/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Centered Stage: Single Active Card */}
      <div
        ref={cardsContainerRef}
        className="relative max-w-4xl mx-auto w-full flex-1 flex items-center justify-center my-auto min-h-[380px] sm:min-h-[440px] z-20"
      >
        {deckProducts.map((product, idx) => (
          <div
            key={product.id}
            className="deck-card absolute inset-x-0 mx-auto w-full max-w-3xl glass-panel rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#B9E3F9]/70 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-white/90 backdrop-blur-xl"
          >
            {/* Left: Clean Product Visual */}
            <div className="w-full sm:w-1/2 aspect-[4/3] sm:aspect-square rounded-2xl overflow-hidden bg-[#0F172A]/5 relative shadow-md shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/60 via-transparent to-transparent pointer-events-none" />

              {/* Minimal Top Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-[#0F172A]/80 backdrop-blur-md text-white text-[11px] font-mono font-semibold tracking-wider">
                  {product.badge}
                </span>
              </div>

              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <div className="flex items-center gap-1.5 font-mono text-[11px] text-[#A8E6CF]">
                  <Snowflake className="w-3.5 h-3.5" />
                  <span>-40°C IQF</span>
                </div>
                <span className="font-mono text-[11px] opacity-80">{product.harvestWindow.split(' ')[0]}</span>
              </div>
            </div>

            {/* Right: Minimal Core Details */}
            <div className="w-full sm:w-1/2 flex flex-col justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono font-bold tracking-widest text-[#14B8A6] uppercase block mb-1">
                  EXCLUSIVE SELECTION 0{idx + 1}
                </span>
                <h3 className="text-2xl sm:text-3xl font-heading font-black text-[#0F172A] tracking-tight">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#0F172A]/75 mt-2 line-clamp-3 leading-relaxed">
                  {product.subtitle || product.tagline}
                </p>
              </div>

              {/* 2 Key Minimal Metrics */}
              <div className="grid grid-cols-2 gap-2.5 pt-1">
                {product.nutritionalHighlights.slice(0, 2).map((h, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-white/80 border border-[#B9E3F9]/50 shadow-2xs"
                  >
                    <span className="text-[10px] font-mono text-[#0F172A]/50 uppercase block">
                      {h.label}
                    </span>
                    <span className="text-xs sm:text-sm font-heading font-bold text-[#0F172A]">
                      {h.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Minimal CTAs */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectProduct(product)}
                  className="px-5 py-2.5 rounded-full bg-[#0F172A] text-white text-xs font-bold tracking-wide hover:bg-[#14B8A6] hover:text-[#0F172A] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Quick Specs</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={onRequestSample}
                  className="px-4 py-2.5 rounded-full bg-white text-[#0F172A] text-xs font-bold tracking-wide border border-[#B9E3F9]/60 hover:bg-white shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#14B8A6]" />
                  <span>Sample</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
