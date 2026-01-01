import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
  isActive: boolean;
  accentType: 'purple' | 'blue';
}

const TimelineCard = ({ item, index, isActive, accentType }: TimelineCardProps) => {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;
  
  const accentClasses = {
    purple: {
      bg: 'bg-purple-500/5',
      border: 'border-purple-500/20 hover:border-purple-500/40',
      badge: 'bg-purple-500/20 text-purple-400',
      text: 'text-purple-400',
      glow: 'bg-purple-500',
      shadow: 'shadow-[0_0_30px_rgba(147,51,234,0.2)]',
    },
    blue: {
      bg: 'bg-blue-500/5',
      border: 'border-blue-500/20 hover:border-blue-500/40',
      badge: 'bg-blue-500/20 text-blue-400',
      text: 'text-blue-400',
      glow: 'bg-blue-500',
      shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.2)]',
    },
  };

  const accent = accentClasses[accentType];

  return (
    <div className={`relative flex items-center w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -80 : 80, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
        className={`
          relative w-full md:w-[calc(50%-60px)] p-6 rounded-2xl
          backdrop-blur-xl border transition-all duration-500
          ${accent.bg} ${accent.border}
          ${isActive ? accent.shadow : 'shadow-none'}
        `}
      >
        {/* Glow effect */}
        {isActive && (
          <div className={`absolute inset-0 rounded-2xl opacity-20 blur-xl -z-10 ${accent.glow}`} />
        )}
        
        {/* Year badge */}
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 ${accent.badge}`}>
          <Icon className="w-3.5 h-3.5" />
          {item.year}
          {item.isPresent && (
            <span className="ml-1 px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full text-[10px] uppercase tracking-wider">
              Current
            </span>
          )}
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
        <p className={`text-sm font-medium mb-3 ${accent.text}`}>{item.organization}</p>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        )}
      </motion.div>

      {/* Connector line from card to timeline */}
      <div className={`
        hidden md:block absolute top-1/2 -translate-y-1/2 h-[2px] w-[60px]
        ${accentType === 'purple' ? 'bg-gradient-to-r from-purple-500/50 to-purple-500' : 'bg-gradient-to-r from-blue-500/50 to-blue-500'}
        ${isLeft ? 'right-[calc(50%-60px)]' : 'left-[calc(50%-60px)]'}
      `} />
    </div>
  );
};

interface TimelineSectionProps {
  title: string;
  data: TimelineItem[];
  accentType: 'purple' | 'blue';
  id: string;
}

const TimelineSection = ({ title, data, accentType, id }: TimelineSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndices, setActiveIndices] = useState<Set<number>>(new Set());
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%']);
  
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
        if (scrollProgress >= threshold * 0.8) {
          newActiveIndices.add(index);
        }
      });
      
      setActiveIndices(newActiveIndices);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.length]);

  const gradientClass = accentType === 'purple' 
    ? 'from-purple-500 via-purple-400 to-purple-500'
    : 'from-blue-500 via-blue-400 to-blue-500';

  const bgGlowClass = accentType === 'purple'
    ? 'bg-purple-500/10'
    : 'bg-blue-500/10';

  const dotColorActive = accentType === 'purple'
    ? 'bg-purple-500 border-purple-500 shadow-[0_0_20px_rgba(147,51,234,0.8)]'
    : 'bg-blue-500 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.8)]';

  const dotColorInactive = 'bg-background border-muted-foreground/30';

  const titleGradient = accentType === 'purple'
    ? 'from-purple-400 via-purple-500 to-violet-500'
    : 'from-blue-400 via-blue-500 to-indigo-400';

  return (
    <div ref={sectionRef} id={id} className="relative py-24">
      {/* Background glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] ${bgGlowClass} rounded-full blur-[150px] pointer-events-none`} />
      
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">
          <span className={`bg-gradient-to-r ${titleGradient} bg-clip-text text-transparent`}>
            {title}
          </span>
        </h2>
      </motion.div>
      
      {/* Timeline container */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central timeline line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2">
          {/* Background line */}
          <div className="absolute inset-0 bg-muted/30 rounded-full" />
          
          {/* Animated progress line */}
          <motion.div
            style={{ height: lineHeight }}
            className={`absolute top-0 left-0 right-0 bg-gradient-to-b ${gradientClass} rounded-full`}
          />
        </div>
        
        {/* Timeline items */}
        <div className="space-y-16">
          {data.map((item, index) => {
            const isLeft = index % 2 === 0;
            const isActive = activeIndices.has(index);
            
            return (
              <div key={index} className="relative pl-14 md:pl-0">
                {/* Timeline node */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  animate={isActive ? { scale: 1.3 } : { scale: 1 }}
                  transition={{ duration: 0.4, type: 'spring', stiffness: 200 }}
                  className={`
                    absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 w-5 h-5 -translate-x-1/2 md:-translate-x-1/2 rounded-full
                    border-[3px] transition-all duration-500 z-20
                    ${isActive ? dotColorActive : dotColorInactive}
                  `}
                >
                  {/* Pulse effect for active node */}
                  {isActive && (
                    <motion.div
                      animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className={`absolute inset-0 rounded-full ${accentType === 'purple' ? 'bg-purple-500' : 'bg-blue-500'}`}
                    />
                  )}
                </motion.div>
                
                <TimelineCard 
                  item={item} 
                  index={index} 
                  isActive={isActive}
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
      {/* Overall background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Education Section */}
        <TimelineSection
          title="Education"
          data={educationData}
          accentType="purple"
          id="education"
        />
        
        {/* Divider */}
        <div className="relative py-8">
          <div className="absolute left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-purple-500/50 via-muted/20 to-blue-500/50" />
        </div>
        
        {/* Experience Section */}
        <TimelineSection
          title="Experience"
          data={experienceData}
          accentType="blue"
          id="experience"
        />
      </div>
    </section>
  );
};
