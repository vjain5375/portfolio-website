import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: 'crimson' | 'bloodRed' | 'dimCyan' | 'dust';
  type: 'orb' | 'spark' | 'dust' | 'ember';
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => {
    const random = Math.random();
    // Mostly red particles with occasional dim cyan
    let color: Particle['color'];
    if (random < 0.4) color = 'crimson';
    else if (random < 0.7) color = 'bloodRed';
    else if (random < 0.85) color = 'dust';
    else color = 'dimCyan';

    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 0.5,
      duration: Math.random() * 12 + 8, // Slower movement
      delay: Math.random() * 6,
      color,
      type: ['orb', 'spark', 'dust', 'ember'][Math.floor(Math.random() * 4)] as Particle['type'],
    };
  });
};

export const FloatingParticles = () => {
  const [particles] = useState(() => generateParticles(70)); // More particles for dust effect
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 50, stiffness: 80 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    mouseX.set(x);
    mouseY.set(y);
    setMousePosition({ x, y });
  }, [mouseX, mouseY]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  const colorMap = {
    crimson: 'hsl(0, 70%, 45%)',
    bloodRed: 'hsl(0, 80%, 35%)',
    dimCyan: 'hsl(195, 50%, 30%)',
    dust: 'hsl(0, 20%, 60%)',
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Main ambient red glow that reacts to mouse */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [0, 1], ['-10%', '10%']),
          y: useTransform(smoothMouseY, [0, 1], ['-10%', '10%']),
        }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-15"
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          background: [
            'radial-gradient(circle, hsl(0 70% 45% / 0.25) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(0 80% 35% / 0.3) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(0 70% 45% / 0.25) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary crimson glow - left side */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [0, 1], ['10%', '-10%']),
          y: useTransform(smoothMouseY, [0, 1], ['10%', '-10%']),
        }}
        className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full opacity-12"
        animate={{
          scale: [1, 1.2, 1],
          background: [
            'radial-gradient(circle, hsl(0 80% 35% / 0.2) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(0 70% 40% / 0.25) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(0 80% 35% / 0.2) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />

      {/* Upside Down portal glow at bottom - Stranger Things signature */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse at center bottom, hsl(0 70% 40% / 0.5) 0%, hsl(0 60% 30% / 0.3) 30%, transparent 70%)',
        }}
      />

      {/* Subtle fog layers */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(0 10% 5% / 0.2) 60%, hsl(0 20% 8% / 0.4) 100%)',
        }}
        animate={{
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Floating particles - dust, embers, orbs */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -30 - Math.random() * 50, 0],
            x: [0, (Math.random() - 0.5) * 20, 0],
            opacity: particle.type === 'dust'
              ? [0.15, 0.4, 0.15]
              : particle.type === 'ember'
                ? [0.3, 0.7, 0.3]
                : [0.2, 0.6, 0.2],
            scale: particle.type === 'spark' ? [0.5, 1.2, 0.5] : [1, 1.1, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        >
          <div
            className="rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              background: colorMap[particle.color],
              boxShadow: particle.type === 'orb'
                ? `0 0 ${particle.size * 4}px ${colorMap[particle.color]}, 0 0 ${particle.size * 8}px ${colorMap[particle.color]}`
                : particle.type === 'ember'
                  ? `0 0 ${particle.size * 3}px ${colorMap[particle.color]}, 0 0 ${particle.size * 6}px hsl(0 70% 45% / 0.5)`
                  : particle.type === 'spark'
                    ? `0 0 ${particle.size * 2}px ${colorMap[particle.color]}`
                    : 'none',
            }}
          />
        </motion.div>
      ))}

      {/* Slow scanning red line - Stranger Things vibe */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] opacity-8"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 70% 45% / 0.6) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
        animate={{
          top: ['-10%', '110%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 6,
        }}
      />

      {/* Secondary slower scan line */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-5"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 80% 35% / 0.4) 50%, transparent 100%)',
        }}
        animate={{
          top: ['110%', '-10%'],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 4,
        }}
      />
    </div>
  );
};
