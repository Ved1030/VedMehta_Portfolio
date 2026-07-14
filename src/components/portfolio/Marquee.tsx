import { techStack } from '@/data/portfolio-data';

export default function Marquee() {
  const items = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section className="relative py-8 overflow-hidden border-y border-white/5 bg-white/[0.01] sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="mx-5 flex items-center gap-2 text-white/20 sm:mx-8 sm:gap-3"
          >
            <span
              className="h-1.5 w-1.5 rounded-full sm:h-2 sm:w-2"
              style={{ backgroundColor: tech.color }}
            />
            <span className="font-heading text-sm font-bold uppercase tracking-widest sm:text-lg">
              {tech.name}
            </span>
            <span className="text-cyan/30">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
