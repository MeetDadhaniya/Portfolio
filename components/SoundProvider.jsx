'use client';
import { useEffect } from 'react';
import Sound from '@/lib/sound';

// Mounts global hover/click delegation so any button or [data-interactive]
// element gets a sound effect, without touching every component.
export default function SoundProvider() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    Sound.init();

    const isInteractive = (el) =>
      !!el?.closest?.('a, button, [role="button"], [data-interactive]');

    let lastHoverTarget = null;
    const onOver = (e) => {
      const target = e.target?.closest?.('a, button, [role="button"], [data-interactive]');
      if (!target || target === lastHoverTarget) return;
      lastHoverTarget = target;
      Sound.hover();
    };
    const onOut = (e) => {
      const target = e.target?.closest?.('a, button, [role="button"], [data-interactive]');
      if (target === lastHoverTarget) lastHoverTarget = null;
    };
    const onClick = (e) => {
      if (e.target?.closest?.('[data-no-click-sound]')) return;
      if (isInteractive(e.target)) Sound.click();
    };

    document.addEventListener('mouseover', onOver, true);
    document.addEventListener('mouseout', onOut, true);
    document.addEventListener('click', onClick, true);
    return () => {
      document.removeEventListener('mouseover', onOver, true);
      document.removeEventListener('mouseout', onOut, true);
      document.removeEventListener('click', onClick, true);
    };
  }, []);

  return null;
}
