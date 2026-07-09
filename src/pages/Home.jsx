import { useEffect, useState } from 'react';
import Preloader from '@/components/Preloader';
import HeroSection from '@/components/hero/HeroSection';
import AboutSection from '@/components/about/AboutSection';
import BentoGrid from '@/components/bento/BentoGrid';
import EducationSection from '@/components/education/EducationSection';
import CertificationsSection from '@/components/certifications/CertificationsSection';
import CTAFooter from '@/components/footer/CTAFooter';
import ProjectCarousel from '@/components/carousel/ProjectCarousel';

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);
  const [showPreloader, setShowPreloader] = useState(false);

  useEffect(() => {
    // Replaced the undefined WELCOME_KEY variable with a clean string literal
    const alreadySeen = typeof window !== 'undefined' && localStorage.getItem('portfolio-preloader-seen') === 'true';
    if (alreadySeen) {
      setPreloaderDone(true);
      setShowPreloader(false);
    } else {
      setShowPreloader(true);
    }
  }, []);

  const handlePreloaderComplete = () => {
    localStorage.setItem('portfolio-preloader-seen', 'true');
    setPreloaderDone(true);
  };

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <main
        style={{
          background: 'var(--surface)',
          minHeight: '100vh',
          opacity: preloaderDone ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <HeroSection />
        <AboutSection />
        <ProjectCarousel />
        <BentoGrid />
        <EducationSection />
        <CertificationsSection />
        <CTAFooter />
      </main>
    </>
  );
}