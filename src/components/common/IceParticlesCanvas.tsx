import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  alpha: number;
  alphaSpeed: number;
  rotation: number;
  rotationSpeed: number;
  sides: number;
}

export const IceParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number }>({ x: -1000, y: -1000 });

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let animationFrameId: number;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate subtle crystalline particles (lightweight on mobile)
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 14 : Math.min(36, Math.floor(window.innerWidth / 35));
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.0 + 0.8,
        vx: (Math.random() - 0.5) * 0.25,
        vy: Math.random() * 0.35 + 0.15, // Gentle downward drift
        alpha: Math.random() * 0.45 + 0.15,
        alphaSpeed: (Math.random() * 0.008 + 0.002) * (Math.random() > 0.5 ? 1 : -1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.015,
        sides: Math.random() > 0.7 ? 6 : 4, // Hexagonal or diamond crystal shapes
      });
    }

    const drawCrystal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      r: number,
      rotation: number,
      sides: number,
      alpha: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();

      if (sides === 6) {
        // Hexagonal ice flake
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = Math.cos(angle) * r;
          const py = Math.sin(angle) * r;
          if (i === 0) c.moveTo(px, py);
          else c.lineTo(px, py);
        }
        c.closePath();
      } else {
        // Diamond / 4-point crystal
        c.moveTo(0, -r * 1.3);
        c.lineTo(r * 0.8, 0);
        c.lineTo(0, r * 1.3);
        c.lineTo(-r * 0.8, 0);
        c.closePath();
      }

      // Ice glint gradient
      const grad = c.createRadialGradient(0, 0, 0, 0, 0, r * 1.5);
      grad.addColorStop(0, `rgba(248, 251, 252, ${alpha * 1.2})`);
      grad.addColorStop(0.5, `rgba(185, 227, 249, ${alpha})`);
      grad.addColorStop(1, `rgba(20, 184, 166, 0)`);

      c.fillStyle = grad;
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Slight pointer repulsion
        const dx = mouseRef.current.x - p.x;
        const dy = mouseRef.current.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const angle = Math.atan2(dy, dx);
          p.x -= Math.cos(angle) * 0.6;
          p.y -= Math.sin(angle) * 0.6;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.65 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        // Wrap around bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawCrystal(ctx, p.x, p.y, p.radius, p.rotation, p.sides, p.alpha);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
