'use client';
import { useState, useCallback, useMemo } from 'react';
import { motion } from 'motion/react';
import SectionHeading from '@/components/common/SectionHeading';
import FeaturedProject from './FeaturedProject';
import ProjectGridCard from './ProjectGridCard';
import CaseStudyModal from './CaseStudyModal';
import { projects } from '@/data/portfolio-data';

// Hide these from the UI
const HIDDEN_PROJECTS = ['Constituency Dev Platform', 'TrustWealth AI'];

// Featured project is always AURA
const FEATURED_TITLE = 'AURA';

// Grid ordering: 3 columns × 2 rows = 6 projects
const GRID_ORDER = [
  'ZipDrop',
  'SkillLab',
  'Prvaas',
  'Pet Clinic',
  'Noble Classes',
  'ChronoCancer AI',
];

export default function Projects() {
  const [caseStudyProject, setCaseStudyProject] = useState<typeof projects[0] | null>(null);

  const featuredProject = useMemo(
    () => projects.find((p) => p.title === FEATURED_TITLE) || projects[0],
    [],
  );

  const gridProjects = useMemo(() => {
    return GRID_ORDER
      .map((title) => projects.find((p) => p.title === title))
      .filter(
        (p): p is (typeof projects)[0] =>
          p !== undefined && !HIDDEN_PROJECTS.includes(p.title) && p.title !== FEATURED_TITLE,
      );
  }, []);

  const handleCaseStudy = useCallback((project: typeof projects[0]) => {
    setCaseStudyProject(project);
  }, []);

  const handleCloseCaseStudy = useCallback(() => {
    setCaseStudyProject(null);
  }, []);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6">
        {/* Section Header */}
        <SectionHeading
          label="Showcase"
          title="Featured"
          highlight="Projects"
          description="Innovating at the intersection of AI, Web Development, and human-centric design."
        />

        {/* Featured Project */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <FeaturedProject
            project={featuredProject}
            index={0}
            onCaseStudy={handleCaseStudy}
          />
        </motion.div>

        {/* Other Featured Work */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ delay: 0.1, duration: 0.6 }}
        >
          {/* Section Title */}
          <div className="mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="font-heading text-2xl font-bold text-white"
            >
              Other Featured Work
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="mt-2 text-sm text-white/40"
            >
              Selected projects across AI, Full Stack, Mobile and Web.
            </motion.p>
          </div>

          {/* Responsive Grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
