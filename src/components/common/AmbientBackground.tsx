import React from 'react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Top Left Ice-Green Bloom */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full ambient-glow-green opacity-40 mix-blend-multiply animate-pulse"
        style={{ animationDuration: '14s' }}
      />

      {/* Top Right Glacial-Blue Bloom */}
      <div
        className="absolute top-[20%] -right-[15%] w-[60vw] h-[60vw] rounded-full ambient-glow-blue opacity-45 mix-blend-multiply"
        style={{
          animation: 'frost-shimmer 22s ease-in-out infinite alternate',
        }}
      />

      {/* Middle Crystalline-Teal Bloom */}
      <div
        className="absolute top-[55%] -left-[15%] w-[50vw] h-[50vw] rounded-full ambient-glow-teal opacity-25 mix-blend-multiply"
        style={{
          animation: 'frost-shimmer 26s ease-in-out infinite alternate-reverse',
        }}
      />

      {/* Bottom Ice Green & Blue Mix */}
      <div
        className="absolute bottom-[-10%] right-[10%] w-[55vw] h-[55vw] rounded-full ambient-glow-green opacity-30 mix-blend-multiply"
        style={{ animationDuration: '18s' }}
      />
    </div>
  );
};
