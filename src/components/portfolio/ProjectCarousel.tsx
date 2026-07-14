'use client';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/portfolio-data';

interface ProjectCarouselProps {
  projects: Project[];
  onCaseStudy: (project: Project) => void;
}

export default function ProjectCarousel({ projects, onCaseStudy }: ProjectCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Navigation arrows */}
      <div className="absolute -top-16 right-0 flex gap-2">
        <button
          onClick={scrollPrev}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-cyan/30 hover:text-cyan hover:shadow-glow-cyan"
          data-cursor="button"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          onClick={scrollNext}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all hover:border-cyan/30 hover:text-cyan hover:shadow-glow-cyan"
          data-cursor="button"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Carousel viewport */}
      <div ref={emblaRef} className="overflow-hidden cursor-grab active:cursor-grabbing">
        <div className="flex -ml-6">
          {projects.map((project, i) => (
            <CarouselCard
              key={project.title}
              project={project}
              index={i}
              onCaseStudy={onCaseStudy}
              isActive={i === selectedIndex}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? 'w-8 bg-cyan'
                : 'w-1.5 bg-white/20 hover:bg-white/40'
            }`}
            data-cursor="button"
          />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({
  project,
  index,
  onCaseStudy,
  isActive,
}: {
  project: Project;
  index: number;
  onCaseStudy: (project: Project) => void;
  isActive: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="flex-[0_0_380px] pl-6 min-w-0 max-md:flex-[0_0_85vw]"
    >
      <motion.div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          scale: isActive ? 1 : 0.95,
          opacity: isActive ? 1 : 0.6,
          y: isHovered ? -8 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="group relative h-full rounded-2xl border border-white/[0.06] bg-[#0F2233]/60 backdrop-blur-sm overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? `0 20px 60px ${project.color}20, 0 0 0 1px ${project.color}15`
            : '0 4px 30px rgba(0,0,0,0.3)',
        }}
        data-cursor="card"
      >
        {/* Image area */}
        <div className="relative aspect-video overflow-hidden bg-[#16324A]/50">
          {project.thumbnail ? (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <project.icon
                className="h-16 w-16 transition-all duration-500 group-hover:scale-110"
                style={{ color: `${project.color}50` }}
              />
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2233] via-transparent to-transparent opacity-80" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
              style={{
                backgroundColor: `${project.color}20`,
                color: project.color,
                border: `1px solid ${project.color}25`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Hover overlay with actions */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 bg-[#07131F]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white transition-colors hover:bg-white/20"
              data-cursor="button"
            >
              <Github className="h-4 w-4" />
            </motion.a>
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-sm text-navy transition-colors"
              style={{ backgroundColor: project.color }}
              data-cursor="button"
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-5">
          <h4 className="mb-1 font-heading text-lg font-bold text-white">
            {project.title}
          </h4>
          <p
            className="mb-2 text-xs font-medium"
            style={{ color: project.color }}
          >
            {project.subtitle}
          </p>
          <p className="mb-4 text-xs leading-relaxed text-white/40 line-clamp-2">
            {project.description}
          </p>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white/50 border border-white/5 bg-white/5"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white/30">
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          {/* Case Study button */}
          <button
            onClick={() => onCaseStudy(project)}
            className="flex items-center gap-1.5 text-xs font-medium transition-colors"
            style={{ color: project.color }}
            data-cursor="button"
          >
            View Case Study
            <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
