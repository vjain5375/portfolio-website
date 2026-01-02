import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { FloatingParticles } from '@/components/effects/FloatingParticles';
import { MouseGlow } from '@/components/effects/MouseGlow';
import { RedLightPulse } from '@/components/effects/RedLightPulse';
import { DimensionShift } from '@/components/effects/DimensionShift';

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Cinematic effects layer */}
      <FloatingParticles />
      <MouseGlow />
      <RedLightPulse />
      <DimensionShift />

      {/* Scanline overlay for retro-sci-fi feel */}
      <div className="fixed inset-0 pointer-events-none z-[100] scanlines opacity-20" />

      {/* Enhanced vignette effect for Stranger Things atmosphere */}
      <div className="fixed inset-0 pointer-events-none z-[99] vignette" />

      {/* Noise texture */}
      <div className="fixed inset-0 pointer-events-none z-[98] noise" />

      {/* Upside Down glow at bottom */}
      <div className="fixed bottom-0 left-0 right-0 h-[300px] pointer-events-none z-[97] upside-down-glow" />

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
