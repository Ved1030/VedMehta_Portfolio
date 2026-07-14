import { techStack } from '@/data/portfolio-data';

export default function Marquee() {
  const items = [...techStack, ...techStack, ...techStack, ...techStack];

  return (
    <section className="relative py-12 overflow-hidden border-y border-white/5 bg-white/[0.01]">
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-navy z-10 pointer-events-none" />
      <div className="flex animate-marquee whitespace-nowrap">
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            className="mx-8 flex items-center gap-3 text-white/20"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: tech.color }}
            />
            <span className="font-heading text-lg font-bold uppercase tracking-widest">
              {tech.name}
            </span>
            <span className="text-cyan/30">/</span>
          </div>
        ))}
      </div>
    </section>
  );
}
