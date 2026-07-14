'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/portfolio-data';
import { useCursor } from '@/components/cursor';
import { projectImages } from '@/data/image-manifest';

const categoryColors: Record<string, string> = {
  AI: '#22D3EE',
  Healthcare: '#7DD3A6',
  Education: '#F59E0B',
  Travel: '#4FD1C5',
  Finance: '#F4C542',
  'Full Stack': '#818CF8',
  Mobile: '#34D399',
  'Civic Tech': '#60A5FA',
};

interface ProjectGridCardProps {
  project: Project;
  index: number;
  onCaseStudy: (project: Project) => void;
}

export default function ProjectGridCard({ project, index, onCaseStudy }: ProjectGridCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setVariant, setProjectData } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['4deg', '-4deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-4deg', '4deg']);

  const images = projectImages[project.title]?.images || [];
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startCycling = useCallback(() => {
    if (images.length <= 1) return;
    intervalRef.current = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % images.length);
    }, 2000);
  }, [images.length]);

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurrentImageIdx(0);
  }, []);

  useEffect(() => {
    if (isHovered) startCycling();
    else stopCycling();
    return () => stopCycling();
  }, [isHovered, startCycling, stopCycling]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setVariant('default');
    setProjectData(null);
  };

  const glowColor = categoryColors[project.category] || project.color;
  const hasLiveUrl = project.live && project.live !== '#';

  const handleCardClick = () => {
    if (hasLiveUrl) {
      window.open(project.live, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && hasLiveUrl) {
      window.open(project.live, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="perspective-1000 h-[420px]"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => {
          setIsHovered(true);
          setVariant('project');
          setProjectData(project);
        }}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: isHovered ? -6 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={handleCardClick}
        onKeyDown={handleCardKeyDown}
        tabIndex={hasLiveUrl ? 0 : undefined}
        role={hasLiveUrl ? 'link' : undefined}
        className={`group relative flex flex-col h-full rounded-[22px] border border-white/[0.06] bg-[#0F2233]/60 backdrop-blur-sm overflow-hidden transition-[border-color,box-shadow] duration-500 hover:border-white/[0.12]${hasLiveUrl ? ' cursor-pointer' : ''}`}
        style={{
          boxShadow: isHovered
            ? `0 16px 48px ${glowColor}15, 0 0 0 1px ${glowColor}10`
            : '0 4px 20px rgba(0,0,0,0.3)',
        }}
      >
        {/* Hover glow overlay */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-[22px] pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${glowColor}12, transparent 70%)`,
          }}
        />

        {/* Image Area — fixed 200px height for 16:9 at card width */}
        <div className="relative h-[200px] shrink-0 overflow-hidden bg-[#16324A]/50">
          {project.thumbnail ? (
            <>
              <img
                src={project.thumbnail}
                alt={project.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                loading="lazy"
              />
              {images.length > 1 && (
                <AnimatePresence mode="wait">
                  {isHovered && images[currentImageIdx] && images[currentImageIdx] !== project.thumbnail && (
                    <motion.img
                      key={`${project.title}-${currentImageIdx}`}
                      src={images[currentImageIdx]}
                      alt={`${project.title} screenshot ${currentImageIdx + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut' }}
                      className="absolute inset-0 h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </AnimatePresence>
              )}
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <project.icon
                className="h-12 w-12 transition-all duration-500 group-hover:scale-110"
                style={{ color: `${project.color}50` }}
              />
            </div>
          )}

          {/* Gradient fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F2233] via-transparent to-transparent opacity-40 pointer-events-none" />

          {/* Category badge */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider backdrop-blur-md"
              style={{
                backgroundColor: `${glowColor}20`,
                color: glowColor,
                border: `1px solid ${glowColor}25`,
              }}
            >
              {project.category}
            </span>
          </div>

          {/* Image counter on hover */}
          {isHovered && images.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-2.5 right-2.5 z-10 rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[9px] font-medium text-white/60"
            >
              {currentImageIdx + 1}/{images.length}
            </motion.div>
          )}
        </div>

        {/* Content */}
        <div className="relative flex flex-col flex-1 p-5 min-h-0">
          <h3 className="mb-1 font-heading text-base font-bold text-white leading-tight">
            {project.title}
          </h3>
          <p
            className="mb-1.5 text-xs font-medium"
            style={{ color: glowColor }}
          >
            {project.subtitle}
          </p>
          <p className="mb-3 text-xs leading-relaxed text-white/35 line-clamp-2 flex-1">
            {project.description}
          </p>

          {/* Tech chips */}
          <motion.div
            className="flex flex-wrap gap-1.5 mb-3"
            initial={false}
            animate={{
              opacity: isHovered ? 1 : 0.5,
              y: isHovered ? 0 : 2,
            }}
            transition={{ duration: 0.3 }}
          >
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white/45 border border-white/5 bg-white/[0.04] transition-colors duration-300 group-hover:border-white/10 group-hover:text-white/55"
              >
                {t}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className="rounded-full px-2 py-0.5 text-[9px] font-medium text-white/20">
                +{project.tech.length - 3}
              </span>
            )}
          </motion.div>

          {/* Actions — slide up on hover */}
          <motion.div
            className="flex items-center gap-2"
            initial={false}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-medium text-white/50 transition-all hover:border-white/20 hover:text-white"
              data-cursor="button"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-3 w-3" />
              Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold transition-all"
              style={{
                backgroundColor: `${glowColor}15`,
                color: glowColor,
                border: `1px solid ${glowColor}25`,
              }}
              data-cursor="button"
              onClick={(e) => e.stopPropagation()}
            >
              <ExternalLink className="h-3 w-3" />
              Live
            </a>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCaseStudy(project);
              }}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-[10px] font-medium text-white/40 transition-all hover:text-white/70"
              data-cursor="button"
            >
              Case Study
              <ArrowUpRight className="h-2.5 w-2.5" />
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
