import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';
import { useRef } from 'react';

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-15 pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-background/80 pointer-events-none" />

      {/* Static red glow behind content */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[300px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(0 70% 40%) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-mono text-primary border border-primary/30 rounded-full glass">
            <Sparkles className="w-4 h-4" />
            B.Tech CSE Student
          </span>
        </motion.div>

        {/* Name */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-2xl md:text-3xl text-muted-foreground font-light mb-4 max-w-2xl mx-auto"
        >
          Hi, I'm <span className="text-primary font-medium">Vansh Jain</span>
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65 }}
          className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto"
        >
          Passionate about web development, AI, and building innovative software solutions that push the boundaries of technology.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToProjects}
            className="group relative px-8 py-4 font-display font-semibold text-primary-foreground bg-primary rounded-lg btn-glow overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View My Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 100%' }}
            />
          </motion.button>

          <motion.a
            href="#about"
            className="px-8 py-4 font-display font-semibold text-foreground border border-border rounded-lg glass glass-hover transition-all duration-300"
            whileHover={{ scale: 1.05, borderColor: 'hsl(0 70% 45% / 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            Learn More
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 10px hsl(0 70% 45% / 0.3)',
                '0 0 20px hsl(0 70% 45% / 0.5)',
                '0 0 10px hsl(0 70% 45% / 0.3)',
              ],
            }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="p-2 rounded-full border border-primary/30"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
