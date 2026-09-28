import React from 'react';

interface LeaforaLogoProps {
  variant?: 'light' | 'dark'; // 'light' is for light backgrounds (dark text), 'dark' is for dark backgrounds (light text)
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const LeaforaLogo: React.FC<LeaforaLogoProps> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  className = '',
}) => {
  const isDarkVariant = variant === 'dark';

  const sizeClasses = {
    sm: {
      mark: 'h-7 w-auto',
      title: 'text-base tracking-[0.14em]',
      tagline: 'text-[8px] tracking-[0.2em]',
      gap: 'gap-2.5',
    },
    md: {
      mark: 'h-9 w-auto',
      title: 'text-lg sm:text-xl tracking-[0.15em]',
      tagline: 'text-[9px] tracking-[0.22em]',
      gap: 'gap-3',
    },
    lg: {
      mark: 'h-12 w-auto',
      title: 'text-2xl sm:text-3xl tracking-[0.16em]',
      tagline: 'text-[10px] tracking-[0.24em]',
      gap: 'gap-3.5',
    },
  }[size];

  return (
    <div className={`inline-flex items-center ${sizeClasses.gap} ${className}`}>
      {/* 
        Leafora Brand Mark:
        Official faceted leaf popsicle emblem with transparent background
      */}
      <img
        src="/images/leafora_logo.png"
        alt="Leafora Fresh brand mark"
        className={`${sizeClasses.mark} object-contain shrink-0 drop-shadow-xs transition-transform duration-300 hover:scale-105`}
        loading="eager"
      />

      {/* Confident Humanist Brand Wordmark */}
      <div className="flex flex-col select-none">
        <span
          className={`font-heading font-black leading-none flex items-center gap-1.5 ${
            sizeClasses.title
          } ${isDarkVariant ? 'text-[#F8F6F5]' : 'text-[#22241D]'}`}
        >
          <span>LEAFORA</span>
          <span className={isDarkVariant ? 'text-[#8DA256]' : 'text-[#586E2B]'}>FRESH</span>
        </span>
        {showTagline && (
          <span
            className={`font-semibold uppercase mt-0.5 ${sizeClasses.tagline} ${
              isDarkVariant ? 'text-[#DED6CC]/70' : 'text-[#22241D]/60'
            }`}
          >
            FROZEN AT HARVEST
          </span>
        )}
      </div>
    </div>
  );
};
