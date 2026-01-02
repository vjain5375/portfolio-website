import { motion } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import { useTilt } from '@/hooks/useTilt';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'purple' | 'gradient';
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const TiltCard = ({ 
  children, 
  className = '', 
  glowColor = 'cyan',
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
    cyan: 'group-hover:shadow-[0_0_40px_rgba(0,255,255,0.15)]',
    purple: 'group-hover:shadow-[0_0_40px_rgba(147,51,234,0.15)]',
    gradient: 'group-hover:shadow-[0_0_40px_rgba(0,255,255,0.1),0_0_60px_rgba(147,51,234,0.1)]',
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
            background: glowColor === 'cyan' 
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(180 100% 50% / 0.1) 0%, transparent 50%)'
              : glowColor === 'purple'
              ? 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(270 100% 65% / 0.1) 0%, transparent 50%)'
              : 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), hsl(180 100% 50% / 0.08) 0%, hsl(270 100% 65% / 0.08) 25%, transparent 50%)',
          }}
        />
      </div>
      
      {children}
    </motion.div>
  );
};
