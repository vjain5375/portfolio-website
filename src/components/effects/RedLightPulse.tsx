import { motion, useScroll, useTransform } from 'framer-motion';

export const RedLightPulse = () => {
    const { scrollYProgress } = useScroll();

    // Create pulse effect based on scroll
    const pulseOpacity = useTransform(
        scrollYProgress,
        [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        [0, 0.08, 0, 0.06, 0, 0.1, 0, 0.05, 0, 0.08, 0]
    );

    return (
        <>
            {/* Scroll-synced red pulse overlay */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[3]"
                style={{
                    opacity: pulseOpacity,
                    background: 'radial-gradient(ellipse at center, hsl(0 70% 40% / 0.3) 0%, transparent 70%)',
                }}
            />

            {/* Ambient breathing glow - independent of scroll */}
            <motion.div
                className="fixed inset-0 pointer-events-none z-[2]"
                animate={{
                    opacity: [0, 0.03, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                style={{
                    background: 'radial-gradient(ellipse 100% 60% at 50% 100%, hsl(0 60% 35% / 0.4) 0%, transparent 60%)',
                }}
            />
        </>
    );
};
