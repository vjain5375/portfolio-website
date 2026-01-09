import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useReducedMotion() {
    const [shouldReduceMotion, setShouldReduceMotion] = useState(true); // Default to reduced for SSR safety
    const [isMobile, setIsMobile] = useState(true); // Default to mobile for SSR safety

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check if mobile
        const mobile = window.innerWidth < MOBILE_BREAKPOINT;

        // Check for low-power indicators (touch device without mouse often = mobile)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        setIsMobile(mobile);
        setShouldReduceMotion(prefersReducedMotion || mobile || isTouchDevice);

        const handleResize = () => {
            const nowMobile = window.innerWidth < MOBILE_BREAKPOINT;
            setIsMobile(nowMobile);
            setShouldReduceMotion(prefersReducedMotion || nowMobile);
        };

        window.addEventListener('resize', handleResize, { passive: true });
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return { shouldReduceMotion, isMobile };
}
