import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo } from 'react';

interface Spore {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

interface UpsideDownSporesProps {
    intensity?: number; // 0-1, controls density and visibility
}

export const UpsideDownSpores = ({ intensity = 0.5 }: UpsideDownSporesProps) => {
    const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
    const [scrollY, setScrollY] = useState(0);

    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 40, stiffness: 60 };
    const smoothMouseX = useSpring(mouseX, springConfig);
    const smoothMouseY = useSpring(mouseY, springConfig);

    // Generate spores based on intensity
    const spores = useMemo(() => {
        const count = Math.floor(30 + intensity * 40); // 30-70 spores
        return Array.from({ length: count }, (_, i): Spore => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 8,
            opacity: Math.random() * 0.4 + 0.2,
        }));
    }, [intensity]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        mouseX.set(x);
        mouseY.set(y);
        setMousePosition({ x, y });
    }, [mouseX, mouseY]);

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleMouseMove, handleScroll]);

    // Parallax offset based on scroll
    const scrollOffset = scrollY * 0.05;

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-[2]"
            style={{ opacity: 0.3 + intensity * 0.5 }}
        >
            {spores.map((spore) => {
                // Calculate mouse influence (attraction towards cursor)
                const distX = (mousePosition.x * 100 - spore.x) * 0.02;
                const distY = (mousePosition.y * 100 - spore.y) * 0.02;

                return (
                    <motion.div
                        key={spore.id}
                        className="absolute"
                        style={{
                            left: `${spore.x}%`,
                            top: `${spore.y}%`,
                        }}
                        animate={{
                            y: [-scrollOffset, -40 - scrollOffset - Math.random() * 30, -scrollOffset],
                            x: [distX, distX + (Math.random() - 0.5) * 15, distX],
                            opacity: [
                                spore.opacity * intensity,
                                spore.opacity * 1.5 * intensity,
                                spore.opacity * intensity,
                            ],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: spore.duration,
                            repeat: Infinity,
                            delay: spore.delay,
                            ease: 'easeInOut',
                        }}
                    >
                        <div
                            className="rounded-full"
                            style={{
                                width: spore.size,
                                height: spore.size,
                                background: `radial-gradient(circle, hsl(0 70% 50% / ${0.8 * intensity}) 0%, hsl(0 80% 40% / ${0.4 * intensity}) 50%, transparent 100%)`,
                                boxShadow: `0 0 ${spore.size * 3}px hsl(0 70% 45% / ${0.5 * intensity}), 0 0 ${spore.size * 6}px hsl(0 80% 35% / ${0.3 * intensity})`,
                            }}
                        />
                    </motion.div>
                );
            })}

            {/* Larger floating ember particles */}
            {[...Array(Math.floor(8 * intensity))].map((_, i) => (
                <motion.div
                    key={`ember-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${10 + i * 12}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        background: 'hsl(0 80% 50%)',
                        boxShadow: '0 0 8px hsl(0 70% 50%), 0 0 16px hsl(0 80% 40%)',
                    }}
                    animate={{
                        y: [-scrollOffset * 0.5, -60 - scrollOffset * 0.5, -scrollOffset * 0.5],
                        x: [(mousePosition.x - 0.5) * 20, (mousePosition.x - 0.5) * 25, (mousePosition.x - 0.5) * 20],
                        opacity: [0.3 * intensity, 0.7 * intensity, 0.3 * intensity],
                        scale: [0.8, 1.5, 0.8],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: i * 1.5,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
};
