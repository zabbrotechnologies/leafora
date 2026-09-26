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

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = parent.clientWidth);
    let height = (canvas.height = parent.clientHeight);
    let animationId: number;

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

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    parent.addEventListener('mouseleave', handleMouseLeave);

    // Initialize snow particles
    const particleCount = Math.min(85, Math.floor(width / 14));
    const particles: SnowflakeParticle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseVy = Math.random() * 1.2 + 0.5;
      const randType = Math.random();
      const type: SnowflakeParticle['type'] =
        randType > 0.6 ? 'crystal' : randType > 0.25 ? 'flake' : 'glow';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseVy,
        vx: (Math.random() - 0.5) * 0.4,
        vy: baseVy,
        size: type === 'crystal' ? Math.random() * 3.5 + 2.5 : Math.random() * 2 + 1,
        opacity: Math.random() * 0.55 + 0.35,
        swayAngle: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        swayAmp: Math.random() * 0.6 + 0.2,
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

          // Small branchlets
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

        // Center frost glow
        c.beginPath();
        c.arc(0, 0, p.size * 0.25, 0, Math.PI * 2);
        c.fill();
      } else if (p.type === 'flake') {
        // Soft glowing snow particle
        const grad = c.createRadialGradient(0, 0, 0, 0, 0, p.size);
        grad.addColorStop(0, `rgba(255, 255, 255, ${p.opacity})`);
        grad.addColorStop(0.5, `rgba(185, 227, 249, ${p.opacity * 0.7})`);
        grad.addColorStop(1, 'rgba(20, 184, 166, 0)');

        c.fillStyle = grad;
        c.beginPath();
        c.arc(0, 0, p.size * 1.5, 0, Math.PI * 2);
        c.fill();
      } else {
        // Crisp diamond micro-crystal
        c.fillStyle = `rgba(248, 251, 252, ${p.opacity})`;
        c.beginPath();
        c.moveTo(0, -p.size * 1.2);
        c.lineTo(p.size * 0.7, 0);
        c.lineTo(0, p.size * 1.2);
        c.lineTo(-p.size * 0.7, 0);
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

        // Hover repulsion & wind dynamic
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 170;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2.2;
            const angle = Math.atan2(dy, dx);
            // Push away + slight swirling upward lift
            p.vx += Math.cos(angle) * force;
            p.vy += Math.sin(angle) * force - 0.4 * force;
          }
        }

        // Apply natural sway
        p.swayAngle += p.swaySpeed;
        const swayForce = Math.sin(p.swayAngle) * p.swayAmp;

        // Position update
        p.x += p.vx + swayForce;
        p.y += p.vy;
        p.rotation += p.rotSpeed;

        // Dampen velocity back to natural fall
        p.vx *= 0.94;
        p.vy = p.vy * 0.94 + p.baseVy * 0.06;

        // Wrap around bounds
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
          p.vy = p.baseVy;
          p.vx = (Math.random() - 0.5) * 0.4;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        drawSnowflake(ctx, p);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('mouseleave', handleMouseLeave);
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
