import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Megaphone } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  icon: React.ElementType;
  description?: string;
}

const experienceData: TimelineItem[] = [
  {
    year: '2025-Present',
    title: 'Campus Ambassador',
    organization: 'E-Cell, IIT Bombay',
    icon: Award,
    description: 'Representing E-Cell IIT Bombay and promoting entrepreneurship culture',
  },
  {
    year: '2025',
    title: 'Executive',
    organization: 'E-CELL, RGIPT',
    icon: Briefcase,
    description: 'Driving entrepreneurial initiatives and startup ecosystem',
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
    title: 'Marketing Executive',
    organization: 'KALTARANG (RGIPT Cultural Fest)',
    icon: Megaphone,
    description: 'Leading marketing campaigns for the annual cultural festival',
  },
];

const educationData: TimelineItem[] = [
  {
    year: '2024-2028',
    title: 'B.Tech in Computer Science & Design Engineering',
    organization: 'RGIPT (Rajiv Gandhi Institute of Petroleum Technology)',
    icon: GraduationCap,
    description: 'Pursuing undergraduate degree in CS & Design Engineering',
  },
  {
    year: '2021-2023',
    title: 'Class 12 (Senior Secondary)',
    organization: 'Sacred Heart Convent School',
    icon: GraduationCap,
    description: 'Completed higher secondary education',
  },
  {
    year: '2011-2021',
    title: 'Class 10 (Secondary)',
    organization: 'DAV Schools Network',
    icon: GraduationCap,
    description: 'Completed secondary education with strong foundation',
  },
];

const TimelineCard = ({ 
  item, 
  index, 
  isActive,
  accentColor,
}: { 
  item: TimelineItem; 
  index: number; 
  isActive: boolean;
  accentColor: 'primary' | 'accent';
}) => {
  const Icon = item.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.4, x: -10 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.1 }}
      className="relative pl-8"
    >
      {/* Timeline node */}
      <motion.div
        animate={isActive ? { scale: 1.3 } : { scale: 1 }}
        transition={{ duration: 0.3 }}
        className={`
          absolute left-0 top-2 w-4 h-4 rounded-full border-2 z-10 transition-all duration-500
          ${isActive
            ? accentColor === 'primary'
              ? 'bg-primary border-primary shadow-[0_0_20px_rgba(0,255,255,0.8)]'
              : 'bg-accent border-accent shadow-[0_0_20px_rgba(147,51,234,0.8)]'
            : 'bg-background border-muted'
          }
        `}
      >
        {isActive && (
          <motion.div
            animate={{ scale: [1, 2.5, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`absolute inset-0 rounded-full ${accentColor === 'primary' ? 'bg-primary' : 'bg-accent'}`}
          />
        )}
      </motion.div>

      {/* Card */}
      <motion.div
        animate={isActive ? { scale: 1 } : { scale: 0.97 }}
        transition={{ duration: 0.3 }}
        className={`
          relative p-5 rounded-xl backdrop-blur-xl border transition-all duration-500
          ${accentColor === 'primary'
            ? 'bg-primary/5 border-primary/20 hover:border-primary/40'
            : 'bg-accent/5 border-accent/20 hover:border-accent/40'
          }
          ${isActive ? 'shadow-[0_0_25px_rgba(0,255,255,0.1)]' : ''}
        `}
      >
        {isActive && (
          <div className={`absolute inset-0 rounded-xl opacity-15 blur-xl -z-10 ${accentColor === 'primary' ? 'bg-primary' : 'bg-accent'}`} />
        )}
        
        {/* Year badge */}
        <div className={`
          inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3
          ${accentColor === 'primary' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}
        `}>
          <Icon className="w-3 h-3" />
          {item.year}
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-1">{item.title}</h3>
        <p className={`text-sm font-medium mb-2 ${accentColor === 'primary' ? 'text-primary' : 'text-accent'}`}>
          {item.organization}
        </p>
        {item.description && (
          <p className="text-sm text-muted-foreground">{item.description}</p>
        )}
      </motion.div>
    </motion.div>
  );
};

const Timeline = ({ 
  data, 
  accentColor, 
  title, 
  icon: TitleIcon 
}: { 
  data: TimelineItem[]; 
  accentColor: 'primary' | 'accent';
  title: string;
  icon: React.ElementType;
}) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end center'],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (rect.height + windowHeight * 0.3)));
      
      const newIndex = Math.floor(scrollProgress * (data.length + 1)) - 1;
      setActiveIndex(Math.min(data.length - 1, Math.max(-1, newIndex)));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [data.length]);
  
  return (
    <div className="flex-1">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-3 mb-8"
      >
        <div className={`p-3 rounded-xl ${accentColor === 'primary' ? 'bg-primary/10' : 'bg-accent/10'}`}>
          <TitleIcon className={`w-6 h-6 ${accentColor === 'primary' ? 'text-primary' : 'text-accent'}`} />
        </div>
        <h3 className={`text-2xl font-bold ${accentColor === 'primary' ? 'text-primary' : 'text-accent'}`}>
          {title}
        </h3>
      </motion.div>
      
      {/* Timeline */}
      <div ref={timelineRef} className="relative">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-0 bottom-0 w-0.5">
          <div className="absolute inset-0 bg-muted/20 rounded-full" />
          <motion.div
            style={{ height: lineHeight }}
            className={`absolute top-0 left-0 right-0 rounded-full ${
              accentColor === 'primary' 
                ? 'bg-gradient-to-b from-primary to-primary/50 shadow-[0_0_15px_rgba(0,255,255,0.5)]'
                : 'bg-gradient-to-b from-accent to-accent/50 shadow-[0_0_15px_rgba(147,51,234,0.5)]'
            }`}
          />
        </div>
        
        {/* Items */}
        <div className="space-y-6">
          {data.map((item, index) => (
            <TimelineCard
              key={index}
              item={item}
              index={index}
              isActive={index <= activeIndex}
              accentColor={accentColor}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ExperienceSection = () => {
  return (
    <section id="experience" className="relative py-32 px-4 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              Experience & Education
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey through academia and professional experiences, shaping my skills and perspective.
          </p>
        </motion.div>
        
        {/* Two-column layout */}
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <Timeline
            data={experienceData}
            accentColor="primary"
            title="Experience"
            icon={Briefcase}
          />
          <Timeline
            data={educationData}
            accentColor="accent"
            title="Education"
            icon={GraduationCap}
          />
        </div>
      </div>
    </section>
  );
};
