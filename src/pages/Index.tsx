import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FloatingParticles } from '@/components/effects/FloatingParticles';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { CinematicBackground } from '@/components/layout/CinematicBackground';
import { WorldTransitionOverlay } from '@/components/effects/WorldTransitionOverlay';

const Index = () => {
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <WorldTransitionOverlay />
      <CinematicBackground />

      {/* Only load minimal effects - heavy effects completely removed */}
      {!shouldReduceMotion && <FloatingParticles />}

      {/* Upside Down glow at bottom - CSS only */}
      <div className="fixed bottom-0 left-0 right-0 h-[200px] pointer-events-none z-[97] upside-down-glow" />

      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
