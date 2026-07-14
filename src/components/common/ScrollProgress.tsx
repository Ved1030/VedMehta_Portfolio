import { useScrollProgress } from '@/hooks/use-animation';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 z-[9998] h-[2px] w-full">
      <div
        className="h-full origin-left transition-none"
        style={{
          width: `${progress * 100}%`,
          background:
            'linear-gradient(90deg, #7C3AED, #A855F7, #FF6B6B, #FF8E53)',
        }}
      />
    </div>
  );
}
