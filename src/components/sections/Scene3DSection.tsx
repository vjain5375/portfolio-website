import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingGeometry } from '../3d/FloatingGeometry';
import { Stars } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { GlitchText } from '../effects/GlitchText';

const Scene3DCanvas = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastUpdate.current < 33) return;
    lastUpdate.current = now;
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        frameloop="demand"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} color="#1a0505" />
          <directionalLight position={[10, 10, 5]} intensity={0.3} color="#b91c1c" />
          <directionalLight position={[-5, -5, -5]} intensity={0.15} color="#7f1d1d" />
          <Stars radius={80} depth={40} count={300} factor={2} saturation={0} fade speed={0.3} />
          <FloatingGeometry mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export const Scene3DSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { shouldReduceMotion } = useReducedMotion();

  return (
    <section
      ref={ref}
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* 3D canvas fills the section */}
      {!shouldReduceMotion && <Scene3DCanvas />}

      {/* Gradient overlays — fade in from top and out at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none z-10" />

      {/* Red glow behind text */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] rounded-full opacity-20 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse, hsl(0 70% 40%) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Big "ENGINEERING THE FUTURE" text overlaid on the 3D */}
      <motion.div
        initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
        animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none px-6"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-center">
          <GlitchText
            className="stranger-things-text"
            glitchColor1="hsl(0, 70%, 45%)"
            glitchColor2="hsl(0, 80%, 35%)"
          >
            Engineering
          </GlitchText>
          <br />
          <GlitchText
            className="stranger-things-outline text-glow-red"
            glitchColor1="hsl(0, 80%, 40%)"
            glitchColor2="hsl(195, 50%, 30%)"
          >
            The Future
          </GlitchText>
        </h2>
      </motion.div>
    </section>
  );
};
