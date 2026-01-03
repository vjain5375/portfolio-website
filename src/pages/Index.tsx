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
import { UpsideDownSpores } from '@/components/effects/UpsideDownSpores';
import { RedFogLayers } from '@/components/effects/RedFogLayers';
import { OrganicCracks } from '@/components/effects/OrganicCracks';
import { ShadowVines } from '@/components/effects/ShadowVines';
import { useScroll, useTransform, motion } from 'framer-motion';

const Index = () => {
  const { scrollYProgress } = useScroll();

  // Calculate intensity based on scroll position (4-act structure)
  // Act 1 (0-20%): 20% intensity - Hero + About
  // Act 2 (20-45%): 50% intensity - Projects
  // Act 3 (45-75%): 100% intensity - Education + Experience
  // Act 4 (75-100%): 60% intensity - Contact
  const atmosphereIntensity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.45, 0.55, 0.75, 0.85, 1],
    [0.2, 0.25, 0.5, 0.8, 1, 1, 0.6, 0.5]
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Cinematic effects layer - Base */}
      <FloatingParticles />
      <MouseGlow />
      <RedLightPulse />
      <DimensionShift />

      {/* Enhanced atmospheric effects with scroll-based intensity */}
      <motion.div style={{ opacity: atmosphereIntensity }}>
        <UpsideDownSpores intensity={0.8} />
        <RedFogLayers intensity={0.7} />
        <OrganicCracks intensity={0.6} />
        <ShadowVines intensity={0.5} />
      </motion.div>

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

