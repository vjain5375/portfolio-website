import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useCallback, RefObject } from 'react';

interface TiltConfig {
  maxTilt?: number;
  scale?: number;
  perspective?: number;
}

export const useTilt = (ref: RefObject<HTMLElement>, config: TiltConfig = {}) => {
  const { maxTilt = 15, scale = 1.02, perspective = 1000 } = config;

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  }, [ref, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return {
    style: {
      rotateX,
      rotateY,
      scale,
      transformStyle: 'preserve-3d' as const,
      perspective,
    },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
  };
};
