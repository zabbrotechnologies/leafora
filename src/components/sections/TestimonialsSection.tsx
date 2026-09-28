import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  segment: string;
  avatarText: string;
  rating: number;
  highlight: string;
  quote: string;
  productUsed: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 'chef-arvind',
    name: 'Chef Arvind Swaminathan',
    role: 'Executive Chef, Dakshin Heritage Dining',
    location: 'Chennai, Tamil Nadu',
    segment: 'High-Volume Commercial Dining',
    avatarText: 'AS',
    rating: 5,
    highlight: 'Zero prep time, zero aromatic loss',
    quote:
      'The stone-crushed masala cubes melt directly into hot ghee without splattering or scorching. In a high-volume restaurant service, saving 45 minutes of daily prep while locking in the fresh allicin potency of raw garlic and ginger is a massive operational win.',
    productUsed: 'Stone-Crushed Masala Cubes',
  },
  {
    id: 'meera-nambiar',
    name: 'Meera Nambiar',
    role: 'Culinary Author & Traditional Cook',
    location: 'Kochi, Kerala',
    segment: 'Heritage Homestyle Cooking',
    avatarText: 'MN',
    rating: 5,
    highlight: 'Tastes like freshly grated coconut from this morning',
    quote:
      'I was hesitant about frozen coconut blocks until I dropped them into traditional Avial and coconut chutney. The natural lauric fats and gentle sweetness are completely intact—none of the sour oxidation or chalky texture of dry supermarket desiccated coconut.',
    productUsed: 'Pure Frozen Coconut Blocks',
  },
  {
    id: 'vikram-roy',
    name: 'Vikramaditya Roy',
    role: 'Director of Culinary Operations, CloudBite Kitchens',
    location: 'Bengaluru, Karnataka',
    segment: 'Multi-Location Cloud Kitchens',
    avatarText: 'VR',
    rating: 5,
    highlight: '100% usable edible yield protects our margins',
    quote:
      'Fresh leafy greens typically carry a 40% waste factor from root trimming and wilted stems, plus erratic market prices. Leafora gives us a 100% usable net yield with fixed year-round pricing. Every single gram we pay for goes straight into the pan.',
    productUsed: 'Cryo Farm Greens & Grade-A Peas',
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#F3EFEA] border-t border-[#E4DDD4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.22em] text-[#8DA256]">
              <span className="w-5 h-[1.5px] bg-[#8DA256] rounded-full" />
              <span>Verified Kitchen Reviews</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-[#22241D] leading-tight tracking-tight">
              Trusted by chefs and home cooks alike.
            </h2>
            <p className="text-base sm:text-lg text-[#575D4E] leading-relaxed">
              Real feedback from executive chefs, culinary authors, and busy kitchen teams who rely on Leafora Fresh for consistency and flavor.
            </p>
          </div>

          {/* Social Proof Stat Tag */}
          <div className="flex items-center gap-4 bg-white rounded-2xl border border-[#E4DDD4] px-5 py-3.5 shadow-2xs shrink-0 self-start md:self-auto">
            <div className="flex -space-x-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#8DA256] fill-[#8DA256]" />
              ))}
            </div>
            <div className="text-xs font-semibold text-[#22241D]">
              <strong className="font-bold">4.9 / 5.0</strong> Rating across 200+ kitchens
            </div>
          </div>
        </div>

        {/* Testimonials Grid (Clean, single-border cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-[#E4DDD4] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="space-y-4">
                {/* Header of Card: Rating & Category Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 text-[#8DA256] fill-[#8DA256]" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8DA256] bg-[#F8F6F5] px-2.5 py-1 rounded-full border border-[#E4DDD4]">
                    {item.productUsed}
                  </span>
                </div>

                {/* Pull Quote Highlight */}
                <div className="relative">
                  <Quote className="w-8 h-8 text-[#8DA256]/20 absolute -top-2 -left-1 pointer-events-none" />
                  <p className="relative text-base font-heading font-bold text-[#22241D] leading-snug pt-2">
                    "{item.highlight}"
                  </p>
                </div>

                {/* Full Body Text */}
                <p className="text-xs sm:text-sm text-[#575D4E] leading-relaxed">
                  {item.quote}
                </p>
              </div>

              {/* Author Footer (No inner border line, clean spacing and background) */}
              <div className="pt-6 mt-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#374321] text-[#F8F6F5] flex items-center justify-center font-heading font-bold text-xs shrink-0 shadow-2xs">
                  {item.avatarText}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#22241D] truncate">
                      {item.name}
                    </h4>
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8DA256] shrink-0" />
                  </div>
                  <p className="text-[11px] text-[#575D4E] truncate">
                    {item.role}
                  </p>
                  <p className="text-[10px] text-[#575D4E]/70 truncate">
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
