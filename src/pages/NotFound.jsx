import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SlideButton from '@/components/ui/SlideButton';

export default function NotFound() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
      style={{ background: 'var(--surface)' }}
    >
      {/* Ambient radial glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(37,99,235,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      {/* Grid overlay */}
      <div className="absolute inset-0 blueprint-lines pointer-events-none" />

      {/* Large 404 bg text */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden
      >
        <span className="font-heading font-black" style={{
          fontSize: 'clamp(160px, 30vw, 400px)',
          letterSpacing: '-0.06em',
          color: 'var(--text-primary)',
          opacity: 0.03,
          lineHeight: 1,
        }}>
          404
        </span>
      </div>

      {/* Content */}
      <motion.div
        className="relative text-center px-8 max-w-lg"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="mx-auto mb-8 flex items-center justify-center"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '1px solid var(--border-line)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--surface-elevated)',
            position: 'relative',
          }}>
            {/* Crosshair */}
            <div style={{
              position: 'absolute',
              width: '1px',
              height: '100%',
              background: 'var(--border-line)',
            }} />
            <div style={{
              position: 'absolute',
              height: '1px',
              width: '100%',
              background: 'var(--border-line)',
            }} />
            <div style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: '#2563EB',
              position: 'relative',
              zIndex: 1,
              boxShadow: '0 0 20px #2563EB60',
            }} />
          </div>
        </motion.div>

        <span className="font-mono text-xs uppercase tracking-widest block mb-4" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
          Error — 404
        </span>

        <h1 className="font-heading font-black mb-4" style={{
          fontSize: 'clamp(36px, 6vw, 64px)',
          letterSpacing: '-0.04em',
          color: 'var(--text-primary)',
          lineHeight: 1,
        }}>
          Signal Lost.
        </h1>

        <p className="font-body mb-10" style={{
          color: 'var(--text-muted)',
          fontSize: '15px',
          lineHeight: 1.7,
        }}>
          The coordinates you entered don't resolve to any known destination. The route may have been deprecated or never existed.
        </p>

        <SlideButton
          as={Link}
          to="/"
          className="gap-2.5 px-7 py-3.5 rounded-full font-mono text-xs uppercase"
          style={{ letterSpacing: '0.08em' }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Return to Base
        </SlideButton>

        {/* Terminal line */}
        <motion.div
          className="mt-12 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
            akhil@portfolio:~$
          </span>
          <motion.span
            className="font-mono text-xs"
            style={{ color: '#2563EB' }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            █
          </motion.span>
        </motion.div>
      </motion.div>
    </main>
  );
}