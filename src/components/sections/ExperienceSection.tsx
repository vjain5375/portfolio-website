import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Megaphone } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  icon: React.ElementType;
  description?: string;
  isPresent?: boolean;
}

const educationData: TimelineItem[] = [
  {
    year: '2011–2021',
    title: 'Class 10 (Secondary)',
    organization: 'DAV Schools Network',
    icon: GraduationCap,
    description: 'Completed secondary education with strong academic foundation',
  },
  {
    year: '2021–2023',
    title: 'Class 12 (Senior Secondary)',
    organization: 'Sacred Heart Convent School',
    icon: GraduationCap,
    description: 'Completed higher secondary education',
  },
  {
    year: '2024–2028',
    title: 'B.Tech in Computer Science & Design Engineering',
    organization: 'RGIPT (Rajiv Gandhi Institute of Petroleum Technology)',
    icon: GraduationCap,
    description: 'Pursuing undergraduate degree in CS & Design Engineering',
  },
];

const experienceData: TimelineItem[] = [
  {
    year: '2025',
    title: 'Marketing Executive',
    organization: 'KALTARANG (RGIPT Cultural Fest)',
    icon: Megaphone,
    description: 'Leading marketing campaigns for the annual cultural festival',
  },
  {
    year: '2025',
    title: 'Executive',
    organization: 'Science & Technical Council / ASPAC Club, RGIPT',
    icon: Users,
    description: 'Organizing technical events and fostering innovation',
  },
  {
    year: '2025',
    title: 'Executive',
    organization: 'E-CELL, RGIPT',
    icon: Briefcase,
    description: 'Driving entrepreneurial initiatives and startup ecosystem',
  },
  {
    year: '2025–Present',
    title: 'Campus Ambassador',
    organization: 'E-Cell, IIT Bombay',
    icon: Award,
    description: 'Representing E-Cell IIT Bombay and promoting entrepreneurship culture',
    isPresent: true,
  },
];

// Accent color configurations
const accentConfigs = {
  crimson: {
    primary: 'hsl(0, 85%, 45%)',
    glow: 'hsl(0, 100%, 50%)',
    bg: 'bg-red-500/5',
    bgHover: 'hover:bg-red-500/10',
    border: 'border-red-500/20',
    borderHover: 'hover:border-red-500/50',
    badge: 'bg-red-500/20 text-red-400',
    text: 'text-red-400',
    gradient: 'from-red-500 via-red-400 to-red-500',
    titleGradient: 'from-red-400 via-red-500 to-rose-500',
    shadow: '0 0 40px rgba(239, 68, 68, 0.3)',
    shadowHover: '0 0 60px rgba(239, 68, 68, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3)',
    dotActive: 'bg-red-500 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.9)]',
    dotGlow: 'bg-red-500',
    lineGlow: 'rgba(239, 68, 68, 0.6)',
  },
  cyan: {
    primary: 'hsl(185, 80%, 45%)',
    glow: 'hsl(185, 100%, 55%)',
    bg: 'bg-cyan-500/5',
    bgHover: 'hover:bg-cyan-500/10',
    border: 'border-cyan-500/20',
    borderHover: 'hover:border-cyan-500/50',
    badge: 'bg-cyan-500/20 text-cyan-400',
    text: 'text-cyan-400',
    gradient: 'from-cyan-500 via-cyan-400 to-teal-500',
    titleGradient: 'from-cyan-400 via-cyan-500 to-teal-400',
    shadow: '0 0 40px rgba(6, 182, 212, 0.3)',
    shadowHover: '0 0 60px rgba(6, 182, 212, 0.5), 0 20px 40px rgba(0, 0, 0, 0.3)',
    dotActive: 'bg-cyan-500 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)]',
    dotGlow: 'bg-cyan-500',
    lineGlow: 'rgba(6, 182, 212, 0.6)',
  },
};

type AccentType = keyof typeof accentConfigs;

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  isHovered: boolean;
  onHover: (hovering: boolean) => void;
  accentType: AccentType;
}

const TimelineCard = ({ item, index, isActive, isHovered, onHover, accentType }: TimelineCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;
  const Icon = item.icon;
  const accent = accentConfigs[accentType];

  // 3D Tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onHover(false);
  };

  return (
    <div className={`relative flex items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      {/* Connector line from timeline to card */}
      <motion.div
        className={`
          hidden md:block absolute top-1/2 h-[2px] w-[50px] z-10
          ${isLeft ? 'right-[calc(50%-50px)]' : 'left-[calc(50%-50px)]'}
        `}
        style={{
          background: `linear-gradient(${isLeft ? '90deg' : '270deg'}, ${accent.lineGlow}, transparent)`,
          transform: 'translateY(-50%)',
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: isActive ? 1 : 0.3 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      />

      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -100 : 100, scale: 0.85 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ 
          duration: 0.7, 
          ease: [0.25, 0.46, 0.45, 0.94], 
          delay: index * 0.15 
        }}
        style={{ 
          rotateX, 
          rotateY, 
          transformPerspective: 1200,
          boxShadow: isHovered ? accent.shadowHover : isActive ? accent.shadow : 'none',
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => onHover(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          y: -8, 
          scale: 1.02,
          transition: { duration: 0.3, ease: 'easeOut' }
        }}
        className={`
          relative w-full md:w-[calc(50%-70px)] p-6 rounded-2xl cursor-pointer
          backdrop-blur-xl border transition-all duration-500 transform-gpu
          ${accent.bg} ${accent.bgHover} ${accent.border} ${accent.borderHover}
        `}
      >
        {/* Animated background glow */}
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-0 -z-10"
          style={{ background: `radial-gradient(ellipse at center, ${accent.primary}20, transparent 70%)` }}
          animate={{ 
            opacity: isHovered ? 0.8 : isActive ? 0.4 : 0,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Pulsing glow ring on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-2xl -z-10"
            style={{ 
              border: `1px solid ${accent.primary}`,
              boxShadow: `0 0 20px ${accent.glow}`,
            }}
            animate={{ 
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.01, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        {/* Floating animation when idle */}
        <motion.div
          animate={!isHovered ? { 
            y: [0, -4, 0],
          } : {}}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.2 }}
        >
          {/* Year badge */}
          <motion.div 
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 ${accent.badge}`}
            whileHover={{ scale: 1.05 }}
          >
            <Icon className="w-3.5 h-3.5" />
            {item.year}
            {item.isPresent && (
              <span className="ml-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-[10px] uppercase tracking-wider">
                Current
              </span>
            )}
          </motion.div>

          {/* Content */}
          <h3 className="text-lg font-bold text-foreground mb-2 transition-colors">
            {item.title}
          </h3>
          <p className={`text-sm font-medium mb-3 ${accent.text} transition-colors`}>
            {item.organization}
          </p>
          {item.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {item.description}
            </p>
          )}
        </motion.div>

        {/* Corner accent */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at top right, ${accent.primary}, transparent 70%)`,
          }}
          animate={{ opacity: isHovered ? 0.4 : 0.15 }}
        />
      </motion.div>
    </div>
  );
};

interface TimelineSectionProps {
  title: string;
  data: TimelineItem[];
  accentType: AccentType;
  id: string;
}

const TimelineSection = ({ title, data, accentType, id }: TimelineSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const accent = accentConfigs[accentType];

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const scrollProgress = Math.max(0, Math.min(1,
        (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.3)
      ));

      const newActiveIndices = new Set<number>();
      data.forEach((_, index) => {
        const threshold = (index + 1) / data.length;
        if (scrollProgress >= threshold * 0.75) {
          newActiveIndices.add(index);
        }
      });

      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.length]);

  return (
    <div ref={sectionRef} id={id} className="relative py-24">
      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgParallax }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] pointer-events-none opacity-20"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${accent.gradient}`} />
      </motion.div>

      {/* Floating background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              backgroundColor: accent.primary,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="text-center mb-20 relative z-10"
      >
        <motion.h2 
          className="text-4xl md:text-5xl lg:text-6xl font-bold font-display mb-4"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className={`bg-gradient-to-r ${accent.titleGradient} bg-clip-text text-transparent`}>
            {title}
          </span>
        </motion.h2>
        <motion.div
          className="w-24 h-1 mx-auto rounded-full mt-4"
          style={{ background: `linear-gradient(90deg, transparent, ${accent.primary}, transparent)` }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />
      </motion.div>

      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central timeline line */}
        <div className="absolute left-[22px] md:left-1/2 top-0 bottom-0 w-[3px] -translate-x-1/2">
          {/* Background line */}
          <div className="absolute inset-0 bg-muted/20 rounded-full" />

          {/* Animated progress line with glow */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-0 right-0 rounded-full overflow-hidden"
          >
            <div 
              className={`w-full h-full bg-gradient-to-b ${accent.gradient}`}
              style={{ boxShadow: `0 0 15px ${accent.lineGlow}` }}
            />
          </motion.div>
        </div>

        {/* Timeline items */}
        <div className="space-y-20">
          {data.map((item, index) => {
            const isActive = activeIndices.has(index);
            const isCardHovered = hoveredIndex === index;

            return (
              <div key={index} className="relative pl-14 md:pl-0">
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200, delay: index * 0.1 }}
                  className={`
                    absolute left-[22px] md:left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 rounded-full
                    border-[3px] transition-all duration-500 z-20
                    ${isActive ? accent.dotActive : 'bg-background border-muted-foreground/30'}
                  `}
                  animate={{
                    scale: isCardHovered ? 1.5 : isActive ? 1.2 : 1,
                  }}
                >
                  {/* Ripple effect on card hover */}
                  {isCardHovered && (
                    <>
                      <motion.div
                        className={`absolute inset-0 rounded-full ${accent.dotGlow}`}
                        animate={{ scale: [1, 3], opacity: [0.6, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                      <motion.div
                        className={`absolute inset-0 rounded-full ${accent.dotGlow}`}
                        animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                      />
                    </>
                  )}

                  {/* Pulse effect for active node */}
                  {isActive && !isCardHovered && (
                    <motion.div
                      animate={{ scale: [1, 2.2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      className={`absolute inset-0 rounded-full ${accent.dotGlow}`}
                    />
                  )}
                </motion.div>

                <TimelineCard
                  item={item}
                  index={index}
                  isActive={isActive}
                  isHovered={isCardHovered}
                  onHover={(hovering) => setHoveredIndex(hovering ? index : null)}
                  accentType={accentType}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <section className="relative px-4 overflow-hidden">
      {/* Deep background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Education Section - Crimson Red Theme */}
        <TimelineSection
          title="Education"
          data={educationData}
          accentType="crimson"
          id="education"
        />

        {/* Animated Divider */}
        <div className="relative py-12">
          <motion.div 
            className="absolute left-1/2 -translate-x-1/2 w-px h-32"
            style={{
              background: 'linear-gradient(180deg, rgba(239, 68, 68, 0.5) 0%, rgba(107, 114, 128, 0.2) 50%, rgba(6, 182, 212, 0.5) 100%)',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-muted-foreground/30"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>

        {/* Experience Section - Cyan Theme */}
        <TimelineSection
          title="Experience"
          data={experienceData}
          accentType="cyan"
          id="experience"
        />
      </div>
    </section>
  );
};
