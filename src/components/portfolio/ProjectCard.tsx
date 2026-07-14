'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/portfolio-data';
import { useCursor } from '@/components/cursor';
import MagneticElement from '@/components/cursor/MagneticElement';
import { projectImages } from '@/data/image-manifest';

// Category-to-glow color mapping
const categoryGlows: Record<string, string> = {
  AI: '#22D3EE',
  Healthcare: '#7DD3A6',
  Education: '#F4C542',
  Travel: '#4FD1C5',
  Finance: '#F4C542',
  'Full Stack': '#60A5FA',
  Mobile: '#34D399',
};

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { setVariant, setProjectData } = useCursor();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  // Screenshot cycling
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
    if (isHovered) {
      startCycling();
    } else {
      stopCycling();
    }
    return () => stopCycling();
  }, [isHovered, startCycling, stopCycling]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
    setVariant('default');
    setProjectData(null);
  };

  const glowColor = categoryGlows[project.category] || project.color;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="perspective-1000"
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
        className="group relative rounded-2xl border border-white/[0.06] bg-[#0F2233]/60 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-white/10"
        style={{
          boxShadow: isHovered
            ? `0 8px 40px ${glowColor}15`
            : '0 4px 30px rgba(0,0,0,0.3)',
        }}
      >
        {/* Subtle hover glow */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${glowColor}12, transparent 60%)`,
          }}
        />

        <div className="relative">
          {/* Image Area with Cycling */}
          <div className="relative aspect-video overflow-hidden bg-[#16324A]/50">
            {/* Base image (thumbnail or icon fallback) */}
            {project.thumbnail ? (
              <>
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Cycling overlay images */}
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
                        transition={{ duration: 0.6, ease: 'easeInOut' }}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    )}
                  </AnimatePresence>
                )}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <project.icon
                  className="h-16 w-16 transition-all duration-500 group-hover:scale-110"
                  style={{ color: `${project.color}60` }}
                />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07131F] via-transparent to-transparent opacity-60" />

            {/* Image counter */}
            {isHovered && images.length > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-3 right-3 z-10 rounded-full bg-black/50 backdrop-blur-sm px-2 py-0.5 text-[10px] font-medium text-white/70"
              >
                {currentImageIdx + 1} / {images.length}
              </motion.div>
            )}

            {/* Floating category badge */}
            <div className="absolute top-4 left-4 z-10">
              <span
                className="inline-flex items-center rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
                style={{
                  backgroundColor: `${project.color}15`,
                  color: project.color,
                  border: `1px solid ${project.color}25`,
                }}
              >
                {project.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            <h3 className="mb-1 font-heading text-xl font-bold text-white transition-colors group-hover:text-white">
              {project.title}
            </h3>
            <p className="mb-3 text-sm font-medium" style={{ color: project.color }}>
              {project.subtitle}
            </p>
            <p className="mb-4 text-sm leading-relaxed text-white/40 line-clamp-3">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-6 flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="border-white/5 bg-white/5 text-[10px] font-medium text-white/50 px-2 py-0.5"
                >
                  {t}
                </Badge>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <MagneticElement variant="button" strength={0.25}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/60 transition-all hover:border-white/20 hover:text-white"
                >
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              </MagneticElement>
              <MagneticElement variant="button" strength={0.25}>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold text-white transition-all"
                  style={{
                    backgroundColor: `${project.color}20`,
                    border: `1px solid ${project.color}30`,
                  }}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  Live Demo
                </a>
              </MagneticElement>
              <MagneticElement variant="button" strength={0.25}>
                <a
                  href="#"
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-white/20 hover:text-white"
                >
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </MagneticElement>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
