import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface RedFogLayersProps {
    intensity?: number; // 0-1
}

export const RedFogLayers = ({ intensity = 0.5 }: RedFogLayersProps) => {
    const { scrollYProgress } = useScroll();

    const smoothScroll = useSpring(scrollYProgress, {
        damping: 30,
        stiffness: 80,
    });

    // Parallax offsets for different layers
    const layer1X = useTransform(smoothScroll, [0, 1], ['0%', '-15%']);
    const layer2X = useTransform(smoothScroll, [0, 1], ['0%', '20%']);
    const layer3Y = useTransform(smoothScroll, [0, 1], ['0%', '-10%']);

    // Opacity increases in middle sections (Acts 2-3)
    const fogOpacity = useTransform(
        scrollYProgress,
        [0, 0.2, 0.4, 0.7, 0.9, 1],
        [0.1, 0.3, 0.6, 0.6, 0.3, 0.2]
    );

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
            style={{ opacity: intensity }}
        >
            {/* Top fog layer - drifts left */}
            <motion.div
                className="absolute -top-20 -left-20 -right-20 h-[50vh]"
                style={{
                    x: layer1X,
                    opacity: fogOpacity,
                    background: `linear-gradient(180deg, 
            hsl(0 30% 8% / 0.6) 0%, 
            hsl(0 50% 12% / 0.3) 40%, 
            transparent 100%)`,
                    filter: 'blur(40px)',
                }}
            />

            {/* Middle fog layer - drifts right */}
            <motion.div
                className="absolute top-1/3 -left-40 -right-40 h-[40vh]"
                style={{
                    x: layer2X,
                    opacity: useTransform(fogOpacity, v => v * 0.7),
                    background: `radial-gradient(ellipse 100% 100% at 50% 50%, 
            hsl(0 60% 20% / 0.25) 0%, 
            hsl(0 40% 15% / 0.15) 40%, 
            transparent 70%)`,
                    filter: 'blur(30px)',
                    willChange: 'transform, opacity',
                }}
                animate={{
                    scaleX: [1, 1.1, 1],
                    scaleY: [1, 1.05, 1],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Bottom fog - Upside Down portal feel */}
            <motion.div
                className="absolute -bottom-20 -left-20 -right-20 h-[60vh]"
                style={{
                    y: layer3Y,
                    opacity: useTransform(fogOpacity, v => v * 1.2),
                    background: `linear-gradient(0deg, 
            hsl(0 70% 15% / 0.5) 0%, 
            hsl(0 60% 20% / 0.3) 30%, 
            hsl(0 40% 15% / 0.15) 60%, 
            transparent 100%)`,
                    filter: 'blur(50px)',
                }}
                animate={{
                    opacity: [0.4, 0.6, 0.4],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            {/* Breathing ambient glow orbs */}
            <motion.div
                className="absolute top-1/4 left-1/4 w-[400px] h-[400px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, hsl(0 70% 30% / 0.15) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                    willChange: 'transform, opacity',
                }}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3 * intensity, 0.5 * intensity, 0.3 * intensity],
                    x: [0, 50, 0],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />

            <motion.div
                className="absolute bottom-1/3 right-1/4 w-[350px] h-[350px] rounded-full"
                style={{
                    background: 'radial-gradient(circle, hsl(0 80% 25% / 0.15) 0%, transparent 70%)',
                    filter: 'blur(35px)',
                    willChange: 'transform, opacity',
                }}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.25 * intensity, 0.45 * intensity, 0.25 * intensity],
                    x: [0, -40, 0],
                    y: [0, 20, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 3,
                }}
            />
        </div>
    );
};
