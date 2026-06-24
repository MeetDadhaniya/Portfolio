'use client';
import { motion } from 'framer-motion';

const ABILITIES = [
  { key: 'Q', name: 'RAPID PROTOTYPING', desc: 'Spin up an MVP in hours, not weeks. Ship fast, refine in production.' },
  { key: 'E', name: 'SYSTEM DESIGN', desc: 'Architect scalable backends and clean APIs that don\u2019t collapse under load.' },
  { key: 'C', name: 'DEBUG UNDER PRESSURE', desc: 'Stack trace in one tab, calm in the other. Finds the root cause every time.' },
  { key: 'X', name: 'FULL SEND TO PROD', desc: 'Ultimate. CI/CD, rollouts, monitoring \u2014 deploy with zero drama.' },
];

export default function AgentBio() {
  return (
    <section id="about" className="relative min-h-screen px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <SectionHeader code="01 / 04" title="AGENT BIO" sub={"DOSSIER \u00B7 CLASSIFIED"} />

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="hud-border corner-brackets bg-[var(--panel)] p-6 relative"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">CODENAME</div>
              <div className="font-pixel text-3xl mt-1">MEET</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">ROLE</div>
              <div className="font-pixel text-xs text-[var(--accent)] mt-1">DUELIST/INITIATOR</div>
            </div>
          </div>

          <div className="aspect-square w-full max-w-xs mx-auto bg-[#0f0f0f] hud-border grid place-items-center mb-6">
            <PixelPortrait />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            <Stat label="AGE" value="24" />
            <Stat label="ORIGIN" value="IN" />
            <Stat label="RANK" value="RADIANT" />
          </div>
        </motion.div>

        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-3">// LORE</div>
            <p className="text-[var(--fg)] leading-relaxed text-sm md:text-base max-w-prose">
              Operating out of a low-lit setup somewhere on the eastern grid, <span className="text-[var(--accent)]">MEET</span> is a full-stack agent specialized in Python and React engagements. Equipped with a decade of self-trained reflexes and a habit of shipping before sunrise, MEET turns vague specs into deployable assets, eliminating bottlenecks before they spawn. Known to engage scope creep on sight.
            </p>
          </motion.div>

          <div className="mt-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-4">ABILITIES</div>
            <div className="space-y-2">
              {ABILITIES.map((a, i) => (
                <motion.div
                  key={a.key}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="hud-border p-3 flex items-start gap-4 hover:border-[var(--accent)] transition-colors"
                  data-interactive
                >
                  <div className="flex-shrink-0 w-10 h-10 hud-border-accent grid place-items-center font-pixel text-sm text-[var(--accent)]">
                    {a.key}
                  </div>
                  <div>
                    <div className="font-pixel text-xs uppercase text-[var(--fg)]">{a.name}</div>
                    <div className="font-mono text-xs text-[var(--muted)] mt-1">{a.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="hud-border py-2">
      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">{label}</div>
      <div className="font-pixel text-xs mt-1 text-[var(--fg)]">{value}</div>
    </div>
  );
}

function PixelPortrait() {
  return (
    <svg viewBox="0 0 16 16" className="w-3/4 h-3/4" style={{ imageRendering: 'pixelated' }} shapeRendering="crispEdges">
      {[
        [4,2],[5,2],[6,2],[7,2],[8,2],[9,2],[10,2],[11,2],
        [3,3],[12,3],
        [3,4],[12,4],
        [2,5],[13,5],
        [2,6],[13,6],
        [2,7],[13,7],
        [2,8],[13,8],
        [3,9],[12,9],
        [3,10],[12,10],
        [4,11],[5,11],[6,11],[7,11],[8,11],[9,11],[10,11],[11,11],
      ].map(([x,y],i) => (
        <rect key={`o${i}`} x={x} y={y} width="1" height="1" fill="#ECE8E1" />
      ))}
      {[
        [4,5],[5,5],[6,5],[7,5],[8,5],[9,5],[10,5],[11,5],
        [4,6],[5,6],[6,6],[7,6],[8,6],[9,6],[10,6],[11,6],
      ].map(([x,y],i) => (
        <rect key={`v${i}`} x={x} y={y} width="1" height="1" fill="#FF4655" />
      ))}
      {[
        [5,8],[7,8],[9,8],[11,8],
      ].map(([x,y],i) => (
        <rect key={`m${i}`} x={x} y={y} width="1" height="1" fill="#6b6b6b" />
      ))}
    </svg>
  );
}

function SectionHeader({ code, title, sub }) {
  return (
    <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">{code}</div>
        <h2 className="font-pixel text-3xl md:text-5xl text-[var(--fg)]">{title}</h2>
      </div>
      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hidden md:block">{sub}</div>
    </div>
  );
}
