import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Download, Code, Database, Cpu, Layers } from 'lucide-react';

const terminalLines = [
  { type: 'command', content: '$ whoami' },
  { type: 'output', content: 'vansh_jain' },
  { type: 'command', content: '$ cat education.txt' },
  { type: 'output', content: 'B.Tech in Computer Science Engineering' },
  { type: 'output', content: 'Expected Graduation: 2028' },
  { type: 'command', content: '$ ls skills/' },
  { type: 'output', content: 'web-dev/ ai/ programming/ databases/' },
  { type: 'command', content: '$ echo $PASSION' },
  { type: 'output', content: 'Building innovative tech solutions' },
];

const skills = [
  { name: 'Web Development', icon: <Code className="w-5 h-5" />, level: 85 },
  { name: 'Machine Learning', icon: <Layers className="w-5 h-5" />, level: 80 },
  { name: 'Programming', icon: <Cpu className="w-5 h-5" />, level: 90 },
  { name: 'Database Systems', icon: <Database className="w-5 h-5" />, level: 82 },
];

const Terminal = () => {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const timer = setInterval(() => {
        setVisibleLines((prev) => {
          if (prev >= terminalLines.length) {
            clearInterval(timer);
            return prev;
          }
          return prev + 1;
        });
      }, 400);
      return () => clearInterval(timer);
    }
  }, [isInView]);

  return (
    <div ref={ref} className="glass rounded-2xl overflow-hidden border border-border/50">
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border/50">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-2 text-xs font-mono text-muted-foreground">terminal — alex@portfolio</span>
      </div>

      {/* Terminal body */}
      <div className="p-6 font-mono text-sm min-h-[300px]">
        {terminalLines.slice(0, visibleLines).map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`mb-2 ${
              line.type === 'command' ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {line.content}
          </motion.div>
        ))}
        {visibleLines < terminalLines.length && (
          <span className="inline-block w-2 h-4 bg-primary cursor-blink" />
        )}
      </div>
    </div>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary border border-primary/30 rounded-full">
            About Me
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Who </span>
            <span className="gradient-text">I Am</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Terminal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Terminal />
          </motion.div>

          {/* Info panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Bio */}
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Computer Science Engineering Student
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a B.Tech CSE student with a deep passion for software development, artificial intelligence, and building innovative web applications. My journey in engineering has been driven by curiosity and a desire to create technology that makes a meaningful impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From developing full-stack applications to exploring machine learning algorithms, I thrive on challenging projects that push the boundaries of what's possible. I believe in learning by doing and constantly expanding my technical horizons.
              </p>
            </div>

            {/* Skills */}
            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-4">
                Core Competencies
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-foreground">
                        <span className="text-primary">{skill.icon}</span>
                        <span className="font-medium">{skill.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Resume button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <button className="group relative inline-flex items-center gap-3 px-8 py-4 font-display font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-lg btn-glow transition-all duration-300 hover:scale-105">
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span>Download Resume</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
