import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SlideButton from '@/components/ui/SlideButton';
import CERTIFICATES from '@/data/certificates';

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function CertificationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <section
      id="credentials"
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
            05 — Credentials
          </span>
          <h2 className="font-heading font-bold" style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            letterSpacing: '-0.04em',
            color: 'var(--text-primary)',
          }}>
            Certifications
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                borderRadius: '20px',
                background: 'var(--surface-elevated)',
                border: '1px solid var(--border-line)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div style={{ width: '64px', height: '56px', flexShrink: 0 }}>
                  <img src={cert.image} alt={cert.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12 }} onError={(e) => { e.currentTarget.style.opacity = 0; }} />
                </div>
                <span className="font-mono text-xs" style={{
                  color: 'var(--text-muted)', letterSpacing: '0.06em',
                  background: 'var(--surface)', padding: '6px 12px', borderRadius: '100px',
                  border: '1px solid var(--border-line)', fontSize: '11px', flexShrink: 0,
                }}>
                  {cert.date}
                </span>
              </div>

              <div>
                <h3 className="font-heading font-bold mb-1" style={{ fontSize: '15px', color: 'var(--text-primary)', lineHeight: 1.2 }}>{cert.name}</h3>
                <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{cert.issuer}</p>
              </div>

              <SlideButton
                as="a"
                href={cert.url || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full justify-between px-5 py-3 rounded-xl text-xs font-mono uppercase"
                style={{ letterSpacing: '0.08em' }}
              >
                View Certificate
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </SlideButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}