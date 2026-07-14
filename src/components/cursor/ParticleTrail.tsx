'use client';
import { useEffect, useRef } from 'react';
import { useCursor } from './CursorProvider';

const TRAIL_LENGTH = 30;
const TRAIL_FADE = 0.92;

interface TrailPoint {
  x: number;
  y: number;
  alpha: number;
}

export default function ParticleTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trail = useRef<TrailPoint[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const { isTouchDevice, isVisible } = useCursor();

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { x, y } = mouse.current;

      if (x > 0 && y > 0) {
        trail.current.unshift({ x, y, alpha: 0.5 });
        if (trail.current.length > TRAIL_LENGTH) {
          trail.current.pop();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < trail.current.length; i++) {
        const point = trail.current[i];
        point.alpha *= TRAIL_FADE;

        if (point.alpha < 0.01) continue;

        const t = i / trail.current.length;
        const size = (1 - t) * 4 + 1;

        // Cyan → Sky blue → Green gradient based on trail position
        const hue = 187 - t * 40;
        const sat = 80 + t * 10;
        const light = 55 - t * 15;

        ctx.beginPath();
        ctx.arc(point.x, point.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${point.alpha})`;
        ctx.fill();

        // Glow
        if (i < 8) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${hue}, ${sat}%, ${light}%, ${point.alpha * 0.15})`;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isTouchDevice]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9997]"
      style={{ willChange: 'transform' }}
    />
  );
}
