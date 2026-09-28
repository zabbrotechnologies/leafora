import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Sparkles, Check, ArrowRight, Snowflake, Utensils } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CookingTechnique {
  title: string;
  category: string;
  meltTime: string;
  image: string;
  headline: string;
  steps: string[];
  bestFor: string[];
  proTip: string;
}

const COOKING_TECHNIQUES: CookingTechnique[] = [
  {
    title: 'Pure Coconut Blocks',
    category: 'Coconut & Bases',
    meltTime: '30–45 Seconds',
    image: '/images/frozen_coconut.jpg',
    headline: 'Instant fresh coconut creaminess without scraping or grating shells.',
    steps: [
      'Drop 1–2 frozen blocks directly into hot boiling gravies, sambar, or coastal fish curry.',
      'For Chutney: Place 1 frozen block in a blender with roasted chana dal, green chillies, and 60ml warm water. Blend for 25 seconds for silky South Indian chutney.',
      'For Avial & Kootu: Stir the block into simmered vegetables during the final 3 minutes of cooking.',
    ],
    bestFor: ['Idli & Dosa Chutney', 'Traditional Kerala Avial', 'Malabar Fish Curry', 'Elaneer Payasam'],
    proTip: 'Never thaw at room temperature before blending. The natural friction of the blender melts the frozen micro-crystals into velvet milk instantly.',
  },
  {
    title: 'Stone-Crushed Masala Cubes',
    category: 'Aromatics & Cubes',
    meltTime: '15–20 Seconds',
    image: '/images/masala_cubes.jpg',
    headline: 'Hot pan tadka in seconds without peeling, crushing, or oil splatters.',
    steps: [
      'Heat 1–2 tablespoons of mustard oil or desi ghee in a pan or kadai until hot.',
      'Drop 1 frozen cube directly into the hot oil. No pre-thaw required.',
      'Swirl gently with a spatula. The cube dissolves in 15 seconds, releasing raw gingerol and allicin aromatics.',
      'Add your whole spices and chopped vegetables immediately.',
    ],
    bestFor: ['Dal Tadka & Sambar', 'Dum Biryani Gravy Bases', 'Everyday Homestyle Subzis', 'Pan Marinades'],
    proTip: 'Because Leafora binds free moisture cryogenically without added water, the cube does not aggressively sputter or pop like wet market paste.',
  },
  {
    title: 'Cryo Farm Greens',
    category: 'Farm Greens',
    meltTime: '45–60 Seconds',
    image: '/images/frozen_greens.jpg',
    headline: '100% edible leaves without sorting roots, dirt, or bitter yellow stems.',
    steps: [
      'Add frozen portions directly to your simmered dal, curries, or saute pan in the final 2 minutes of cooking.',
      'Cover with a lid for 45 seconds to let trapped steam distribute heat through the leaves.',
      'Stir once and turn off the flame. The chlorophyll stays vibrant emerald green without over-wilting into dull olive.',
    ],
    bestFor: ['Dal Palak & Saag', 'Drumstick Leaf / Moringa Poriyal', 'Methi Thepla & Parathas', 'Herb Chutneys'],
    proTip: 'Do not boil farm greens for longer than 3 minutes. The cryogenic micro-steam lock at harvest means the cellular fiber is already softened.',
  },
  {
    title: 'Cryogenic Sweet Garden Peas',
    category: 'Harvest Staples',
    meltTime: '60–90 Seconds',
    image: '/images/hero_frozen_macro.jpg',
    headline: 'Plump, naturally sweet peas that stay firm with zero skin wrinkling.',
    steps: [
      'Toss frozen peas directly into hot pulao, fried rice, pasta, or matar paneer.',
      'Simmer on gentle heat for 90 seconds.',
      'The sugars and moisture remain trapped inside the outer membrane, giving you that distinctive fresh harvest "pop" in every bite.',
    ],
    bestFor: ['Matar Paneer & Aloo Matar', 'Dum Pulao & Biryani', 'Upma & Vegetable Poha', 'Salads & Stir-Fries'],
    proTip: 'Never microwave or soak in hot water beforehand. Immediate pan heat activates the natural sweetness while preventing waterlogged sogginess.',
  },
];

export const CulinaryGuidePage: React.FC = () => {
  const containerRef = useRef<HTMLElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const goldenRuleRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const benchmarkRef = useRef<HTMLDivElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Header smooth fade up
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }
        );
      }

      // Golden Rule card entrance
      if (goldenRuleRef.current) {
        gsap.fromTo(
          goldenRuleRef.current,
          { opacity: 0, y: 35, scale: 0.985 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: goldenRuleRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Technique cards staggered entrance
      if (gridRef.current && gridRef.current.children.length > 0) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Benchmark table reveal
      if (benchmarkRef.current) {
        gsap.fromTo(
          benchmarkRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: benchmarkRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Bottom CTA card reveal
      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: ctaRef.current,
              start: 'top 90%',
              once: true,
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={containerRef} className="relative min-h-screen pt-32 pb-24 bg-[#F8F6F5] text-[#22241D] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 space-y-16 sm:space-y-20">
        
        {/* Page Hero Header */}
        <div ref={headerRef} className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
            <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
            <span>KITCHEN & CULINARY MANUAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
            How to cook with Leafora Fresh produce.
          </h1>

          <p className="text-lg sm:text-xl text-[#575D4E] leading-relaxed">
            Cryogenically locked ingredients behave differently than conventional thawed groceries. Here is everything you need to know about pan melting, direct dosage, and zero-prep cooking.
          </p>
        </div>

        {/* The Golden Rule Banner (Clean Single Border Card) */}
        <div
          ref={goldenRuleRef}
          className="rounded-3xl bg-[#374321] text-[#F8F6F5] p-8 sm:p-12 relative overflow-hidden shadow-sm"
        >
          <div className="max-w-3xl space-y-5 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-mono font-bold tracking-wider text-[#A8E6CF] uppercase">
              <Snowflake className="w-3.5 h-3.5" />
              <span>THE GOLDEN RULE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-heading font-black leading-tight">
              Never thaw. Never pre-defrost. Toss directly into the hot pan.
            </h2>

            <p className="text-sm sm:text-base text-[#DED6CC] leading-relaxed">
              When frozen vegetables sit on a counter at room temperature to thaw, cellular walls undergo slow thermal stress and release natural moisture, leading to limp, soggy textures. Because Leafora flash-freezes produce at -40°C, microscopic ice crystals melt in under 30 seconds when introduced directly to hot cooking temperatures, preserving crisp cell turgor and intense aromatics.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-semibold text-[#A8E6CF]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Zero Thaw Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Zero Nutrient Leach</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Retains Emerald Color</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cooking Techniques Grid (Clean Single Border Cards) */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#22241D] tracking-tight">
              Techniques by Product Category
            </h2>
            <p className="text-sm text-[#575D4E]">
              Specific temperatures, pan melt times, and blending guidelines for our harvest staples.
            </p>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {COOKING_TECHNIQUES.map((tech) => (
              <div
                key={tech.title}
                className="group rounded-3xl bg-white border border-[#E4DDD4] overflow-hidden flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-md hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#F3EFEA]">
                  <img
                    src={tech.image}
                    alt={tech.title}
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-104"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 bg-[#22241D]/80 backdrop-blur-md text-[#F8F6F5] px-3.5 py-1.5 rounded-full border border-white/20 text-[10px] font-mono font-bold tracking-wider uppercase">
                    {tech.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-md text-[#374321] px-3.5 py-1.5 rounded-full border border-[#E4DDD4] text-xs font-bold flex items-center gap-1.5 shadow-sm">
                    <Clock className="w-3.5 h-3.5 text-[#8DA256]" />
                    <span>Melt: {tech.meltTime}</span>
                  </div>
                </div>

                {/* Details Content */}
                <div className="p-6 sm:p-8 space-y-6 flex-grow">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-heading font-black text-[#22241D]">
                      {tech.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#575D4E] leading-relaxed">
                      {tech.headline}
                    </p>
                  </div>

                  {/* Step by step usage */}
                  <div className="space-y-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8DA256] block">
                      Kitchen Application
                    </span>
                    <ul className="space-y-2.5">
                      {tech.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#22241D]">
                          <span className="w-5 h-5 rounded-full bg-[#F3EFEA] border border-[#E4DDD4] text-[#374321] text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Pairings */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#8DA256] block">
                      Best For
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {tech.bestFor.map((item, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-[#F8F6F5] border border-[#E4DDD4] text-[11px] font-medium text-[#575D4E]"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pro Tip Box */}
                  <div className="p-4 rounded-2xl bg-[#F3EFEA] border border-[#E4DDD4] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-[#374321]">
                      <Sparkles className="w-3.5 h-3.5 text-[#8DA256]" />
                      <span>Chef’s Secret</span>
                    </div>
                    <p className="text-xs text-[#575D4E] leading-relaxed">
                      {tech.proTip}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kitchen Prep Economics: Fresh Raw vs Leafora Frozen */}
        <div
          ref={benchmarkRef}
          className="rounded-3xl bg-white border border-[#E4DDD4] p-6 sm:p-10 space-y-8 shadow-xs"
        >
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <Utensils className="w-4 h-4" />
              <span>KITCHEN EFFICIENCY BENCHMARK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-[#22241D] tracking-tight">
              How Leafora changes kitchen economics.
            </h2>
            <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
              Comparison between fresh market raw produce preparation and ready-to-pan Leafora cryogenic packs.
            </p>
          </div>

          {/* Clean Editorial Comparison Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E4DDD4] text-[#575D4E] uppercase text-[10px] sm:text-[11px] font-bold tracking-wider">
                  <th className="py-4 pr-4">Attribute</th>
                  <th className="py-4 px-4 bg-[#F8F6F5] rounded-t-xl text-[#575D4E]">Market Raw Produce</th>
                  <th className="py-4 px-4 bg-[#374321] text-white rounded-t-xl">Leafora Fresh Harvest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4DDD4]/70">
                <tr>
                  <td className="py-4 pr-4 font-bold text-[#22241D]">Prep Labor & Clean Time</td>
                  <td className="py-4 px-4 bg-[#F8F6F5] text-[#575D4E]">25 to 45 mins peeling, washing & chopping</td>
                  <td className="py-4 px-4 bg-[#374321]/5 font-bold text-[#374321]">0 seconds — Direct pan drop</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-bold text-[#22241D]">Edible Usable Yield</td>
                  <td className="py-4 px-4 bg-[#F8F6F5] text-[#575D4E]">55% to 65% (stems, skin & spoilage tossed)</td>
                  <td className="py-4 px-4 bg-[#374321]/5 font-bold text-[#374321]">100% Edible Net Weight</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-bold text-[#22241D]">Flavor & Vitamin Peak</td>
                  <td className="py-4 px-4 bg-[#F8F6F5] text-[#575D4E]">Degrades 8–12% per day in transit</td>
                  <td className="py-4 px-4 bg-[#374321]/5 font-bold text-[#374321]">Locked within 2 hours of sunrise harvest</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-bold text-[#22241D]">Safe Shelf Life</td>
                  <td className="py-4 px-4 bg-[#F8F6F5] text-[#575D4E]">2 to 4 days before wilting or mold</td>
                  <td className="py-4 px-4 bg-[#374321]/5 font-bold text-[#374321]">18 to 24 Months at -18°C</td>
                </tr>
                <tr>
                  <td className="py-4 pr-4 font-bold text-[#22241D]">Chemical Preservatives</td>
                  <td className="py-4 px-4 bg-[#F8F6F5] text-[#575D4E]">Often coated with wax or post-harvest sprays</td>
                  <td className="py-4 px-4 bg-[#374321]/5 font-bold text-[#374321]">0% Preservatives — Cold is our only shield</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA to Explore Products & Reach Us */}
        <div
          ref={ctaRef}
          className="p-8 sm:p-12 rounded-3xl bg-white border border-[#E4DDD4] flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs"
        >
          <div className="space-y-2 max-w-xl">
            <h3 className="text-2xl font-heading font-black text-[#22241D]">
              Ready to elevate your cooking speed?
            </h3>
            <p className="text-sm text-[#575D4E]">
              Browse our complete range of pure coconut, stone-crushed cubes, and crisp farm greens.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/products"
              className="px-6 py-3.5 rounded-full bg-[#374321] text-[#F8F6F5] text-xs font-bold hover:bg-[#48572B] transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <span>Explore Products</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#8DA256]" />
            </Link>
            <Link
              to="/#reach-us"
              className="px-6 py-3.5 rounded-full bg-[#F3EFEA] text-[#22241D] text-xs font-bold border border-[#E4DDD4] hover:bg-white transition-colors"
            >
              <span>Ask Our Kitchen Desk</span>
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
};
