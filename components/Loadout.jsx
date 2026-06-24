'use client';
import { motion } from 'framer-motion';

const LOADOUT = {
  PRIMARY: {
    desc: 'MAIN COMBAT KIT',
    items: [
      { name: 'PYTHON', tier: 'S', note: 'FastAPI, Django, asyncio. 8+ years.' },
      { name: 'REACT / NEXT.JS', tier: 'S', note: 'App Router, RSC, suspense, streaming.' },
      { name: 'TYPESCRIPT', tier: 'A', note: 'Strict mode. Generics. No anys.' },
      { name: 'POSTGRES', tier: 'A', note: 'Schemas, indexes, triggers, CTEs.' },
    ],
  },
  SECONDARY: {
    desc: 'SUPPORTING TOOLS',
    items: [
      { name: 'DOCKER / K8S', tier: 'B' },
      { name: 'AWS / GCP', tier: 'B' },
      { name: 'REDIS', tier: 'A' },
      { name: 'TAILWIND', tier: 'S' },
      { name: 'FRAMER MOTION', tier: 'A' },
      { name: 'POSTGRES + PRISMA', tier: 'A' },
      { name: 'LLM APIS', tier: 'A' },
    ],
  },
  UTILITY: {
    desc: 'PASSIVE TRAITS',
    items: [
      { name: 'ASYNC COMMS', tier: 'S' },
      { name: 'WRITES READABLE PRs', tier: 'S' },
      { name: 'OWNS THE STACK', tier: 'A' },
      { name: 'NO EGO IN CODE REVIEW', tier: 'S' },
      { name: 'SHIPS BEFORE PERFECT', tier: 'A' },
    ],
  },
};

const TIER_COLOR = { S: 'text-[var(--accent)]', A: 'text-[var(--fg)]', B: 'text-[var(--muted)]' };

export default function Loadout() {
  return (
    <section id="skills" className="relative min-h-screen px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">03 / 04</div>
          <h2 className="font-pixel text-3xl md:text-5xl text-[var(--fg)]">LOADOUT</h2>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hidden md:block">
          EQUIPPED &middot; CREDITS 9000
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(LOADOUT).map(([key, group], idx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="hud-border bg-[var(--panel)] p-5 relative corner-brackets"
          >
            <div className="flex items-center justify-between mb-1">
              <div className="font-pixel text-sm text-[var(--accent)]">{key}</div>
              <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">SLOT 0{idx+1}</div>
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">{group.desc}</div>
            <div className="space-y-2">
              {group.items.map((item) => (
                <div key={item.name} data-interactive className="flex items-center justify-between gap-3 px-2 py-1.5 hud-border hover:border-[var(--accent)] transition group">
                  <div className="min-w-0">
                    <div className="font-pixel text-[10px] text-[var(--fg)] truncate">{item.name}</div>
                    {item.note && (
                      <div className="font-mono text-[10px] text-[var(--muted)] truncate">{item.note}</div>
                    )}
                  </div>
                  <div className={`font-pixel text-xs ${TIER_COLOR[item.tier] || 'text-[var(--muted)]'}`}>
                    {item.tier}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
