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
        'mb-16 md:mb-20',
        align === 'center' && 'text-center',
        className,
      )}
    >
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan animate-glow-pulse" />
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
          {label}
        </span>
      </div>
      <h2 className="font-heading text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
        {title}{' '}
        {highlight && (
          <span className="text-gradient-cyan">{highlight}</span>
        )}
      </h2>
      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-muted leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
