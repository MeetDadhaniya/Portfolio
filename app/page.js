'use client';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'framer-motion';

import MainMenu from '@/components/MainMenu';
import MiniMap from '@/components/MiniMap';
import AgentBio from '@/components/AgentBio';
import AgentRoster from '@/components/AgentRoster';
import Loadout from '@/components/Loadout';
import MatchSummary from '@/components/MatchSummary';
import CrosshairCursor from '@/components/CrosshairCursor';
import KillfeedToast from '@/components/KillfeedToast';
import PingEffect from '@/components/PingEffect';
import SoundProvider from '@/components/SoundProvider';
import RoundTransition from '@/components/RoundTransition';

function App() {
  const [showMenu, setShowMenu] = useState(true);
  const [activeSection, setActiveSection] = useState('about');
  const lenisRef = useRef(null);

  useEffect(() => {
    if (showMenu) return;
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 1.0,
    });
    lenisRef.current = lenis;
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [showMenu]);

  useEffect(() => {
    if (showMenu) return;
    const sections = ['about','work','skills','contact'];
    const observers = [];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveSection(id);
          });
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [showMenu]);

  const handleNavigate = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -20, duration: 1.2 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <CrosshairCursor />
      <PingEffect />
      <SoundProvider />

      <AnimatePresence mode="wait">
        {showMenu && (
          <MainMenu key="menu" onPlay={() => setShowMenu(false)} />
        )}
      </AnimatePresence>

      {!showMenu && (
        <>
          <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6 py-3 bg-[#0d0d0d]/80 backdrop-blur border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <button
                data-interactive
                onClick={() => setShowMenu(true)}
                className="font-pixel text-[10px] uppercase tracking-widest text-[var(--fg)] hover:text-[var(--accent)] transition"
              >
                ◀ MENU
              </button>
              <span className="text-[var(--muted)]">|</span>
              <span className="font-pixel text-[10px] uppercase tracking-widest text-[var(--accent)]">MEET</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hidden sm:inline">// AGENT FILE</span>
            </div>
            <div className="hidden md:flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
              <span>HP 100</span>
              <span>ARMOR 50</span>
              <span>CREDS 9000</span>
              <span className="text-[var(--accent)]">● LIVE</span>
            </div>
          </header>

          <main className="relative pt-16 scanlines">
            <RoundTransition label="ROUND 01 · AGENT BIO" code="// CHECKPOINT 01" sound="round">
              <AgentBio />
            </RoundTransition>
            <SectionDivider code="// CHECKPOINT 02" />
            <RoundTransition label="ROUND 02 · AGENT ROSTER" code="// CHECKPOINT 02" sound="match">
              <AgentRoster />
            </RoundTransition>
            <SectionDivider code="// CHECKPOINT 03" />
            <RoundTransition label="ROUND 03 · LOADOUT" code="// CHECKPOINT 03" sound="round">
              <Loadout />
            </RoundTransition>
            <SectionDivider code="// CHECKPOINT 04" />
            <RoundTransition label="ROUND 04 · VICTORY" code="// MATCH END" sound="match">
              <MatchSummary />
            </RoundTransition>

            <footer className="border-t border-[var(--border)] mt-12 px-6 py-8 text-center">
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                © MEET.GG &middot; BUILT WITH NEXT.JS &middot; PATCH NOTES 1.0.0 &middot; GG WP
              </div>
            </footer>
          </main>

          <MiniMap activeSection={activeSection} onNavigate={handleNavigate} />
          <KillfeedToast />
        </>
      )}
    </>
  );
}

function SectionDivider({ code }) {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex items-center gap-3">
      <span className="w-2 h-2 bg-[var(--accent)]" />
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">{code}</span>
      <span className="flex-1 h-px bg-[var(--border)]" />
    </div>
  );
}

export default App;
