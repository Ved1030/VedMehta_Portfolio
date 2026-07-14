'use client';
import { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '@/components/common/SectionHeading';
import ProjectGridCard from './ProjectGridCard';
import CaseStudyModal from './CaseStudyModal';
import { projects } from '@/data/portfolio-data';

const HIDDEN_PROJECTS = ['AURA', 'TrustWealth AI'];

const GRID_ORDER = [
  'ChronoCancer AI',
  'Constituency Development Platform',
  'ZipDrop',
  'SkillLab',
  'Prvaas',
  'OzoneVets',
  "Labbdhi Tutorial's",
];

export default function Projects() {
  const [caseStudyProject, setCaseStudyProject] = useState<typeof projects[0] | null>(null);

  const gridProjects = useMemo(() => {
    return GRID_ORDER
      .map((title) => projects.find((p) => p.title === title))
      .filter(
        (p): p is (typeof projects)[0] =>
          p !== undefined && !HIDDEN_PROJECTS.includes(p.title),
      );
  }, []);

  const handleCaseStudy = useCallback((project: typeof projects[0]) => {
    setCaseStudyProject(project);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setCaseStudyProject(null);
  }, []);

  return (
    <section id="projects" className="relative py-20 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Section Header */}
        <SectionHeading
          label="Showcase"
          title="Featured"
          highlight="Projects"
          description="Innovating at the intersection of AI, Web Development, and human-centric design."
        />

        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          <div className="mb-8 sm:mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-xl font-bold text-white sm:text-2xl"
            >
              Featured Work
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-2 text-xs text-white/40 sm:text-sm"
            >
              Selected projects across AI, Full Stack, Mobile and Web.
            </motion.p>
          </div>

          {/* Responsive Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 lg:gap-8">
            {gridProjects.map((project, i) => (
              <ProjectGridCard
                key={project.title}
                project={project}
                index={i}
                onCaseStudy={handleCaseStudy}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal
        project={caseStudyProject}
        onClose={handleCloseCaseStudy}
      />
    </section>
  );
}
