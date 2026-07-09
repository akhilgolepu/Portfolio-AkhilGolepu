import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const CAPABILITIES = [
  {
    id: 'ml',
    title: 'ML Architectures',
    description: 'Designing transformer-based, diffusion, and classical ML pipelines optimized for production-grade inference and training throughput.',
    icon: '⬡',
    span: 'col-span-2 row-span-2',
    spanMobile: 'col-span-1',
    pattern: 'dots',
    accent: '#2563EB',
    size: 'large',
  },
  {
    id: 'cv',
    title: 'Computer Vision',
    description: 'Object detection, semantic segmentation, and optical flow systems using state-of-the-art backbone networks.',
    icon: '◎',
    span: 'col-span-1 row-span-1',
    pattern: 'rings',
    accent: '#4F46E5',
    size: 'small',
  },
  {
    id: 'mlops',
    title: 'MLOps & Automation',
    description: 'Kubernetes-native training orchestration, CI/CD for model deployment, and automated retraining pipelines.',
    icon: '⟲',
    span: 'col-span-1 row-span-1',
    pattern: 'grid',
    accent: '#0891B2',
    size: 'small',
  },
  {
    id: 'data',
    title: 'Data Engineering',
    description: 'Streaming ETL pipelines, feature stores, and distributed data lakes handling petabyte-scale workloads.',
    icon: '⬡',
    span: 'col-span-1 row-span-1',
    pattern: 'wave',
    accent: '#059669',
    size: 'small',
  },
  {
    id: 'tools',
    title: 'Tooling Ecosystem',
    description: 'Proficient across PyTorch, JAX, TensorFlow, Ray, Kubeflow, MLflow, Weights & Biases, and Triton Inference Server.',
    icon: '⌬',
    span: 'col-span-2 row-span-1',
    spanMobile: 'col-span-1',
    pattern: 'lines',
    accent: '#7C3AED',
    size: 'wide',
  },
  {
    id: 'research',
    title: 'Research & Experimentation',
    description: 'Translating SOTA arxiv papers into production systems. Rapid prototyping with systematic ablation studies.',
    icon: '✦',
    span: 'col-span-1 row-span-1',
    pattern: 'pulse',
    accent: '#DC2626',
    size: 'small',
  },
];

function MicroVisualizer({ pattern, accent }) {
  if (pattern === 'dots') return (
    <div className="absolute inset-0 overflow-hidden rounded-2xl">
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle, ${accent}30 1.5px, transparent 1.5px)`,
        backgroundSize: '20px 20px',
        opacity: 0.6,
        transition: 'opacity 0.4s ease',
      }} className="bento-viz" />
    </div>
  );

  if (pattern === 'rings') return (
    <div className="absolute bottom-4 right-4 opacity-20">
      {[40, 28, 16].map((size, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: `${size}px`,
          height: `${size}px`,
          border: `1px solid ${accent}`,
          borderRadius: '50%',
          bottom: 0,
          right: 0,
          transform: `translate(${i * 4}px, ${i * 4}px)`,
        }} />
      ))}
    </div>
  );

  if (pattern === 'grid') return (
    <div className="absolute bottom-4 right-4 opacity-15">
      <div style={{
        width: '48px',
        height: '48px',
        backgroundImage: `linear-gradient(${accent} 1px, transparent 1px), linear-gradient(90deg, ${accent} 1px, transparent 1px)`,
        backgroundSize: '8px 8px',
        borderRadius: '4px',
      }} />
    </div>
  );

  if (pattern === 'wave') return (
    <div className="absolute bottom-4 right-4 opacity-20">
      <svg width="60" height="30" viewBox="0 0 60 30">
        <path d="M0 15 Q 10 5, 20 15 Q 30 25, 40 15 Q 50 5, 60 15" fill="none" stroke={accent} strokeWidth="1.5" />
        <path d="M0 20 Q 10 10, 20 20 Q 30 30, 40 20 Q 50 10, 60 20" fill="none" stroke={accent} strokeWidth="1" opacity="0.5" />
      </svg>
    </div>
  );

  if (pattern === 'lines') return (
    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-15 flex flex-col gap-1.5">
      {[100, 70, 85, 55, 75].map((w, i) => (
        <div key={i} style={{ width: `${w * 0.6}px`, height: '2px', background: accent, borderRadius: '2px' }} />
      ))}
    </div>
  );

  if (pattern === 'pulse') return (
    <div className="absolute bottom-4 right-4 opacity-25">
      <motion.div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: `1px solid ${accent}`,
        }}
        animate={{ scale: [1, 1.3, 1], opacity: [0.25, 0.1, 0.25] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
      />
    </div>
  );

  return null;
}

function BentoCard({ cap, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className={`bento-card relative overflow-hidden rounded-2xl ${cap.span}`}
      style={{
        background: 'var(--surface-elevated)',
        border: '1px solid var(--border-line)',
        padding: cap.size === 'large' ? '40px' : '32px',
        minHeight: cap.size === 'large' ? '320px' : '160px',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = `${cap.accent}40`;
        e.currentTarget.style.boxShadow = `0 8px 40px ${cap.accent}10`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--border-line)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {/* Micro visualizer */}
      <MicroVisualizer pattern={cap.pattern} accent={cap.accent} />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-5 text-lg"
        style={{
          background: `${cap.accent}12`,
          border: `1px solid ${cap.accent}20`,
          color: cap.accent,
        }}
      >
        {cap.icon}
      </div>

      {/* Content */}
      <h3 className="font-heading font-bold mb-3" style={{
        fontSize: cap.size === 'large' ? '22px' : '15px',
        letterSpacing: '-0.03em',
        color: 'var(--text-primary)',
      }}>
        {cap.title}
      </h3>
      <p className="font-body" style={{
        fontSize: '13px',
        color: 'var(--text-muted)',
        lineHeight: 1.7,
        maxWidth: cap.size === 'large' ? '320px' : '100%',
      }}>
        {cap.description}
      </p>

      {/* Tag */}
      <span className="font-mono absolute top-6 right-6 text-xs uppercase" style={{
        color: cap.accent,
        letterSpacing: '0.08em',
        opacity: 0.7,
      }}>
        {String(index + 1).padStart(2, '0')}
      </span>
    </motion.div>
  );
}

export default function BentoGrid() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true });

  return (
    <section id="capabilities" style={{ paddingTop: '120px', paddingBottom: '120px' }}>
      <div className="max-w-layout mx-auto px-8">
        {/* Header */}
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
            03 — Capabilities
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h2 className="font-heading font-bold" style={{
              fontSize: 'clamp(32px, 5vw, 56px)',
              letterSpacing: '-0.04em',
              color: 'var(--text-primary)',
            }}>
              Technical Stack
            </h2>
            <p className="font-body max-w-sm" style={{
              color: 'var(--text-muted)',
              fontSize: '14px',
              lineHeight: 1.7,
            }}>
              Specialized across the full ML lifecycle — from raw data to deployed models at scale.
            </p>
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
          {CAPABILITIES.map((cap, i) => (
            <BentoCard key={cap.id} cap={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}