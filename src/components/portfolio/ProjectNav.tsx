'use client';
import { motion } from 'motion/react';
import type { Project } from '@/data/portfolio-data';

interface ProjectNavProps {
  projects: Project[];
  activeIndex: number;
  onSelect: (index: number) => void;
}

export default function ProjectNav({ projects, activeIndex, onSelect }: ProjectNavProps) {
  return (
    <div className="hidden xl:flex flex-col items-center gap-2">
      {projects.map((project, i) => {
        const isActive = activeIndex === i;
        return (
          <motion.button
            key={project.title}
            onClick={() => onSelect(i)}
            whileHover={{ scale: 1.05, x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-3 py-2"
            data-cursor="button"
          >
            {/* Number */}
            <span
              className="font-mono text-xs transition-colors duration-300"
              style={{
                color: isActive ? project.color : 'rgba(148,163,184,0.4)',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>

            {/* Active indicator line */}
            <div className="relative h-8 w-[2px]">
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: `${project.color}20` }}
              />
              {isActive && (
                <motion.div
                  layoutId="project-nav-active"
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: project.color }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </div>

            {/* Tooltip on hover */}
            <div className="absolute left-full ml-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <div className="flex items-center gap-2 rounded-lg bg-[#16324A]/90 backdrop-blur-sm border border-white/10 px-3 py-1.5 whitespace-nowrap">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: project.color }}
                />
                <span className="text-xs font-medium text-white/80">{project.title}</span>
              </div>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
