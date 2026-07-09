import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import SlideButton from '@/components/ui/SlideButton';

const LINE_VARIANTS = {
  hidden: { y: '110%', opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.1 + i * 0.12,
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

function AnimatedLine({ children, index, className, style }) {
  return (
    <span className="line-mask block" style={{ overflow: 'hidden' }}>
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

export default function HeroSection() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end start'] });
  const line1Y = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const line2Y = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacityFade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (!el) return;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - 64;
    const distance = target - start;
    const duration = 900;
    let startTime = null;
    const ease = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      window.scrollTo(0, start + distance * ease(p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center mesh-gradient"
      style={{ paddingTop: '96px', paddingBottom: '80px' }}
    >
      {/* Blueprint grid overlay */}
      <div className="absolute inset-0 blueprint-lines pointer-events-none" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(37,99,235,0.04) 0%, transparent 70%)'
      }} />

      <motion.div
        style={{ opacity: opacityFade }}
        className="max-w-layout mx-auto px-8 w-full"
      >
        {/* Status badge */}
        <AnimatedLine index={0}>
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#22c55e' }} />
            <span className="font-body text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              Available for opportunities
            </span>
          </div>
        </AnimatedLine>

        {/* Name — split parallax */}
        <div className="mb-6 overflow-hidden">
          <motion.div style={{ y: line1Y }}>
            <span className="line-mask block overflow-hidden">
              <motion.h1
                className="font-heading font-black block"
                style={{
                  fontSize: 'clamp(52px, 9vw, 128px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                  color: 'var(--text-primary)',
                }}
                custom={1}
                initial="hidden"
                animate="visible"
                variants={LINE_VARIANTS}
              >
                AKHIL
              </motion.h1>
            </span>
          </motion.div>
          <motion.div style={{ y: line2Y }}>
            <span className="line-mask block overflow-hidden">
              <motion.h1
                className="font-heading font-black block"
                style={{
                  fontSize: 'clamp(52px, 9vw, 128px)',
                  letterSpacing: '-0.04em',
                  lineHeight: 0.92,
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-primary)',
                }}
                custom={2}
                initial="hidden"
                animate="visible"
                variants={LINE_VARIANTS}
              >
                GOLEPU
              </motion.h1>
            </span>
          </motion.div>
        </div>

        {/* Subtitle */}
        <div className="mb-12 max-w-xl">
          <AnimatedLine index={3} className="font-body" style={{
            fontSize: '16px',
            lineHeight: 1.7,
            color: 'var(--text-muted)',
            letterSpacing: '-0.01em',
          }}>
            Building end-to-end ML &amp; MLOps systems — from raw data to production-ready inference at scale.
          </AnimatedLine>
        </div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <SlideButton
            onClick={handleScrollToWork}
            className="gap-2.5 px-6 py-3 rounded-full font-body text-xs uppercase font-medium"
            style={{ letterSpacing: '0.08em' }}
          >
            <span>View Work</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </SlideButton>

          <SlideButton
            as={Link}
            to="/contact"
            className="gap-2.5 px-6 py-3 rounded-full font-body text-xs uppercase font-medium"
            style={{ letterSpacing: '0.08em' }}
          >
            Get in Touch
          </SlideButton>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-10 left-8 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <motion.div
            className="w-px h-12"
            style={{ background: 'var(--border-line)' }}
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
          <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
            Scroll
          </span>
        </motion.div>

        {/* Floating metadata */}
        <motion.div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-end gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          {['MLOps', 'Computer Vision', 'PyTorch', 'Kubernetes'].map((tag, i) => (
            <span key={tag} className="font-mono text-xs uppercase" style={{
              color: 'var(--text-muted)',
              letterSpacing: '0.08em',
              opacity: 1 - i * 0.18,
            }}>
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}