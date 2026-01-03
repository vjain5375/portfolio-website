import { motion, useScroll, useTransform } from 'framer-motion';

interface OrganicCracksProps {
    intensity?: number; // 0-1
}

export const OrganicCracks = ({ intensity = 0.5 }: OrganicCracksProps) => {
    const { scrollYProgress } = useScroll();

    // Only visible in Education/Experience sections (middle of page)
    const cracksOpacity = useTransform(
        scrollYProgress,
        [0, 0.3, 0.45, 0.75, 0.9, 1],
        [0, 0.02, 0.08, 0.08, 0.02, 0]
    );

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[0] overflow-hidden"
            style={{ opacity: intensity }}
        >
            {/* Left side organic cracks/veins */}
            <motion.div
                className="absolute top-0 left-0 w-[40%] h-full"
                style={{ opacity: cracksOpacity }}
            >
                <svg
                    viewBox="0 0 400 1000"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <defs>
                        <linearGradient id="veinGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="hsl(0 60% 25%)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="hsl(0 60% 25%)" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Organic vein paths */}
                    <motion.path
                        d="M0,200 Q50,250 30,350 T60,500 Q40,600 20,700 T50,850"
                        stroke="url(#veinGradient)"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow)"
                        animate={{
                            strokeDashoffset: [0, -20, 0],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                    <motion.path
                        d="M0,100 Q80,150 50,250 T100,400 Q60,500 40,650"
                        stroke="url(#veinGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        filter="url(#glow)"
                        animate={{
                            strokeDashoffset: [0, -15, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 10,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 2,
                        }}
                    />
                    <motion.path
                        d="M0,400 Q70,450 40,550 T80,700 Q50,800 30,900"
                        stroke="url(#veinGradient)"
                        strokeWidth="1"
                        fill="none"
                        filter="url(#glow)"
                        animate={{
                            opacity: [0.15, 0.4, 0.15],
                        }}
                        transition={{
                            duration: 12,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 1,
                        }}
                    />
                </svg>
            </motion.div>

            {/* Right side organic cracks/veins */}
            <motion.div
                className="absolute top-0 right-0 w-[40%] h-full"
                style={{
                    opacity: cracksOpacity,
                    transform: 'scaleX(-1)',
                }}
            >
                <svg
                    viewBox="0 0 400 1000"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                >
                    <motion.path
                        d="M0,300 Q60,350 40,450 T80,600 Q50,700 30,800"
                        stroke="url(#veinGradient)"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow)"
                        animate={{
                            strokeDashoffset: [0, -20, 0],
                            opacity: [0.25, 0.5, 0.25],
                        }}
                        transition={{
                            duration: 9,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: 3,
                        }}
                    />
                    <motion.path
                        d="M0,150 Q90,200 60,300 T110,500 Q70,600 50,750"
                        stroke="url(#veinGradient)"
                        strokeWidth="1.5"
                        fill="none"
                        filter="url(#glow)"
                        animate={{
                            opacity: [0.2, 0.45, 0.2],
                        }}
                        transition={{
                            duration: 11,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                </svg>
            </motion.div>

            {/* Breathing scale animation for the whole container */}
            <motion.div
                className="absolute inset-0"
                animate={{
                    scale: [1, 1.02, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </div>
    );
};
