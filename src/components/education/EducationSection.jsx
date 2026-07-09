import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const TIMELINE = [
  {
    period: '2008 – 2021',
    label: 'School',
    institution: 'Heritage Valley The Indian School',
    detail: 'ICSE Curriculum — 81.6%',
    color: '#2563EB',
    current: false,
  },
  {
    period: '2021 – 2023',
    label: 'Intermediate (MPC)',
    institution: 'Meluha International → Aakash Institute',
    detail: 'SSC Syllabus — 85.9% aggregate',
    subDetail: '2021–22: Meluha International · 2022–23: Aakash Institute',
    color: '#2563EB',
    current: false,
  },
  {
    period: '2023 – 2027',
    label: 'University',
    institution: 'Vardhaman College of Engineering',
    detail: 'B.Tech CSE (AI & ML) — CGPA 8.18',
    subDetail: 'Expected Graduation · June 2027',
    color: '#2563EB',
    current: true,
  },
];

export default function EducationSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="education"
      ref={ref}
      style={{ paddingTop: '120px', paddingBottom: '120px', borderTop: '1px solid var(--border-line)' }}
    >
      <div className="max-w-layout mx-auto px-8">
        {/* Header */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="font-mono text-xs uppercase tracking-widest block mb-3" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
            04 — Education
          </span>
          <h2 className="font-heading font-bold" style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}>
            Academic Timeline
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative" style={{ paddingLeft: '32px' }}>
          {/* Vertical axis line */}
          <motion.div
            style={{
              position: 'absolute',
              left: 0,
              top: '12px',
              width: '1px',
              background: 'var(--border-line)',
              transformOrigin: 'top',
            }}
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1, height: '100%' } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="flex flex-col" style={{ gap: '0' }}>
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} inView={inView} isLast={i === TIMELINE.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ item, index, inView, isLast }) {
  return (
    <motion.div
      className="relative flex gap-8"
      style={{ paddingBottom: isLast ? 0 : '56px' }}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: 0.3 + index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Dot on timeline */}
      <div style={{
        position: 'absolute',
        left: '-36px',
        top: '10px',
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        background: item.current ? item.color : 'var(--surface)',
        border: `2px solid ${item.color}`,
        boxShadow: item.current ? `0 0 12px ${item.color}60` : 'none',
        flexShrink: 0,
        zIndex: 1,
      }} />

      {/* Period — bold, left anchored */}
      <div style={{ minWidth: '120px', flexShrink: 0 }}>
        <span className="font-heading font-bold block" style={{
          fontSize: '14px',
          letterSpacing: '-0.02em',
          color: item.color,
          lineHeight: 1.3,
        }}>
          {item.period}
        </span>
        <span className="font-mono text-xs uppercase block mt-1" style={{
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          fontSize: '10px',
        }}>
          {item.label}
        </span>
      </div>

      {/* Content — expands right */}
      <div style={{
        flex: 1,
        padding: '20px 24px',
        borderRadius: '16px',
        background: 'var(--surface-elevated)',
        border: `1px solid ${item.current ? item.color + '30' : 'var(--border-line)'}`,
        boxShadow: item.current ? `0 4px 24px ${item.color}10` : 'none',
      }}>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h3 className="font-heading font-bold mb-1" style={{
              fontSize: '17px',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
            }}>
              {item.institution}
            </h3>
            <p className="font-body" style={{
              fontSize: '14px',
              color: 'var(--text-muted)',
              lineHeight: 1.5,
            }}>
              {item.detail}
            </p>
            {item.subDetail && (
              <p className="font-mono mt-1" style={{
                fontSize: '11px',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                opacity: 0.7,
              }}>
                {item.subDetail}
              </p>
            )}
          </div>
          {item.current && (
            <span className="font-mono text-xs uppercase flex items-center gap-1.5 flex-shrink-0" style={{
              color: item.color, letterSpacing: '0.08em', fontSize: '10px',
            }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 6px #22c55e' }} />
              Ongoing
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}