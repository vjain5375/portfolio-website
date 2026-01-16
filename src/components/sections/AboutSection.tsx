import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Download, Code, Database, Cpu, Layers } from 'lucide-react';
import { TiltCard } from '../effects/TiltCard';

const terminalLines = [
  { type: 'command', content: 'whoami' },
  { type: 'output', content: 'vansh_jain' },
  { type: 'command', content: 'cat education.txt' },
  { type: 'output', content: 'B.Tech in Computer Science Engineering' },
  { type: 'output', content: 'Expected Graduation: 2028' },
  { type: 'command', content: 'ls skills/' },
  { type: 'output', content: 'web-dev/ ai/ programming/ databases/' },
  { type: 'command', content: 'echo $PASSION' },
  { type: 'output', content: 'Building innovative tech solutions' },
];

const skills = [
  { name: 'Web Development', icon: <Code className="w-5 h-5" />, level: 85 },
  { name: 'Machine Learning', icon: <Layers className="w-5 h-5" />, level: 80 },
  { name: 'Programming', icon: <Cpu className="w-5 h-5" />, level: 90 },
  { name: 'Database Systems', icon: <Database className="w-5 h-5" />, level: 82 },
];

const Terminal = () => {
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    if (lineIndex >= terminalLines.length) return;

    const currentLineContent = terminalLines[lineIndex].content;

    if (charIndex < currentLineContent.length) {
      // Typing characters
      const timeout = setTimeout(() => {
        setCharIndex((prev) => prev + 1);
      }, 40); // Fast typing speed
      return () => clearTimeout(timeout);
    } else {
      // Line completed, simple delay before next line
      const timeout = setTimeout(() => {
        setLineIndex((prev) => prev + 1);
        setCharIndex(0);
      }, 300); // Pause between lines
      return () => clearTimeout(timeout);
    }
  }, [isInView, lineIndex, charIndex]);

  return (
    <TiltCard glowColor="red" intensity="subtle">
      <div ref={ref} className="glass rounded-2xl overflow-hidden border border-border/50 shadow-2xl">
        <div className="flex items-center gap-2 px-4 py-3 bg-primary/5 border-b border-border/50">
          <div className="flex gap-2">
            <motion.div className="w-3 h-3 rounded-full bg-destructive/80" whileHover={{ scale: 1.2 }} />
            <motion.div className="w-3 h-3 rounded-full bg-yellow-500/80" whileHover={{ scale: 1.2 }} />
            <motion.div className="w-3 h-3 rounded-full bg-green-500/80" whileHover={{ scale: 1.2 }} />
          </div>
          <span className="ml-2 text-xs font-mono text-muted-foreground">terminal — vansh@portfolio</span>
        </div>
        <div className="p-6 font-mono text-sm min-h-[300px] flex flex-col items-start bg-black/40 backdrop-blur-md">
          {terminalLines.map((line, index) => {
            // Only show lines that have started typing
            if (index > lineIndex) return null;

            // For the current line, slice the content. For completed lines, show full content.
            const displayContent = index === lineIndex
              ? line.content.slice(0, charIndex)
              : line.content;

            return (
              <div
                key={index}
                className={`mb-2 break-all text-left w-full ${line.type === 'command' ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {/* Visual marker for command lines */}
                {line.type === 'command' && <span className="mr-2 opacity-50">$</span>}

                {/* The text content (slicing out the '$ ' if it was part of content, but terminalLines content includes it? No, content includes '$ ' in the data above. Let's fix that data presentation.) */}
                {/* Looking at lines 6-16, content includes '$ whoami'. 
                    So I should remove the '$ ' from content if I'm adding it manually, OR just display content as is. 
                    The original data has '$ whoami'.
                    Let's just display content as is to be safe, but the flashing cursor needs to be at the end.
                */}
                <span>{displayContent.startsWith('$ ') ? displayContent.slice(2) : displayContent}</span>

                {/* Show cursor only on the active line */}
                {index === lineIndex && (
                  <motion.span
                    className="inline-block w-2 h-4 bg-primary ml-1 align-middle"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </TiltCard>
  );
};

export const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-32 px-6">
      {/* Ambient red glow */}
      <motion.div
        className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(0 70% 45%) 0%, transparent 70%)', filter: 'blur(80px)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-mono text-primary border border-primary/30 rounded-full">About Me</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-foreground">Who </span>
            <span className="gradient-text">I Am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Terminal />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Computer Science Engineering Student</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                I'm a B.Tech CSE student with a deep passion for software development, artificial intelligence, and building innovative web applications.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From developing full-stack applications to exploring machine learning algorithms, I thrive on challenging projects that push the boundaries of what's possible.
              </p>
            </div>

            <div>
              <h4 className="font-display text-lg font-semibold text-foreground mb-4">Core Competencies</h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                  >
                    <TiltCard glowColor="red" intensity="subtle" className="h-full">
                      <div className="glass p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors duration-300">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3 text-foreground">
                            <div className="p-2 bg-primary/10 rounded-lg text-primary">
                              {skill.icon}
                            </div>
                            <span className="font-semibold font-display tracking-wide">{skill.name}</span>
                          </div>
                          <span className="text-sm font-mono text-primary">{skill.level}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: 0.6 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative"
                          >
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 }}
            >
              <motion.a
                href="/Vansh_Jain_Resume.pdf"
                download="Vansh_Jain_Resume.pdf"
                className="group relative inline-flex items-center gap-3 px-8 py-4 font-display font-semibold text-primary-foreground bg-gradient-to-r from-primary to-accent rounded-lg btn-glow"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download className="w-5 h-5 transition-transform group-hover:-translate-y-1" />
                <span>Download Resume</span>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
