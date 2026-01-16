import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from 'next-themes';

export const CinematicBackground = () => {
    const { shouldReduceMotion } = useReducedMotion();
    const { theme } = useTheme();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth mouse movement for parallax
    const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        if (shouldReduceMotion) return;

        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const x = (clientX / innerWidth) * 2 - 1;
            const y = (clientY / innerHeight) * 2 - 1;

            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [shouldReduceMotion, mouseX, mouseY]);

    // Parallax transforms
    const x = useTransform(smoothX, [-1, 1], ['-2%', '2%']);
    const y = useTransform(smoothY, [-1, 1], ['-2%', '2%']);

    const fogX = useTransform(smoothX, [-1, 1], ['5%', '-5%']);
    const fogY = useTransform(smoothY, [-1, 1], ['5%', '-5%']);

    if (shouldReduceMotion) {
        return (
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-background transition-colors duration-700" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('/noise.png')] mix-blend-overlay" />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* 1. Base Gradient Layer */}
            <div className="absolute inset-0 bg-background transition-colors duration-1000" />

            {/* 2. World-Specific Atmospheric Layers */}
            <motion.div
                className="absolute inset-[-10%]"
                style={{ x: fogX, y: fogY }}
                animate={{ opacity: theme === 'dark' ? 1 : 0.6 }}
                transition={{ duration: 1 }}
            >
                {/* Upside Down Fog (Dark Mode) */}
                <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-1000">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent blur-3xl mix-blend-screen" />
                    <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent blur-3xl mix-blend-screen" />
                </div>

                {/* Normal World Glow (Light Mode) */}
                <div className="absolute inset-0 opacity-100 dark:opacity-0 transition-opacity duration-1000">
                    <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-accent/5 rounded-full blur-[100px]" />
                </div>
            </motion.div>

            {/* 3. Organic Textures (Upside Down Exclusive) */}
            <div className="absolute inset-0 opacity-0 dark:opacity-40 transition-opacity duration-1000 mix-blend-soft-light pointer-events-none">
                <svg className='w-full h-full'>
                    <filter id='veinFilter'>
                        <feTurbulence type='fractalNoise' baseFrequency='0.015' numOctaves='2' result='noise' />
                        <feColorMatrix type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 19 -11" result="coloredNoise" />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#veinFilter)' opacity="0.3" />
                </svg>
            </div>

            {/* 4. Animated Grain Overlay (Common) */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] mix-blend-overlay z-10 pointer-events-none transition-opacity duration-1000">
                <svg className='w-full h-full'>
                    <filter id='noiseFilter'>
                        <feTurbulence
                            type='fractalNoise'
                            baseFrequency='0.6'
                            stitchTiles='stitch'
                            numOctaves='3'
                        />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width='100%' height='100%' filter='url(#noiseFilter)' />
                </svg>
            </div>

            {/* 5. Parallax Particles (Ash vs Dust) */}
            <motion.div
                className="absolute inset-0 z-10"
                style={{ x, y }}
            >
                {/* Generative particles could go here, for now using simple glows to simulate ambient density */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow mix-blend-screen" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-pulse-slower mix-blend-screen" />
            </motion.div>

            {/* 6. Vignette - Heavier in Dark Mode */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.6)_100%)] z-20 transition-all duration-1000" />
        </div>
    );
};
