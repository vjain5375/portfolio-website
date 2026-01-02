import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useScrollParallax } from '@/hooks/useScrollParallax';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  depth?: boolean;
}

export const ScrollReveal = ({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  depth = true,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { y, scale, opacity, rotateX } = useScrollParallax(ref, {
    yRange: [60, -60],
    scaleRange: [0.95, 1],
    rotateRange: depth ? [5, 0] : [0, 0],
  });

  const directionVariants = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...directionVariants[direction],
        scale: 0.95,
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0,
        scale: 1,
      }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      style={depth ? { 
        perspective: 1000,
        transformStyle: 'preserve-3d',
      } : {}}
    >
      {children}
    </motion.div>
  );
};
