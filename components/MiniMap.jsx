'use client';

const SECTIONS = [
  { id: 'about',   label: 'A', x: 22, y: 28 },
  { id: 'work',    label: 'B', x: 70, y: 32 },
  { id: 'skills',  label: 'C', x: 30, y: 70 },
  { id: 'contact', label: 'D', x: 75, y: 75 },
];

export default function MiniMap({ activeSection, onNavigate }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 select-none" data-interactive>
      <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
        <span>MAP · HAVEN</span>
        <span className="text-[var(--accent)]">●</span>
      </div>
      <div className="relative w-44 h-44 hud-border bg-[#0f0f0f] tactical-grid corner-brackets">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-[var(--border)]" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="h-px w-full bg-[var(--border)]" />
        </div>

        {SECTIONS.map((s) => {
          const active = activeSection === s.id;
          return (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              data-interactive
              className="absolute -translate-x-1/2 -translate-y-1/2 group"
              style={{ left: `${s.x}%`, top: `${s.y}%` }}
              aria-label={`Go to ${s.id}`}
            >
              <span
                className={`block w-2.5 h-2.5 ${active ? 'bg-[var(--accent)] pulse-dot' : 'bg-[var(--fg)]'} group-hover:bg-[var(--accent)] transition`}
              />
              <span className={`absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[8px] uppercase tracking-widest whitespace-nowrap ${active ? 'text-[var(--accent)]' : 'text-[var(--muted)]'} group-hover:text-[var(--fg)]`}>
                {s.id}
              </span>
            </button>
          );
        })}
      </div>
      <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
        <span>ROUND 01</span>
        <span>04:20</span>
      </div>
    </div>
  );
}
