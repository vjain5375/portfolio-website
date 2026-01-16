import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-lg bg-muted animate-pulse" />
        );
    }

    const isDark = theme === 'dark';

    return (
        <motion.button
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="relative w-10 h-10 rounded-lg bg-secondary border border-border flex items-center justify-center overflow-hidden group hover:border-primary/50 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
        >
            {/* Sun icon */}
            <motion.div
                initial={false}
                animate={{
                    y: isDark ? -30 : 0,
                    opacity: isDark ? 0 : 1,
                    rotate: isDark ? -90 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Sun className="w-5 h-5 text-amber-500" />
            </motion.div>

            {/* Moon icon */}
            <motion.div
                initial={false}
                animate={{
                    y: isDark ? 0 : 30,
                    opacity: isDark ? 1 : 0,
                    rotate: isDark ? 0 : 90,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="absolute"
            >
                <Moon className="w-5 h-5 text-primary" />
            </motion.div>

            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
    );
};
