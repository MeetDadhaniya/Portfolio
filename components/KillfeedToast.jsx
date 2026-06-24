'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const FEED = [
  { killer: 'meet', target: 'generic portfolios', weapon: 'ORIGINALITY' },
  { killer: 'meet', target: 'slow page loads', weapon: 'NEXT.JS' },
  { killer: 'meet', target: 'unhandled exceptions', weapon: 'TRY/CATCH' },
  { killer: 'meet', target: 'tech debt', weapon: 'REFACTOR' },
  { killer: 'meet', target: 'flaky tests', weapon: 'DETERMINISM' },
  { killer: 'meet', target: 'monolithic CSS', weapon: 'TAILWIND' },
  { killer: 'meet', target: 'global state hell', weapon: 'CONTEXT' },
  { killer: 'meet', target: 'production bugs', weapon: 'HOTFIX' },
];

export default function KillfeedToast() {
  const [toasts, setToasts] = useState([]);
  const lastScrollY = useRef(0);
  const lastFireTime = useRef(0);
  const fedIndices = useRef(new Set());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const maybeFire = () => {
      const now = Date.now();
      if (now - lastFireTime.current < 6000) return;
      if (Math.random() > 0.25) return;

      const available = FEED.map((_, i) => i).filter(i => !fedIndices.current.has(i));
      if (available.length === 0) {
        fedIndices.current.clear();
        return;
      }
      const idx = available[Math.floor(Math.random() * available.length)];
      fedIndices.current.add(idx);
      const item = { ...FEED[idx], id: now };
      setToasts(prev => [...prev, item]);
      lastFireTime.current = now;

      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== item.id));
      }, 3500);
    };

    const handleScroll = () => {
      const dy = Math.abs(window.scrollY - lastScrollY.current);
      if (dy > 250) {
        lastScrollY.current = window.scrollY;
        maybeFire();
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const initial = setTimeout(() => maybeFire(), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(initial);
    };
  }, []);

  return (
    <div className="fixed top-6 right-6 z-[150] flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.25 }}
            className="hud-border bg-[#0d0d0d]/95 px-3 py-2 flex items-center gap-3 backdrop-blur"
          >
            <span className="font-pixel text-[10px] text-[var(--accent)]">{t.killer}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">[ELIM]</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">{t.weapon}</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">▸</span>
            <span className="font-pixel text-[10px] text-[var(--fg)]">{t.target}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
