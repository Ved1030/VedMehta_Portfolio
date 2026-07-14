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
    <section id="about" className="relative py-24 md:py-32 overflow-hidden section-bg">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-cyan/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
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

            <h2 className="mb-6 font-heading text-4xl font-bold tracking-tight text-white md:text-5xl">
              A Second-Year Student with a{' '}
              <span className="text-gradient-cyan">Passion</span> for
              Innovation.
            </h2>

            <div className="space-y-4 text-lg leading-relaxed text-white/50">
              <p>
                {profile.bio}
              </p>
              <p>
                I specialize in building AI-powered applications, explainable AI systems, full-stack web platforms, and intelligent mobile applications. My work focuses on solving real-world problems using scalable software and machine learning technologies.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2">
                <GraduationCap className="h-4 w-4 text-success" />
                <span className="text-sm font-medium text-white/70">B.Tech in IT</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm font-medium text-white/70">GPA: 8.5/10</span>
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
                className="group glass-card rounded-2xl p-6"
                data-cursor="card"
              >
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-all group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.color}15`,
                      color: item.color,
                    }}
                  >
                    <item.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-white/40">
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
