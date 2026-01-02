import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

export const ParallaxBackground = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const springConfig = { damping: 50, stiffness: 100 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const xPos = (clientX / innerWidth - 0.5) * 100;
      const yPos = (clientY / innerHeight - 0.5) * 100;
      mouseX.set(xPos);
      mouseY.set(yPos);
      setMousePosition({ x: clientX, y: clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep black base */}
      <div className="absolute inset-0 bg-black" />
      
      {/* Fog layers */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black"
      />
      
      {/* Red glow orbs with parallax */}
      <motion.div
        style={{ y: y1, x: useTransform(x, (v) => v * 0.1) }}
        className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-red-500/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2, x: useTransform(x, (v) => v * -0.15) }}
        className="absolute top-1/3 -left-40 w-80 h-80 rounded-full bg-red-600/8 blur-3xl"
      />
      <motion.div
        style={{ y: y3, x: useTransform(x, (v) => v * 0.2) }}
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-red-500/5 blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], ['0%', '40%']), x: useTransform(x, (v) => v * 0.12) }}
        className="absolute top-1/2 left-1/3 w-72 h-72 rounded-full bg-red-600/6 blur-3xl"
      />

      {/* Floating dust particles - mouse reactive */}
      {[...Array(30)].map((_, i) => {
        const baseX = Math.random() * 100;
        const baseY = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = 4 + Math.random() * 3;
        const delay = Math.random() * 2;
        
        const particleX = useTransform(
          x,
          (v) => baseX + v * (0.5 + Math.random() * 0.5)
        );
        const particleY = useTransform(
          y,
          (v) => baseY + v * (0.5 + Math.random() * 0.5)
        );

        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-500/20"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${baseX}%`,
              top: `${baseY}%`,
              x: particleX,
              y: particleY,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -30 - Math.random() * 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: 'easeInOut',
            }}
          />
        );
      })}

      {/* Red ambient particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`ambient-${i}`}
          className="absolute w-1 h-1 rounded-full bg-red-500/30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(0.5px)',
          }}
          animate={{
            y: [0, -40, 0],
            opacity: [0.2, 0.6, 0.2],
            x: [0, Math.random() * 20 - 10, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Subtle red rim lighting at edges */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-red-500/5 pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500/20 to-transparent" />
    </div>
  );
};
