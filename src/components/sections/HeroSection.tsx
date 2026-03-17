import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense } from 'react';
import * as THREE from 'three';

// Minimal rotating wireframe geometry
const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.18;
    meshRef.current.rotation.x += delta * 0.07;
    meshRef.current.rotation.x += (mouseRef.current.y * 0.12 - meshRef.current.rotation.x) * 0.04;
    meshRef.current.rotation.y += (mouseRef.current.x * 0.12 - meshRef.current.rotation.y) * 0.03;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.6, 1]} />
      <meshBasicMaterial color="#ef4444" wireframe opacity={0.18} transparent />
    </mesh>
  );
};

// Outer ring
const Ring = () => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.1;
    ref.current.rotation.x = 1.1;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[2.4, 0.008, 8, 80]} />
      <meshBasicMaterial color="#6366f1" opacity={0.22} transparent />
    </mesh>
  );
};

const Scene = () => (
  <>
    <ambientLight intensity={0.2} />
    <FloatingSphere />
    <Ring />
  </>
);

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex items-center"
      style={{ paddingTop: '80px' }}
    >
      {/* Subtle red glow — very diffuse */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '20%',
          right: '10%',
          width: '480px',
          height: '480px',
          background: 'radial-gradient(circle, rgba(239,68,68,0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '15%',
          left: '5%',
          width: '300px',
          height: '300px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-[1fr_420px] gap-12 items-center min-h-[calc(100vh-80px)]">

          {/* LEFT — Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-col justify-center py-16 lg:py-0"
          >
            <motion.div variants={fadeUp} className="mb-5">
              <span className="section-eyebrow">B.Tech CSE · RGIPT · 2024–2028</span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              style={{
                fontSize: 'clamp(42px, 6vw, 68px)',
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: 'var(--text)',
                marginBottom: '4px',
              }}
            >
              Vansh Jain
            </motion.h1>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: 'clamp(18px, 2.5vw, 26px)',
                fontWeight: 400,
                color: 'var(--text-2)',
                marginBottom: '20px',
                letterSpacing: '-0.01em',
              }}
            >
              Full-Stack Developer &{' '}
              <span style={{ color: 'var(--red)' }}>AI Engineer</span>
            </motion.p>

            <motion.p
              variants={fadeUp}
              style={{
                fontSize: '15.5px',
                color: 'var(--text-2)',
                lineHeight: 1.65,
                maxWidth: '420px',
                marginBottom: '36px',
              }}
            >
              I build products at the intersection of clean UI and meaningful AI —
              from full-stack platforms to machine learning pipelines.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 items-center mb-10">
              <a href="#projects" className="btn-primary">
                View Work
                <ArrowRight size={15} />
              </a>
              <a href="#contact" className="btn-outline">
                Get in Touch
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <a
                href="https://github.com/vjain5375"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-3)', transition: 'color 0.15s ease' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-3)')}
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/vansh-jain-8b3704273/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--text-3)', transition: 'color 0.15s ease' }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-3)')}
              >
                <Linkedin size={18} />
              </a>
              <span style={{ width: '1px', height: '16px', background: 'var(--border)', display: 'inline-block' }} />
              <a
                href="mailto:vjain5375@gmail.com"
                style={{
                  fontSize: '12.5px',
                  color: 'var(--text-3)',
                  textDecoration: 'none',
                  fontFamily: 'JetBrains Mono, monospace',
                  transition: 'color 0.15s ease',
                }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = 'var(--text-2)')}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = 'var(--text-3)')}
              >
                vjain5375@gmail.com
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Interactive 3D */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex items-center justify-center"
            style={{ height: '420px', position: 'relative' }}
          >
            {/* Card behind canvas */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
              }}
            />
            {/* Stats overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '20px',
                left: '20px',
                right: '20px',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
              }}
            >
              {[
                { label: 'Projects', value: '8+' },
                { label: 'Tech Stack', value: '15+' },
                { label: 'Year', value: '2nd' },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    flex: 1,
                    background: 'rgba(14,14,14,0.75)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '8px',
                    padding: '10px 12px',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)', letterSpacing: '-0.02em' }}>{s.value}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-3)', marginTop: '2px' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <Canvas
              style={{ width: '100%', height: '100%', borderRadius: '20px', position: 'relative', zIndex: 1 }}
              camera={{ position: [0, 0, 4.5], fov: 50 }}
              dpr={[1, 1.5]}
            >
              <Suspense fallback={null}>
                <Scene />
              </Suspense>
            </Canvas>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ fontSize: '10px', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, var(--text-3), transparent)' }}
          />
        </motion.div>
      </div>
    </section>
  );
};
