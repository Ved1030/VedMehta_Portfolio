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

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
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
          className={`relative overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0F2233]/95 backdrop-blur-2xl shadow-2xl transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-4 z-50 max-w-none max-h-none'
              : 'w-full max-w-6xl max-h-[90vh]'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white"
            data-cursor="button"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={() => setIsFullscreen((prev) => !prev)}
            className="absolute top-4 right-16 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/60 transition-all hover:bg-white/10 hover:text-white"
            data-cursor="button"
          >
            {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
          </button>

          <div className="grid gap-0 lg:grid-cols-[1fr_1fr] max-h-[90vh]">
            {/* Left — Image Gallery with Embla */}
            <div className="relative bg-[#16324A]/50 min-h-[300px] lg:min-h-[600px]">
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
                        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10"
                        data-cursor="button"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={scrollNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10"
                        data-cursor="button"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  )}

                  {/* Image counter */}
                  <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 px-3 py-1.5 z-10">
                    <span className="text-xs font-medium text-white/70">
                      {selectedIndex + 1} / {images.length}
                    </span>
                  </div>

                  {/* Dots */}
                  {images.length <= 10 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                      {scrollSnaps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => scrollTo(i)}
                          className="h-1.5 rounded-full transition-all duration-300"
                          style={{
                            width: i === selectedIndex ? 24 : 6,
                            backgroundColor:
                              i === selectedIndex ? project.color : 'rgba(255,255,255,0.3)',
                          }}
                          data-cursor="button"
                        />
                      ))}
                    </div>
                  )}

                  {/* Thumbnail strip */}
                  {images.length > 1 && images.length <= 16 && (
                    <div className="absolute bottom-12 left-0 right-0 z-10 flex gap-2 px-4 overflow-x-auto scrollbar-hide">
                      {images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => scrollTo(i)}
                          className={`relative flex-shrink-0 w-16 h-10 rounded-lg overflow-hidden transition-all ${
                            i === selectedIndex
                              ? 'ring-2 scale-105'
                              : 'ring-1 ring-white/10 opacity-50 hover:opacity-80'
                          }`}
                          style={{
                            ringColor:
                              i === selectedIndex ? project.color : undefined,
                          }}
                          data-cursor="button"
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
                    className="h-32 w-32"
                    style={{ color: `${project.color}30` }}
                  />
                </div>
              )}
            </div>

            {/* Right — Content */}
            <div className="overflow-y-auto p-8 lg:p-10">
              {/* Header */}
              <div className="mb-6">
                <div className="mb-3 flex items-center gap-3">
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                      border: `1px solid ${project.color}25`,
                    }}
                  >
                    {project.category}
                  </span>
                  <span className="text-xs text-white/30">Case Study</span>
                </div>
                <h2 className="font-heading text-3xl font-bold text-white mb-2">
                  {project.title}
                </h2>
                <p className="text-lg font-medium" style={{ color: project.color }}>
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
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-3 py-1.5 text-xs font-medium border"
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
                <ul className="space-y-2">
                  {[
                    'Responsive design with mobile-first approach',
                    'Real-time data processing and updates',
                    'Secure authentication and data handling',
                    'Optimized performance with lazy loading',
                    'Clean, maintainable code architecture',
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2 text-sm text-white/50"
                    >
                      <span
                        className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: project.color }}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </Section>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/70 transition-all hover:border-white/20 hover:text-white"
                  data-cursor="button"
                >
                  <Github className="h-4 w-4" />
                  View Code
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-navy transition-all"
                  style={{
                    backgroundColor: project.color,
                    boxShadow: `0 0 20px ${project.color}30`,
                  }}
                  data-cursor="button"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </div>

              {/* Keyboard hint */}
              <div className="mt-6 text-[10px] text-white/20">
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
    <div className="mb-6">
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-white/40">
        {title}
      </h3>
      <div className="text-sm leading-relaxed text-white/50">{children}</div>
    </div>
  );
}
