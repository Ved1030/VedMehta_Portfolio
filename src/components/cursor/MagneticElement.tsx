'use client';
import { useRef, useState, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { useCursor } from './CursorProvider';

interface MagneticElementProps {
  children: React.ReactNode;
  strength?: number;
  variant?: string;
  className?: string;
  asChild?: boolean;
}

export default function MagneticElement({
  children,
  strength = 0.35,
  variant,
  className,
}: MagneticElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { setVariant } = useCursor();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      x.set((e.clientX - centerX) * strength);
      y.set((e.clientY - centerY) * strength);
    },
    [x, y, strength],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    setHovered(false);
    if (variant) setVariant('default');
  }, [x, y, variant, setVariant]);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    if (variant) setVariant(variant as any);
  }, [variant, setVariant]);

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        willChange: 'transform',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.div>
  );
}
