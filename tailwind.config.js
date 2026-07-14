import tailwindAnimate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  safelist: ['border', 'border-border'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        navy: {
          DEFAULT: '#07131F',
          light: '#0F2233',
          mid: '#16324A',
        },
        cyan: {
          DEFAULT: '#22D3EE',
          dark: '#1DD3D8',
          aqua: '#22C7F0',
          hover: '#3DD5F3',
          glow: 'rgba(34,211,238,0.15)',
          subtle: 'rgba(34,211,238,0.08)',
        },
        teal: {
          DEFAULT: '#4FD1C5',
          dark: '#38B2AC',
        },
        gold: {
          DEFAULT: '#F4C542',
          dark: '#D4A017',
        },
        success: {
          DEFAULT: '#7DD3A6',
          dark: '#34D399',
        },
        danger: {
          DEFAULT: '#F87171',
          dark: '#EF4444',
        },
        blue: {
          DEFAULT: '#60A5FA',
          dark: '#3B82F6',
        },
        emerald: {
          DEFAULT: '#34D399',
          dark: '#10B981',
        },
        slate: {
          text: '#F8FAFC',
          muted: '#94A3B8',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'var(--gradient-mesh)',
        'gradient-cyan': 'linear-gradient(135deg, #22D3EE, #1DD3D8, #22C7F0)',
        'gradient-card': 'var(--gradient-card)',
      },
      boxShadow: {
        'glow-sm': '0 0 15px rgba(34,211,238,0.12)',
        'glow-md': '0 0 30px rgba(34,211,238,0.18)',
        'glow-lg': '0 0 60px rgba(34,211,238,0.25)',
        'glow-cyan': '0 0 30px rgba(34,211,238,0.2)',
        'glow-cyan-lg': '0 0 60px rgba(34,211,238,0.3)',
        'glow-teal': '0 0 30px rgba(79,209,197,0.2)',
        'glow-gold': '0 0 30px rgba(244,197,66,0.2)',
        'glow-success': '0 0 30px rgba(125,211,166,0.2)',
        'glow-blue': '0 0 30px rgba(96,165,250,0.2)',
        'glow-emerald': '0 0 30px rgba(52,211,153,0.2)',
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
        'card': '0 4px 30px rgba(0,0,0,0.3)',
        'card-hover': '0 8px 40px rgba(0,0,0,0.4)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-left': {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-in-right': {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.9)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'marquee': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'border-flow': {
          '0%, 100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
        },
        'orbit': {
          from: { transform: 'rotate(0deg) translateX(var(--orbit-radius, 160px)) rotate(0deg)' },
          to: { transform: 'rotate(360deg) translateX(var(--orbit-radius, 160px)) rotate(-360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg) translateX(var(--orbit-radius, 200px)) rotate(-360deg)' },
          to: { transform: 'rotate(0deg) translateX(var(--orbit-radius, 200px)) rotate(0deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px) translateX(0px)' },
          '33%': { transform: 'translateY(-8px) translateX(4px)' },
          '66%': { transform: 'translateY(4px) translateX(-4px)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '50%': { transform: 'scale(1)', opacity: '0.8' },
          '100%': { transform: 'scale(0.95)', opacity: '0.5' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.8s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.8s ease-out forwards',
        'scale-in': 'scale-in 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
        'spin-slow': 'spin-slow 20s linear infinite',
        'border-flow': 'border-flow 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'orbit-reverse': 'orbit-reverse 25s linear infinite',
        'float-gentle': 'float-gentle 6s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 3s ease-in-out infinite',
      },
    },
  },
  plugins: [
    tailwindAnimate,
    function ({ addUtilities }) {
      addUtilities({
        '.border-t-solid': { 'border-top-style': 'solid' },
        '.border-r-solid': { 'border-right-style': 'solid' },
        '.border-b-solid': { 'border-bottom-style': 'solid' },
        '.border-l-solid': { 'border-left-style': 'solid' },
        '.text-gradient-cyan': {
          background: 'linear-gradient(135deg, #22D3EE, #4FD1C5)',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.bg-glass': {
          background: 'rgba(255,255,255,0.03)',
          'backdrop-filter': 'blur(20px)',
          '-webkit-backdrop-filter': 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.06)',
        },
        '.bg-glass-strong': {
          background: 'rgba(255,255,255,0.06)',
          'backdrop-filter': 'blur(30px)',
          '-webkit-backdrop-filter': 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.1)',
        },
        '.bg-noise': {
          'background-image': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          opacity: '0.03',
        },
        '.bg-grid': {
          'background-image': 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          'background-size': '60px 60px',
        },
      });
    },
  ],
};
