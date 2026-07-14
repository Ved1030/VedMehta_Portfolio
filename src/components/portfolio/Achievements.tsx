'use client';
import { motion } from 'motion/react';
import { Trophy, Target, Medal, Flame } from 'lucide-react';
import SectionHeading from '@/components/common/SectionHeading';
import { achievements } from '@/data/portfolio-data';
import { useCountUp } from '@/hooks/use-animation';

const iconMap = {
  trophy: Trophy,
  target: Target,
  medal: Medal,
};

function AchievementCard({
  achievement,
  index,
}: {
  achievement: (typeof achievements)[0];
  index: number;
}) {
  const Icon = iconMap[achievement.icon as keyof typeof iconMap] || Trophy;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15, duration: 0.6 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group glass-card rounded-2xl p-6 md:p-8"
      data-cursor="card"
    >
      <div className="mb-6 flex items-center justify-between">
        <div
          className="flex h-14 w-14 items-center justify-center rounded-xl transition-all group-hover:scale-110"
          style={{
            backgroundColor: `${achievement.color}15`,
            color: achievement.color,
          }}
        >
          <Icon className="h-7 w-7" />
        </div>
        <span
          className="font-heading text-3xl font-bold"
          style={{ color: achievement.color }}
        >
          {achievement.metric}
        </span>
      </div>

      <h3 className="mb-1 font-heading text-lg font-bold text-white">
        {achievement.title}
      </h3>
      <p
        className="mb-3 text-xs font-bold uppercase tracking-wider"
        style={{ color: `${achievement.color}CC` }}
      >
        {achievement.subtitle}
      </p>
      <p className="mb-6 text-sm leading-relaxed text-white/40">
        {achievement.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {achievement.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
            style={{
              backgroundColor: `${achievement.color}10`,
              color: `${achievement.color}99`,
              border: `1px solid ${achievement.color}15`,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function CounterSection() {
  const projects = useCountUp(9, 2000);
  const technologies = useCountUp(15, 2000);
  const hackathons = useCountUp(3, 1500);

  const counters = [
    { ...projects, label: 'Projects Built', color: '#22D3EE' },
    { ...technologies, label: 'Technologies', color: '#60A5FA' },
    { ...hackathons, label: 'Hackathons Won', color: '#F4C542' },
  ];

  return (
    <div className="mb-16 grid grid-cols-3 gap-4 md:gap-8">
      {counters.map((c) => (
        <motion.div
          key={c.label}
          ref={c.ref}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="mb-2 flex items-center justify-center gap-1">
            <Flame className="h-5 w-5" style={{ color: c.color }} />
            <span className="font-heading text-4xl font-bold text-white md:text-5xl">
              {c.count}
            </span>
            <span
              className="font-heading text-4xl font-bold md:text-5xl"
              style={{ color: c.color }}
            >
              +
            </span>
          </div>
          <span className="text-xs font-medium uppercase tracking-widest text-white/30">
            {c.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 md:py-32 overflow-hidden section-bg">
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-mid to-navy" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      <div className="absolute left-1/4 top-1/3 h-[300px] w-[300px] rounded-full bg-gold/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <SectionHeading
          label="Recognition"
          title="Hackathons &"
          highlight="Achievements"
          description="Recognized for innovation and technical excellence in national and international events."
        />

        <CounterSection />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <AchievementCard key={a.title} achievement={a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
