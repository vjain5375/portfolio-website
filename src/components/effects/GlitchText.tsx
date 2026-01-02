import { motion } from 'framer-motion';
import { useState } from 'react';

interface GlitchTextProps {
  children: string;
  className?: string;
  glitchColor1?: string;
  glitchColor2?: string;
  enableFlicker?: boolean;
}

export const GlitchText = ({
  children,
  className = '',
  glitchColor1 = 'hsl(0, 70%, 45%)',
  glitchColor2 = 'hsl(0, 80%, 35%)',
  enableFlicker = false,
}: GlitchTextProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className={`relative inline-block ${className} ${enableFlicker ? 'flicker' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Glitch layers - only visible on hover */}
      {isHovered && (
        <>
          {/* Crimson glitch layer */}
          <motion.span
            className="absolute inset-0 z-0"
            style={{ color: glitchColor1 }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [-3, 3, -2, 4, 0, -3, 2, 0],
              y: [0, 2, -2, 1, -1, 2, 0, 0],
              opacity: [0, 0.9, 0.7, 1, 0.8, 0.9, 0.6, 0],
            }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>

          {/* Blood red glitch layer */}
          <motion.span
            className="absolute inset-0 z-0"
            style={{ color: glitchColor2 }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [3, -3, 2, -4, 0, 3, -2, 0],
              y: [0, -2, 2, -1, 1, -2, 0, 0],
              opacity: [0, 0.7, 0.9, 0.6, 1, 0.7, 0.8, 0],
            }}
            transition={{
              duration: 0.35,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>

          {/* Scanline flash */}
          <motion.span
            className="absolute inset-0 z-20 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <motion.span
              className="absolute left-0 right-0 h-[2px] bg-white/15"
              initial={{ top: '-10%' }}
              animate={{ top: ['0%', '100%'] }}
              transition={{
                duration: 0.12,
                repeat: Infinity,
                repeatDelay: 0.25,
              }}
            />
          </motion.span>

          {/* Upper clip glitch effect */}
          <motion.span
            className="absolute inset-0 z-5"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 45%, 0 45%)',
              color: glitchColor1,
            }}
            animate={{
              x: [-4, 4, -3, 5, 0],
              opacity: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 0.25,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>

          {/* Lower clip glitch effect */}
          <motion.span
            className="absolute inset-0 z-5"
            style={{
              clipPath: 'polygon(0 55%, 100% 55%, 100% 100%, 0 100%)',
              color: glitchColor2,
            }}
            animate={{
              x: [4, -4, 3, -5, 0],
              opacity: [0, 1, 0.8, 1, 0],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              repeatType: 'mirror',
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>

          {/* Chromatic aberration flicker */}
          <motion.span
            className="absolute inset-0 z-3"
            style={{
              color: 'hsl(195, 50%, 30%)',
              filter: 'blur(0.5px)',
            }}
            animate={{
              x: [1, -1, 1],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
        </>
      )}
    </motion.span>
  );
};
