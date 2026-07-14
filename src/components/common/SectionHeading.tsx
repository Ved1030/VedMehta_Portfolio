import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  label: string;
  title: string;
  highlight?: string;
  description?: string;
  className?: string;
  align?: 'center' | 'left';
}

export default function SectionHeading({
  label,
  title,
  highlight,
  description,
  className,
  align = 'center',
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16 lg:mb-20',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-3 py-1.5 sm:mb-4 sm:px-4">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-glow-pulse" />
        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cyan sm:text-xs">
          {label}
        </span>
      </div>
      <h2 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-cyan">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-slate-muted leading-relaxed sm:mt-6 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
