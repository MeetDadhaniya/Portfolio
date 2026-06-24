'use client';
import { useEffect, useState } from 'react';

export default function CrosshairCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const touch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    setIsTouch(touch);
    if (touch) return;

    const handleMove = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
      const el = e.target;
      const isInteractive = el?.closest?.('a, button, [role="button"], input, textarea, select, [data-interactive]');
      setHovering(!!isInteractive);
    };
    const handleDown = () => setClicking(true);
    const handleUp = () => setClicking(false);

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mousedown', handleDown);
    window.addEventListener('mouseup', handleUp);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mousedown', handleDown);
      window.removeEventListener('mouseup', handleUp);
    };
  }, []);

  if (isTouch) return null;

  const scale = clicking ? 0.7 : hovering ? 1.4 : 1;

  return (
    <div
      className="pointer-events-none fixed z-[9999] mix-blend-difference"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transition: 'transform 90ms ease-out',
      }}
      aria-hidden
    >
      <div className="relative" style={{ width: 22, height: 22 }}>
        <span style={{ position:'absolute', left:0,  top:'50%', width:8, height:1.5, background:'#FF4655', transform:'translateY(-50%)' }} />
        <span style={{ position:'absolute', right:0, top:'50%', width:8, height:1.5, background:'#FF4655', transform:'translateY(-50%)' }} />
        <span style={{ position:'absolute', top:0,    left:'50%', width:1.5, height:8, background:'#FF4655', transform:'translateX(-50%)' }} />
        <span style={{ position:'absolute', bottom:0, left:'50%', width:1.5, height:8, background:'#FF4655', transform:'translateX(-50%)' }} />
        {clicking && (
          <span style={{ position:'absolute', left:'50%', top:'50%', width:18, height:18, border:'1px solid #FF4655', transform:'translate(-50%,-50%)' }} />
        )}
      </div>
    </div>
  );
}
