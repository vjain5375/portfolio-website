import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'red' | 'crimson' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const TiltCard = ({
  children,
  className = '',
  glowColor = 'red',
  intensity = 'medium'
}: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const tiltConfig = {
    subtle: { maxTilt: 5, scale: 1.01 },
    medium: { maxTilt: 10, scale: 1.02 },
    strong: { maxTilt: 15, scale: 1.03 },
  };

  const { style, onMouseMove, onMouseLeave } = useTilt(ref, tiltConfig[intensity]);

  const glowStyles = {
    red: 'group-hover:shadow-[0_0_40px_rgba(185,28,28,0.15)]',
    crimson: 'group-hover:shadow-[0_0_40px_rgba(127,29,29,0.15)]',
    gradient: 'group-hover:shadow-[0_0_40px_rgba(185,28,28,0.1),0_0_60px_rgba(127,29,29,0.1)]',
  };

  return (
    <motion.div
      ref={ref}
      style={style}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`group transition-shadow duration-500 ${glowStyles[glowColor]} ${className}`}
    >
      {/* Inner glow effect on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: glowColor === 'red'
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(0 70% 45% / 0.1) 0%, transparent 50%)'
              : glowColor === 'crimson'
                ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(0 80% 35% / 0.1) 0%, transparent 50%)'
                : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(0 70% 45% / 0.08) 0%, hsl(0 80% 35% / 0.08) 25%, transparent 50%)',
          }}
        />
      </div>

      {children}
    </motion.div>
  );
};
