import { motion } from 'framer-motion';
import { Terminal, Github, Linkedin, Mail } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="relative py-12 px-6 border-t border-red-900/10 dark:border-red-900/30 bg-gradient-to-t from-red-950/5 via-transparent to-transparent">
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
              className="p-2 text-muted-foreground hover:text-foreground transition-all duration-300"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/vansh-jain-8b3704273/"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 text-muted-foreground hover:text-blue-500 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:vjain5375@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              className="p-2 text-muted-foreground hover:text-red-500 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </div>

          {/* Copyright with Story Element */}
          <div className="text-sm text-muted-foreground/80 text-center md:text-right">
            <p>© {currentYear} Developed by Vansh Jain.</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              key={theme}
              className="text-xs font-mono mt-1 text-primary/60"
            >
              {theme === 'dark' ? "Some doors stay open." : "All Rights Reserved."}
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
};

