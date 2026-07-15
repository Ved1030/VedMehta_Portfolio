'use client';
import {
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  ExternalLink,
  Maximize2,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { projectImages } from '@/data/image-manifest';
import type { FeaturedProjectData } from '@/data/portfolio-data';

interface AuraShowcaseProps {
  project: FeaturedProjectData;
}

export default function AuraShowcase({ project }: AuraShowcaseProps) {
  const allImages = projectImages[project.title]?.images || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIdx, setLightboxIdx] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const hasLiveUrl = project.live && project.live !== '#';
  const showGithub = !project.isPrivateGithub;

  // Autoplay — every 2 seconds
  const startAutoplay = useCallback(() => {
    if (allImages.length <= 1) return;
    autoplayRef.current = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % allImages.length);
    }, 2000);
  }, [allImages.length]);

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
      setCurrentIdx(((idx % allImages.length) + allImages.length) % allImages.length);
    },
    [allImages.length],
  );

  // Keyboard navigation (lightbox only)
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxOpen) {
        if (e.key === 'Escape') setLightboxOpen(false);
        if (e.key === 'ArrowRight') setLightboxIdx((p) => (p + 1) % allImages.length);
        if (e.key === 'ArrowLeft') setLightboxIdx((p) => (p - 1 + allImages.length) % allImages.length);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, allImages.length]);

  // Touch/swipe for lightbox only
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleLightboxSwipe = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setLightboxIdx((p) => (p + 1) % allImages.length);
      else setLightboxIdx((p) => (p - 1 + allImages.length) % allImages.length);
    }
  };

  const openLightbox = (idx: number) => {
    setLightboxIdx(idx);
    setLightboxOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full"
      >
        <div
          className="aura-showcase relative rounded-[28px] overflow-hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Animated gradient border */}
          <div className="aura-border-glow absolute -inset-[1px] rounded-[28px] pointer-events-none" />

          {/* Glassmorphism background */}
          <div className="relative rounded-[28px] bg-[#0c1e30]/80 backdrop-blur-xl border border-white/[0.06] overflow-hidden">
            {/* Floating background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[28px]">
              <div className="aura-orb aura-orb-1 absolute -top-32 -left-32 h-64 w-64 rounded-full bg-purple-500/[0.07] blur-[80px]" />
              <div className="aura-orb aura-orb-2 absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-cyan/[0.06] blur-[70px]" />
              <div className="aura-orb aura-orb-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40 w-40 rounded-full bg-violet-400/[0.04] blur-[60px]" />
            </div>

            <div className="relative grid lg:grid-cols-[55%_45%]">
              {/* ─── LEFT: Auto-Showcase ─── */}
              <div className="relative overflow-hidden flex flex-col">
                {/* Gradient panel background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a2d45]/70 via-[#12243a]/80 to-[#0d1b2e]/90" />
                <div className="absolute inset-0 aura-noise-texture opacity-[0.025]" />

                {/* Decorative gradient blobs */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="absolute top-[10%] left-[5%] h-48 w-48 rounded-full bg-cyan/[0.04] blur-[50px] aura-deco-blob" />
                  <div className="absolute bottom-[15%] right-[8%] h-40 w-40 rounded-full bg-purple-500/[0.05] blur-[45px] aura-deco-blob-2" />
                  <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 h-56 w-56 rounded-full bg-violet-400/[0.03] blur-[60px] aura-deco-blob-3" />
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <div className="aura-particle aura-particle-1 absolute top-[12%] left-[18%] h-1 w-1 rounded-full bg-cyan/30" />
                  <div className="aura-particle aura-particle-2 absolute top-[70%] right-[12%] h-0.5 w-0.5 rounded-full bg-purple-300/25" />
                  <div className="aura-particle aura-particle-3 absolute bottom-[20%] left-[8%] h-[3px] w-[3px] rounded-full bg-cyan/20" />
                  <div className="aura-particle aura-particle-4 absolute top-[35%] right-[22%] h-0.5 w-0.5 rounded-full bg-violet-400/20" />
                </div>

                {/* Main image — flex child fills right panel height */}
                <div
                  className="relative z-10 flex-1 min-h-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 cursor-pointer group/main"
                  onClick={() => openLightbox(currentIdx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') openLightbox(currentIdx); }}
                  aria-label={`Open ${project.title} screenshot ${currentIdx + 1} in fullscreen`}
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentIdx}
                      src={allImages[currentIdx]}
                      alt={`${project.title} screenshot ${currentIdx + 1}`}
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 ease-out group-hover/main:scale-[1.01]"
                      style={{
                        filter: isHovered ? 'drop-shadow(0 0 20px rgba(34,211,238,0.06))' : 'none',
                      }}
                      loading="eager"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Expand icon — top right */}
                  <button
                    onClick={(e) => { e.stopPropagation(); openLightbox(currentIdx); }}
                    className="absolute top-4 right-4 z-20 flex h-8 w-8 items-center justify-center rounded-lg bg-black/40 backdrop-blur-md text-white/50 opacity-0 group-hover/main:opacity-100 transition-all duration-300 hover:bg-black/60 hover:text-white hover:scale-110"
                    aria-label="Open lightbox"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>

                {/* Bottom pagination dots */}
                {allImages.length > 1 && (
                  <div className="relative z-20 flex justify-center pb-3">
                    <div className="flex items-center gap-1.5 rounded-full bg-black/50 backdrop-blur-md px-3 py-1.5 border border-white/[0.06]">
                      {allImages.map((_, i) => (
                        <button
                          key={i}
                          onClick={(e) => { e.stopPropagation(); goTo(i); }}
                          className={`rounded-full transition-all duration-300 ${
                            i === currentIdx
                              ? 'h-1.5 w-5 bg-gradient-to-r from-purple-400 to-cyan-400 shadow-[0_0_8px_rgba(168,85,247,0.4)]'
                              : 'h-1.5 w-1.5 bg-white/25 hover:bg-white/45'
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* ─── RIGHT: Project Details (UNCHANGED) ─── */}
              <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                {/* Featured badge */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mb-5"
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-purple-300 backdrop-blur-sm">
                    <Sparkles className="h-3 w-3" />
                    Featured Project
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mb-2 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
                >
                  {project.title}
                </motion.h2>

                {/* Tagline */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 }}
                  className="mb-4 text-sm font-medium text-purple-300/80 sm:text-base"
                >
                  {project.tagline}
                </motion.p>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="mb-6 text-sm leading-relaxed text-white/40 sm:text-[15px]"
                >
                  {project.description}
                </motion.p>

                {/* Tech Stack */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                  className="mb-6"
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-white/25">
                    <Code2 className="h-3 w-3" />
                    Technology Stack
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <Badge
                        key={t}
                        variant="secondary"
                        className="border-purple-400/10 bg-purple-500/[0.06] text-[10px] font-medium text-purple-200/60 px-2.5 py-0.5 hover:bg-purple-500/10 hover:text-purple-200/80 transition-colors"
                      >
                        {t}
                      </Badge>
                    ))}
                  </div>
                </motion.div>

                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="mb-6"
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-white/25">
                    <Zap className="h-3 w-3" />
                    Key Features
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {project.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-[13px] text-white/50">
                        <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-purple-500/15">
                          <Check className="h-2.5 w-2.5 text-purple-400" />
                        </div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Achievements */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.55 }}
                  className="mb-8"
                >
                  <div className="mb-3 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-white/25">
                    <Award className="h-3 w-3" />
                    Achievements
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {project.achievements.map((a) => (
                      <div
                        key={a.label}
                        className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center backdrop-blur-sm"
                      >
                        <div className="font-heading text-lg font-bold text-white">{a.value}</div>
                        <div className="text-[9px] uppercase tracking-wider text-white/30 mt-0.5">{a.label}</div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-wrap gap-3"
                >
                  {hasLiveUrl && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, boxShadow: '0 0 24px rgba(168,85,247,0.3)' }}
                      whileTap={{ scale: 0.97 }}
                      className="aura-btn-primary group/btn inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-500 to-violet-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition-all"
                      data-cursor="button"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live Demo
                    </motion.a>
                  )}
                  {showGithub && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group/btn inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-medium text-white/70 backdrop-blur-sm transition-all hover:border-white/20 hover:text-white"
                      data-cursor="button"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </motion.a>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* ─── Lightbox ─── */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#050d15]/95 backdrop-blur-2xl"
            onClick={() => setLightboxOpen(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleLightboxSwipe}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 sm:px-6 py-4 bg-gradient-to-b from-black/60 to-transparent">
              <div className="rounded-full bg-white/[0.08] backdrop-blur-md border border-white/[0.06] px-4 py-1.5 text-sm font-mono text-white/60">
                <span className="text-white/90 font-semibold">{lightboxIdx + 1}</span>
                <span className="mx-1 text-white/30">/</span>
                <span>{allImages.length}</span>
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
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p - 1 + allImages.length) % allImages.length); }}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-white/50 transition-all duration-300 hover:bg-white/[0.12] hover:text-white hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p + 1) % allImages.length); }}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.06] backdrop-blur-xl border border-white/[0.08] text-white/50 transition-all duration-300 hover:bg-white/[0.12] hover:text-white hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            {/* Image */}
            <div className="relative flex-1 flex items-center justify-center w-full px-14 sm:px-20 py-16" onClick={(e) => e.stopPropagation()}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={lightboxIdx}
                  src={allImages[lightboxIdx]}
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
            {allImages.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4">
                <div className="flex justify-center gap-2 px-4">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightboxIdx(i); }}
                      className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden transition-all duration-300 border ${
                        i === lightboxIdx
                          ? 'ring-[1.5px] ring-cyan/50 opacity-100 scale-105 border-cyan/20 shadow-[0_0_16px_rgba(168,85,247,0.2)]'
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
