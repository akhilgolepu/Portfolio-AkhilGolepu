import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/lib/ThemeContext';
import SlideButton from '@/components/ui/SlideButton';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/#about' },
  { label: 'Work', path: '/#work' },
  { label: 'Capabilities', path: '/#capabilities' },
  { label: 'Education', path: '/#education' },
  { label: 'Credentials', path: '/#credentials' },
  { label: 'Let\'s Connect', path: '/contact' },
];

const SOCIALS = [
  { label: 'GitHub', short: 'GH', href: 'https://github.com/akhilgolepu' },
  { label: 'LinkedIn', short: 'LI', href: 'https://www.linkedin.com/in/golepu-akhil-6648272b9' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const smoothScrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const start = window.scrollY;
    const target = el.getBoundingClientRect().top + window.scrollY - 64;
    const distance = target - start;
    const duration = 900;
    let startTime = null;
    const easeInOutQuart = (t) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    const step = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      window.scrollTo(0, start + distance * easeInOutQuart(progress));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const handleNavClick = (path) => {
    setMenuOpen(false);
    if (path === '/') {
      // Home link - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('#')) {
      const id = path.split('#')[1];
      setTimeout(() => smoothScrollTo(id), 120);
    }
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16"
        style={{
          borderBottom: scrolled ? '1px solid var(--border-line)' : '1px solid transparent',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: scrolled
            ? theme === 'dark' ? 'rgba(10,10,10,0.85)' : 'rgba(253,251,247,0.85)'
            : 'transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease',
        }}
      >
        <div className="max-w-layout mx-auto px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-2.5 no-underline" onClick={() => setMenuOpen(false)}>
            <div className="w-7 h-7 rounded-md flex items-center justify-center" style={{ background: '#2563EB' }}>
              <span className="text-white font-heading font-bold text-xs">AG</span>
            </div>
            <span className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
              Akhil Golepu
            </span>
          </Link>

          {/* Desktop Nav links — hidden; navigation via side drawer */}
          <nav className="hidden" />

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                border: '1px solid var(--border-line)',
                background: 'var(--surface-elevated)',
                color: 'var(--text-muted)',
              }}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            {/* CTA — contact link for desktop */}
            <SlideButton
              as={Link}
              to={location.pathname === '/contact' ? '/' : '/contact'}
              onClick={() => {
                if (location.pathname === '/contact') {
                  handleNavClick('/');
                }
              }}
              className="hidden md:inline-flex gap-2 px-4 py-2 text-xs font-mono font-medium uppercase rounded-full"
              style={{ letterSpacing: '0.08em' }}
            >
              {location.pathname === '/contact' ? 'Home' : 'Get in touch'}
            </SlideButton>

            {/* Hamburger — visible all breakpoints */}
            <button
              className="flex flex-col gap-1.5 w-8 h-8 items-center justify-center rounded"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="block w-5 h-px transition-all duration-300" style={{
                background: 'var(--text-primary)',
                transformOrigin: 'center',
                transform: menuOpen ? 'rotate(45deg) translate(2px, 2px)' : 'none',
              }} />
              <span className="block h-px transition-all duration-300" style={{
                background: 'var(--text-primary)',
                width: menuOpen ? '20px' : '14px',
                opacity: menuOpen ? 0 : 1,
                marginLeft: 'auto',
                marginRight: '0',
              }} />
              <span className="block w-5 h-px transition-all duration-300" style={{
                background: 'var(--text-primary)',
                transformOrigin: 'center',
                transform: menuOpen ? 'rotate(-45deg) translate(2px, -2px)' : 'none',
              }} />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay — 50vw desktop, 100vw mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop (desktop only) */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-30 hidden md:block"
              style={{ background: 'rgba(0,0,0,0.25)' }}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              key="menu-panel"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
              className="fixed top-0 right-0 z-40 flex flex-col"
              style={{
                width: 'clamp(320px, 50vw, 680px)',
                height: '100vh',
                background: theme === 'dark' ? '#0D0D0D' : '#FDFBF7',
                borderLeft: '1px solid var(--border-line)',
              }}
            >
              {/* Close button */}
              <div className="flex items-center justify-between px-10 pt-8 pb-6">
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: 'var(--text-muted)', letterSpacing: '0.1em' }}>
                  Navigation
                </span>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{ border: '1px solid var(--border-line)', color: 'var(--text-muted)', background: 'transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2563EB'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-line)'; }}
                  aria-label="Close menu"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <div style={{ height: '1px', background: 'var(--border-line)', margin: '0 40px' }} />

              {/* Nav links */}
              <nav className="flex flex-col justify-center flex-1 px-10 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ delay: 0.08 + i * 0.07, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => handleNavClick(link.path)}
                      className="group flex items-center justify-between font-heading font-black no-underline py-4"
                      style={{
                        fontSize: 'clamp(32px, 5vw, 56px)',
                        color: 'var(--text-primary)',
                        letterSpacing: '-0.04em',
                        lineHeight: 1,
                        borderBottom: '1px solid var(--border-line)',
                        transition: 'color 0.25s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#2563EB'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-primary)'; }}
                    >
                      <span>{link.label}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        style={{ opacity: 0.3, transition: 'opacity 0.25s, transform 0.25s', flexShrink: 0 }}
                        className="group-hover:opacity-100"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"/>
                      </svg>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Footer of panel */}
              <div className="px-10 pb-10">
                <div style={{ height: '1px', background: 'var(--border-line)', marginBottom: '24px' }} />
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs" style={{ color: 'var(--text-muted)', letterSpacing: '0.06em' }}>© 2026 Akhil Golepu</span>
                  <div className="flex gap-2">
                    {SOCIALS.map(s => (
                      <a key={s.short} href={s.href} target="_blank" rel="noopener noreferrer"
                        className="w-7 h-7 rounded-md flex items-center justify-center font-mono text-xs no-underline transition-all duration-200"
                        style={{ border: '1px solid var(--border-line)', color: 'var(--text-muted)' }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#2563EB'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#2563EB'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border-line)'; }}
                        aria-label={s.label}
                      >{s.short}</a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}