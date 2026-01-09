import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface ShadowVinesProps {
    intensity?: number; // 0-1
}

export const ShadowVines = ({ intensity = 0.5 }: ShadowVinesProps) => {
    const { scrollYProgress } = useScroll();
    const [mouseNear, setMouseNear] = useState<'left' | 'right' | null>(null);
    const lastUpdate = useRef(0);

    // Vines only visible in Acts 2-3 (middle sections)
    const vinesOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.3, 0.7, 0.85, 1],
        [0, 0.1, 0.4, 0.4, 0.1, 0]
    );

    // Detect if mouse is near edges (vines "retreat" when approached) - throttled
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const now = Date.now();
            if (now - lastUpdate.current < 50) return; // 50ms throttle for edge detection
            lastUpdate.current = now;

            const x = e.clientX / window.innerWidth;
            if (x < 0.15) {
                setMouseNear('left');
            } else if (x > 0.85) {
                setMouseNear('right');
            } else {
                setMouseNear(null);
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
            style={{ opacity: intensity }}
        >
            {/* Left side vines - reduced count */}
            <motion.div
                className="absolute top-0 left-0 w-[120px] h-full"
                style={{ opacity: vinesOpacity, willChange: 'opacity, transform' }}
                animate={{
                    x: mouseNear === 'left' ? -60 : 0,
                    opacity: mouseNear === 'left' ? 0.1 : 1,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`left-vine-${i}`}
                        className="absolute left-0"
                        style={{
                            top: `${15 + i * 25}%`,
                            width: '80px',
                            height: '2px',
                            background: `linear-gradient(90deg, hsl(0 50% 20% / 0.6) 0%, hsl(0 40% 15% / 0.3) 60%, transparent 100%)`,
                            transformOrigin: 'left center',
                            willChange: 'transform, opacity',
                        }}
                        animate={{
                            scaleX: [0.3, 0.8, 0.3],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 8 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 1.5,
                        }}
                    />
                ))}

                {/* Thicker main vine */}
                <motion.div
                    className="absolute left-0 top-1/4 bottom-1/4 w-[3px]"
                    style={{
                        background: `linear-gradient(180deg, 
              transparent 0%, 
              hsl(0 50% 20% / 0.4) 20%, 
              hsl(0 60% 18% / 0.5) 50%, 
              hsl(0 50% 20% / 0.4) 80%, 
              transparent 100%)`,
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                        scaleY: [0.9, 1, 0.9],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            </motion.div>

            {/* Right side vines - reduced count */}
            <motion.div
                className="absolute top-0 right-0 w-[120px] h-full"
                style={{ opacity: vinesOpacity, willChange: 'opacity, transform' }}
                animate={{
                    x: mouseNear === 'right' ? 60 : 0,
                    opacity: mouseNear === 'right' ? 0.1 : 1,
                }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={`right-vine-${i}`}
                        className="absolute right-0"
                        style={{
                            top: `${20 + i * 25}%`,
                            width: '70px',
                            height: '2px',
                            background: `linear-gradient(270deg, hsl(0 50% 20% / 0.6) 0%, hsl(0 40% 15% / 0.3) 60%, transparent 100%)`,
                            transformOrigin: 'right center',
                            willChange: 'transform, opacity',
                        }}
                        animate={{
                            scaleX: [0.4, 0.9, 0.4],
                            opacity: [0.25, 0.55, 0.25],
                        }}
                        transition={{
                            duration: 9 + i * 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: i * 1.2,
                        }}
                    />
                ))}

                {/* Thicker main vine */}
                <motion.div
                    className="absolute right-0 top-1/3 bottom-1/4 w-[3px]"
                    style={{
                        background: `linear-gradient(180deg, 
              transparent 0%, 
              hsl(0 50% 20% / 0.35) 25%, 
              hsl(0 60% 18% / 0.45) 50%, 
              hsl(0 50% 20% / 0.35) 75%, 
              transparent 100%)`,
                        filter: 'blur(1px)',
                    }}
                    animate={{
                        opacity: [0.25, 0.45, 0.25],
                        scaleY: [0.95, 1, 0.95],
                    }}
                    transition={{
                        duration: 9,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 2,
                    }}
                />
            </motion.div>
        </div>
    );
};
