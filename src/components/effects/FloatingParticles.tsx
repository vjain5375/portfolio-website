import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  color: string;
}

const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    duration: Math.random() * 15 + 12,
    delay: Math.random() * 5,
    color: Math.random() > 0.3 ? 'hsl(0, 70%, 45%)' : 'hsl(0, 80%, 35%)',
  }));
};

export const FloatingParticles = () => {
  const [particles] = useState(() => generateParticles(8)); // Minimal particles

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
      {/* Static ambient glow - no animation */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
        style={{
          background: 'radial-gradient(circle, hsl(0 70% 45% / 0.2) 0%, transparent 70%)',
        }}
      />

      {/* Static secondary glow */}
      <div
        className="absolute top-1/3 -left-1/4 w-[400px] h-[400px] rounded-full opacity-8"
        style={{
          background: 'radial-gradient(circle, hsl(0 80% 35% / 0.15) 0%, transparent 70%)',
        }}
      />

      {/* Static fog gradient */}
      <div
        className="absolute inset-0 opacity-50"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, hsl(0 10% 5% / 0.15) 60%, hsl(0 20% 8% / 0.3) 100%)',
        }}
      />

      {/* Minimal floating particles - CSS animations only */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};
