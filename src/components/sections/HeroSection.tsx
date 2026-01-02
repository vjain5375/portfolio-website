import { motion } from 'framer-motion';
import { Scene3D } from '../3d/Scene3D';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export const HeroSection = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleGlitch = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Scene3D />
      
      {/* Grid overlay with red tint */}
      <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `
               linear-gradient(rgba(255, 0, 0, 0.03) 1px, transparent 1px),
               linear-gradient(90deg, rgba(255, 0, 0, 0.03) 1px, transparent 1px)
             `,
             backgroundSize: '50px 50px'
           }}
      />
      
      {/* Red gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/90 pointer-events-none" />
      
      {/* Red rim lighting effect */}
      <div className="absolute inset-0 rim-light pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />
        <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
        <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-red-500/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-mono text-red-500 border border-red-500/30 rounded-full glass">
            B.Tech CSE Student
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          onMouseEnter={handleGlitch}
        >
          <span className="text-foreground">Engineering</span>
          <br />
          <span 
            className={`gradient-text text-glow-red transition-all duration-300 ${isGlitching ? 'glitch-text' : ''}`}
            data-text="The Future"
          >
            The Future
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-muted-foreground font-light mb-4 max-w-2xl mx-auto"
        >
          Hi, I'm <span className="text-red-500 font-medium">Vansh Jain</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg text-muted-foreground/80 mb-12 max-w-xl mx-auto"
        >
          Passionate about web development, AI, and building innovative software solutions that push the boundaries of technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <motion.button
            onClick={scrollToProjects}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 font-display font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 rounded-lg rim-light transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
          </motion.button>
          
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 font-display font-semibold text-foreground border border-red-500/30 rounded-lg glass glass-hover transition-all duration-300 hover:border-red-500/50 hover:text-red-500"
          >
            Learn More
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator with red glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
        onClick={scrollToProjects}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-muted-foreground hover:text-red-500 transition-colors"
        >
          <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ 
              filter: [
                'drop-shadow(0 0 0px rgba(255, 0, 0, 0))',
                'drop-shadow(0 0 8px rgba(255, 0, 0, 0.5))',
                'drop-shadow(0 0 0px rgba(255, 0, 0, 0))'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};
