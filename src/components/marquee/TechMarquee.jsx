import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const STACK = [
  { name: 'PyTorch', icon: '🔥' },
  { name: 'TensorFlow', icon: '⚡' },
  { name: 'Python', icon: '🐍' },
  { name: 'Kubernetes', icon: '☸' },
  { name: 'Docker', icon: '🐳' },
  { name: 'CUDA', icon: '🎮' },
  { name: 'AWS', icon: '☁' },
  { name: 'FastAPI', icon: '⚡' },
  { name: 'MLflow', icon: '📊' },
  { name: 'Ray', icon: '☀' },
  { name: 'Apache Spark', icon: '✦' },
  { name: 'Kafka', icon: '⬡' },
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Weights & Biases', icon: '◎' },
  { name: 'Triton', icon: '△' },
  { name: 'ONNX', icon: '⬢' },
  { name: 'JAX', icon: '◈' },
  { name: 'Hugging Face', icon: '🤗' },
];

function MarqueeItem({ item }) {
  return (
    <div
      className="flex items-center gap-3 px-6"
      style={{ flexShrink: 0 }}
    >
      <div
        className="flex items-center justify-center w-7 h-7 rounded-lg text-sm"
        style={{
          background: 'var(--surface-elevated)',
          border: '1px solid var(--border-line)',
        }}
      >
        {item.icon}
      </div>
      <span className="font-mono text-sm font-medium whitespace-nowrap" style={{
        color: 'var(--text-muted)',
        letterSpacing: '0.02em',
      }}>
        {item.name}
      </span>
      <span style={{ color: 'var(--border-line)', marginLeft: '8px' }}>·</span>
    </div>
  );
}

export default function TechMarquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const duplicated = [...STACK, ...STACK];

  return (
    <section
      ref={ref}
      style={{
        paddingTop: '80px',
        paddingBottom: '80px',
        borderTop: '1px solid var(--border-line)',
        borderBottom: '1px solid var(--border-line)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Header */}
      <motion.div
        className="max-w-layout mx-auto px-8 mb-10"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
      >
        <span className="font-mono text-xs uppercase tracking-widest" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
          04 — Tech Stack
        </span>
      </motion.div>

      {/* Gradient masks */}
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: '160px',
        background: 'linear-gradient(90deg, var(--surface) 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        right: 0,
        top: 0,
        bottom: 0,
        width: '160px',
        background: 'linear-gradient(270deg, var(--surface) 0%, transparent 100%)',
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* Marquee Row 1 */}
      <div style={{ overflow: 'hidden', paddingBottom: '12px' }}>
        <div className="marquee-track" style={{ display: 'flex', alignItems: 'center' }}>
          {duplicated.map((item, i) => (
            <MarqueeItem key={`r1-${i}`} item={item} />
          ))}
        </div>
      </div>

      {/* Marquee Row 2 - reverse */}
      <div style={{ overflow: 'hidden', paddingTop: '12px' }}>
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            alignItems: 'center',
            animationDirection: 'reverse',
            animationDuration: '36s',
          }}
        >
          {[...duplicated].reverse().map((item, i) => (
            <MarqueeItem key={`r2-${i}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}