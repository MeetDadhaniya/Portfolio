'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import CrosshairCursor from '@/components/CrosshairCursor';
import PingEffect from '@/components/PingEffect';
import SoundProvider from '@/components/SoundProvider';
import { ProjectSprite } from '@/components/AgentRoster';
import { PROJECTS } from '@/lib/projects';
import Sound from '@/lib/sound';

export default function AgentDetailClient({ project }) {
  useEffect(() => {
    const t = setTimeout(() => { try { Sound.round(); } catch (_) {} }, 280);
    return () => clearTimeout(t);
  }, []);

  const otherProjects = PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <>
      <CrosshairCursor />
      <PingEffect />
      <SoundProvider />

      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-[#0d0d0d]/85 backdrop-blur border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <Link href="/" data-interactive className="font-pixel text-[10px] uppercase tracking-widest text-[var(--fg)] hover:text-[var(--accent)] transition">
            ◀ BACK TO ROSTER
          </Link>
          <span className="text-[var(--muted)]">|</span>
          <span className="font-pixel text-[10px] uppercase tracking-widest text-[var(--accent)]">MEET</span>
        </div>
        <div className="hidden md:flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
          <span>AGENT FILE · {project.id}</span>
          <span className="text-[var(--accent)]">● {project.status}</span>
        </div>
      </header>

      <main className="relative pt-20 pb-24 scanlines">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
            ROSTER &middot; <span className="text-[var(--accent)]">{project.name}</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="mt-4 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6"
          >
            <div className="hud-border bg-[var(--panel)] p-6 corner-brackets">
              <div className="aspect-square bg-[#0f0f0f] hud-border grid place-items-center">
                <ProjectSprite color={project.palette} large />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <Stat label="YEAR" value={project.year} />
                <Stat label="ROLE" value={project.role} accent />
                <Stat label="STATUS" value={project.status} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3">
                <span className="diag-stripe w-3 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">CLASSIFIED DOSSIER</span>
              </div>
              <h1 className="font-pixel text-5xl md:text-7xl mt-3 text-[var(--fg)] glitch">{project.name}</h1>
              <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--accent)] mt-2">
                ROLE — {project.role}
              </div>
              <p className="mt-6 text-sm md:text-base text-[var(--fg)] leading-relaxed max-w-prose">
                {project.desc}
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span key={h} className="hud-border-accent px-3 py-1 font-pixel text-[10px] uppercase tracking-widest text-[var(--accent)]">
                    {h}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {project.live && (
                  <a href={project.live} target="_blank" rel="noreferrer" data-interactive className="inline-flex items-center gap-2 px-5 py-3 bg-[var(--accent)] text-white font-pixel text-[11px] uppercase tracking-widest hover:bg-[var(--fg)] hover:text-[var(--bg)] transition">
                    DEPLOY ▶
                  </a>
                )}
                {project.repo && (
                  <a href={project.repo} target="_blank" rel="noreferrer" data-interactive className="inline-flex items-center gap-2 px-5 py-3 hud-border-accent text-[var(--accent)] font-pixel text-[11px] uppercase tracking-widest hover:bg-[var(--accent)] hover:text-white transition">
                    INSPECT REPO
                  </a>
                )}
                {!project.live && !project.repo && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] px-3 py-3">// CLASSIFIED ACCESS</span>
                )}
              </div>
            </div>
          </motion.div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="hud-border bg-[var(--panel)] p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-4">ABILITIES</div>
              <div className="space-y-2">
                {project.abilities.map(([key, name, desc]) => (
                  <div key={key} data-interactive className="hud-border p-3 flex items-start gap-4 hover:border-[var(--accent)] transition">
                    <div className="flex-shrink-0 w-10 h-10 hud-border-accent grid place-items-center font-pixel text-sm text-[var(--accent)]">
                      {key}
                    </div>
                    <div>
                      <div className="font-pixel text-xs uppercase text-[var(--fg)]">{name}</div>
                      <div className="font-mono text-xs text-[var(--muted)] mt-1">{desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="hud-border bg-[var(--panel)] p-6"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)] mb-4">EQUIPPED STACK</div>
              <div className="space-y-3">
                {project.stack.map(([name, pct]) => (
                  <div key={name}>
                    <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest mb-1">
                      <span className="text-[var(--fg)]">{name}</span>
                      <span className="text-[var(--accent)]">{pct}%</span>
                    </div>
                    <div className="stat-bar-bg h-1.5 w-full">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="stat-bar-fill h-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 hud-border p-3">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-1">PATCH NOTES</div>
                <div className="font-mono text-xs text-[var(--fg)] leading-relaxed">
                  // {project.year} · {project.status} · maintained by AGENT.MEET
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <div className="flex items-center justify-between mb-4 border-b border-[var(--border)] pb-3">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">SWITCH AGENT</div>
              <Link href="/#work" data-interactive className="font-pixel text-[10px] uppercase tracking-widest text-[var(--accent)] hover:text-[var(--fg)] transition">
                FULL ROSTER ▶
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {otherProjects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/agents/${p.slug}`}
                  data-interactive
                  className="group hud-border bg-[var(--panel)] p-4 flex items-center gap-4 hover:border-[var(--accent)] transition"
                >
                  <div className="w-14 h-14 bg-[#0f0f0f] hud-border grid place-items-center flex-shrink-0">
                    <ProjectSprite color={p.palette} />
                  </div>
                  <div className="min-w-0">
                    <div className="font-pixel text-xs text-[var(--fg)] group-hover:text-[var(--accent)] transition">{p.name}</div>
                    <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">{p.role}</div>
                  </div>
                  <span className="ml-auto font-pixel text-xs text-[var(--accent)] opacity-0 group-hover:opacity-100 transition">▶</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

function Stat({ label, value, accent }) {
  return (
    <div className="hud-border py-2 px-1">
      <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">{label}</div>
      <div className={`font-pixel text-[10px] mt-1 ${accent ? 'text-[var(--accent)]' : 'text-[var(--fg)]'}`}>{value}</div>
    </div>
  );
}
