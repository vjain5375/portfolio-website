import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Work', href: '#projects' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#education' },
  { name: 'Contact', href: '#contact' },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 inset-x-0 z-50"
      style={{
        background: scrolled ? 'rgba(14,14,14,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
        transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-1.5 group" style={{ textDecoration: 'none' }}>
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontWeight: 600,
            fontSize: '18px',
            color: '#f0f0f0',
            letterSpacing: '-0.02em',
          }}>
            vj<span style={{ color: 'var(--red)' }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: '13.5px',
                fontWeight: 500,
                color: 'var(--text-2)',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: '6px',
                transition: 'color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.color = 'var(--text)';
                (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.05)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.color = 'var(--text-2)';
                (e.target as HTMLElement).style.background = 'transparent';
              }}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="mailto:vjain5375@gmail.com" className="btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 rounded-md"
          style={{ color: 'var(--text-2)', background: 'transparent', border: 'none', cursor: 'pointer' }}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(14,14,14,0.96)', backdropFilter: 'blur(16px)' }}
          >
            <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: 'var(--text-2)',
                    textDecoration: 'none',
                    padding: '10px 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="mailto:vjain5375@gmail.com"
                onClick={() => setOpen(false)}
                className="btn-primary"
                style={{ marginTop: '8px', justifyContent: 'center' }}
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
