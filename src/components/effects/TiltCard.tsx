import { motion, AnimatePresence } from 'framer-motion';
import { useRef, ReactNode, useState } from 'react';
import { useTilt } from '@/hooks/useTilt';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'red' | 'crimson' | 'maroon' | 'bloodRed' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'strong';
  onHoverChange?: (isHovered: boolean) => void;
  enableRipple?: boolean;
}

export const TiltCard = ({
  children,
  className = '',
  glowColor = 'red',
  intensity = 'medium',
  onHoverChange,
  enableRipple = true,
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const { shouldReduceMotion, isMobile } = useReducedMotion();

  const tiltConfig = {
    subtle: { maxTilt: 5, scale: 1.01 },
    medium: { maxTilt: 10, scale: 1.02 },
    strong: { maxTilt: 15, scale: 1.03 },
  };

  // Disable tilt on mobile for performance
  const effectiveTiltConfig = shouldReduceMotion
    ? { maxTilt: 0, scale: 1 }
    : tiltConfig[intensity];

  const { style, onMouseMove: tiltMouseMove, onMouseLeave: tiltMouseLeave } = useTilt(ref, effectiveTiltConfig);

  // Disable ripples on mobile for performance
  const shouldShowRipples = enableRipple && !shouldReduceMotion;

  const glowStyles = {
    red: 'group-hover:shadow-[0_0_40px_rgba(185,28,28,0.15)]',
    crimson: 'group-hover:shadow-[0_0_40px_rgba(127,29,29,0.15)]',
    maroon: 'group-hover:shadow-[0_0_40px_rgba(128,0,32,0.2)]',
    bloodRed: 'group-hover:shadow-[0_0_40px_rgba(102,0,0,0.2)]',
    gradient: 'group-hover:shadow-[0_0_40px_rgba(185,28,28,0.1),0_0_60px_rgba(127,29,29,0.1)]',
  };

  const glowGradients: Record<string, string> = {
    red: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(0 70% 45% / 0.15) 0%, transparent 50%)',
    crimson: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(0 80% 35% / 0.15) 0%, transparent 50%)',
    maroon: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(350 100% 25% / 0.2) 0%, transparent 50%)',
    bloodRed: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(0 100% 20% / 0.2) 0%, transparent 50%)',
    gradient: 'radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(0 70% 45% / 0.12) 0%, hsl(350 80% 30% / 0.08) 25%, transparent 50%)',
  };

  const rippleColor: Record<string, string> = {
    red: 'hsl(0 70% 45% / 0.3)',
    crimson: 'hsl(0 80% 35% / 0.3)',
    maroon: 'hsl(350 100% 25% / 0.3)',
    bloodRed: 'hsl(0 100% 20% / 0.3)',
    gradient: 'hsl(0 70% 45% / 0.25)',
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    tiltMouseMove(e);
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setIsHovered(true);
    onHoverChange?.(true);

    // Create ripple on enter (disabled on mobile for performance)
    if (shouldShowRipples && ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = Date.now();
      setRipples(prev => [...prev, { id, x, y }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 800);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    tiltMouseLeave();
    setMousePosition({ x: 50, y: 50 });
    onHoverChange?.(false);
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group transition-shadow duration-500 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Inner glow effect on hover - follows cursor */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden"
        style={{
          '--mouse-x': `${mousePosition.x}%`,
          '--mouse-y': `${mousePosition.y}%`,
        } as React.CSSProperties}
      >
        <div
          className="absolute inset-0"
          style={{
            background: glowGradients[glowColor],
          }}
        />
      </div>

      {/* Ripple effects */}
      <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
        <AnimatePresence>
          {ripples.map(ripple => (
            <motion.div
              key={ripple.id}
              className="absolute rounded-full"
              style={{
                left: `${ripple.x}%`,
                top: `${ripple.y}%`,
                background: `radial-gradient(circle, ${rippleColor[glowColor]} 0%, transparent 70%)`,
                transform: 'translate(-50%, -50%)',
              }}
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 300, height: 300, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Subtle distortion overlay on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden"
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(45deg, transparent 40%, hsl(0 70% 50% / 0.03) 50%, transparent 60%)',
            backgroundSize: '200% 200%',
          }}
          animate={isHovered ? {
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {children}
    </motion.div>
  );
};


