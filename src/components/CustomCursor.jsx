import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [viewMode, setViewMode] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const animateRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    const onEnterCarousel = () => setViewMode(true);
    const onLeaveCarousel = () => setViewMode(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animateRing);

    // Listen for carousel hover events
    document.addEventListener('carousel-enter', onEnterCarousel);
    document.addEventListener('carousel-leave', onLeaveCarousel);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('carousel-enter', onEnterCarousel);
      document.removeEventListener('carousel-leave', onLeaveCarousel);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`cursor-dot ${viewMode ? 'cursor-view-mode' : ''}`}
        style={{
          width: viewMode ? '64px' : '8px',
          height: viewMode ? '64px' : '8px',
          background: '#2563EB',
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      >
        {viewMode && (
          <span style={{
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            userSelect: 'none',
          }}>VIEW</span>
        )}
      </div>
      <div
        ref={ringRef}
        style={{
          width: viewMode ? '88px' : '36px',
          height: viewMode ? '88px' : '36px',
          border: '1.5px solid #2563EB',
          borderRadius: '50%',
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 99998,
          opacity: viewMode ? 0.3 : 0.6,
          willChange: 'transform',
          transition: 'width 0.35s cubic-bezier(0.23, 1, 0.32, 1), height 0.35s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.25s ease',
        }}
      />
    </>
  );
}