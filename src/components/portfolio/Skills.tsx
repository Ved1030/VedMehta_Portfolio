'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Globe, Smartphone, Cpu, Wrench } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { skillCategories } from '@/data/portfolio-data';
import { cn } from '@/lib/utils';

const categoryIcons = [Code2, Globe, Smartphone, Cpu, Wrench];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const activeColor = skillCategories[activeCategory].color;

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden section-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Expertise"
          title="Technical"
          highlight="Capabilities"
          description="A comprehensive skillset focused on building the future of AI and scalable web architecture."
        />

        {/* Category Tabs */}
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {skillCategories.map((cat, i) => {
            const Icon = categoryIcons[i];
            const isActive = activeCategory === i;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategory(i)}
                className={cn(
                  'flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300',
                  isActive
                    ? 'border-transparent text-navy font-semibold shadow-lg'
                    : 'border-white/10 bg-white/5 text-white/40 hover:border-white/20 hover:text-white/60',
                )}
                style={isActive ? {
                  backgroundColor: cat.color,
                  boxShadow: `0 0 30px ${cat.color}30`,
                } : undefined}
                data-cursor="button"
              >
                <Icon className="h-4 w-4" />
                {cat.title}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, type: 'spring', bounce: 0.4 }}
                onHoverStart={() => setHoveredSkill(skill.name)}
                onHoverEnd={() => setHoveredSkill(null)}
                className="group relative"
              >
                <div
                  className={cn(
                    'relative flex items-center gap-3 rounded-2xl border px-6 py-4 transition-all duration-300 cursor-default',
                    hoveredSkill === skill.name
                      ? 'border-white/20 bg-white/[0.06] shadow-lg'
                      : 'border-white/5 bg-white/[0.03] hover:bg-white/[0.05]',
                  )}
                  data-cursor="card"
                  style={{
                    boxShadow:
                      hoveredSkill === skill.name
                        ? `0 0 30px ${activeColor}20`
                        : undefined,
                  }}
                >
                  {/* Progress indicator */}
                  <div className="relative h-10 w-10 shrink-0">
                    <svg className="h-10 w-10 -rotate-90" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke={activeColor}
                        strokeWidth="2"
                        strokeDasharray={`${skill.level} 100`}
                        strokeLinecap="round"
                        className="transition-all duration-700"
                        style={{
                          opacity: hoveredSkill === skill.name ? 1 : 0.5,
                        }}
                      />
                    </svg>
                    <span
                      className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
                      style={{ color: activeColor }}
                    >
                      {skill.level}
                    </span>
                  </div>

                  <div>
                    <span className="font-heading text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                    <AnimatePresence>
                      {hoveredSkill === skill.name && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-xs text-white/30"
                        >
                          {skill.level >= 85
                            ? 'Expert'
                            : skill.level >= 70
                              ? 'Advanced'
                              : 'Intermediate'}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
