import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed pointer-events-none z-[2] mix-blend-screen"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
    >
      {/* Primary glow */}
      <motion.div
        className="absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, hsl(180 100% 50% / 0.4) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Secondary glow */}
      <motion.div
        className="absolute w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(270 100% 65% / 0.5) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core dot */}
      <motion.div
        className="absolute w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/60"
        style={{
          boxShadow: '0 0 10px hsl(180 100% 50%), 0 0 20px hsl(180 100% 50% / 0.5)',
        }}
      />
    </motion.div>
  );
};
