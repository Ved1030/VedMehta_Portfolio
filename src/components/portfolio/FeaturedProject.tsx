'use client';
import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Github, ExternalLink, ArrowUpRight, Layers, Code2, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import type { Project } from '@/data/portfolio-data';
import { projectImages } from '@/data/image-manifest';

import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

interface FeaturedProjectProps {
  project: Project;
  index: number;
  onCaseStudy: (project: Project) => void;
}

export default function FeaturedProject({ project, index, onCaseStudy }: FeaturedProjectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['2deg', '-2deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-2deg', '2deg']);

  const allImages = projectImages[project.title]?.images || [];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <motion.div
        ref={cardRef}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="group relative max-h-[520px] rounded-[22px] border border-white/[0.06] bg-[#0F2233]/80 backdrop-blur-sm overflow-hidden transition-all duration-500"
        style={{
          boxShadow: isHovered
            ? `0 16px 60px ${project.color}12, 0 0 0 1px ${project.color}08`
            : '0 6px 32px rgba(0,0,0,0.35)',
        }}
      >
        {/* Animated border glow */}
        <div
          className="absolute -inset-[1px] rounded-[22px] opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, ${project.color}25, transparent 40%, transparent 60%, ${project.color}10)`,
          }}
        />

        <div className="relative grid h-[520px] gap-0 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Left — Swiper Image Gallery */}
          <div className="relative bg-[#16324A]/50 h-full overflow-hidden">
            {allImages.length > 0 ? (
              <div className="flex flex-col h-full">
                {/* Main Swiper */}
                <div className="flex-1 relative min-h-0">
                  <Swiper
                    modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                    loop={true}
                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : undefined }}
                    autoplay={{
                      delay: 4000,
                      disableOnInteraction: false,
                    }}
                    navigation={{
                      nextEl: '.featured-swiper-next',
                      prevEl: '.featured-swiper-prev',
                    }}
                    fadeEffect={{ crossFade: true }}
                    effect="fade"
                    className="h-full featured-main-swiper"
                  >
                    {allImages.map((img, i) => (
                      <SwiperSlide key={i}>
                        <div className="relative h-full overflow-hidden">
                          <img
                            src={img}
                            alt={`${project.title} - Screenshot ${i + 1}`}
                            className="h-full w-full object-cover"
                            loading={i === 0 ? 'eager' : 'lazy'}
                          />
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  {/* Navigation arrows */}
                  <button className="featured-swiper-prev absolute left-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/70 transition-all hover:bg-black/60 hover:text-white">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M15 18l-6-6 6-6" /></svg>
                  </button>
                  <button className="featured-swiper-next absolute right-3 top-1/2 -translate-y-1/2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm text-white/70 transition-all hover:bg-black/60 hover:text-white">
                    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18l6-6-6-6" /></svg>
                  </button>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider backdrop-blur-md"
                      style={{
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                        border: `1px solid ${project.color}30`,
                      }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full animate-pulse"
                        style={{ backgroundColor: project.color }}
                      />
                      {project.category}
                    </motion.span>
                  </div>
                </div>

                {/* Thumbnail Swiper */}
                {allImages.length > 1 && (
                  <div className="border-t border-white/[0.04] bg-[#0a1a2a]/60 px-2 py-1.5 shrink-0">
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      modules={[FreeMode, Thumbs]}
                      spaceBetween={4}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      breakpoints={{
                        640: { slidesPerView: 5 },
                        1024: { slidesPerView: 6 },
                      }}
                      className="featured-thumbs-swiper"
                    >
                      {allImages.map((img, i) => (
                        <SwiperSlide key={i}>
                          <div className="relative aspect-[16/10] rounded-md overflow-hidden cursor-pointer opacity-40 transition-opacity duration-200 [&.swiper-slide-active]:opacity-100">
                            <img
                              src={img}
                              alt=""
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <project.icon
                  className="h-24 w-24"
                  style={{ color: `${project.color}40` }}
                />
              </div>
            )}
          </div>

          {/* Right — Content */}
          <div className="relative p-6 lg:p-8 flex flex-col justify-center">
            {/* Project number */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 font-mono text-xs text-white/20"
            >
              {String(index + 1).padStart(2, '0')}
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 font-heading text-2xl font-bold text-white lg:text-3xl"
            >
              {project.title}
            </motion.h3>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mb-3 text-sm font-medium"
              style={{ color: project.color }}
            >
              {project.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-5 text-sm leading-relaxed text-white/45 line-clamp-3"
            >
              {project.description}
            </motion.p>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mb-5"
            >
              <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wider text-white/25">
                <Code2 className="h-3 w-3" />
                Tech Stack
              </div>
              <div className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="border-white/5 bg-white/5 text-[10px] font-medium text-white/55 px-2.5 py-0.5"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6 grid grid-cols-3 gap-3"
            >
              {[
                { label: 'Images', value: allImages.length || 1, icon: Layers },
                { label: 'Tech', value: project.tech.length, icon: Code2 },
                { label: 'Status', value: 'Live', icon: Sparkles },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="mx-auto mb-0.5 h-3.5 w-3.5" style={{ color: project.color }} />
                  <div className="font-heading text-base font-bold text-white">{stat.value}</div>
                  <div className="text-[9px] uppercase tracking-wider text-white/25">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-2"
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/65 transition-all hover:border-white/20 hover:text-white"
                data-cursor="button"
              >
                <Github className="h-3.5 w-3.5" />
                GitHub
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </motion.a>

              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-navy transition-all"
                style={{
                  backgroundColor: project.color,
                  boxShadow: `0 0 16px ${project.color}25`,
                }}
                data-cursor="button"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </motion.a>

              <motion.button
                onClick={() => onCaseStudy(project)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="group/btn inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/65 transition-all hover:border-white/20 hover:text-white"
                data-cursor="button"
              >
                Case Study
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
