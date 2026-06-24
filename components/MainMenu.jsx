'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sound from '@/lib/sound';
import SystemLog from '@/components/SystemLog';
import BackgroundBirds from '@/components/BackgroundBirds';

export default function MainMenu({ onPlay }) {
  const [stage, setStage] = useState('menu'); // menu | settings | matching
  const [reducedMotion, setReducedMotion] = useState(false);
  const [soundOn, setSoundOn] = useState(true);

  useEffect(() => {
    Sound.init();
    setSoundOn(Sound.isEnabled());
  }, []);

  const handlePlay = () => {
    setStage('matching');
    try { Sound.match(); } catch (_) {}
    setTimeout(() => onPlay(), 1600);
  };

  const handleExit = () => {
    if (typeof window !== 'undefined') {
      window.location.href = 'https://www.google.com';
    }
  };

  const toggleSound = () => {
    const next = !soundOn;
    Sound.setEnabled(next);
    setSoundOn(next);
    if (next) { try { Sound.click(); } catch (_) {} }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[1000] bg-[#0d0d0d] tactical-grid scanlines flex flex-col overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Ambient background layers (behind menu) */}
      <BackgroundBirds />
      <SystemLog />

      {/* TOP BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 hud-border border-l-0 border-r-0 border-t-0 pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-2 h-2 bg-accent-c pulse-dot" />
          <span className="font-pixel text-[10px] uppercase tracking-[0.25em] text-[var(--fg)]">MEET // v1.0.0</span>
        </div>
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] pointer-events-auto">
          NA-EAST &middot; PING 12MS &middot; 128 TICK
        </div>
      </div>

      {/* MIDDLE — vertically + horizontally centered, pointer-events pass through empty area */}
      <div className="relative z-10 flex-1 grid place-items-center px-6 pointer-events-none">
        <AnimatePresence mode="wait">
          {stage === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="diag-stripe w-3 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">MAIN MENU</span>
              </div>

              <h1 className="font-pixel text-[64px] sm:text-[96px] leading-none text-[var(--fg)] glitch">
                MEET
              </h1>
              <div className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-[var(--muted)]">
                FULL-STACK &middot; PYTHON / REACT &middot; AGENT FILE #042
              </div>

              <div className="mt-10 space-y-1 max-w-md">
                <MenuItem label="PLAY" hotkey="01" onClick={handlePlay} primary />
                <MenuItem label="SETTINGS" hotkey="02" onClick={() => setStage('settings')} />
                <MenuItem label="EXIT" hotkey="03" onClick={handleExit} />
              </div>

              <div className="mt-8 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                [ ENTER ] CONFIRM &nbsp;&middot;&nbsp; [ ESC ] BACK
              </div>
            </motion.div>
          )}

          {stage === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-2xl pointer-events-auto"
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="diag-stripe w-3 h-6" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">SETTINGS</span>
              </div>
              <h2 className="font-pixel text-2xl text-[var(--fg)] mb-8">CONFIGURATION</h2>

              <div className="space-y-2">
                <ToggleRow label="REDUCED MOTION" value={reducedMotion} onChange={() => setReducedMotion(v => !v)} />
                <ToggleRow label="SOUND FX" value={soundOn} onChange={toggleSound} />
              </div>

              <button
                onClick={() => setStage('menu')}
                data-interactive
                className="mt-10 font-pixel text-xs uppercase tracking-widest text-[var(--accent)] hover:text-[var(--fg)] transition"
              >
                &lt; BACK
              </button>
            </motion.div>
          )}

          {stage === 'matching' && (
            <motion.div
              key="matching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full max-w-xl text-center pointer-events-auto"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-[var(--muted)] mb-4">
                INITIALIZING MATCH
              </div>
              <h2 className="font-pixel text-2xl text-[var(--fg)] mb-8">
                FINDING MATCH<span className="inline-block w-6 text-left"><Dots /></span>
              </h2>
              <div className="hud-border h-2 w-full bg-[var(--panel)] relative overflow-hidden">
                <div className="loading-bar h-full bg-[var(--accent)]" />
              </div>
              <div className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                <span>QUEUE: COMPETITIVE</span>
                <span>ETA 00:02</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 hud-border border-l-0 border-r-0 border-b-0 pointer-events-none">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] pointer-events-auto">
          AGENT.MEET ▸ READY
        </div>
        <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] pointer-events-auto">
          <span className="w-1.5 h-1.5 bg-accent-c" /> ONLINE
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ label, hotkey, onClick, primary }) {
  return (
    <button
      onClick={onClick}
      data-interactive
      className={`group relative w-full flex items-center justify-between px-4 py-3 hud-border bg-transparent hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-colors`}
    >
      <div className="flex items-center gap-4">
        <span className="font-mono text-[10px] text-[var(--muted)] group-hover:text-white">{hotkey}</span>
        <span className="font-pixel text-sm uppercase text-[var(--fg)] group-hover:text-white">{label}</span>
      </div>
      <span className="font-pixel text-sm text-[var(--accent)] group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">▶</span>
      {primary && (
        <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-accent-c" />
      )}
    </button>
  );
}

function ToggleRow({ label, value, onChange }) {
  return (
    <button onClick={onChange} data-interactive className="w-full flex items-center justify-between px-4 py-3 hud-border hover:border-[var(--accent)] transition">
      <span className="font-pixel text-xs uppercase text-[var(--fg)]">{label}</span>
      <span className={`font-mono text-xs uppercase tracking-widest ${value ? 'text-[var(--accent)]' : 'text-[var(--muted)]'}`}>
        {value ? '[ ON ]' : '[ OFF ]'}
      </span>
    </button>
  );
}

function Dots() {
  return (
    <span className="inline-block">
      <span className="animate-pulse">.</span>
      <span className="animate-pulse" style={{ animationDelay: '0.2s' }}>.</span>
      <span className="animate-pulse" style={{ animationDelay: '0.4s' }}>.</span>
    </span>
  );
}
