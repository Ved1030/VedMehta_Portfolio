'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { navLinks, profile } from '@/data/portfolio-data';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          const currentY = window.scrollY;

          setScrolled(currentY > 50);

          if (currentY > lastScrollY.current && currentY > 120) {
            setHidden(true);
          } else {
            setHidden(false);
          }

          lastScrollY.current = currentY;

          const sections = navLinks.map((l) => l.href.replace('#', ''));
          for (let i = sections.length - 1; i >= 0; i--) {
            const el = document.getElementById(sections[i]);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= 150) {
                setActiveSection(`#${sections[i]}`);
                break;
              }
            }
          }

          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[101] h-[2px] origin-left bg-gradient-to-r from-cyan via-teal to-gold"
        style={{ scaleX }}
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-500',
          scrolled
            ? 'bg-navy/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
            : 'bg-transparent',
        )}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6 lg:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#home')}
            className="group relative text-lg font-heading font-bold tracking-tight sm:text-xl"
            data-cursor="button"
            aria-label="Go to top"
          >
            <span className="text-gradient-cyan">VED</span>
            <span className="text-white/90">.</span>
            <span className="text-white/60 group-hover:text-white transition-colors duration-300">
              MEHTA
            </span>
          </button>

          {/* Desktop Nav Links */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-colors rounded-lg',
                  activeSection === link.href
                    ? 'text-white'
                    : 'text-white/50 hover:text-white/80',
                )}
                data-cursor="text"
              >
                {activeSection === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-cyan/5"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </button>
            ))}
          </div>

          {/* Desktop Resume Button */}
          <div className="hidden md:block">
            <Button
              asChild
              size="sm"
              className="rounded-full bg-cyan hover:bg-cyan-hover text-navy font-semibold border-0 px-5 gap-2"
              data-cursor="button"
            >
              <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
                Resume
              </a>
            </Button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-lg text-white/70 hover:text-white transition-colors md:hidden"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[99] bg-navy/98 backdrop-blur-2xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <div className="flex h-full flex-col items-center justify-center gap-6 px-6 sm:gap-8">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ delay: i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => scrollTo(link.href)}
                  className={cn(
                    'text-2xl font-heading font-bold transition-colors sm:text-3xl',
                    activeSection === link.href
                      ? 'text-cyan'
                      : 'text-white/50 hover:text-white',
                  )}
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-[240px]"
              >
                <Button
                  asChild
                  size="lg"
                  className="w-full rounded-full bg-cyan text-navy font-semibold px-8"
                >
                  <a
                    href={profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
