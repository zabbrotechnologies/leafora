import React from 'react';

export const MarqueeBanner: React.FC = () => {
  const items = [
    'LEAFORA FRESH',
    'FROZEN AT MORNING HARVEST',
    'ZERO KITCHEN PREP WASTE',
    'DIRECT PAN MELT IN 25s',
    'PURE COASTAL COCONUT',
    'STONE-CRUSHED MASALA CUBES',
    'BLANCHED FARM GREENS',
    '100% EDIBLE FOOD YIELD',
    'NO CHEMICAL PRESERVATIVES',
  ];

  return (
    <div className="relative py-4 bg-[#DED6CC] border-y border-[#C8BFB3] overflow-hidden select-none">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#374321]">
        {/* Sequence 1 */}
        {items.map((item, idx) => (
          <span key={`seq1-${idx}`} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[#374321]/40 select-none">•</span>
          </span>
        ))}
        {/* Sequence 2 for continuous loop */}
        {items.map((item, idx) => (
          <span key={`seq2-${idx}`} className="inline-flex items-center gap-8">
            <span>{item}</span>
            <span className="text-[#374321]/40 select-none">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};
