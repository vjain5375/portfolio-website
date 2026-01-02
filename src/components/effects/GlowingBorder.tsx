import { motion } from 'framer-motion';

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  borderColor?: 'cyan' | 'purple' | 'gradient' | 'red';
  animated?: boolean;
  intensity?: 'subtle' | 'medium' | 'strong';
}

export const GlowingBorder = ({
  children,
  className = '',
  borderColor = 'cyan',
  animated = true,
  intensity = 'medium',
}: GlowingBorderProps) => {
  const intensityMap = {
    subtle: { blur: 10, opacity: 0.3 },
    medium: { blur: 20, opacity: 0.5 },
    strong: { blur: 30, opacity: 0.7 },
  };

  const colorMap = {
    cyan: 'hsl(180, 100%, 50%)',
    purple: 'hsl(270, 100%, 65%)',
    red: 'hsl(0, 80%, 55%)',
    gradient: 'linear-gradient(135deg, hsl(180, 100%, 50%), hsl(270, 100%, 65%))',
  };

  const { blur, opacity } = intensityMap[intensity];

  return (
    <div className={`relative ${className}`}>
      {/* Glowing border effect */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: borderColor === 'gradient' 
            ? colorMap.gradient 
            : colorMap[borderColor],
          filter: `blur(${blur}px)`,
          opacity: opacity,
        }}
        animate={animated ? {
          opacity: [opacity * 0.5, opacity, opacity * 0.5],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      
      {/* Border mask */}
      <div 
        className="absolute -inset-px rounded-2xl pointer-events-none"
        style={{
          background: borderColor === 'gradient' 
            ? colorMap.gradient 
            : colorMap[borderColor],
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
          padding: '1px',
          opacity: 0.6,
        }}
      />
      
      {children}
    </div>
  );
};
