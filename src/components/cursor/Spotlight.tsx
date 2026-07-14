'use client';
import { useCursor } from './CursorProvider';

export default function Spotlight() {
  const { x, y, variant, isTouchDevice, isVisible } = useCursor();

  if (isTouchDevice || !isVisible) return null;

  const showSpotlight = variant === 'default' || variant === 'text';

  return (
    <div
      className="pointer-events-none fixed z-[1] transition-opacity duration-500"
      style={{
        width: '600px',
        height: '600px',
        left: `${x - 300}px`,
        top: `${y - 300}px`,
        background:
          'radial-gradient(circle, rgba(124,58,237,0.04) 0%, rgba(124,58,237,0.01) 30%, transparent 70%)',
        opacity: showSpotlight ? 1 : 0,
        willChange: 'transform, opacity',
        transform: 'translate3d(0,0,0)',
      }}
    />
  );
}
