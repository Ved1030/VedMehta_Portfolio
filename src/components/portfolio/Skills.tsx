import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, Globe, Smartphone, Cpu, Wrench } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { skillCategories } from '@/data/portfolio-data';
import { cn } from '@/lib/utils';
import { SkillCard } from './skills/index';

const categoryIcons = [Code2, Globe, Smartphone, Cpu, Wrench];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  if (!skillCategories || skillCategories.length === 0) return null;

  const safeIndex = Math.min(activeCategory, skillCategories.length - 1);
  const activeColor = skillCategories[safeIndex]?.color ?? '#22D3EE';

  const updateIndicator = useCallback(() => {
    const tab = tabsRef.current[safeIndex];
    if (tab) {
      setIndicatorStyle({
        left: tab.offsetLeft,
        width: tab.offsetWidth,
      });
    }
  }, [safeIndex]);

  useEffect(() => {
    updateIndicator();
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  // Scroll active tab into view on mobile
  useEffect(() => {
    const tab = tabsRef.current[safeIndex];
    if (tab && scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tabLeft = tab.offsetLeft;
      const tabWidth = tab.offsetWidth;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;

      if (tabLeft < scrollLeft + 20) {
        container.scrollTo({ left: tabLeft - 20, behavior: 'smooth' });
      } else if (tabLeft + tabWidth > scrollLeft + containerWidth - 20) {
        container.scrollTo({ left: tabLeft + tabWidth - containerWidth + 20, behavior: 'smooth' });
      }
    }
  }, [safeIndex]);

  const activeSkills = skillCategories[safeIndex]?.skills ?? [];

  return (
    <section id="skills" className="relative py-20 md:py-32 overflow-hidden section-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          label="Expertise"
          title="Technical"
          highlight="Capabilities"
          description="Technologies and tools I use to build scalable web applications, AI-powered solutions, and modern software products."
        />

        <div className="mb-10 sm:mb-14">
          <div
            ref={scrollContainerRef}
            className="relative mx-auto max-w-fit flex items-center gap-1 rounded-full border border-white/[0.06] bg-white/[0.03] p-1.5 backdrop-blur-md overflow-x-auto scrollbar-hide"
          >
            <motion.div
              className="absolute top-1.5 h-[calc(100%-12px)] rounded-full"
              animate={{
                left: indicatorStyle.left,
                width: indicatorStyle.width,
              }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              style={{
                backgroundColor: `${activeColor}18`,
                boxShadow: `0 0 20px ${activeColor}15`,
                border: `1px solid ${activeColor}25`,
              }}
            />

            {skillCategories.map((cat, i) => {
              const Icon = categoryIcons[i] ?? Code2;
              const isActive = safeIndex === i;
              return (
                <button
                  key={cat.title}
                  ref={(el) => { tabsRef.current[i] = el; }}
                  onClick={() => setActiveCategory(i)}
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show ${cat.title} skills`}
                  className={cn(
                    'relative z-10 flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium transition-colors duration-300 whitespace-nowrap sm:gap-2 sm:px-4 sm:text-sm',
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-white/35 hover:text-white/60',
                  )}
                  data-cursor="button"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span className="hidden sm:inline">{cat.title}</span>
                  <span className="sm:hidden">{cat.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={safeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            role="tabpanel"
            aria-label={`${skillCategories[safeIndex]?.title ?? ''} skills`}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4"
          >
            {activeSkills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                categoryColor={activeColor}
                index={i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
