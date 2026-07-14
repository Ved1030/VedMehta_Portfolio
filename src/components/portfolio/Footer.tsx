import { Github, Mail, Linkedin, Heart } from 'lucide-react';
import { profile } from '@/data/portfolio-data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: profile.github, label: 'GitHub' },
    { icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { icon: Mail, href: `mailto:${profile.email}`, label: 'Email' },
  ];

  return (
    <footer className="relative border-t border-white/5 bg-navy">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:gap-8">
          {/* Logo */}
          <div className="text-center md:text-left">
            <span className="font-heading text-lg font-bold sm:text-xl">
              <span className="text-gradient-cyan">VED</span>
              <span className="text-white/40">.MEHTA</span>
            </span>
            <p className="mt-2 max-w-xs text-xs text-white/30 sm:text-sm">
              Building intelligent systems and scalable software powered by AI.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-white/20 hover:text-white hover:shadow-glow-sm sm:h-10 sm:w-10"
                aria-label={social.label}
                data-cursor="button"
              >
                <social.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:mt-8 sm:gap-4 sm:pt-8 md:flex-row">
          <p className="text-[10px] text-white/20 sm:text-xs">
            &copy; {currentYear} Ved Mehta. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-[10px] text-white/20 sm:text-xs">
            Built with <Heart className="h-2.5 w-2.5 text-danger sm:h-3 sm:w-3" /> React & Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
