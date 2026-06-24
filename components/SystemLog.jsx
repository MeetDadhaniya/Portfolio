'use client';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const POOL = [
  '[OK] auth.service initialized',
  '[OK] agent.meet loaded',
  '[OK] render pipeline ready',
  '[OK] socket connection established',
  '[..] awaiting input',
  '[OK] shaders compiled',
  '[OK] asset cache warmed',
  '[..] syncing match data',
  '[OK] coffee levels nominal',
  '[OK] imposter syndrome suppressed',
  '[OK] linter pacified',
  '[OK] git hooks armed',
  '[..] negotiating crdt handshake',
  '[OK] hot reload subscribed',
  '[OK] tailwind purge complete',
  '[OK] keyboard claymore primed',
  '[..] streaming patch notes',
  '[OK] vibes calibrated to 144hz',
  '[OK] tabs aligned to spaces',
  '[..] queueing for ranked',
  '[OK] dark mode enforced',
  '[OK] muscle memory loaded',
];

const VISIBLE = 6;
const INTERVAL = 1300;

function pickLine(prev) {
  for (let i = 0; i < 5; i++) {
    const line = POOL[Math.floor(Math.random() * POOL.length)];
    if (line !== prev) return line;
  }
  return POOL[0];
}

export default function SystemLog() {
  const [lines, setLines] = useState([]);
  const counter = useRef(0);
  const lastRef = useRef('');

  useEffect(() => {
    const seed = [];
    let last = '';
    for (let i = 0; i < 3; i++) {
      const l = pickLine(last);
      last = l;
      seed.push({ id: counter.current++, text: l });
    }
    lastRef.current = last;
    setLines(seed);

    const interval = setInterval(() => {
      setLines((prev) => {
        const l = pickLine(lastRef.current);
        lastRef.current = l;
        const next = [...prev, { id: counter.current++, text: l }];
        if (next.length > VISIBLE) next.shift();
        return next;
      });
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="pointer-events-none absolute bottom-16 left-6 z-0 select-none"
      style={{
        width: 280,
        height: VISIBLE * 18,
        maskImage:
          'linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent 0%, black 30%, black 75%, transparent 100%)',
      }}
      aria-hidden
    >
      <div className="flex flex-col justify-end h-full">
        <AnimatePresence initial={false}>
          {lines.map((line) => {
            const isPending = line.text.startsWith('[..]');
            return (
              <motion.div
                key={line.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 0.28, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="font-mono text-[11px] leading-[18px] tracking-wide text-[var(--fg)] whitespace-nowrap"
              >
                <span className={isPending ? 'text-[var(--accent)]' : 'text-[var(--fg)]'}>
                  {line.text.slice(0, 4)}
                </span>
                <span className="text-[var(--fg)]">{line.text.slice(4)}</span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
