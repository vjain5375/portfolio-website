import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles, MapPin, Github, Linkedin, Mail } from 'lucide-react';
import { useRef } from 'react';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-pattern opacity-10 pointer-events-none" />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background pointer-events-none" />

      {/* Ambient red glow — left side */}
      <div
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, hsl(0 70% 40%) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 w-full max-w-6xl mx-auto px-6"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-mono text-primary border border-primary/30 rounded-full glass">
            <Sparkles className="w-4 h-4" />
            B.Tech CSE Student · RGIPT
          </span>
        </motion.div>

        {/* Main content — photo left, bio right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* LEFT — Circular photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex-shrink-0 flex flex-col items-center gap-5"
          >
            {/* Photo with glowing red ring */}
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                animate={{
                  boxShadow: [
                    '0 0 30px hsl(0 70% 45% / 0.35), 0 0 60px hsl(0 70% 45% / 0.15)',
                    '0 0 50px hsl(0 70% 45% / 0.55), 0 0 90px hsl(0 70% 45% / 0.25)',
                    '0 0 30px hsl(0 70% 45% / 0.35), 0 0 60px hsl(0 70% 45% / 0.15)',
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ borderRadius: '50%' }}
              />
              {/* Spinning dashed border */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-dashed border-primary/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              />
              {/* Photo */}
              <div className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-primary/40">
                <img
                  src="/vansh.png"
                  alt="Vansh Jain"
                  className="w-full h-full object-cover object-top"
                />
                {/* Subtle red overlay at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
              </div>
            </div>

            {/* Social links below photo */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/vjain5375"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/vansh-jain-8b3704273/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:vjain5375@gmail.com"
                className="p-2 rounded-lg glass border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/40 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Bio */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex-1 text-center lg:text-left"
          >
            <motion.p variants={fadeUp} className="text-xl md:text-2xl text-muted-foreground font-light mb-2">
              Hi, I&apos;m
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-6xl font-bold mb-3 tracking-tight"
            >
              <span className="text-foreground">Vansh </span>
              <span className="text-primary">Jain</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground/80 font-medium mb-5">
              Full-Stack Developer &amp;{' '}
              <span className="text-primary/90">AI Engineer</span>
            </motion.p>

            {/* Location */}
            <motion.div variants={fadeUp} className="flex items-center gap-2 mb-6 justify-center lg:justify-start">
              <MapPin className="w-4 h-4 text-primary/60" />
              <span className="text-sm font-mono text-muted-foreground">Bathinda, Punjab · India</span>
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={fadeUp}
              className="text-base md:text-lg text-muted-foreground/80 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Passionate about building innovative software at the intersection of
              web development and artificial intelligence. Currently pursuing B.Tech
              in CS &amp; Design Engineering at RGIPT.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex gap-6 mb-8 justify-center lg:justify-start"
            >
              {[
                { value: '8+', label: 'Projects' },
                { value: '15+', label: 'Technologies' },
                { value: '2nd', label: 'Year' },
              ].map((stat) => (
                <div key={stat.label} className="text-center lg:text-left">
                  <div className="text-2xl font-bold text-primary font-mono">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Buttons */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
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
                href="#contact"
                className="px-8 py-4 font-display font-semibold text-foreground border border-border rounded-lg glass glass-hover transition-all duration-300"
                whileHover={{ scale: 1.05, borderColor: 'hsl(0 70% 45% / 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
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
