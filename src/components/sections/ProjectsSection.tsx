import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Github, Cpu, Bot, Zap, Eye } from 'lucide-react';
import { TiltCard } from '../effects/TiltCard';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  gradient: string;
  link?: string;
  github?: string;
  previewUrl?: string; // For iframe preview
}

const projects: Project[] = [
  {
    id: 1,
    title: "AI Assistant - Deadpool",
    description: "An interactive AI-powered assistant built with Streamlit, featuring natural language processing capabilities for intelligent conversations and task assistance.",
    technologies: ["Python", "Streamlit", "AI/ML", "NLP"],
    icon: <Bot className="w-8 h-8" />,
    gradient: "from-primary to-accent",
    link: "https://deadpools.streamlit.app/",
    previewUrl: "https://deadpools.streamlit.app/",
  },
  {
    id: 2,
    title: "Bond of Rakhi",
    description: "A beautiful, heartfelt website celebrating the special bond between siblings during Raksha Bandhan, featuring interactive elements and emotional messaging.",
    technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages"],
    icon: <Zap className="w-8 h-8" />,
    gradient: "from-accent to-primary",
    github: "https://github.com/vjain5375/bond-of-rakhi",
    link: "https://vjain5375.github.io/bond-of-rakhi/",
    previewUrl: "https://vjain5375.github.io/bond-of-rakhi/",
  },
  {
    id: 3,
    title: "Coming Soon",
    description: "Exciting new projects are in development! Stay tuned for more innovative applications and creative solutions.",
    technologies: ["React", "Node.js", "Python", "More..."],
    icon: <Cpu className="w-8 h-8" />,
    gradient: "from-primary via-accent to-primary",
  },
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showPreview, setShowPreview] = useState(false);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (project.previewUrl) {
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      setPreviewPosition({
        x: rect.left + rect.width / 2,
        y: rect.top,
      });
      setShowPreview(true);
    }
  };

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 60, rotateX: 10 }}
        animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
        transition={{
          duration: 0.8,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className="perspective-1000"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowPreview(false)}
      >
        <TiltCard
          glowColor="red"
          intensity="medium"
          className="h-full"
        >
          <div className="relative glass rounded-2xl p-6 md:p-8 border border-border/50 overflow-hidden h-full group">
            {/* Animated gradient background on hover - red theme */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              animate={{
                background: [
                  `linear-gradient(135deg, hsl(0 70% 45% / 0.05) 0%, transparent 50%)`,
                  `linear-gradient(225deg, hsl(0 80% 35% / 0.05) 0%, transparent 50%)`,
                  `linear-gradient(135deg, hsl(0 70% 45% / 0.05) 0%, transparent 50%)`,
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Glowing orb - crimson */}
            <motion.div
              className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle, hsl(0 70% 45%) 0%, transparent 70%)`,
                filter: 'blur(40px)',
              }}
            />

            {/* Preview badge for projects with preview */}
            {project.previewUrl && (
              <motion.div
                className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/30 opacity-0 group-hover:opacity-100 transition-opacity"
                animate={{
                  boxShadow: [
                    '0 0 5px hsl(0 70% 45% / 0.3)',
                    '0 0 15px hsl(0 70% 45% / 0.5)',
                    '0 0 5px hsl(0 70% 45% / 0.3)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Eye className="w-3 h-3" />
                Preview
              </motion.div>
            )}

            {/* Icon with glow */}
            <motion.div
              className={`relative inline-flex p-4 rounded-xl bg-gradient-to-r ${project.gradient} mb-6`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <div className="text-primary-foreground relative z-10">
                {project.icon}
              </div>
              <motion.div
                className="absolute inset-0 rounded-xl"
                style={{
                  background: `linear-gradient(135deg, hsl(0 70% 45%) 0%, transparent 100%)`,
                  filter: 'blur(10px)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>

            {/* Content */}
            <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.technologies.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20 hover:border-primary/50 hover:bg-primary/20 transition-all duration-300"
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Links */}
            <div className="flex gap-4 relative z-10">
              {project.github && (
                <motion.a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors cursor-pointer group/link"
                  whileHover={{ x: 5 }}
                >
                  <Github className="w-4 h-4 transition-transform group-hover/link:rotate-12" />
                  <span>Code</span>
                </motion.a>
              )}
              {project.link && (
                <motion.a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-accent transition-colors cursor-pointer group/link"
                  whileHover={{ x: 5 }}
                >
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                  <span>Live Demo</span>
                </motion.a>
              )}
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Preview Popup */}
      <AnimatePresence>
        {showPreview && project.previewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed z-[200] pointer-events-none"
            style={{
              left: Math.min(previewPosition.x - 200, window.innerWidth - 420),
              top: Math.max(previewPosition.y - 280, 20),
            }}
          >
            <div className="w-[400px] h-[250px] rounded-xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/30">
              {/* Preview header */}
              <div className="flex items-center gap-2 px-3 py-2 bg-secondary/90 border-b border-primary/30">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-2 text-xs font-mono text-muted-foreground truncate">
                  {project.previewUrl}
                </span>
              </div>
              {/* Iframe preview */}
              <iframe
                src={project.previewUrl}
                className="w-full h-[220px] bg-white pointer-events-none"
                title={`${project.title} preview`}
                sandbox="allow-scripts allow-same-origin"
                loading="lazy"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const ProjectsSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Ambient glow - red theme */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, hsl(0 70% 45% / 0.3) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            className="inline-block px-4 py-2 mb-4 text-sm font-mono text-accent border border-accent/30 rounded-full"
            animate={{
              boxShadow: [
                '0 0 15px hsl(0 80% 35% / 0.2)',
                '0 0 25px hsl(0 80% 35% / 0.4)',
                '0 0 15px hsl(0 80% 35% / 0.2)',
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Featured Work
          </motion.span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">My </span>
            <motion.span
              className="gradient-text"
              animate={{
                filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)'],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              Projects
            </motion.span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of software projects showcasing my expertise in web development, AI, and full-stack applications.
            <span className="text-primary ml-1">Hover over a project to see a live preview!</span>
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
