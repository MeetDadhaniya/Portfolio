'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROJECTS } from '@/lib/projects';

export default function AgentRoster() {
  return (
    <section id="work" className="relative min-h-screen px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">02 / 04</div>
          <h2 className="font-pixel text-3xl md:text-5xl text-[var(--fg)]">AGENT ROSTER</h2>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hidden md:block">
          SELECT AGENT &middot; LOCK IN
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
        {PROJECTS.map((p, i) => (
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
          >
            <Link
              href={`/agents/${p.slug}`}
              data-interactive
              prefetch
              className="block group text-left hud-border bg-[var(--panel)] p-4 hover:border-[var(--accent)] hover:shadow-[0_0_0_1px_rgba(255,70,85,0.4)] transition relative"
            >
              <motion.div whileHover={{ scale: 1.01 }} className="contents">
                <div className="aspect-square bg-[#0f0f0f] hud-border grid place-items-center mb-3 relative overflow-hidden">
                  <ProjectSprite color={p.palette} />
                  <div className="absolute top-1 left-1 font-mono text-[8px] uppercase tracking-widest text-[var(--muted)]">
                    {p.id}
                  </div>
                  <div className="absolute bottom-1 right-1 font-mono text-[8px] uppercase tracking-widest text-[var(--accent)] opacity-0 group-hover:opacity-100 transition">
                    LOCK IN ▶
                  </div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-pixel text-sm text-[var(--fg)]">{p.name}</div>
                  <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--accent)]">{p.role}</div>
                </div>
                <div className="font-mono text-[11px] text-[var(--muted)] leading-relaxed h-10">{p.hook}</div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function ProjectSprite({ color, large }) {
  const pixels = [
    [3,2],[4,2],[5,2],[6,2],
    [2,3],[7,3],
    [2,4],[7,4],
    [1,5],[8,5],
    [1,6],[3,6],[6,6],[8,6],
    [1,7],[8,7],
    [2,8],[7,8],
    [3,9],[6,9],
    [4,10],[5,10],
  ];
  return (
    <svg viewBox="0 0 10 12" className={`${large ? 'w-3/4 h-3/4' : 'w-1/2 h-1/2'}`} style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {pixels.map(([x,y],i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill={color} />
      ))}
    </svg>
  );
}
