import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { ParallaxBackground } from '@/components/effects/ParallaxBackground';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const ParallaxSection = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.3, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity, scale }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParallaxBackground />
      <Navbar />
      <main>
        <HeroSection />
        <ParallaxSection>
          <ProjectsSection />
        </ParallaxSection>
        <ParallaxSection>
          <ExperienceSection />
        </ParallaxSection>
        <ParallaxSection>
          <AboutSection />
        </ParallaxSection>
        <ParallaxSection>
          <ContactSection />
        </ParallaxSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
