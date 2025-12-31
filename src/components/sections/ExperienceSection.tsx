import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Megaphone } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  type: 'experience' | 'education';
  icon: React.ElementType;
  description?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: '2025-Present',
    title: 'Campus Ambassador',
    organization: 'E-Cell, IIT Bombay',
    type: 'experience',
    icon: Award,
    description: 'Representing E-Cell IIT Bombay and promoting entrepreneurship culture',
  },
  {
    year: '2025',
    title: 'Executive',
    organization: 'E-CELL, RGIPT',
    type: 'experience',
    icon: Briefcase,
    description: 'Driving entrepreneurial initiatives and startup ecosystem',
  },
  {
    year: '2025',
    title: 'Executive',
    organization: 'Science & Technical Council / ASPAC Club, RGIPT',
    type: 'experience',
    icon: Users,
    description: 'Organizing technical events and fostering innovation',
  },
  {
    year: '2025',
    title: 'Marketing Executive',
    organization: 'KALTARANG (RGIPT Cultural Fest)',
    type: 'experience',
    icon: Megaphone,
    description: 'Leading marketing campaigns for the annual cultural festival',
  },
  {
    year: '2024-2028',
    title: 'B.Tech in Computer Science & Design Engineering',
    organization: 'RGIPT (Rajiv Gandhi Institute of Petroleum Technology)',
    type: 'education',
    icon: GraduationCap,
    description: 'Pursuing undergraduate degree in CS & Design Engineering',
  },
  {
    year: '2021-2023',
    title: 'Class 12 (Senior Secondary)',
    organization: 'Sacred Heart Convent School',
    type: 'education',
    icon: GraduationCap,
    description: 'Completed higher secondary education',
  },
  {
    year: '2011-2021',
    title: 'Class 10 (Secondary)',
    organization: 'DAV Schools Network',
    type: 'education',
    icon: GraduationCap,
    description: 'Completed secondary education with strong foundation',
  },
];

const TimelineCard = ({ 
  item, 
  index, 
  isActive 
}: { 
  item: TimelineItem; 
  index: number; 
  isActive: boolean;
}) => {
  const isLeft = index % 2 === 0;
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.3, x: isLeft ? -20 : 20 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`relative flex items-center ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} flex-row`}
    >
      {/* Card */}
      <motion.div
        animate={isActive ? { scale: 1 } : { scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`
          relative w-full md:w-[calc(50%-40px)] p-6 rounded-2xl
          backdrop-blur-xl border transition-all duration-500
          ${item.type === 'experience' 
            ? 'bg-primary/5 border-primary/20 hover:border-primary/40' 
            : 'bg-accent/5 border-accent/20 hover:border-accent/40'
          }
          ${isActive 
            ? 'shadow-[0_0_30px_rgba(0,255,255,0.15)]' 
            : 'shadow-none'
          }
        `}
      >
        {/* Glow effect */}
        {isActive && (
          <div className={`
            absolute inset-0 rounded-2xl opacity-20 blur-xl -z-10
            ${item.type === 'experience' ? 'bg-primary' : 'bg-accent'}
          `} />
        )}
        
        {/* Year badge */}
        <div className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3
          ${item.type === 'experience' 
            ? 'bg-primary/20 text-primary' 
            : 'bg-accent/20 text-accent'
          }
        `}>
          <Icon className="w-3 h-3" />
          {item.year}
        </div>
        
        {/* Content */}
        <h3 className="text-lg font-bold text-foreground mb-1">
          {item.title}
        </h3>
        <p className={`text-sm font-medium mb-2 ${
          item.type === 'experience' ? 'text-primary' : 'text-accent'
        }`}>
          {item.organization}
        </p>
        {item.description && (
          <p className="text-sm text-muted-foreground">
            {item.description}
          </p>
        )}
        
        {/* Type indicator */}
        <div className={`
          absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider font-bold
          ${item.type === 'experience' 
            ? 'bg-primary/10 text-primary' 
            : 'bg-accent/10 text-accent'
          }
        `}>
          {item.type}
        </div>
      </motion.div>
      
      {/* Timeline connector line */}
      <div className={`
        hidden md:block absolute top-1/2 w-10 h-0.5 
        ${item.type === 'experience' ? 'bg-primary/30' : 'bg-accent/30'}
        ${isLeft ? 'right-[calc(50%-40px)]' : 'left-[calc(50%-40px)]'}
      `} />
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
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
      
      // Calculate scroll progress within section
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight - sectionTop) / (sectionHeight + windowHeight * 0.5)
      ));
      
      // Calculate active index based on scroll progress
      const newIndex = Math.min(
        timelineData.length - 1,
        Math.floor(scrollProgress * timelineData.length)
      );
      
      setActiveIndex(newIndex);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey through academia and professional experiences, shaping my skills and perspective.
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_rgba(0,255,255,0.5)]" />
              <span className="text-sm text-muted-foreground">Experience</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent shadow-[0_0_10px_rgba(147,51,234,0.5)]" />
              <span className="text-sm text-muted-foreground">Education</span>
            </div>
          </div>
        </motion.div>
        
        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Central timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:-translate-x-1/2">
            {/* Background line */}
            <div className="absolute inset-0 bg-muted/20 rounded-full" />
            
            {/* Animated progress line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-primary via-accent to-primary rounded-full shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            />
          </div>
          
          {/* Timeline items */}
          <div className="space-y-12 md:space-y-16">
            {timelineData.map((item, index) => (
              <div key={index} className="relative pl-12 md:pl-0">
                {/* Timeline node */}
                <motion.div
                  animate={index <= activeIndex ? { scale: 1.2 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`
                    absolute left-4 md:left-1/2 top-6 w-4 h-4 md:-translate-x-1/2 rounded-full
                    border-2 transition-all duration-500 z-10
                    ${index <= activeIndex
                      ? item.type === 'experience'
                        ? 'bg-primary border-primary shadow-[0_0_20px_rgba(0,255,255,0.8)]'
                        : 'bg-accent border-accent shadow-[0_0_20px_rgba(147,51,234,0.8)]'
                      : 'bg-background border-muted'
                    }
                  `}
                >
                  {/* Pulse effect for active node */}
                  {index === activeIndex && (
                    <motion.div
                      animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`
                        absolute inset-0 rounded-full
                        ${item.type === 'experience' ? 'bg-primary' : 'bg-accent'}
                      `}
                    />
                  )}
                </motion.div>
                
                <TimelineCard item={item} index={index} isActive={index <= activeIndex} />
              </div>
            ))}
          </div>
        </div>
        
        {/* Year markers */}
        <div className="hidden md:flex justify-between mt-12 px-8 text-sm font-bold">
          <span className="text-accent">2011</span>
          <span className="text-muted-foreground">2021</span>
          <span className="text-muted-foreground">2023</span>
          <span className="text-muted-foreground">2024</span>
          <span className="text-primary">2025</span>
          <span className="text-primary/50">2028</span>
        </div>
      </div>
    </section>
  );
};
