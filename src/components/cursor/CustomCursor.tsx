'use client';
import { useEffect, useRef } from 'react';
import { motion, useSpring, useMotionValue, useTransform } from 'motion/react';
import { useCursor, type CursorVariant } from './CursorProvider';

interface VariantConfig {
  size: number;
  border: string;
  bg: string;
  scale: number;
  borderRadius: string;
}

const variants: Record<CursorVariant, VariantConfig> = {
  default: {
    size: 18,
    border: '1.5px solid rgba(34, 211, 238, 0.6)',
    bg: 'radial-gradient(circle, rgba(34,211,238,0.15) 0%, transparent 70%)',
    scale: 1,
    borderRadius: '50%',
  },
  text: {
    size: 4,
    border: 'none',
    bg: 'rgba(34, 211, 238, 0.9)',
    scale: 1,
    borderRadius: '50%',
  },
  button: {
    size: 56,
    border: '1.5px solid rgba(34, 211, 238, 0.5)',
    bg: 'radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)',
    scale: 1,
    borderRadius: '50%',
  },
  card: {
    size: 48,
    border: '1px solid rgba(56, 189, 248, 0.3)',
    bg: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
    scale: 1,
    borderRadius: '12px',
  },
  project: {
    size: 24,
    border: '2px solid rgba(34, 211, 238, 0.6)',
    bg: 'radial-gradient(circle, rgba(34,211,238,0.12) 0%, transparent 70%)',
    scale: 1,
    borderRadius: '50%',
  },
  image: {
    size: 64,
    border: '1px solid rgba(110, 231, 183, 0.3)',
    bg: 'radial-gradient(circle, rgba(110,231,183,0.08) 0%, transparent 70%)',
    scale: 1,
    borderRadius: '50%',
  },
};

export default function CustomCursor() {
  const {
    x,
    y,
    velocityX,
    velocityY,
    speed,
    variant,
    isPressed,
    isTouchDevice,
    isVisible,
  } = useCursor();

  // Spring-animated position
  const springX = useSpring(0, { stiffness: 500, damping: 35, mass: 0.5 });
  const springY = useSpring(0, { stiffness: 500, damping: 35, mass: 0.5 });

  // Update spring targets
  useEffect(() => {
    springX.set(x);
    springY.set(y);
  }, [x, y, springX, springY]);

  // Velocity-based rotation
  const rotation = useSpring(0, { stiffness: 200, damping: 20 });
  useEffect(() => {
    rotation.set(Math.atan2(velocityY, velocityX) * (180 / Math.PI));
  }, [velocityX, velocityY, rotation]);

  // Velocity-based stretching
  const scaleX = useSpring(1, { stiffness: 300, damping: 20 });
  const scaleY = useSpring(1, { stiffness: 300, damping: 20 });
  useEffect(() => {
    const stretch = Math.min(speed / 25, 1.8);
    const angle = Math.atan2(velocityY, velocityX);
    scaleX.set(1 + stretch * Math.abs(Math.cos(angle)) * 0.4);
    scaleY.set(1 + stretch * Math.abs(Math.sin(angle)) * 0.4);
  }, [speed, velocityX, velocityY, scaleX, scaleY]);

  const config = variants[variant];

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Main cursor orb */}
      <motion.div
        className="pointer-events-none fixed z-[9999] flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          width: config.size,
          height: config.size,
          border: config.border,
          background: config.bg,
          borderRadius: config.borderRadius,
          rotate: rotation,
          scaleX: isPressed ? 0.9 : scaleX,
          scaleY: isPressed ? 0.9 : scaleY,
          translateX: '-50%',
          translateY: '-50%',
          willChange: 'transform',
          transition: 'border 0.3s ease, background 0.3s ease, border-radius 0.3s ease, width 0.3s ease, height 0.3s ease',
          backdropFilter: variant === 'button' ? 'blur(4px)' : undefined,
        }}
      >
        {/* Inner dot for default/text variants */}
        {(variant === 'default' || variant === 'text') && (
          <div
            className="rounded-full bg-cyan"
            style={{
              width: variant === 'text' ? 2 : 4,
              height: variant === 'text' ? 2 : 4,
              opacity: 0.9,
            }}
          />
        )}

        {/* Breathing glow ring for default variant */}
        {variant === 'default' && (
          <motion.div
            className="absolute inset-[-4px] rounded-full border border-cyan/20"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.1, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Button text */}
        {variant === 'button' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-[9px] font-bold uppercase tracking-wider text-cyan-dark"
          >
            Click
          </motion.span>
        )}

        {/* Project count indicator */}
        {variant === 'project' && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan text-[8px] font-bold text-navy"
          >
            ↗
          </motion.div>
        )}
      </motion.div>
    </>
  );
}
