import { useScroll, useTransform, MotionValue } from 'framer-motion';
import { RefObject } from 'react';

interface ParallaxConfig {
  offset?: [string, string];
  yRange?: [number, number];
  scaleRange?: [number, number];
  opacityRange?: [number, number];
  rotateRange?: [number, number];
}

interface ParallaxReturn {
  y: MotionValue<number>;
  scale: MotionValue<number>;
  opacity: MotionValue<number>;
  rotateX: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
}

export const useScrollParallax = (
  ref: RefObject<HTMLElement>,
  config: ParallaxConfig = {}
): ParallaxReturn => {
  const {
    offset = ['start end', 'end start'],
    yRange = [100, -100],
    scaleRange = [0.8, 1],
    opacityRange = [0, 1],
    rotateRange = [10, 0],
  } = config;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 0.5, 1], [yRange[0], 0, yRange[1]]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [opacityRange[0], 1, 1, opacityRange[0]]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [rotateRange[0], 0, -rotateRange[0]]);

  return { y, scale, opacity, rotateX, scrollYProgress };
};
