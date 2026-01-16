import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export const CinematicBackground = () => {
    const { shouldReduceMotion } = useReducedMotion();
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
            // Normalize to -1 to 1
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

            {/* 2. Organic Mist/Fog Layer - Moves opposite to mouse */}
            <motion.div
                className="absolute inset-[-10%] opacity-30 dark:opacity-20"
                style={{ x: fogX, y: fogY }}
            >
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent blur-3xl" />
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent blur-3xl" />
            </motion.div>

            {/* 3. Animated Grain Overlay */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay z-10 pointer-events-none">
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

            {/* 4. Subtle Parallax Particles */}
            <motion.div
                className="absolute inset-0"
                style={{ x, y }}
            >
                {/* Floating orbs/glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-[80px] animate-pulse-slower" />
            </motion.div>

            {/* 5. Vignette - soft focus */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.3)_100%)] z-20" />
        </div>
    );
};
