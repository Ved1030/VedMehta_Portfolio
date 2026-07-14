import { useState } from 'react';
import { motion } from 'motion/react';
import type { Skill } from '@/data/portfolio-data';
import { getTechIcon } from './tech-icons';
import ProficiencyDots from './ProficiencyDots';

interface SkillCardProps {
  skill: Skill;
  categoryColor: string;
  index: number;
}

export default function SkillCard({ skill, categoryColor, index }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  if (!skill) return null;
  const techIcon = getTechIcon(skill.name);
  const iconColor = techIcon?.color ?? '#94A3B8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        animate={{
          y: isHovered ? -4 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col h-full rounded-2xl border border-white/[0.06] bg-[#0F2233]/60 backdrop-blur-sm overflow-hidden transition-[border-color,box-shadow] duration-500"
        style={{
          boxShadow: isHovered
            ? `0 12px 40px ${categoryColor}12, 0 0 0 1px ${categoryColor}15`
            : '0 4px 20px rgba(0,0,0,0.25)',
        }}
        data-cursor="card"
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${categoryColor}08, transparent 70%)`,
          }}
        />

        <div className="relative flex flex-col flex-1 p-5 sm:p-6">
          <div
            className="mb-4 flex items-center justify-center w-12 h-12 rounded-xl bg-white/[0.04] border border-white/[0.06] transition-all duration-300 group-hover:border-white/[0.12]"
            style={{
              boxShadow: isHovered ? `0 0 20px ${iconColor}15` : 'none',
            }}
          >
            {techIcon ? (
              <techIcon.icon
                className="h-6 w-6 transition-all duration-300"
                style={{ color: iconColor }}
              />
            ) : (
              <span
                className="font-heading text-lg font-bold transition-all duration-300"
                style={{ color: iconColor }}
              >
                {skill.name.charAt(0)}
              </span>
            )}
          </div>

          <h3 className="mb-1.5 font-heading text-sm font-bold text-white/90 group-hover:text-white transition-colors duration-300">
            {skill.name}
          </h3>

          <p className="mb-4 text-[11px] leading-relaxed text-white/35 line-clamp-2 flex-1">
            {skill.description}
          </p>

          <ProficiencyDots level={skill.level} color={categoryColor} />
        </div>
      </motion.div>
    </motion.div>
  );
}
