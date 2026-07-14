'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  ArrowDown,
  ArrowRight,
  MapPin,
  Briefcase,
  Code2,
  Trophy,
  GraduationCap,
} from 'lucide-react';
import { profile, stats } from '@/data/portfolio-data';

const ROLES = [
  'AI Engineer',
  'ML Engineer',
  'Full Stack Developer',
  'Flutter Developer',
  'Problem Solver',
  'Hackathon Finalist',
];

const STAT_ICONS = [Code2, Briefcase, Trophy, GraduationCap];

/* ─── Animated Title ─── */
function AnimatedTitle() {
  const line1 = 'Hi, I\'m'.split(' ');
  const line2Words = ['Ved', 'Mehta'];

  return (
    <div className="mb-3">
      {/* Line 1 */}
      <div className="font-heading text-5xl font-bold leading-[1.08] tracking-tight text-slate-text sm:text-6xl md:text-7xl lg:text-[4.25rem]">
        {line1.map((word, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: 0.3 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </div>
      {/* Line 2 */}
      <div className="font-heading text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl md:text-7xl lg:text-[4.25rem]">
        {line2Words.map((word, i) => (
          <motion.span
            key={word}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{
              duration: 0.7,
              delay: 0.55 + i * 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${
              word === 'Mehta'
                ? 'bg-gradient-to-r from-emerald via-cyan to-gold bg-clip-text text-transparent'
                : ''
            }`}
          >
            {word}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

/* ─── Typewriter ─── */
function Typewriter() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIdx];
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (text.length < role.length) {
        timer = setTimeout(() => setText(role.slice(0, text.length + 1)), 60);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (text.length > 0) {
        timer = setTimeout(() => setText(text.slice(0, -1)), 30);
      } else {
        setIsDeleting(false);
        setRoleIdx((p) => (p + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, roleIdx]);

  return (
    <span className="font-mono text-base font-medium text-emerald sm:text-lg md:text-xl">
      {text}
      <span className="typewriter-cursor" />
    </span>
  );
}

/* ─── Social Pill ─── */
function SocialPill({
  icon: Icon,
  label,
  href,
  delay,
}: {
  icon: typeof Github;
  label: string;
  href: string;
  delay: number;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.06, x: 6 }}
      className="group flex items-center gap-3 rounded-full px-4 py-2.5 hero-glass transition-all duration-300 hover:border-emerald/20 hover:shadow-[0_0_20px_rgba(34,197,94,0.12)]"
      data-cursor="button"
    >
      <Icon className="h-4 w-4 text-slate-muted transition-all duration-300 group-hover:text-emerald group-hover:rotate-[-8deg]" />
      <span className="text-xs font-medium text-slate-muted transition-all duration-300 group-hover:text-white group-hover:translate-x-0.5">
        {label}
      </span>
    </motion.a>
  );
}

/* ─── Stat Card ─── */
function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const target = stat.value;
    const duration = 1800;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current * 10) / 10);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, stat.value]);

  const Icon = STAT_ICONS[index];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card group rounded-xl px-3 py-3 text-center sm:px-5 sm:py-4"
      data-cursor="card"
    >
      <div className="mb-2 flex items-center justify-center gap-1.5 sm:gap-2">
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={visible ? { scale: 1, rotate: 0 } : {}}
          transition={{ delay: 0.3 + index * 0.1, type: 'spring', bounce: 0.4 }}
        >
          <Icon
            className="h-3.5 w-3.5 transition-colors sm:h-4 sm:w-4"
            style={{ color: stat.color }}
          />
        </motion.div>
        <span className="font-heading text-xl font-bold text-white sm:text-2xl">
          {Number.isInteger(stat.value) ? Math.round(count) : count.toFixed(1)}
          {stat.suffix}
        </span>
      </div>
      <span className="text-[9px] font-medium uppercase tracking-widest text-slate-muted/60 sm:text-[10px]">
        {stat.label}
      </span>
    </motion.div>
  );
}

/* ─── Particles Canvas ─── */
function HeroParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const init = () => {
      resize();
      const count = Math.min(50, Math.floor((canvas.width * canvas.height) / 20000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34, 211, 238, ${p.opacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

/* ─── Bio Text with Reveal ─── */
function BioText() {
  const words = [
    { text: 'Second-year', highlight: false },
    { text: 'B.Tech', highlight: false },
    { text: 'IT', highlight: false },
    { text: 'student', highlight: false },
    { text: 'specializing', highlight: false },
    { text: 'in', highlight: false },
    { text: 'AI-powered', highlight: true, color: 'emerald' },
    { text: 'multimodal', highlight: true, color: 'cyan' },
    { text: 'applications.', highlight: false },
    { text: 'Passionate', highlight: false },
    { text: 'about', highlight: false },
    { text: 'building', highlight: false },
    { text: 'intelligent', highlight: true, color: 'gold' },
    { text: 'systems', highlight: false },
    { text: 'that', highlight: false },
    { text: 'solve', highlight: false },
    { text: 'real-world', highlight: false },
    { text: 'problems', highlight: false },
    { text: 'using', highlight: false },
    { text: 'scalable', highlight: true, color: 'emerald' },
    { text: 'software', highlight: false },
    { text: 'and', highlight: false },
    { text: 'machine', highlight: true, color: 'cyan' },
    { text: 'learning.', highlight: false },
  ];

  return (
    <motion.p
      className="mb-8 max-w-[320px] text-sm leading-[1.8] text-slate-muted/70 mx-auto sm:mb-10 sm:max-w-[440px] sm:text-base lg:mx-0 lg:max-w-[540px]"
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 1.0 + i * 0.025,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`inline-block mr-[0.3em] ${
            w.highlight
              ? w.color === 'emerald'
                ? 'bg-gradient-to-r from-emerald to-emerald/70 bg-clip-text text-transparent font-medium'
                : w.color === 'cyan'
                  ? 'bg-gradient-to-r from-cyan to-cyan/70 bg-clip-text text-transparent font-medium'
                  : 'bg-gradient-to-r from-gold to-gold/70 bg-clip-text text-transparent font-medium'
              : ''
          }`}
        >
          {w.text}
        </motion.span>
      ))}
    </motion.p>
  );
}

/* ─── Main Hero ─── */
export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const portraitX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const portraitY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.6 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-[#07131F]" />
      <div className="absolute inset-0 hero-grid opacity-40" />
      <div className="hero-noise" />
      <div className="absolute inset-0 hero-glow" />

      {/* Subtle radial glows */}
      <div className="absolute top-1/4 left-1/4 h-[600px] w-[600px] rounded-full bg-emerald/[0.03] blur-[180px]" />
      <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-cyan/[0.02] blur-[140px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gold/[0.015] blur-[100px]" />

      <HeroParticles />

      {/* Main Grid */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-4 py-28 sm:px-6 sm:py-24 lg:grid-cols-[42%_58%] lg:gap-16 xl:gap-24">

        {/* LEFT — Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center order-2 lg:order-1"
        >
          <div className="relative h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] md:h-[360px] md:w-[360px] lg:h-[440px] lg:w-[440px]">
            {/* Orbit rings */}
            <motion.div
              className="absolute inset-[-24px] rounded-full orbit-ring opacity-30"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-[-56px] rounded-full orbit-ring opacity-20"
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
            />
            <div className="absolute inset-[-88px] rounded-full orbit-ring opacity-10" />

            {/* Pulse ring */}
            <motion.div
              className="absolute inset-[-6px] rounded-full border border-emerald/10"
              animate={{ scale: [1, 1.03, 1], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Soft glows */}
            <div className="absolute -inset-16 rounded-full bg-emerald/[0.06] blur-[100px]" />
            <div className="absolute -inset-8 rounded-full bg-cyan/[0.04] blur-[60px]" />

            {/* Portrait image */}
            <motion.div
              style={{ x: portraitX, y: portraitY }}
              className="relative h-full w-full rounded-full overflow-hidden border-2 border-white/10 shadow-2xl"
              data-cursor="image"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-emerald/5 via-transparent to-[#07131F]/40 z-10 pointer-events-none" />
              <img
                src={profile.photo}
                alt={profile.name}
                className="h-full w-full object-cover"
                loading="eager"
              />
            </motion.div>

            {/* Orbit dots */}
            <motion.div
              className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald"
              style={{ boxShadow: '0 0 8px rgba(34,197,94,0.8)' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold/60"
              style={{ boxShadow: '0 0 6px rgba(244,197,66,0.6)' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />
          </div>

          {/* Social pills */}
          <div className="absolute -left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
            <SocialPill icon={Github} label="GitHub" href={profile.github} delay={1.0} />
            <SocialPill icon={Linkedin} label="LinkedIn" href={profile.linkedin} delay={1.1} />
            <SocialPill icon={Mail} label="Email" href={`mailto:${profile.email}`} delay={1.2} />
            <SocialPill icon={Instagram} label="Instagram" href="https://instagram.com/" delay={1.3} />
          </div>
        </motion.div>

        {/* RIGHT — Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left order-1 lg:order-2"
        >
          {/* Badge */}
          <motion.div variants={item} className="mb-4 flex justify-center sm:mb-6 lg:justify-start">
            <span className="inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/[0.06] px-3 py-1.5 text-[10px] font-medium text-success sm:px-4 sm:text-xs">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
              </span>
              Available for opportunities
            </span>
          </motion.div>

          {/* Location */}
          <motion.div
            variants={item}
            className="mb-3 flex items-center justify-center gap-2 text-slate-muted/60 sm:mb-4 lg:justify-start"
          >
            <MapPin className="h-3.5 w-3.5 text-emerald/50" />
            <span className="text-xs sm:text-sm">{profile.location}</span>
          </motion.div>

          {/* Animated Title */}
          <AnimatedTitle />

          {/* Typewriter */}
          <motion.div
            variants={item}
            className="mb-6 h-6 sm:mb-8 sm:h-8"
            data-cursor="text"
          >
            <Typewriter />
          </motion.div>

          {/* Bio with word-by-word reveal */}
          <BioText />

          {/* Buttons */}
          <motion.div
            variants={item}
            className="mb-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4 lg:justify-start lg:mb-14"
          >
            {/* Primary — Emerald */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-[18px] bg-emerald px-7 py-3.5 text-sm font-semibold text-[#07131F] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(34,197,94,0.35)] sm:w-auto"
              data-cursor="button"
            >
              {/* Ripple */}
              <span className="absolute inset-0 -z-0" />
              <span className="absolute inset-0 -z-0 bg-gradient-to-r from-emerald/0 via-white/15 to-emerald/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                View Projects
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </span>
            </motion.a>

            {/* Secondary — Glass */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-[18px] px-7 py-3.5 text-sm font-semibold text-white/80 hero-glass transition-all duration-300 hover:border-emerald/15 hover:text-white hover:shadow-[0_0_24px_rgba(34,197,94,0.08)] sm:w-auto"
              data-cursor="button"
            >
              Get In Touch
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={item} className="grid grid-cols-2 gap-2 sm:gap-3 md:grid-cols-4 md:gap-4">
            {stats.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </motion.div>

          {/* Mobile social */}
          <motion.div
            variants={item}
            className="mt-6 flex items-center justify-center gap-3 sm:mt-8 lg:hidden"
          >
            {[
              { icon: Github, href: profile.github, label: 'GitHub' },
              { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
              { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
              { icon: Instagram, href: 'https://instagram.com/', label: 'Instagram' },
            ].map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="flex h-10 w-10 items-center justify-center rounded-full hero-glass text-slate-muted transition-all duration-300 hover:text-emerald hover:border-emerald/20 hover:shadow-[0_0_16px_rgba(34,197,94,0.15)]"
                aria-label={s.label}
                data-cursor="button"
              >
                <s.icon className="h-4 w-4" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 sm:bottom-8"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-muted/30">
            Scroll
          </span>
          <ArrowDown className="h-3.5 w-3.5 text-slate-muted/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
