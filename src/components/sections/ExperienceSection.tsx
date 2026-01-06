import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Megaphone } from 'lucide-react';
import { TiltCard } from '../effects/TiltCard';

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

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  accentType: 'crimson' | 'maroon';
  onHover: (isHovered: boolean) => void;
}

const TimelineCard = ({ item, index, isActive, accentType, onHover }: TimelineCardProps) => {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  const accentConfig = {
    crimson: {
      bg: 'bg-red-950/20',
      border: 'border-red-900/30',
      hoverBorder: 'hover:border-red-700/50',
      badge: 'bg-red-900/30 text-red-400 border-red-800/40',
      text: 'text-red-400',
      glow: 'bg-red-600',
      shadow: 'shadow-[0_0_40px_rgba(185,28,28,0.25)]',
      glowColor: 'crimson' as const,
    },
    maroon: {
      bg: 'bg-rose-950/20',
      border: 'border-rose-900/30',
      hoverBorder: 'hover:border-rose-700/50',
      badge: 'bg-rose-900/30 text-rose-400 border-rose-800/40',
      text: 'text-rose-400',
      glow: 'bg-rose-700',
      shadow: 'shadow-[0_0_40px_rgba(136,19,55,0.25)]',
      glowColor: 'maroon' as const,
    },
  };

  const accent = accentConfig[accentType];

  return (
    <div
      ref={cardRef}
      className={`relative flex items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="w-full md:w-[calc(50%-80px)]"
      >
        <TiltCard
          glowColor={accent.glowColor}
          intensity="medium"
          onHoverChange={onHover}
          className="h-full"
        >
          <div
            className={`
              relative glass rounded-2xl border border-border/50 overflow-hidden h-full group
              ${accent.bg} ${accent.border} ${accent.hoverBorder}
              ${isActive ? accent.shadow : 'shadow-none'}
              transition-all duration-500 cursor-pointer
            `}
          >
            {/* Glowing orb effect - like project cards */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
              style={{
                background: accentType === 'crimson'
                  ? 'radial-gradient(circle, hsl(0 70% 45%) 0%, transparent 70%)'
                  : 'radial-gradient(circle, hsl(350 60% 40%) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            {/* Animated gradient background on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              animate={{
                background: accentType === 'crimson'
                  ? [
                    'linear-gradient(135deg, hsl(0 70% 35% / 0.08) 0%, transparent 50%)',
                    'linear-gradient(225deg, hsl(0 80% 30% / 0.08) 0%, transparent 50%)',
                    'linear-gradient(135deg, hsl(0 70% 35% / 0.08) 0%, transparent 50%)',
                  ]
                  : [
                    'linear-gradient(135deg, hsl(350 70% 25% / 0.08) 0%, transparent 50%)',
                    'linear-gradient(225deg, hsl(340 60% 28% / 0.08) 0%, transparent 50%)',
                    'linear-gradient(135deg, hsl(350 70% 25% / 0.08) 0%, transparent 50%)',
                  ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className="relative p-6 md:p-8">
              {/* Year badge with glow animation */}
              <motion.div
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 border ${accent.badge}`}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {item.year}
                {item.isPresent && (
                  <span className="ml-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-[10px] uppercase tracking-wider border border-green-500/30">
                    Current
                  </span>
                )}
              </motion.div>

              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className={`text-sm font-medium mb-3 ${accent.text}`}>{item.organization}</p>
              {item.description && (
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              )}
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Connector line from card to timeline - perfectly centered */}
      <motion.div
        className={`
          hidden md:block absolute top-1/2 h-[2px] w-[80px]
          ${isLeft ? 'left-[calc(50%-80px)]' : 'right-[calc(50%-80px)]'}
        `}
        style={{ transform: 'translateY(-50%)' }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
      >
        <div
          className={`w-full h-full ${accentType === 'crimson'
            ? 'bg-gradient-to-r from-red-700/40 to-red-600/80'
            : 'bg-gradient-to-r from-rose-800/40 to-rose-700/80'
            }`}
          style={{
            transformOrigin: isLeft ? 'right' : 'left',
          }}
        />
      </motion.div>
    </div>
  );
};

interface TimelineSectionProps {
  title: string;
  data: TimelineItem[];
  accentType: 'crimson' | 'maroon';
  id: string;
}

const TimelineSection = ({ title, data, accentType, id }: TimelineSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ['0%', '100%']);

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
        if (scrollProgress >= threshold * 0.7) {
          newActiveIndices.add(index);
        }
      });

      setActiveIndices(newActiveIndices);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.length]);

  const colors = {
    crimson: {
      gradient: 'from-red-600 via-red-500 to-red-600',
      bgGlow: 'bg-red-600/10',
      dotActive: 'bg-red-500 border-red-400 shadow-[0_0_25px_rgba(185,28,28,0.9)]',
      dotInactive: 'bg-background border-red-900/40',
      titleGradient: 'from-red-400 via-red-500 to-red-600',
      pulseColor: 'bg-red-500',
    },
    maroon: {
      gradient: 'from-rose-700 via-rose-600 to-rose-700',
      bgGlow: 'bg-rose-700/10',
      dotActive: 'bg-rose-600 border-rose-500 shadow-[0_0_25px_rgba(136,19,55,0.9)]',
      dotInactive: 'bg-background border-rose-900/40',
      titleGradient: 'from-rose-400 via-rose-500 to-rose-600',
      pulseColor: 'bg-rose-600',
    },
  };

  const color = colors[accentType];

  return (
    <div ref={sectionRef} id={id} className="relative py-24">
      {/* Background glow with parallax effect */}
      <motion.div
        className={`absolute top-1/2 left-1/2 w-[700px] h-[700px] ${color.bgGlow} rounded-full blur-[180px] pointer-events-none`}
        style={{
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.7, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary parallax layer */}
      <motion.div
        className={`absolute top-1/4 right-1/4 w-[300px] h-[300px] ${color.bgGlow} rounded-full blur-[100px] pointer-events-none opacity-30`}
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-20 relative z-10"
      >
        <motion.span
          className={`inline-block px-4 py-2 mb-4 text-sm font-mono border rounded-full ${accentType === 'crimson'
            ? 'text-red-400 border-red-500/30'
            : 'text-rose-400 border-rose-500/30'
            }`}
          animate={{
            boxShadow: accentType === 'crimson'
              ? [
                '0 0 15px hsl(0 70% 40% / 0.2)',
                '0 0 30px hsl(0 70% 40% / 0.4)',
                '0 0 15px hsl(0 70% 40% / 0.2)',
              ]
              : [
                '0 0 15px hsl(350 70% 35% / 0.2)',
                '0 0 30px hsl(350 70% 35% / 0.4)',
                '0 0 15px hsl(350 70% 35% / 0.2)',
              ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {accentType === 'crimson' ? '📚 Academic Journey' : '💼 Professional Path'}
        </motion.span>
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
          <motion.span
            className={`bg-gradient-to-r ${color.titleGradient} bg-clip-text text-transparent`}
            animate={{ filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            {title}
          </motion.span>
        </h2>
      </motion.div>

      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central timeline line - perfectly centered */}
        <div className="absolute left-[22px] md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[3px]">
          {/* Background line */}
          <div className="absolute inset-0 bg-muted/20 rounded-full" />

          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className={`absolute top-0 left-0 right-0 bg-gradient-to-b ${color.gradient} rounded-full`}
          />
        </div>

        {/* Timeline items */}
        <div className="space-y-20">
          {data.map((item, index) => {
            const isActive = activeIndices.has(index);
            const isHovered = hoveredIndex === index;

            return (
              <div key={index} className="relative pl-14 md:pl-0">
                {/* Timeline node - perfectly centered */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  className="absolute left-[22px] md:left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.div
                    animate={
                      isHovered
                        ? { scale: 1.4 }
                        : isActive
                          ? { scale: 1.2 }
                          : { scale: 1 }
                    }
                    transition={{ duration: 0.3, type: 'spring', stiffness: 300 }}
                    className={`
                      w-5 h-5 rounded-full border-[3px] transition-all duration-500
                      ${isActive || isHovered ? color.dotActive : color.dotInactive}
                    `}
                  >
                    {/* Pulse effect for active/hovered node */}
                    {(isActive || isHovered) && (
                      <motion.div
                        animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                        className={`absolute inset-0 rounded-full ${color.pulseColor}`}
                      />
                    )}
                  </motion.div>
                </motion.div>

                <TimelineCard
                  item={item}
                  index={index}
                  isActive={isActive}
                  accentType={accentType}
                  onHover={(isHovered) => setHoveredIndex(isHovered ? index : null)}
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
      {/* Overall background with noise texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-5 pointer-events-none" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-red-500/30"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3],
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

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Education Section */}
        <TimelineSection
          title="Education"
          data={educationData}
          accentType="crimson"
          id="education"
        />

        {/* Divider with animated gradient */}
        <div className="relative py-12">
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-red-600/50 via-muted/10 to-rose-700/50"
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </div>

        {/* Experience Section */}
        <TimelineSection
          title="Experience"
          data={experienceData}
          accentType="maroon"
          id="experience"
        />
      </div>
    </section>
  );
};
