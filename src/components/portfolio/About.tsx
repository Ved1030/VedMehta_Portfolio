'use client';
import { motion } from 'motion/react';
import { User, Code2, Brain, Cpu, GraduationCap } from 'lucide-react';
import { profile } from '@/data/portfolio-data';

const highlights = [
  {
    icon: Cpu,
    title: 'AI Systems',
    description: 'Building intelligent systems using LLMs, CNNs, and Agentic AI architectures.',
    color: '#22D3EE',
  },
  {
    icon: Code2,
    title: 'Full Stack',
    description: 'Crafting scalable web applications with React, Next.js, and Node.js.',
    color: '#60A5FA',
  },
  {
    icon: Brain,
    title: 'Explainable AI',
    description: 'Specializing in XAI for transparent and trustworthy ML models.',
    color: '#4FD1C5',
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32 overflow-hidden section-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/5 px-4 py-1.5">
              <User className="h-3.5 w-3.5 text-cyan" />
              <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan">
                About Me
              </span>
            </div>

            <h2 className="mb-6 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
              A Second-Year Student with a{' '}
              <span className="text-gradient-cyan">Passion</span> for
              Innovation.
            </h2>

            <div className="space-y-4 text-base leading-relaxed text-white/50 sm:text-lg">
              <p>
                {profile.bio}
              </p>
              <p>
                I specialize in building AI-powered applications, explainable AI systems, full-stack web platforms, and intelligent mobile applications. My work focuses on solving real-world problems using scalable software and machine learning technologies.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 sm:px-4">
                <GraduationCap className="h-4 w-4 text-success" />
                <span className="text-xs font-medium text-white/70 sm:text-sm">B.Tech in IT</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-3 py-2 sm:px-4">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-xs font-medium text-white/70 sm:text-sm">GPA: 9.525 /10</span>
              </div>
            </div>
          </motion.div>

          {/* Right — Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="space-y-4"
          >
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
                whileHover={{ scale: 1.02, x: 4 }}
                className="group glass-card rounded-2xl p-5 sm:p-6"
                data-cursor="card"
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110 sm:h-12 sm:w-12"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-base font-bold text-white sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-white/40 sm:text-sm">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
