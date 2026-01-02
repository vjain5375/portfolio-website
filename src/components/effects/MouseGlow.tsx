import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect } from 'react';

export const MouseGlow = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };
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
      {/* Primary crimson glow */}
      <motion.div
        className="absolute w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-15"
        style={{
          background: 'radial-gradient(circle, hsl(0 70% 45% / 0.35) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Secondary blood red glow */}
      <motion.div
        className="absolute w-[180px] h-[180px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-12"
        style={{
          background: 'radial-gradient(circle, hsl(0 80% 35% / 0.4) 0%, transparent 60%)',
        }}
        animate={{
          scale: [1.1, 0.9, 1.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Core dot - subtle red */}
      <motion.div
        className="absolute w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/50"
        style={{
          boxShadow: '0 0 8px hsl(0 70% 45%), 0 0 16px hsl(0 70% 45% / 0.4)',
        }}
      />
    </motion.div>
  );
};
