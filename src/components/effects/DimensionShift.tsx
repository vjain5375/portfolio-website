import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

export const DimensionShift = () => {
    const { scrollYProgress } = useScroll();
    const [ripplePosition, setRipplePosition] = useState({ x: 50, y: 50 });

    // Smooth spring for scroll progress
    const smoothProgress = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 100,
    });

    // Subtle distortion that pulses at section boundaries
    const distortionIntensity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.25, 0.45, 0.5, 0.7, 0.75, 0.95, 1],
        [0, 0, 0.3, 0, 0.25, 0, 0.2, 0, 0]
    );

    // Hue shift for dimension feel
    const hueRotate = useTransform(smoothProgress, [0, 1], [0, 15]);

    // Listen for scroll to create ripple at section transitions
    useEffect(() => {
        let lastScrollY = 0;
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const screenHeight = window.innerHeight;

            // Detect section transitions (every ~100vh)
            const currentSection = Math.floor(scrollY / screenHeight);
            const lastSection = Math.floor(lastScrollY / screenHeight);

            if (currentSection !== lastSection) {
                // Trigger ripple from center
                setRipplePosition({ x: 50, y: 50 });
            }

            lastScrollY = scrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Dimension shift overlay - subtle color distortion */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[4] mix-blend-overlay"
                style={{
                    filter: useTransform(hueRotate, (v) => `hue-rotate(${v}deg)`),
                    background: 'linear-gradient(180deg, transparent 0%, hsl(0 30% 10% / 0.05) 50%, transparent 100%)',
                }}
            />

            {/* Ripple distortion effect on section transitions */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[5]"
                style={{
                    opacity: distortionIntensity,
                    background: `radial-gradient(ellipse at ${ripplePosition.x}% ${ripplePosition.y}%, hsl(0 50% 40% / 0.1) 0%, transparent 50%)`,
                }}
            />

            {/* Scan distortion lines */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[3] overflow-hidden"
                style={{ opacity: useTransform(distortionIntensity, (v) => v * 0.3) }}
            >
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute left-0 right-0 h-px"
                        style={{
                            top: `${20 + i * 15}%`,
                            background: 'linear-gradient(90deg, transparent 0%, hsl(0 60% 40% / 0.3) 50%, transparent 100%)',
                            filter: 'blur(1px)',
                        }}
                        animate={{
                            scaleX: [0.5, 1, 0.5],
                            opacity: [0, 0.5, 0],
                        }}
                        transition={{
                            duration: 0.5,
                            delay: i * 0.1,
                            repeat: Infinity,
                            repeatDelay: 3,
                        }}
                    />
                ))}
            </motion.div>

            {/* Organic vine-like tendrils in corners (very subtle) */}
            <motion.div
                className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[2] opacity-[0.03]"
                style={{
                    background: `
            radial-gradient(ellipse at 0% 0%, hsl(0 40% 20%) 0%, transparent 60%),
            repeating-conic-gradient(from 0deg at 50% 50%, transparent 0deg, hsl(0 30% 15% / 0.5) 2deg, transparent 4deg)
          `,
                    filter: 'blur(20px)',
                }}
                animate={{
                    rotate: [0, 5, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
                className="fixed bottom-0 right-0 w-[400px] h-[400px] pointer-events-none z-[2] opacity-[0.03]"
                style={{
                    background: `
            radial-gradient(ellipse at 100% 100%, hsl(0 40% 20%) 0%, transparent 60%),
            repeating-conic-gradient(from 180deg at 50% 50%, transparent 0deg, hsl(0 30% 15% / 0.5) 2deg, transparent 4deg)
          `,
                    filter: 'blur(20px)',
                }}
                animate={{
                    rotate: [0, -5, 0],
                    scale: [1, 1.05, 1],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
            />
        </>
    );
};
