import React, { useEffect, useState } from 'react';

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY;
      const percent = Math.min(100, Math.max(0, (currentScroll / totalScroll) * 100));
      setProgress(percent);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-transparent">
      {/* Background track glow */}
      <div
        className="h-full bg-gradient-to-r from-[#A8E6CF] via-[#14B8A6] to-[#B9E3F9] transition-all duration-75 ease-out shadow-[0_0_12px_rgba(20,184,166,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
