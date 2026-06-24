'use client';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sound from '@/lib/sound';

export default function PingEffect() {
  const [pings, setPings] = useState([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handler = (e) => {
      const target = e.target;
      if (!target) return;
      if (target.closest?.('a, button, [role="button"], input, textarea, select, [data-interactive]')) return;
      const id = Date.now() + Math.random();
      setPings(prev => [...prev, { id, x: e.clientX, y: e.clientY }]);
      try { Sound.ping(); } catch (_) {}
      setTimeout(() => {
        setPings(prev => prev.filter(p => p.id !== id));
      }, 1100);
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[140] overflow-hidden">
      <AnimatePresence>
        {pings.map(p => (
          <motion.div
            key={p.id}
            className="absolute"
            style={{ left: p.x, top: p.y, transform: 'translate(-50%, -50%)' }}
            initial={{ opacity: 1, scale: 0.2 }}
            animate={{ opacity: 0, scale: 2.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <div className="w-12 h-12 rounded-full border border-[var(--accent)]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-[var(--accent)]" />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
