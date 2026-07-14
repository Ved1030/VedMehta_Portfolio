'use client';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/data/portfolio-data';
import { useCursor } from './CursorProvider';

export default function ProjectPreview() {
  const { x, y, variant, projectData, isTouchDevice, isVisible } = useCursor();

  if (isTouchDevice || !isVisible) return null;

  return (
    <AnimatePresence>
      {variant === 'project' && projectData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: -50, y: -30 }}
          animate={{ opacity: 1, scale: 1, x: 20, y: -120 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none fixed z-[9999] w-72"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            willChange: 'transform',
          }}
        >
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#111114]/95 backdrop-blur-xl shadow-2xl">
            {/* Project Image */}
            <div
              className="relative aspect-video overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${projectData.color}20, ${projectData.color}05)`,
              }}
            >
              {projectData.thumbnail ? (
                <img
                  src={projectData.thumbnail}
                  alt={projectData.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <projectData.icon
                    className="h-12 w-12"
                    style={{ color: `${projectData.color}50` }}
                  />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111114] via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <div className="mb-1 flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: projectData.color }}
                />
                <span
                  className="text-[10px] font-bold uppercase tracking-wider"
                  style={{ color: projectData.color }}
                >
                  {projectData.category}
                </span>
              </div>
              <h4 className="font-heading text-sm font-bold text-white">
                {projectData.title}
              </h4>
              <p className="mt-1 text-[11px] text-white/40 line-clamp-2">
                {projectData.subtitle}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
                <span>View Project</span>
                <ArrowUpRight className="h-3 w-3" />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
