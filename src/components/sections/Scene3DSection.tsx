import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { FloatingGeometry } from '../3d/FloatingGeometry';
import { Stars } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none z-10" />

      {/* Red glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full opacity-15 pointer-events-none z-10"
        style={{
          background: 'radial-gradient(ellipse, hsl(0 70% 40%) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Center label */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none"
      >
        <span className="text-xs font-mono uppercase tracking-[0.3em] text-primary/50 mb-4">
          Engineering The Future
        </span>
        <div
          className="w-px h-16 opacity-30"
          style={{ background: 'linear-gradient(to bottom, hsl(0 70% 45%), transparent)' }}
        />
      </motion.div>
    </section>
  );
};
