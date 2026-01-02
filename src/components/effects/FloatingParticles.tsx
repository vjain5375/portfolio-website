import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: 'cyan' | 'purple' | 'red';
  type: 'orb' | 'spark' | 'dust';
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    duration: Math.random() * 8 + 4,
    delay: Math.random() * 4,
    color: ['cyan', 'purple', 'red'][Math.floor(Math.random() * 3)] as Particle['color'],
    type: ['orb', 'spark', 'dust'][Math.floor(Math.random() * 3)] as Particle['type'],
  }));
};

export const FloatingParticles = () => {
  const [particles] = useState(() => generateParticles(50));
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  
  const springConfig = { damping: 50, stiffness: 100 };
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
    cyan: 'hsl(180, 100%, 50%)',
    purple: 'hsl(270, 100%, 65%)',
    red: 'hsl(0, 80%, 55%)',
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Ambient glow orbs that react to mouse */}
      <motion.div
        style={{
          x: useTransform(smoothMouseX, [0, 1], ['-10%', '10%']),
          y: useTransform(smoothMouseY, [0, 1], ['-10%', '10%']),
        }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        initial={{ scale: 0.8 }}
        animate={{
          scale: [0.8, 1.1, 0.8],
          background: [
            'radial-gradient(circle, hsl(180 100% 50% / 0.3) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(270 100% 65% / 0.3) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(180 100% 50% / 0.3) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        style={{
          x: useTransform(smoothMouseX, [0, 1], ['10%', '-10%']),
          y: useTransform(smoothMouseY, [0, 1], ['10%', '-10%']),
        }}
        className="absolute top-1/3 -left-1/4 w-[500px] h-[500px] rounded-full opacity-15"
        animate={{
          scale: [1, 1.2, 1],
          background: [
            'radial-gradient(circle, hsl(270 100% 65% / 0.3) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(0 80% 55% / 0.2) 0%, transparent 70%)',
            'radial-gradient(circle, hsl(270 100% 65% / 0.3) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      />

      {/* Stranger Things inspired red glow at bottom */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-10"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          background: 'radial-gradient(ellipse at center bottom, hsl(0 80% 50% / 0.4) 0%, transparent 70%)',
        }}
      />

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 60, 0],
            x: [0, (Math.random() - 0.5) * 30, 0],
            opacity: particle.type === 'dust' ? [0.2, 0.6, 0.2] : [0.4, 0.9, 0.4],
            scale: particle.type === 'spark' ? [0.5, 1.5, 0.5] : [1, 1.2, 1],
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
                : particle.type === 'spark'
                ? `0 0 ${particle.size * 2}px ${colorMap[particle.color]}`
                : 'none',
            }}
          />
        </motion.div>
      ))}

      {/* Scanning line effect - Stranger Things vibe */}
      <motion.div
        className="absolute left-0 right-0 h-px opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(0 80% 55%) 50%, transparent 100%)',
        }}
        animate={{
          top: ['-10%', '110%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'linear',
          repeatDelay: 4,
        }}
      />
    </div>
  );
};
