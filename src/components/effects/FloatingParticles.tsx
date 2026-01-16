import { useState, useMemo } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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
  const { shouldReduceMotion } = useReducedMotion();
  // Reduce particle count on mobile for performance
  const particleCount = shouldReduceMotion ? 4 : 6;
  const [particles] = useState(() => generateParticles(particleCount));

  // Don't render any particles if reduced motion is preferred
  if (shouldReduceMotion) {
    return (
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-[1]">
        {/* Static ambient glow only - no animation */}
        <div
          className="absolute -top-1/4 -right-1/4 w-[500px] h-[500px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(0 70% 45% / 0.2) 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute top-1/3 -left-1/4 w-[400px] h-[400px] rounded-full opacity-8"
          style={{
            background: 'radial-gradient(circle, hsl(0 80% 35% / 0.15) 0%, transparent 70%)',
          }}
        />
      </div>
    );
  }

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

      {/* Floating particles - CSS animations for better performance */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: particle.color,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
            animation: `floatParticle ${particle.duration}s ease-in-out ${particle.delay}s infinite`,
            willChange: 'transform, opacity',
            transform: 'translateZ(0)',
          }}
        />
      ))}

      {/* Add CSS keyframes via style tag */}
      <style>{`
        @keyframes floatParticle {
          0%, 100% {
            transform: translateY(0) translateZ(0);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateZ(0);
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};
