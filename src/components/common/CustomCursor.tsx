import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'product' | 'drag'>('default');
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(true);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Detect touch / mobile
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024;
      setIsTouch(hasTouch);
      if (!hasTouch) {
        document.body.classList.add('custom-cursor-active');
      } else {
        document.body.classList.remove('custom-cursor-active');
      }
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      setTargetPos({ x: e.clientX, y: e.clientY });

      // Check what is hovered
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, select, textarea, [role="button"], .interactive-element');
      const productCard = target.closest('[data-cursor-type="product"]');
      const customLabel = target.closest('[data-cursor-label]')?.getAttribute('data-cursor-label');

      if (productCard) {
        setCursorType('product');
        setCursorLabel(customLabel || 'EXPLORE');
      } else if (interactive) {
        setCursorType('hover');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth animation loop for the trailing ring
    let currentX = -100;
    let currentY = -100;

    const loop = () => {
      currentX += (targetPos.x - currentX) * 0.18;
      currentY += (targetPos.y - currentY) * 0.18;
      setPos({ x: currentX, y: currentY });
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isTouch, targetPos.x, targetPos.y]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-999 overflow-hidden transition-opacity duration-300">
      {/* Small Center Dot */}
      <div
        className="fixed w-2 h-2 rounded-full bg-[#14B8A6] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 shadow-[0_0_8px_rgba(20,184,166,0.8)]"
        style={{
          left: `${targetPos.x}px`,
          top: `${targetPos.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorType === 'hover' ? 0.5 : cursorType === 'product' ? 0 : 1})`,
        }}
      />

      {/* Trailing Frosted Ring / Badge */}
      <div
        className={`fixed -translate-x-1/2 -translate-y-1/2 rounded-full flex items-center justify-center transition-all duration-200 ${
          cursorType === 'product'
            ? 'w-20 h-20 bg-[#0F172A]/90 text-white backdrop-blur-md border border-[#14B8A6]/60 shadow-[0_8px_24px_rgba(15,23,42,0.3)]'
            : cursorType === 'hover'
            ? 'w-12 h-12 bg-[#14B8A6]/15 border border-[#14B8A6]/60 backdrop-blur-sm'
            : 'w-8 h-8 border border-[#14B8A6]/40 bg-[#14B8A6]/5'
        }`}
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
        }}
      >
        {cursorType === 'product' && (
          <span className="text-[10px] font-bold tracking-widest text-[#A8E6CF] uppercase animate-pulse">
            {cursorLabel || 'VIEW'}
          </span>
        )}
      </div>
    </div>
  );
};
