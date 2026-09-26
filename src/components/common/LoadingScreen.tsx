import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Fast, crisp loading animation: ~1.1s total
    const startTime = performance.now();
    const duration = 1100;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const fraction = Math.min(elapsed / duration, 1);
      // Custom ease-out
      const eased = 1 - Math.pow(1 - fraction, 3);
      const currentPercent = Math.round(eased * 100);
      setProgress(currentPercent);

      if (fraction < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsExiting(true);
        setTimeout(() => {
          onComplete();
        }, 450);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#F8FBFC] transition-all duration-500 ease-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-102' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center max-w-xs text-center px-6">
        {/* Minimal Crystalline Brand Icon */}
        <div
          className={`w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#A8E6CF]/30 via-[#B9E3F9]/40 to-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center mb-6 shadow-[0_8px_24px_rgba(20,184,166,0.15)] transition-transform duration-500 ${
            isExiting ? 'scale-90' : 'scale-100'
          }`}
        >
          <svg
            className="w-7 h-7 text-[#14B8A6] animate-pulse"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07 19.07 4.93" />
          </svg>
        </div>

        {/* Brand Name */}
        <h2 className="text-xl font-bold tracking-[0.2em] text-[#0F172A] uppercase mb-2">
          GLACIAL<span className="text-[#14B8A6]">™</span>
        </h2>

        {/* Status Line */}
        <p className="text-xs font-medium tracking-wider text-[#0F172A]/60 mb-6">
          Preserving freshness at -40°C...
        </p>

        {/* Crystalline Progress Line */}
        <div className="w-48 h-[2px] bg-[#B9E3F9]/40 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#14B8A6] to-[#A8E6CF] transition-all duration-75 ease-out shadow-[0_0_8px_rgba(20,184,166,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Percentage */}
        <div className="mt-3 text-[11px] font-mono text-[#0F172A]/40 tracking-widest">
          {progress}%
        </div>
      </div>
    </div>
  );
};
