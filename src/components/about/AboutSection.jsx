import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const LINE_VARIANTS = {
  hidden: { y: '105%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function SplitLine({ children, index, style, className }) {
  return (
    <span style={{ display: 'block', overflow: 'hidden' }}>
      <motion.span
        className={`block ${className || ''}`}
        style={style}
        custom={index}
        initial="hidden"
        animate="visible"
        variants={LINE_VARIANTS}
      >
        {children}
      </motion.span>
    </span>
  );
}

function AnimatedSplitText({ lines, style, className }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref}>
      {lines.map((line, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <motion.span
            className={`block ${className || ''}`}
            style={style}
            custom={i}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={LINE_VARIANTS}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

const STATS = [
  { value: '8.18', label: 'CGPA — B.Tech AI/ML' },
  { value: '5+', label: 'Projects Shipped' },
  { value: '99.48%', label: 'ANPR mAP Score' },
  { value: '2027', label: 'Expected Graduation' },
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-60px' });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ paddingTop: '120px', paddingBottom: '120px', borderTop: '1px solid var(--border-line)' }}
    >
      <div className="max-w-layout mx-auto px-8">
        {/* Label */}
        <motion.span
          className="font-mono text-xs uppercase tracking-widest block mb-12"
          style={{ color: '#2563EB', letterSpacing: '0.1em' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          01 — About
        </motion.span>

        {/* Two-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: large headline */}
          <div>
            <AnimatedSplitText
              lines={[
                'Engineering the',
                'intelligence layer',
                'of tomorrow.',
              ]}
              className="font-heading font-black"
              style={{
                fontSize: 'clamp(32px, 4.5vw, 56px)',
                letterSpacing: '-0.04em',
                lineHeight: 1.05,
                color: 'var(--text-primary)',
              }}
            />
          </div>

          {/* Right: paragraphs */}
          <div style={{ paddingTop: '4px' }}>
            <AnimatedSplitText
              lines={[
                "I'm Akhil — a B.Tech AI/ML student at Vardhaman",
                'College of Engineering (CGPA 8.12), specializing in',
                'building production-ready ML systems that integrate',
                'FastAPI, React, PostgreSQL, and automated pipelines.',
              ]}
              className="font-body"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                letterSpacing: '-0.01em',
              }}
            />

            <div style={{ height: '20px' }} />

            <AnimatedSplitText
              lines={[
                'From ANPR systems with 99.48% mAP to churn',
                'prediction pipelines with full model registries,',
                'I architect end-to-end ML applications with',
                'reproducibility, observability, and craft.',
              ]}
              className="font-body"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                letterSpacing: '-0.01em',
              }}
            />
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px mt-20"
          style={{ border: '1px solid var(--border-line)', borderRadius: '16px', overflow: 'hidden' }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className="flex flex-col items-start"
              style={{
                padding: '32px 28px',
                background: 'var(--surface-elevated)',
                borderRight: i < STATS.length - 1 ? '1px solid var(--border-line)' : 'none',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.09, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <span
                className="font-heading font-black block"
                style={{
                  fontSize: 'clamp(28px, 4vw, 44px)',
                  letterSpacing: '-0.04em',
                  color: 'var(--text-primary)',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                {s.value}
              </span>
              <span
                className="font-mono text-xs uppercase"
                style={{
                  color: 'var(--text-muted)',
                  letterSpacing: '0.08em',
                  fontSize: '10px',
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}