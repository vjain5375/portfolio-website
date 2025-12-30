import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github, Cpu, Bot, Zap, Wifi } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  icon: React.ReactNode;
  gradient: string;
  link?: string;
  github?: string;
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, z: -50 }}
      animate={isInView ? { opacity: 1, y: 0, z: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative perspective-1000"
    >
      <div className="relative glass rounded-2xl p-6 md:p-8 card-lift border border-border/50 overflow-hidden">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-10 blur-xl`} />
        </div>

        {/* Icon */}
        <div className={`relative inline-flex p-4 rounded-xl bg-gradient-to-r ${project.gradient} mb-6`}>
          <div className="text-primary-foreground">
            {project.icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-mono text-primary bg-primary/10 rounded-full border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-4">
          {project.github && (
            <a
              href={project.github}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Code</span>
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 opacity-20">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} blur-2xl`} />
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectsSection = () => {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true });

  return (
    <section id="projects" className="relative py-32 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-accent border border-accent/30 rounded-full">
            Featured Work
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">My </span>
            <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of software projects showcasing my expertise in web development, AI, and full-stack applications.
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
