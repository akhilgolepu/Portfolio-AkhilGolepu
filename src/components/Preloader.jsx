import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WELCOME = 'WELCOME'.split('');

export default function Preloader({ onComplete }) {
  const [visible, setVisible] = useState(true);
  const [lettersShown, setLettersShown] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // progress animation (requestAnimationFrame)
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      // ease-out
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        // finished
        // unlock shortly as the curtain begins to slide
        document.body.style.overflow = prev;
        setTimeout(() => setVisible(false), 900);
      }
    };
    raf = requestAnimationFrame(tick);

    // typing effect for WELCOME
    const letterInterval = setInterval(() => {
      setLettersShown((prev) => {
        if (prev >= WELCOME.length) {
          clearInterval(letterInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 110);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(letterInterval);
      document.body.style.overflow = prev;
    };
  }, []);

  const handleExitComplete = () => onComplete?.();

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          className="preloader"
          aria-hidden
        >
          <div className="preloader-inner">
            <div className="preloader-mark" aria-hidden>
              {WELCOME.map((l, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  animate={lettersShown > i ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  style={{ display: 'inline-block' }}
                >
                  {l}
                </motion.span>
              ))}
            </div>

            <div className="preloader-row" style={{ visibility: 'hidden' }}>
              <span className="preloader-label">Loading portfolio</span>
              <span className="preloader-count">{String(progress).padStart(3, '0')}</span>
            </div>

            <div className="preloader-bar" aria-hidden>
              <div className="preloader-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}