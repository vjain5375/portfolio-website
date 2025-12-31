import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Users, Megaphone } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  organization: string;
  icon: React.ElementType;
  description?: string;
  type: 'education' | 'experience';
}

const timelineData: TimelineItem[] = [
  // Education items first (will appear on left)
  {
    year: '2011-2021',
    title: 'Class 10 (Secondary)',
    organization: 'DAV Schools Network',
    icon: GraduationCap,
    description: 'Completed secondary education with strong foundation',
    type: 'education',
  },
  {
    year: '2021-2023',
    title: 'Class 12 (Senior Secondary)',
    organization: 'Sacred Heart Convent School',
    icon: GraduationCap,
    description: 'Completed higher secondary education',
    type: 'education',
  },
  {
    year: '2024-2028',
    title: 'B.Tech in CS & Design Engineering',
    organization: 'RGIPT',
    icon: GraduationCap,
    description: 'Pursuing undergraduate degree in Computer Science & Design Engineering',
    type: 'education',
  },
  // Experience items (will appear on right)
  {
    year: '2025',
    title: 'Marketing Executive',
    organization: 'KALTARANG Cultural Fest',
    icon: Megaphone,
    description: 'Leading marketing campaigns for the annual cultural festival',
    type: 'experience',
  },
  {
    year: '2025',
    title: 'Executive Member',
    organization: 'Science & Technical Council / ASPAC',
    icon: Users,
    description: 'Organizing technical events and fostering innovation',
    type: 'experience',
  },
  {
    year: '2025',
    title: 'Executive Member',
    organization: 'E-CELL, RGIPT',
    icon: Briefcase,
    description: 'Driving entrepreneurial initiatives and startup ecosystem',
    type: 'experience',
  },
  {
    year: '2025-Present',
    title: 'Campus Ambassador',
    organization: 'E-Cell, IIT Bombay',
    icon: Award,
    description: 'Representing E-Cell IIT Bombay and promoting entrepreneurship culture',
    type: 'experience',
  },
];

const TimelineCard = ({ 
  item, 
  index, 
  isActive,
  side,
}: { 
  item: TimelineItem; 
  index: number; 
  isActive: boolean;
  side: 'left' | 'right';
}) => {
  const Icon = item.icon;
  const isEducation = item.type === 'education';
  
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        x: side === 'left' ? -60 : 60,
        scale: 0.9 
      }}
      animate={isActive ? { 
        opacity: 1, 
        x: 0,
        scale: 1 
      } : { 
        opacity: 0.3, 
        x: side === 'left' ? -20 : 20,
        scale: 0.95 
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`
        relative w-full max-w-md
        ${side === 'left' ? 'mr-auto text-right' : 'ml-auto text-left'}
      `}
    >
      {/* Card */}
      <motion.div
        animate={isActive ? { scale: 1 } : { scale: 0.98 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        className={`
          relative p-6 rounded-2xl backdrop-blur-2xl border-2 transition-all duration-700
          ${isEducation
            ? 'bg-accent/[0.08] border-accent/30 hover:border-accent/50'
            : 'bg-primary/[0.08] border-primary/30 hover:border-primary/50'
          }
          ${isActive 
            ? isEducation
              ? 'shadow-[0_0_40px_rgba(147,51,234,0.25),inset_0_0_30px_rgba(147,51,234,0.05)]'
              : 'shadow-[0_0_40px_rgba(0,255,255,0.25),inset_0_0_30px_rgba(0,255,255,0.05)]'
            : ''
          }
        `}
      >
        {/* Glow background */}
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }}
            className={`absolute inset-0 rounded-2xl blur-2xl -z-10 ${isEducation ? 'bg-accent' : 'bg-primary'}`}
          />
        )}
        
        {/* Year badge */}
        <div className={`
          inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-4
          ${isEducation ? 'bg-accent/20 text-accent' : 'bg-primary/20 text-primary'}
          ${side === 'left' ? 'float-right ml-4' : 'float-left mr-4'}
        `}>
          <Icon className="w-4 h-4" />
          {item.year}
        </div>
        
        <div className="clear-both" />
        
        <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
        <p className={`text-sm font-semibold mb-3 ${isEducation ? 'text-accent' : 'text-primary'}`}>
          {item.organization}
        </p>
        {item.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
        )}
        
        {/* Type indicator */}
        <div className={`
          absolute bottom-4 ${side === 'left' ? 'left-4' : 'right-4'} 
          px-2 py-0.5 rounded text-[10px] uppercase tracking-widest font-bold opacity-50
          ${isEducation ? 'text-accent' : 'text-primary'}
        `}>
          {item.type}
        </div>

        {/* Connector line to timeline */}
        <div className={`
          absolute top-1/2 -translate-y-1/2 w-8 h-0.5
          ${side === 'left' ? '-right-8' : '-left-8'}
          ${isEducation 
            ? 'bg-gradient-to-r from-accent/50 to-accent' 
            : 'bg-gradient-to-l from-primary/50 to-primary'
          }
          ${isActive ? 'opacity-100' : 'opacity-30'}
          transition-opacity duration-500
        `} />
      </motion.div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  
  const lineHeight = useTransform(scrollYProgress, [0.15, 0.85], ['0%', '100%']);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, 
        (windowHeight * 0.6 - rect.top) / (rect.height)
      ));
      
      const newIndex = Math.floor(scrollProgress * (timelineData.length + 0.5));
      setActiveIndex(Math.min(timelineData.length - 1, Math.max(-1, newIndex)));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const educationItems = timelineData.filter(item => item.type === 'education');
  const experienceItems = timelineData.filter(item => item.type === 'experience');
  
  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-4 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 via-transparent to-transparent rounded-full" />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/30 border border-muted/50 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm text-muted-foreground font-medium">My Journey</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_3s_linear_infinite]">
              Education & Experience
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A timeline of my academic journey and professional growth
          </p>
          
          {/* Legend */}
          <div className="flex items-center justify-center gap-8 mt-8">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-accent shadow-[0_0_15px_rgba(147,51,234,0.6)]" />
              <span className="text-sm text-muted-foreground font-medium">Education</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,255,255,0.6)]" />
              <span className="text-sm text-muted-foreground font-medium">Experience</span>
            </div>
          </div>
        </motion.div>
        
        {/* Two-column timeline layout */}
        <div ref={timelineRef} className="relative">
          {/* Central timeline */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 hidden md:block">
            {/* Background line */}
            <div className="absolute inset-0 bg-gradient-to-b from-muted/30 via-muted/20 to-muted/30 rounded-full" />
            
            {/* Animated progress line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent via-primary to-primary rounded-full shadow-[0_0_30px_rgba(0,255,255,0.4)]"
            />
            
            {/* Start node */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-accent border-4 border-background shadow-[0_0_20px_rgba(147,51,234,0.6)]" />
            
            {/* End node */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background shadow-[0_0_20px_rgba(0,255,255,0.6)]" />
          </div>

          {/* Education Section */}
          <div className="mb-20">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:w-[calc(50%-40px)]"
            >
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/30">
                <GraduationCap className="w-8 h-8 text-accent" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-accent">Education</h3>
                <p className="text-muted-foreground">Academic Background</p>
              </div>
            </motion.div>
            
            <div className="space-y-12">
              {educationItems.map((item, index) => {
                const globalIndex = index;
                return (
                  <div key={index} className="relative md:grid md:grid-cols-2 md:gap-20">
                    {/* Left side - Education cards */}
                    <div className="md:pr-8">
                      <TimelineCard
                        item={item}
                        index={globalIndex}
                        isActive={globalIndex <= activeIndex}
                        side="left"
                      />
                    </div>
                    
                    {/* Right side - empty for education */}
                    <div className="hidden md:block" />
                    
                    {/* Timeline node */}
                    <motion.div
                      animate={globalIndex <= activeIndex ? { scale: 1.4 } : { scale: 1 }}
                      transition={{ duration: 0.4, type: 'spring' }}
                      className={`
                        hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-5 h-5 rounded-full border-4 z-20 transition-all duration-500
                        ${globalIndex <= activeIndex
                          ? 'bg-accent border-accent shadow-[0_0_25px_rgba(147,51,234,0.9)]'
                          : 'bg-background border-muted/50'
                        }
                      `}
                    >
                      {globalIndex <= activeIndex && (
                        <motion.div
                          animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-accent"
                        />
                      )}
                    </motion.div>
                    
                    {/* Year marker */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={globalIndex <= activeIndex ? { opacity: 1 } : { opacity: 0.3 }}
                      className="hidden md:flex absolute left-1/2 top-1/2 translate-x-8 -translate-y-1/2 items-center"
                    >
                      <span className="text-lg font-bold text-accent/70">{item.year}</span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-12 md:w-[calc(50%-40px)] md:ml-auto md:flex-row-reverse md:text-right"
            >
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/30">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-primary">Experience</h3>
                <p className="text-muted-foreground">Professional Journey</p>
              </div>
            </motion.div>
            
            <div className="space-y-12">
              {experienceItems.map((item, index) => {
                const globalIndex = educationItems.length + index;
                return (
                  <div key={index} className="relative md:grid md:grid-cols-2 md:gap-20">
                    {/* Left side - empty for experience */}
                    <div className="hidden md:block" />
                    
                    {/* Right side - Experience cards */}
                    <div className="md:pl-8">
                      <TimelineCard
                        item={item}
                        index={globalIndex}
                        isActive={globalIndex <= activeIndex}
                        side="right"
                      />
                    </div>
                    
                    {/* Timeline node */}
                    <motion.div
                      animate={globalIndex <= activeIndex ? { scale: 1.4 } : { scale: 1 }}
                      transition={{ duration: 0.4, type: 'spring' }}
                      className={`
                        hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
                        w-5 h-5 rounded-full border-4 z-20 transition-all duration-500
                        ${globalIndex <= activeIndex
                          ? 'bg-primary border-primary shadow-[0_0_25px_rgba(0,255,255,0.9)]'
                          : 'bg-background border-muted/50'
                        }
                      `}
                    >
                      {globalIndex <= activeIndex && (
                        <motion.div
                          animate={{ scale: [1, 2.5, 1], opacity: [0.8, 0, 0.8] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="absolute inset-0 rounded-full bg-primary"
                        />
                      )}
                    </motion.div>
                    
                    {/* Year marker */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={globalIndex <= activeIndex ? { opacity: 1 } : { opacity: 0.3 }}
                      className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-16 -translate-y-1/2 items-center justify-end"
                    >
                      <span className="text-lg font-bold text-primary/70">{item.year}</span>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
