import React, { useEffect, useRef } from 'react';

interface SnowflakeParticle {
  x: number;
  y: number;
  baseVy: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  swayAngle: number;
  swaySpeed: number;
  swayAmp: number;
  rotation: number;
  rotSpeed: number;
  type: 'crystal' | 'flake' | 'glow';
}

export const CryoSnowfallCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);
    let animationId: number;
    const isMobile = window.innerWidth < 768;

    const handleResize = () => {
      if (!canvas || !parent) return;
      width = canvas.width = parent.clientWidth;
      height = canvas.height = parent.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: true,
        };
      } else {
        mouseRef.current.active = false;
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize, { passive: true });
    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      parent.addEventListener('mouseleave', handleMouseLeave);
    }

    // Initialize snow particles (optimized count)
    const particleCount = isMobile ? 25 : Math.min(60, Math.floor(width / 22));
    const particles: SnowflakeParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseVy = Math.random() * 1.1 + 0.5;
      const randType = Math.random();
      const type: SnowflakeParticle['type'] =
        randType > 0.6 ? 'crystal' : randType > 0.3 ? 'flake' : 'glow';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVy,
        vx: (Math.random() - 0.5) * 0.3,
        vy: baseVy,
        size: type === 'crystal' ? Math.random() * 3 + 2 : Math.random() * 1.8 + 1,
        opacity: Math.random() * 0.5 + 0.35,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 0.5 + 0.2,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        type,
      });
    }

    const drawSnowflake = (
      c: CanvasRenderingContext2D,
      p: SnowflakeParticle
    ) => {
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rotation);

      if (p.type === 'crystal') {
        // Hexagonal crystalline 6-arm dendrite snowflake
        c.strokeStyle = `rgba(224, 247, 250, ${p.opacity})`;
        c.fillStyle = `rgba(168, 230, 207, ${p.opacity * 0.8})`;
        c.lineWidth = 1;
        c.beginPath();

        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x2 = Math.cos(angle) * p.size;
          const y2 = Math.sin(angle) * p.size;

          c.moveTo(0, 0);
          c.lineTo(x2, y2);

          const midX = x2 * 0.6;
          const midY = y2 * 0.6;
          const bAngle1 = angle + Math.PI / 4;
          const bAngle2 = angle - Math.PI / 4;
          const bLen = p.size * 0.35;

          c.moveTo(midX, midY);
          c.lineTo(midX + Math.cos(bAngle1) * bLen, midY + Math.sin(bAngle1) * bLen);
          c.moveTo(midX, midY);
          c.lineTo(midX + Math.cos(bAngle2) * bLen, midY + Math.sin(bAngle2) * bLen);
        }
        c.stroke();

        c.beginPath();
        c.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
        c.fill();
      } else if (p.type === 'flake') {
        // Soft glowing snow particle (direct fill style, no runtime gradient creation)
        c.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        c.beginPath();
        c.arc(0, 0, p.size * 0.8, 0, Math.PI * 2);
        c.fill();
      } else {
        // Crisp diamond micro-crystal
        c.fillStyle = `rgba(185, 227, 249, ${p.opacity})`;
        c.beginPath();
        c.moveTo(0, -p.size * 1.1);
        c.lineTo(p.size * 0.65, 0);
        c.lineTo(0, p.size * 1.1);
        c.lineTo(-p.size * 0.65, 0);
        c.closePath();
        c.fill();
      }

      c.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Hover repulsion on desktop
        if (!isMobile && mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2;
            const angle = Math.atan2(dy, dx);
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force - 0.3 * force;
          }
        }

        p.swayAngle += p.swaySpeed;
        const swayForce = Math.sin(p.swayAngle) * p.swayAmp;

        p.x += p.vx + swayForce;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        if (p.y > height + 15) {
          p.y = -15;
          p.x = Math.random() * width;
          p.vy = p.baseVy;
          p.vx = (Math.random() - 0.5) * 0.3;
        }
        if (p.x < -15) p.x = width + 15;
        if (p.x > width + 15) p.x = -15;

        drawSnowflake(ctx, p);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
        parent.removeEventListener('mouseleave', handleMouseLeave);
      }
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
};
