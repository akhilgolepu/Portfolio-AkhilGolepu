import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SlideButton from '@/components/ui/SlideButton';

export default function CTAFooter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <footer ref={ref} style={{
      paddingTop: '120px',
      paddingBottom: '80px',
      borderTop: '1px solid var(--border-line)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Ambient bg */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(37,99,235,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="max-w-layout mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
          {/* Left: Headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="font-mono text-xs uppercase tracking-widest block mb-6" style={{ color: '#2563EB', letterSpacing: '0.1em' }}>
              06 — Let's Connect
            </span>
            <h2 className="font-heading font-bold mb-6" style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--text-primary)',
            }}>
              Let's Build<br />
              <span style={{
                color: 'transparent',
                WebkitTextStroke: '1px var(--text-primary)',
              }}>
                Something.
              </span>
            </h2>
            <p className="font-body" style={{
              color: 'var(--text-muted)',
              fontSize: '15px',
              lineHeight: 1.7,
              maxWidth: '380px',
            }}>
              Open to full-time roles, research collaborations, and consulting engagements in ML/CV engineering.
            </p>
          </motion.div>

          {/* Right: Actions */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Resume */}
            <SlideButton
              as="a"
              href="https://raw.githubusercontent.com/akhilgolepu/Portfolio-AkhilGolepu/main/resume/AkhilG_resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="AkhilG_resume.pdf"
              className="justify-between px-8 py-5 rounded-2xl w-full"
            >
              <div style={{ textAlign: 'left' }}>
                <div className="font-heading font-bold text-base" style={{ letterSpacing: '-0.02em' }}>Download Resume</div>
                <div className="font-mono text-xs mt-0.5" style={{ opacity: 0.6, letterSpacing: '0.06em' }}>PDF · Updated 2026</div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
            </SlideButton>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 gap-4"
          style={{ borderTop: '1px solid var(--border-line)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: '#2563EB' }}>
              <span className="text-white font-heading font-bold" style={{ fontSize: '9px' }}>AG</span>
            </div>
            <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>
              © 2026 Akhil Golepu
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { label: 'GitHub', icon: 'GH', href: 'https://github.com/akhilgolepu' },
              { label: 'LinkedIn', icon: 'LI', href: 'https://www.linkedin.com/in/golepu-akhil-6648272b9' },
            ].map(social => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center no-underline transition-all duration-300 font-mono text-xs font-medium"
                style={{
                  border: '1px solid var(--border-line)',
                  color: 'var(--text-muted)',
                  background: 'var(--surface-elevated)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#2563EB';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.borderColor = '#2563EB';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--surface-elevated)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                }}
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}