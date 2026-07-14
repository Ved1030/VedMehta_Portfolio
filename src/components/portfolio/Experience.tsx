'use client';
import { motion } from 'motion/react';
import { Briefcase, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { experiences } from '@/data/portfolio-data';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden section-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <SectionHeading
          label="Journey"
          title="Work"
          highlight="Experience"
          description="Practical application of software engineering and full-stack development in professional environments."
        />

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-cyan via-teal/30 to-transparent md:left-8" />

          {experiences.map((exp, i) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
              className="relative mb-12 pl-16 md:pl-20"
            >
              {/* Timeline dot */}
              <div className="absolute left-4 top-1 h-4 w-4 rounded-full border-2 border-cyan bg-navy md:left-6 md:top-2">
                <div className="absolute inset-0 animate-glow-pulse rounded-full bg-cyan/30 blur-sm" />
              </div>

              <div className="glass-card rounded-2xl p-6 md:p-8" data-cursor="card">
                <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="font-heading text-xl font-bold text-white md:text-2xl">
                      {exp.role}
                    </h3>
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-white/40">
                      <span className="flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-cyan" />
                        {exp.company}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-teal" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5 text-slate-muted" />
                        {exp.location}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mb-4 text-sm text-white/40">{exp.description}</p>

                <ul className="mb-6 space-y-2.5">
                  {exp.responsibilities.map((resp) => (
                    <li
                      key={resp}
                      className="flex items-start gap-2.5 text-sm text-white/50 leading-relaxed"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      {resp}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/5 bg-white/5 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
