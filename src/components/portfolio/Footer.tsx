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
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          {/* Logo */}
          <div>
            <span className="font-heading text-xl font-bold">
              <span className="text-gradient-cyan">VED</span>
              <span className="text-white/40">.MEHTA</span>
            </span>
            <p className="mt-2 max-w-xs text-sm text-white/30">
              Building intelligent systems and scalable software powered by AI.
            </p>
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/30 transition-all hover:border-white/20 hover:text-white hover:shadow-glow-sm"
                aria-label={social.label}
                data-cursor="button"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="text-xs text-white/20">
            &copy; {currentYear} Ved Mehta. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/20">
            Built with <Heart className="h-3 w-3 text-danger" /> React & Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
