'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import type { Project } from '@/data/portfolio-data';

export type CursorVariant =
  | 'default'
  | 'text'
  | 'button'
  | 'card'
  | 'project'
  | 'image';

interface CursorState {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  variant: CursorVariant;
  projectData: Project | null;
  isPressed: boolean;
  isVisible: boolean;
  isTouchDevice: boolean;
}

interface CursorContextValue extends CursorState {
  setVariant: (v: CursorVariant) => void;
  setProjectData: (p: Project | null) => void;
  setPressed: (p: boolean) => void;
}

const CursorContext = createContext<CursorContextValue | null>(null);

export function useCursor() {
  const ctx = useContext(CursorContext);
  if (!ctx) throw new Error('useCursor must be used within CursorProvider');
  return ctx;
}

function isTouchDevice() {
  if (typeof window === 'undefined') return true;
  return (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    (window.matchMedia?.('(pointer: coarse)').matches ?? false)
  );
}

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<CursorState>({
    x: -100,
    y: -100,
    velocityX: 0,
    velocityY: 0,
    speed: 0,
    variant: 'default',
    projectData: null,
    isPressed: false,
    isVisible: false,
    isTouchDevice: isTouchDevice(),
  });

  const prevPos = useRef({ x: 0, y: 0 });
  const prevTime = useRef(Date.now());
  const rafId = useRef<number>(0);
  const pendingPos = useRef({ x: 0, y: 0 });
  const pendingVariant = useRef<CursorVariant>('default');
  const pendingProject = useRef<Project | null>(null);

  useEffect(() => {
    if (state.isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      pendingPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseDown = () => {
      setState((s) => ({ ...s, isPressed: true }));
    };

    const handleMouseUp = () => {
      setState((s) => ({ ...s, isPressed: false }));
    };

    const handleMouseEnter = () => {
      setState((s) => ({ ...s, isVisible: true }));
    };

    const handleMouseLeave = () => {
      setState((s) => ({ ...s, isVisible: false, x: -100, y: -100 }));
    };

    // Event delegation for data-cursor attributes
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        const variant = cursorEl.getAttribute('data-cursor') as CursorVariant;
        if (variant) pendingVariant.current = variant;

        // Check for project data
        const projectAttr = cursorEl.getAttribute('data-project-index');
        if (projectAttr !== null) {
          // Project data will be set via the component itself
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const relatedTarget = e.relatedTarget as HTMLElement | null;
      if (!relatedTarget || !relatedTarget.closest?.('[data-cursor]')) {
        pendingVariant.current = 'default';
      }
    };

    const tick = () => {
      const now = Date.now();
      const dt = Math.max(now - prevTime.current, 1);
      prevTime.current = now;

      const dx = pendingPos.current.x - prevPos.current.x;
      const dy = pendingPos.current.y - prevPos.current.y;
      const speed = Math.sqrt(dx * dx + dy * dy) / (dt / 16);

      prevPos.current = { x: pendingPos.current.x, y: pendingPos.current.y };

      setState((s) => ({
        ...s,
        x: pendingPos.current.x,
        y: pendingPos.current.y,
        velocityX: dx / (dt / 16),
        velocityY: dy / (dt / 16),
        speed: Math.min(speed, 50),
        variant: pendingVariant.current,
        projectData: pendingProject.current,
      }));

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
      cancelAnimationFrame(rafId.current);
    };
  }, [state.isTouchDevice]);

  const setVariant = useCallback((v: CursorVariant) => {
    pendingVariant.current = v;
  }, []);

  const setProjectData = useCallback((p: Project | null) => {
    pendingProject.current = p;
  }, []);

  const setPressed = useCallback((p: boolean) => {
    setState((s) => ({ ...s, isPressed: p }));
  }, []);

  return (
    <CursorContext.Provider
      value={{ ...state, setVariant, setProjectData, setPressed }}
    >
      {children}
    </CursorContext.Provider>
  );
}
