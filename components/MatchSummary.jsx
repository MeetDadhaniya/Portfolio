'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const STATS = [
  { label: 'PROJECTS SHIPPED', value: '42' },
  { label: 'YEARS IN GAME', value: '06' },
  { label: 'COFFEE CONSUMED', value: '\u221e' },
  { label: 'BUGS FIXED', value: 'COUNTLESS' },
  { label: 'PRs MERGED', value: '1.2K' },
  { label: 'DEPLOYS / WEEK', value: '12' },
];

const FRIENDS = [
  { name: 'GITHUB',   handle: '@meet', href: 'https://github.com', icon: Github },
  { name: 'LINKEDIN', handle: '/in/meet', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'TWITTER',  handle: '@meet', href: 'https://twitter.com', icon: Twitter },
  { name: 'EMAIL',    handle: 'meet@dev.gg', href: 'mailto:meet@dev.gg', icon: Mail },
];

export default function MatchSummary() {
  return (
    <section id="contact" className="relative min-h-screen px-6 md:px-12 py-24 max-w-7xl mx-auto">
      <div className="flex items-end justify-between gap-4 border-b border-[var(--border)] pb-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] mb-2">04 / 04</div>
          <h2 className="font-pixel text-3xl md:text-5xl text-[var(--fg)]">MATCH SUMMARY</h2>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hidden md:block">
          FINAL SCORE &middot; 13-04
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45 }}
        className="mt-10 relative hud-border-accent bg-[var(--panel)] p-8 overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-24 h-full diag-stripe opacity-30" />
        <div className="absolute top-0 right-0 w-24 h-full diag-stripe opacity-30" />
        <div className="relative text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-[var(--muted)]">// RESULT</div>
          <div className="font-pixel text-5xl md:text-7xl text-[var(--accent)] mt-2 glitch">VICTORY</div>
          <div className="font-mono text-xs uppercase tracking-widest text-[var(--fg)] mt-3">
            TEAM MEET &middot; 13 - 4 &middot; CHAMBERLAIN MAP
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="hud-border bg-[var(--panel)] p-6 corner-brackets"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">MATCH MVP</div>
          <div className="mt-3 flex items-center gap-4">
            <div className="w-16 h-16 hud-border-accent grid place-items-center">
              <span className="font-pixel text-xl text-[var(--accent)]">M</span>
            </div>
            <div>
              <div className="font-pixel text-xl text-[var(--fg)]">MEET</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">ACS 412 &middot; KDA 4.8</div>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-3 gap-2">
            <Pill label="ACE" />
            <Pill label="CLUTCH 1v3" />
            <Pill label="MOST DEPLOYS" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="hud-border bg-[var(--panel)] p-6"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">SCOREBOARD</div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {STATS.map((s) => (
              <div key={s.label} className="hud-border p-3">
                <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">{s.label}</div>
                <div className="font-pixel text-lg mt-1 text-[var(--fg)]">{s.value}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="mt-6 hud-border bg-[var(--panel)] p-6">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">ADD FRIEND &middot; SEND REQUEST</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {FRIENDS.map((f) => {
            const Icon = f.icon;
            return (
              <a
                key={f.name}
                href={f.href}
                target="_blank"
                rel="noreferrer"
                data-interactive
                className="group hud-border p-3 flex items-center gap-3 hover:border-[var(--accent)] hover:bg-black/30 transition"
              >
                <Icon className="w-4 h-4 text-[var(--fg)] group-hover:text-[var(--accent)]" strokeWidth={1.5} />
                <div className="min-w-0">
                  <div className="font-pixel text-[10px] text-[var(--fg)] group-hover:text-[var(--accent)]">{f.name}</div>
                  <div className="font-mono text-[10px] text-[var(--muted)] truncate">{f.handle}</div>
                </div>
                <span className="ml-auto font-pixel text-[10px] text-[var(--muted)] group-hover:text-[var(--accent)]">+ ADD</span>
              </a>
            );
          })}
        </div>
      </div>

      <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          MATCH ENDED &middot; READY UP FOR NEXT ROUND
        </div>
        <a
          href="mailto:meet@dev.gg"
          data-interactive
          className="group relative inline-flex items-center gap-3 px-6 py-3 bg-[var(--accent)] text-white hud-border-accent hover:bg-[var(--fg)] hover:text-[var(--bg)] hover:border-[var(--fg)] transition"
        >
          <span className="font-pixel text-xs uppercase tracking-widest">PLAY AGAIN</span>
          <span className="font-pixel text-xs">▶</span>
        </a>
      </div>
    </section>
  );
}

function Pill({ label }) {
  return (
    <div className="hud-border-accent text-center py-1 px-2">
      <span className="font-pixel text-[8px] uppercase tracking-widest text-[var(--accent)]">{label}</span>
    </div>
  );
}
