import { motion } from 'framer-motion';
import { useEffect, useState, useCallback, useMemo, useRef } from 'react';

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
    const lastMouseUpdate = useRef(0);

    // Generate spores based on intensity - reduced count for performance
    const spores = useMemo(() => {
        const count = Math.floor(15 + intensity * 10); // Reduced from 30-70 to 15-25
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
        // Throttle to 60fps max
        const now = Date.now();
        if (now - lastMouseUpdate.current < 16) return;
        lastMouseUpdate.current = now;

        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        setMousePosition({ x, y });
    }, []);

    useEffect(() => {
        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [handleMouseMove]);

    return (
        <div
            className="fixed inset-0 pointer-events-none overflow-hidden z-[2]"
            style={{ opacity: 0.3 + intensity * 0.5, willChange: 'opacity' }}
        >
            {spores.map((spore) => {
                // Calculate mouse influence (attraction towards cursor)
                const distX = (mousePosition.x * 100 - spore.x) * 0.02;

                return (
                    <motion.div
                        key={spore.id}
                        className="absolute"
                        style={{
                            left: `${spore.x}%`,
                            top: `${spore.y}%`,
                            willChange: 'transform, opacity',
                        }}
                        animate={{
                            y: [0, -40 - Math.random() * 30, 0],
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

            {/* Larger floating ember particles - reduced count */}
            {[...Array(Math.floor(4 * intensity))].map((_, i) => (
                <motion.div
                    key={`ember-${i}`}
                    className="absolute w-1 h-1 rounded-full"
                    style={{
                        left: `${10 + i * 20}%`,
                        top: `${20 + (i % 3) * 25}%`,
                        background: 'hsl(0 80% 50%)',
                        boxShadow: '0 0 8px hsl(0 70% 50%)',
                        willChange: 'transform, opacity',
                    }}
                    animate={{
                        y: [0, -60, 0],
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
