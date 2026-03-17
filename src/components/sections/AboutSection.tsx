import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, MapPin, GraduationCap } from 'lucide-react';

const terminalLines = [
  { cmd: true,  text: 'whoami' },
  { cmd: false, text: 'vansh_jain — b.tech cse, rgipt' },
  { cmd: true,  text: 'cat stack.txt' },
  { cmd: false, text: 'react · next.js · node · python · three.js' },
  { cmd: true,  text: 'ls projects/ | wc -l' },
  { cmd: false, text: '8 shipped, 3 in progress' },
  { cmd: true,  text: 'echo $CURRENTLY_BUILDING' },
  { cmd: false, text: 'ai tools + full-stack platforms' },
  { cmd: true,  text: '_' },
];

const TerminalBlock = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    if (!inView || lineIdx >= terminalLines.length) return;
    const line = terminalLines[lineIdx].text;
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 28);
      return () => clearTimeout(t);
    }
    if (lineIdx < terminalLines.length - 1) {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 220);
      return () => clearTimeout(t);
    }
  }, [inView, lineIdx, charIdx]);

  return (
    <div
      ref={ref}
      style={{
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {/* Terminal title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '10px 14px',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
        <span style={{ marginLeft: '10px', fontSize: '11px', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>
          vansh@portfolio ~ zsh
        </span>
      </div>
      {/* Terminal content */}
      <div style={{ padding: '18px 20px', minHeight: '200px', fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', lineHeight: 1.75 }}>
        {terminalLines.map((line, i) => {
          if (i > lineIdx) return null;
          const display = i === lineIdx ? line.text.slice(0, charIdx) : line.text;
          const isLast = i === lineIdx;
          return (
            <div key={i} style={{ color: line.cmd ? '#ef4444' : '#a1a1aa' }}>
              {line.cmd && <span style={{ color: 'var(--text-3)', marginRight: '8px' }}>$</span>}
              {!line.cmd && <span style={{ color: 'var(--text-3)', marginRight: '8px' }}>→</span>}
              {display}
              {isLast && line.cmd && (
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.75, repeat: Infinity }}
                  style={{ display: 'inline-block', width: '7px', height: '13px', background: '#ef4444', marginLeft: '2px', verticalAlign: 'middle' }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const skillCategories = [
  {
    label: 'Frontend',
    color: 'var(--red)',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    label: 'Backend & Data',
    color: 'var(--indigo)',
    skills: ['Node.js', 'Express', 'MongoDB', 'Python', 'FastAPI', 'PostgreSQL'],
  },
  {
    label: 'AI / ML',
    color: '#10b981',
    skills: ['PyTorch', 'scikit-learn', 'Streamlit', 'LangChain', 'NLP'],
  },
  {
    label: 'Tools',
    color: 'var(--text-3)',
    skills: ['Git', 'Docker', 'Vercel', 'Linux', 'Figma', 'VS Code'],
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] } },
});

export const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="about" style={{ padding: '120px 24px' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ marginBottom: '64px' }}
        >
          <span className="section-eyebrow" style={{ marginBottom: '12px', display: 'block' }}>About</span>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1.15 }}>
            I'm a CS student who ships.
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 items-start">
          {/* LEFT — Story + quick facts */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-8"
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <p style={{ fontSize: '15.5px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '480px' }}>
                I'm Vansh — a 2nd-year B.Tech student at RGIPT specializing in CS &amp; Design Engineering.
                I write code that bridges design intuition with engineering precision.
              </p>
              <p style={{ fontSize: '15.5px', color: 'var(--text-2)', lineHeight: 1.75, maxWidth: '480px' }}>
                My focus areas are{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>full-stack web applications</span> and{' '}
                <span style={{ color: 'var(--text)', fontWeight: 500 }}>AI-powered tools</span> — building
                things that solve real problems and look good doing it.
              </p>
            </div>

            {/* Quick facts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
            }}>
              {[
                { icon: <MapPin size={13} />, text: 'Bathinda, Punjab' },
                { icon: <GraduationCap size={13} />, text: 'RGIPT · 2028' },
              ].map((f) => (
                <div
                  key={f.text}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    color: 'var(--text-2)',
                  }}
                >
                  <span style={{ color: 'var(--text-3)' }}>{f.icon}</span>
                  {f.text}
                </div>
              ))}
            </div>

            <TerminalBlock />

            <div>
              <a
                href="/Vansh_Jain_Resume.pdf"
                download
                className="btn-outline"
                style={{ display: 'inline-flex', gap: '8px' }}
              >
                <Download size={14} />
                Download Resume
              </a>
            </div>
          </motion.div>

          {/* RIGHT — Skill categories */}
          <motion.div
            variants={fadeUp(0.2)}
            initial="hidden"
            animate={inView ? 'show' : 'hidden'}
            className="flex flex-col gap-7"
          >
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '12px',
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: cat.color, flexShrink: 0 }} />
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-3)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'JetBrains Mono, monospace' }}>
                    {cat.label}
                  </span>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cat.skills.map((sk) => (
                    <span key={sk} className="chip">{sk}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
