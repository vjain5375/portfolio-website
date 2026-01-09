import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useReducedMotion() {
    // Default to false (show effects) - will update on mount if needed
    const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Check if mobile by screen width only (not touch capability)
        const mobile = window.innerWidth < MOBILE_BREAKPOINT;

        setIsMobile(mobile);
        setShouldReduceMotion(prefersReducedMotion || mobile);

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
