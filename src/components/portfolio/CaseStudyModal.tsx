'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Github,
  ExternalLink,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import type { Project } from '@/data/portfolio-data';
import { projectImages } from '@/data/image-manifest';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'center',
    loop: true,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const images = project ? (projectImages[project.title]?.images || project.images || []) : [];
  const hasImages = images.length > 0;

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') scrollNext();
      if (e.key === 'ArrowLeft') scrollPrev();
      if (e.key === 'f' || e.key === 'F') setIsFullscreen((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, scrollNext, scrollPrev]);

  // Prevent body scroll only when a project is open
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [project]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 md:p-8"
        onClick={onClose}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-[#07131F]/95 backdrop-blur-xl" />

        {/* Modal content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 40 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0F2233]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300 sm:rounded-3xl ${
            isFullscreen
              ? 'fixed inset-2 z-50 max-w-none max-h-none sm:inset-4'
              : 'w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white sm:top-4 sm:right-4 sm:h-10 sm:w-10"
            data-cursor="button"
            aria-label="Close modal"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="absolute top-3 right-12 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white sm:top-4 sm:right-16 sm:h-10 sm:w-10"
            data-cursor="button"
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" /> : <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />}
          </button>

          <div className="grid gap-0 lg:grid-cols-[1fr_1fr] max-h-[95vh] sm:max-h-[90vh]">
            {/* Left — Image Gallery with Embla */}
            <div className="relative min-h-[250px] bg-[#16324A]/50 sm:min-h-[300px] lg:min-h-[600px]">
              {hasImages ? (
                <>
                  {/* Embla viewport */}
                  <div ref={emblaRef} className="overflow-hidden h-full">
                    <div className="flex h-full">
                      {images.map((img, i) => (
                        <div
                          key={i}
                          className="flex-[0_0_100%] min-w-0 h-full"
                        >
                          <img
                            src={img}
                            alt={`${project.title} - Screenshot ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading={i === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F2233]/50 lg:to-[#0F2233]/80 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F2233]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Navigation arrows */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={scrollPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10 sm:left-4 sm:h-10 sm:w-10"
                        data-cursor="button"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10 sm:right-4 sm:h-10 sm:w-10"
                        data-cursor="button"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 px-2.5 py-1 sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5 z-10">
                    <span className="text-[10px] font-medium text-white/70 sm:text-xs">
                      {selectedIndex + 1} / {images.length}
                    </span>
                  </div>

                  {/* Dots */}
                  {images.length <= 10 && (
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:bottom-4 sm:gap-1.5 z-10">
                      {scrollSnaps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => scrollTo(i)}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === selectedIndex ? 20 : 6,
                            backgroundColor:
                              i === selectedIndex ? project.color : 'rgba(255,255,255,0.3)',
                          }}
                          data-cursor="button"
                          aria-label={`Go to image ${i + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {images.length > 1 && images.length <= 16 && (
                    <div className="absolute bottom-10 left-0 right-0 z-10 flex gap-1.5 px-3 overflow-x-auto scrollbar-hide sm:bottom-12 sm:gap-2 sm:px-4">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => scrollTo(i)}
                          className={`relative flex-shrink-0 w-12 h-8 rounded-lg overflow-hidden transition-all sm:w-16 sm:h-10 ${
                            i === selectedIndex
                              ? 'ring-2 scale-105'
                              : 'ring-1 ring-white/10 opacity-50 hover:opacity-80'
                          }`}
                          style={{
                            ringColor:
                              i === selectedIndex ? project.color : undefined,
                          }}
                          data-cursor="button"
                          aria-label={`Select image ${i + 1}`}
                        >
                          <img
                            src={img}
                            alt=""
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <project.icon
                    className="h-24 w-24 sm:h-32 sm:w-32"
                    style={{ color: `${project.color}30` }}
                  />
                </div>
              )}
            </div>

            {/* Right — Content */}
            <div className="overflow-y-auto p-5 sm:p-6 lg:p-10">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <div className="mb-2 flex items-center gap-2 sm:mb-3 sm:gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider sm:px-3 sm:py-1 sm:text-[10px]"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-[10px] text-white/30 sm:text-xs">Case Study</span>
                </div>
                <h2 className="mb-2 font-heading text-2xl font-bold text-white sm:text-3xl">
                  {project.title}
                </h2>
                <p className="text-base font-medium sm:text-lg" style={{ color: project.color }}>
                  {project.subtitle}
                </p>
              </div>

              {/* Overview */}
              <Section title="Overview">
                <p>{project.description}</p>
              </Section>

              {/* Problem */}
              <Section title="Problem">
                <p>
                  Building {project.title.toLowerCase()} required solving complex challenges in
                  {project.tech[0] && ` ${project.tech.slice(0, 2).join(' and ')}`},
                  ensuring scalability, performance, and a seamless user experience while
                  maintaining code quality and architectural integrity.
                </p>
              </Section>

              {/* Solution */}
              <Section title="Solution">
                <p>
                  Developed a comprehensive solution leveraging {project.tech.join(', ')} to
                  create a robust, scalable platform that addresses core user needs with an
                  emphasis on performance and maintainability.
                </p>
              </Section>

              {/* Technologies */}
              <Section title="Technologies">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 text-[10px] font-medium border sm:px-3 sm:py-1.5 sm:text-xs"
                      style={{
                        backgroundColor: `${project.color}10`,
                        color: project.color,
                        borderColor: `${project.color}20`,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Section>

              {/* Features */}
              <Section title="Key Features">
                <ul className="space-y-1.5 sm:space-y-2">
                  {[
                    'Responsive design with mobile-first approach',
                    'Real-time data processing and updates',
                    'Secure authentication and data handling',
                    'Optimized performance with lazy loading',
                    'Clean, maintainable code architecture',
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-xs text-white/50 sm:text-sm"
                    >
                      <span
                        className="mt-1 h-1 w-1 rounded-full shrink-0 sm:mt-1.5 sm:h-1.5 sm:w-1.5"
                        style={{ backgroundColor: project.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Actions */}
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/70 transition-all hover:border-white/20 hover:text-white sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                  data-cursor="button"
                >
                  <Github className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-navy transition-all sm:gap-2 sm:px-5 sm:py-2.5 sm:text-sm"
                  style={{
                    backgroundColor: project.color,
                    boxShadow: `0 0 20px ${project.color}30`,
                  }}
                  data-cursor="button"
                >
                  <ExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  Live Demo
                </a>
              </div>

              {/* Keyboard hint */}
              <div className="mt-4 text-[9px] text-white/20 sm:mt-6 sm:text-[10px]">
                Press <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">←</kbd>{' '}
                <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">→</kbd> to
                navigate, <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">F</kbd>{' '}
                for fullscreen, <kbd className="rounded bg-white/5 px-1.5 py-0.5 font-mono">Esc</kbd> to
                close
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4 sm:mb-6">
      <h3 className="mb-2 font-heading text-xs font-bold uppercase tracking-wider text-white/40 sm:mb-3 sm:text-sm">
        {title}
      </h3>
      <div className="text-xs leading-relaxed text-white/50 sm:text-sm">{children}</div>
    </div>
  );
}
