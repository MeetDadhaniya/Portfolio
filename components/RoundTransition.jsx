'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sound from '@/lib/sound';

export default function RoundTransition({ label, code, children, sound = 'round' }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shown) {
            setShown(true);
            setShowOverlay(true);
            try { Sound[sound]?.(); } catch (_) {}
            setTimeout(() => setShowOverlay(false), 1100);
          }
        });
      },
      { threshold: 0.18 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [shown, sound]);

  return (
    <div ref={ref} className="relative">
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="pointer-events-none absolute left-0 right-0 top-0 z-30 overflow-hidden"
            style={{ height: '100vh' }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-20 bg-[var(--accent)] flex items-center"
              initial={{ scaleX: 0, transformOrigin: 'left center' }}
              animate={{ scaleX: [0, 1, 1, 0], transformOrigin: ['left center', 'left center', 'right center', 'right center'] }}
              transition={{ duration: 1.0, times: [0, 0.35, 0.65, 1], ease: 'easeInOut' }}
            >
              <div className="w-full px-6 md:px-12 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/80">{code}</span>
                  <span className="w-2 h-2 bg-white" />
                </div>
                <div className="font-pixel text-xl md:text-3xl text-white tracking-widest">
                  {label}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/80 hidden md:block">
                  ROUND START
                </div>
              </div>
            </motion.div>
            <motion.div
              className="absolute left-0 right-0 top-[calc(50%-3rem)] h-px bg-white/80"
              initial={{ scaleX: 0, transformOrigin: 'right' }}
              animate={{ scaleX: [0, 1, 0], transformOrigin: ['right', 'right', 'left'] }}
              transition={{ duration: 0.9, times: [0, 0.5, 1], ease: 'easeInOut', delay: 0.05 }}
            />
            <motion.div
              className="absolute left-0 right-0 top-[calc(50%+3rem)] h-px bg-white/80"
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              animate={{ scaleX: [0, 1, 0], transformOrigin: ['left', 'left', 'right'] }}
              transition={{ duration: 0.9, times: [0, 0.5, 1], ease: 'easeInOut', delay: 0.1 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}
