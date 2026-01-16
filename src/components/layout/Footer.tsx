import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 px-6 border-t border-red-900/30 bg-gradient-to-t from-red-950/20 to-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent shadow-[0_0_15px_rgba(185,28,28,0.4)]">
              <Terminal className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-foreground">
              Vansh Jain<span className="text-primary">.</span>
            </span>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4">
            <motion.a
              href="https://github.com/vjain5375"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 text-red-400 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/vansh-jain-8b3704273/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 text-red-400 hover:text-blue-400 hover:drop-shadow-[0_0_10px_rgba(96,165,250,0.8)] transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:vjain5375@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 text-red-400 hover:text-red-300 hover:drop-shadow-[0_0_10px_rgba(252,165,165,0.8)] transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-red-300/80">
            © {currentYear} Developed by Vansh Jain. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

