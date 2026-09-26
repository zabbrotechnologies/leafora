import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingIngredientsProps {
  scene?: 'hero' | 'freezing' | 'why-frozen' | 'story' | 'b2b';
}

// Crisp Luxury Vector Snowflake Component
const CrystalSnowflake: React.FC<{
  size?: number;
  className?: string;
  glowColor?: string;
}> = ({ size = 48, className = '', glowColor = 'rgba(168, 230, 207, 0.4)' }) => (
  <div
    className={`relative flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    {/* Ambient Glow */}
    <div
      className="absolute inset-0 rounded-full filter blur-md pointer-events-none opacity-60 scale-125"
      style={{ backgroundColor: glowColor }}
    />
    <svg
      viewBox="0 0 100 100"
      className="w-full h-full text-[#14B8A6] drop-shadow-[0_2px_8px_rgba(20,184,166,0.35)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Central Hexagon */}
        <polygon points="50,42 57,46 57,54 50,58 43,54 43,46" fill="rgba(185, 227, 249, 0.4)" strokeWidth="1.5" />
        
        {/* 6 Radial Arms */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 50 50)`}>
            {/* Main Spine */}
            <line x1="50" y1="42" x2="50" y2="8" />
            
            {/* Primary V-branchlets */}
            <line x1="50" y1="24" x2="40" y2="16" />
            <line x1="50" y1="24" x2="60" y2="16" />
            
            {/* Secondary V-branchlets */}
            <line x1="50" y1="34" x2="42" y2="28" />
            <line x1="50" y1="34" x2="58" y2="28" />
            
            {/* Tip Diamond Crystal */}
            <polygon points="50,6 53,10 50,14 47,10" fill="rgba(248, 251, 252, 0.9)" strokeWidth="1" />
          </g>
        ))}
      </g>
      {/* Center Glint */}
      <circle cx="50" cy="50" r="3.5" fill="#FFFFFF" />
    </svg>
  </div>
);

// Stellar Star Snowflake Component
const StellarSnowflake: React.FC<{
  size?: number;
  className?: string;
  glowColor?: string;
}> = ({ size = 36, className = '', glowColor = 'rgba(185, 227, 249, 0.4)' }) => (
  <div
    className={`relative flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    <div
      className="absolute inset-0 rounded-full filter blur-md pointer-events-none opacity-50 scale-125"
      style={{ backgroundColor: glowColor }}
    />
    <svg
      viewBox="0 0 80 80"
      className="w-full h-full text-[#A8E6CF] drop-shadow-[0_2px_6px_rgba(168,230,207,0.3)]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <g key={i} transform={`rotate(${angle} 40 40)`}>
            <line x1="40" y1="35" x2="40" y2="10" />
            <line x1="40" y1="20" x2="33" y2="14" />
            <line x1="40" y1="20" x2="47" y2="14" />
            <circle cx="40" cy="10" r="1.5" fill="currentColor" />
          </g>
        ))}
      </g>
      <circle cx="40" cy="40" r="2.5" fill="#FFFFFF" />
    </svg>
  </div>
);

// Micro Crystal Gem Snowflake
const MicroCrystalFlake: React.FC<{
  size?: number;
  className?: string;
}> = ({ size = 24, className = '' }) => (
  <div
    className={`relative flex items-center justify-center ${className}`}
    style={{ width: size, height: size }}
  >
    <svg
      viewBox="0 0 40 40"
      className="w-full h-full text-[#B9E3F9] drop-shadow-sm"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <line x1="20" y1="4" x2="20" y2="36" />
        <line x1="4" y1="20" x2="36" y2="20" />
        <line x1="8.7" y1="8.7" x2="31.3" y2="31.3" />
        <line x1="8.7" y1="31.3" x2="31.3" y2="8.7" />
      </g>
      <circle cx="20" cy="20" r="2" fill="#FFFFFF" />
    </svg>
  </div>
);

export const FloatingIngredients: React.FC<FloatingIngredientsProps> = ({ scene = 'hero' }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fgRef = useRef<HTMLDivElement | null>(null);
  const mgRef = useRef<HTMLDivElement | null>(null);
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Foreground parallax (Speed: 1.0)
      if (fgRef.current) {
        gsap.to(fgRef.current, {
          y: -140,
          rotate: 35,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Midground parallax (Speed: 0.6)
      if (mgRef.current) {
        gsap.to(mgRef.current, {
          y: -80,
          rotate: -25,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      }

      // Background parallax (Speed: 0.25)
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          y: -40,
          rotate: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: container,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.4,
          },
        });
      }
    }, container);

    return () => ctx.revert();
  }, []);

  if (scene === 'hero') {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {/* Primary Foreground Snowflake (Replaces -40°C bubble at top-right) */}
        <div
          ref={fgRef}
          className="absolute top-[18%] right-[8%] opacity-85 transition-transform duration-700"
        >
          <CrystalSnowflake size={52} glowColor="rgba(20, 184, 166, 0.45)" />
        </div>

        {/* Midground Stellar Snowflake (Replaces squircle at mid-left) */}
        <div
          ref={mgRef}
          className="absolute top-[64%] left-[3%] opacity-75 transition-transform duration-700"
        >
          <StellarSnowflake size={38} glowColor="rgba(168, 230, 207, 0.4)" />
        </div>

        {/* Background Micro Crystal (Replaces rotated squircle at mid-right) */}
        <div
          ref={bgRef}
          className="absolute top-[62%] right-[22%] opacity-60 transition-transform duration-700"
        >
          <MicroCrystalFlake size={26} />
        </div>
      </div>
    );
  }

  if (scene === 'freezing') {
    return (
      <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden z-15">
        {/* Crystalline Dendrite Snowflake at mid-left */}
        <div
          ref={fgRef}
          className="absolute top-[32%] left-[4%] opacity-80 transition-transform duration-700"
        >
          <CrystalSnowflake size={52} glowColor="rgba(185, 227, 249, 0.5)" />
        </div>

        {/* Crystalline Stellar Snowflake at bottom-right */}
        <div
          ref={mgRef}
          className="absolute bottom-[24%] right-[7%] opacity-75 transition-transform duration-700"
        >
          <StellarSnowflake size={42} glowColor="rgba(20, 184, 166, 0.45)" />
        </div>
      </div>
    );
  }

  return null;
};
