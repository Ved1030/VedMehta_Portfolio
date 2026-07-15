'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Github,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import type { Project } from '@/data/portfolio-data';
import { projectImages } from '@/data/image-manifest';

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const images = project
    ? projectImages[project.title]?.images || project.images || []
    : [];
  const hasImages = images.length > 0;

  // Autoplay — every 3 seconds
  const startAutoplay = useCallback(() => {
    if (images.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % images.length);
    }, 3000);
  }, [images.length]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!isHovered && !lightboxOpen) {
      startAutoplay();
    } else {
      stopAutoplay();
    }
    return stopAutoplay;
  }, [isHovered, lightboxOpen, startAutoplay, stopAutoplay]);

  const goTo = useCallback(
    (idx: number) => {
      setCurrentIdx(((idx % images.length) + images.length) % images.length);
    },
    [images.length],
  );

  const goNext = useCallback(() => goTo(currentIdx + 1), [currentIdx, goTo]);
  const goPrev = useCallback(() => goTo(currentIdx - 1), [currentIdx, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowRight') setLightboxIdx((p) => (p + 1) % images.length);
        if (e.key === 'ArrowLeft') setLightboxIdx((p) => (p - 1 + images.length) % images.length);
        return;
      }
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'f' || e.key === 'F') setIsFullscreen((prev) => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, goNext, goPrev, lightboxOpen, images.length]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (!project) return;
    const html = document.documentElement;
    const body = document.body;
    const prevHtml = html.style.overflow;
    const prevBody = body.style.overflow;
    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';
    return () => {
      html.style.overflow = prevHtml;
      body.style.overflow = prevBody;
    };
  }, [project]);

  // Reset state when project changes
  useEffect(() => {
    setCurrentIdx(0);
    setIsHovered(false);
    setLightboxOpen(false);
    setLightboxIdx(0);
    if (rightPanelRef.current) rightPanelRef.current.scrollTop = 0;
  }, [project]);

  // Touch/swipe for lightbox
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setLightboxIdx((p) => (p + 1) % images.length);
      else setLightboxIdx((p) => (p - 1 + images.length) % images.length);
    }
  };

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  if (!project) return null;

  return (
    <>
      <AnimatePresence>
        <motion.div
          key="case-study-modal"
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
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
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
              className="absolute top-3 right-3 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 transition-all hover:bg-black/60 hover:text-white sm:top-4 sm:right-4 sm:h-10 sm:w-10"
              aria-label="Close modal"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>

            {/* Fullscreen toggle */}
            <button
              onClick={() => setIsFullscreen((prev) => !prev)}
              className="absolute top-3 right-12 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/60 transition-all hover:bg-black/60 hover:text-white sm:top-4 sm:right-16 sm:h-10 sm:w-10"
              aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Maximize2 className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </button>

            <div className="grid h-[95vh] sm:h-[90vh] max-h-[95vh] sm:max-h-[90vh] lg:grid-cols-[52%_48%]">
              {/* ─── LEFT: Image Gallery (fixed, no scroll) ─── */}
              <div
                className="relative flex items-center justify-center bg-[#16324A]/50 min-h-[250px] sm:min-h-[300px] lg:min-h-0 overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {hasImages ? (
                  <>
                    {/* Crossfade images */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentIdx}
                        src={images[currentIdx]}
                        alt={`${project.title} screenshot ${currentIdx + 1}`}
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="max-h-full max-w-full object-contain p-4 sm:p-6 lg:p-8 cursor-zoom-in"
                        onClick={() => openLightbox(currentIdx)}
                        loading="eager"
                        draggable={false}
                      />
                    </AnimatePresence>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0F2233]/50 lg:to-[#0F2233]/80 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F2233]/60 via-transparent to-transparent pointer-events-none" />

                    {/* Navigation arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.stopPropagation(); goPrev(); }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10 sm:left-4 sm:h-10 sm:w-10"
                          aria-label="Previous image"
                        >
                          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); goNext(); }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 backdrop-blur-sm border border-white/10 text-white/70 transition-all hover:bg-black/50 hover:text-white z-10 sm:right-4 sm:h-10 sm:w-10"
                          aria-label="Next image"
                        >
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                        </button>
                      </>
                    )}

                    {/* Image counter */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/30 backdrop-blur-sm border border-white/10 px-2.5 py-1 sm:bottom-4 sm:left-4 sm:px-3 sm:py-1.5 z-10">
                      <span className="text-[10px] font-medium text-white/70 sm:text-xs">
                        {currentIdx + 1} / {images.length}
                      </span>
                    </div>

                    {/* Dots */}
                    {images.length <= 10 && (
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 sm:bottom-4 sm:gap-1.5 z-10">
                        {images.map((_, i) => (
                          <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); goTo(i); }}
                            className="h-1.5 rounded-full transition-all duration-300"
                            style={{
                              width: i === currentIdx ? 20 : 6,
                              backgroundColor:
                                i === currentIdx ? project.color : 'rgba(255,255,255,0.3)',
                            }}
                            aria-label={`Go to image ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center">
                    <project.icon
                      className="h-24 w-24 sm:h-32 sm:w-32"
                      style={{ color: `${project.color}30` }}
                    />
                  </div>
                )}
              </div>

              {/* ─── RIGHT: Content (scrollable) ─── */}
              <div
                ref={rightPanelRef}
                className="overflow-y-auto overscroll-contain p-5 sm:p-6 lg:p-8 xl:p-10 scroll-smooth modal-scroll"
              >
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

      {/* ─── Fullscreen Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#050d15]/95 backdrop-blur-2xl"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            role="dialog"
            aria-modal="true"
            aria-label="Fullscreen image viewer"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.06] px-4 py-1.5 text-sm font-mono text-white/60">
                <span className="text-white/90 font-semibold">{lightboxIdx + 1}</span>
                <span className="mx-1 text-white/30">/</span>
                <span>{images.length}</span>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.06] text-white/60 transition-all hover:bg-white/[0.15] hover:text-white hover:scale-110"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p - 1 + images.length) % images.length); }}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-white/50 transition-all duration-300 hover:bg-white/[0.12] hover:text-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p + 1) % images.length); }}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-white/50 transition-all duration-300 hover:bg-white/[0.12] hover:text-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image */}
            <div
              className="relative flex-1 flex items-center justify-center w-full px-14 sm:px-20 py-16"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={images[lightboxIdx]}
                  alt={`${project.title} screenshot ${lightboxIdx + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="max-h-full max-w-full object-contain rounded-xl shadow-[0_16px_64px_rgba(0,0,0,0.5)]"
                />
              </AnimatePresence>
            </div>

            {/* Bottom thumbnail strip */}
            {images.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4">
                <div className="flex justify-center gap-2 px-4">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                      className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden transition-all duration-300 border ${
                        i === lightboxIdx
                          ? 'ring-[1.5px] ring-cyan/50 opacity-100 scale-105 border-cyan/20'
                          : 'opacity-35 border-white/[0.06] hover:opacity-70 hover:border-white/15 hover:scale-105'
                      }`}
                      aria-label={`View screenshot ${i + 1}`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      {i !== lightboxIdx && (
                        <div className="absolute inset-0 bg-[#0d1b2e]/30" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
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
