import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const WorldTransitionOverlay = () => {
    const { theme } = useTheme();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const { shouldReduceMotion } = useReducedMotion();
    const [prevTheme, setPrevTheme] = useState(theme);

    useEffect(() => {
        // Skip on mount
        if (!prevTheme) {
            setPrevTheme(theme);
            return;
        }

        // Trigger on change
        if (theme !== prevTheme) {
            setIsTransitioning(true);
            setPrevTheme(theme);

            // Reset after animation
            const timer = setTimeout(() => {
                setIsTransitioning(false);
            }, 1500); // Total duration of the effect

            return () => clearTimeout(timer);
        }
    }, [theme, prevTheme]);

    if (shouldReduceMotion || !isTransitioning) return null;

    return (
        <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
            {/* 1. The Gate Flash (Red Burst) */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 0.4, 0, 0.2, 0],
                    backgroundColor: theme === 'dark' ? '#ff0000' : '#ffffff'
                }}
                transition={{ duration: 0.4, times: [0, 0.2, 0.5, 0.8, 1] }}
                className="absolute inset-0 mix-blend-overlay"
            />

            {/* 2. Reality Glitch (Chromatic Aberration Simulation) */}
            <motion.div
                className="absolute inset-0 bg-transparent"
                animate={{
                    x: [-5, 5, -2, 2, 0],
                    filter: [
                        'hue-rotate(0deg)',
                        'hue-rotate(90deg) contrast(2)',
                        'hue-rotate(-45deg) contrast(1.5)',
                        'hue-rotate(0deg)'
                    ],
                }}
                transition={{ duration: 0.3 }}
                style={{ mixBlendMode: 'exclusion' }}
            />

            {/* 3. Deep Pulse (Vignette) */}
            <motion.div
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: [0, 1, 0], scale: [1.1, 1, 1.1] }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000000_150%)]"
            />

            {/* 4. The Crack (simulated via SVG line) */}
            <svg className="absolute inset-0 w-full h-full opacity-50">
                <motion.path
                    d="M50,0 L50,100" // Simple vertical split line for now
                    stroke="currentColor"
                    strokeWidth="2"
                    className={theme === 'dark' ? 'text-red-600' : 'text-zinc-900'}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    style={{ vectorEffect: 'non-scaling-stroke' }}
                />
            </svg>
        </div>
    );
};
