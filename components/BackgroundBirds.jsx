'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sound from '@/lib/sound';

const MAX_BIRDS = 3;
const SPAWN_MIN = 2800;
const SPAWN_MAX = 5500;

function randomBird() {
  if (typeof window === 'undefined') return null;
  const dir = Math.random() < 0.5 ? 1 : -1;
  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const y = 70 + Math.random() * Math.max(80, vh * 0.32 - 70);
  const speed = 60 + Math.random() * 80;
  const startX = dir > 0 ? -50 : vw + 50;
  const endX   = dir > 0 ? vw + 60 : -60;
  return { id: Date.now() + Math.random(), startX, endX, y, speed, dir };
}

export default function BackgroundBirds() {
  const [birds, setBirds] = useState([]);
  const [kills, setKills] = useState(0);
  const [toasts, setToasts] = useState([]);
  const birdsRef = useRef(birds);
  birdsRef.current = birds;

  useEffect(() => {
    if (typeof window === 'undefined') return;
    let timer;
    const schedule = () => {
      const delay = SPAWN_MIN + Math.random() * (SPAWN_MAX - SPAWN_MIN);
      timer = setTimeout(() => {
        if (birdsRef.current.length < MAX_BIRDS) {
          const b = randomBird();
          if (b) setBirds((prev) => [...prev, b]);
        }
        schedule();
      }, delay);
    };
    const first = setTimeout(() => {
      const b = randomBird();
      if (b) setBirds((prev) => [...prev, b]);
      schedule();
    }, 1200);
    return () => { clearTimeout(timer); clearTimeout(first); };
  }, []);

  const handleDespawn = useCallback((id) => {
    setBirds((prev) => prev.filter((b) => b.id !== id));
  }, []);

  const handleKill = useCallback((x, y) => {
    setKills((k) => k + 1);
    try { Sound.headshot?.(); } catch (_) {}
    const id = Date.now() + Math.random();
    const label = Math.random() < 0.5 ? 'HEADSHOT' : 'TARGET ELIMINATED';
    setToasts((prev) => [...prev, { id, x, y, label }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 900);
  }, []);

  return (
    <>
      <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {birds.map((b) => (
          <Bird key={b.id} {...b} onDespawn={handleDespawn} onKill={handleKill} />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 z-[1100]" aria-hidden>
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 0, scale: 0.8 }}
              animate={{ opacity: 1, y: -28, scale: 1 }}
              exit={{ opacity: 0, y: -48 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="absolute font-pixel text-[10px] tracking-widest text-[var(--accent)] whitespace-nowrap"
              style={{ left: t.x, top: t.y, transform: 'translate(-50%, -50%)' }}
            >
              <span className="hud-border-accent bg-[#0d0d0d]/90 px-2 py-1 inline-block">
                {t.label}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 z-[1050] font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
        BIRDS&nbsp;<span className="text-[var(--accent)]">{String(kills).padStart(2, '0')}</span>
      </div>
    </>
  );
}

function Bird({ id, startX, endX, y, speed, dir, onDespawn, onKill }) {
  const [pos, setPos] = useState({ x: startX, dy: 0, rot: 0, opacity: 1, frame: 0 });
  const [dead, setDead] = useState(false);
  const stateRef = useRef({ x: startX, deathT: 0, flapT: 0, dead: false });

  useEffect(() => {
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = stateRef.current;

      if (!s.dead) {
        s.x += dir * speed * dt;
        s.flapT += dt;
        let frame = pos.frame;
        if (s.flapT > 0.22) {
          frame = 1 - frame;
          s.flapT = 0;
        }
        const done = (dir > 0 && s.x > endX) || (dir < 0 && s.x < endX);
        if (done) { onDespawn(id); return; }
        setPos((p) => ({ ...p, x: s.x, frame }));
      } else {
        s.deathT += dt;
        const dy = 0.5 * 1600 * s.deathT * s.deathT;          // gravity (px/s^2)
        const rot = (dir > 0 ? 720 : -720) * (s.deathT / 0.8);
        const opacity = Math.max(0, 1 - s.deathT / 0.8);
        setPos((p) => ({ ...p, dy, rot, opacity }));
        if (s.deathT > 0.85) { onDespawn(id); return; }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (e) => {
    if (stateRef.current.dead) return;
    e.stopPropagation();
    stateRef.current.dead = true;
    setDead(true);
    onKill(e.clientX, e.clientY);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      data-no-click-sound
      className="absolute p-1 bg-transparent border-0 outline-none"
      style={{
        left: pos.x,
        top: y + pos.dy,
        transform: `rotate(${pos.rot}deg)`,
        opacity: pos.opacity,
        cursor: 'none',
        willChange: 'transform, opacity, left, top',
      }}
      aria-label="shoot bird"
    >
      <BirdSprite frame={dead ? 'dead' : pos.frame} flip={dir < 0} />
    </button>
  );
}

function BirdSprite({ frame, flip }) {
  let pixels;
  if (frame === 'dead') {
    pixels = [
      [4,2],[5,2],[10,2],[11,2],
      [3,4],[5,4],[6,4],[7,4],[8,4],[9,4],[10,4],[12,4],
      [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],
      [6,6],[7,6],[8,6],[9,6],
    ];
  } else if (frame === 0) {
    pixels = [
      [2,1],[13,1],
      [3,2],[12,2],
      [4,3],[5,3],[6,3],[7,3],[8,3],[9,3],[10,3],[11,3],
      [5,4],[6,4],[7,4],[8,4],[9,4],[10,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
    ];
  } else {
    pixels = [
      [4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
      [2,3],[3,3],[12,3],[13,3],
      [5,4],[6,4],[7,4],[8,4],[9,4],[10,4],
      [6,5],[7,5],[8,5],[9,5],
      [7,6],[8,6],
    ];
  }
  return (
    <svg
      viewBox="0 0 16 10"
      width="32"
      height="20"
      style={{ imageRendering: 'pixelated', transform: flip ? 'scaleX(-1)' : 'none' }}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {pixels.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill="#ECE8E1" />
      ))}
    </svg>
  );
}
