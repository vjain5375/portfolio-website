import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, X, ArrowUpRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  featured?: boolean;
  tag?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Kode Club',
    description: 'The official competitive programming platform for RGIPT — daily practice problems, quiz engine, live leaderboards, and an in-browser code compiler supporting 4+ languages.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Express', 'Tailwind CSS'],
    github: 'https://github.com/vjain5375/kode-klub-frontend',
    live: 'https://kode-club-alpha.vercel.app/',
    featured: true,
    tag: 'Full-Stack Platform',
  },
  {
    id: 2,
    title: 'AI Assistant — Deadpool',
    description: 'A Streamlit-based conversational AI assistant with NLP capabilities, custom persona, and intelligent task handling.',
    tech: ['Python', 'Streamlit', 'NLP', 'AI/ML'],
    live: 'https://deadpools.streamlit.app/',
    tag: 'AI / ML',
  },
  {
    id: 3,
    title: 'Portfolio Website',
    description: 'This portfolio — built with React, Three.js, and Framer Motion. Designed from scratch with a custom design system.',
    tech: ['React', 'TypeScript', 'Three.js', 'Framer Motion'],
    github: 'https://github.com/vjain5375/portfolio-website',
    live: 'https://vansh-jain-portfolio.vercel.app/',
    tag: 'Design + Code',
  },
];

const PreviewModal = ({ url, title, onClose }: { url: string; title: string; onClose: () => void }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          width: '100%', maxWidth: '960px', height: '80vh',
          background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '14px', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Browser bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)',
        }}>
          <div style={{ display: 'flex', gap: '5px' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', opacity: 0.7 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', opacity: 0.7 }} />
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', opacity: 0.7 }} />
          </div>
          <span style={{ flex: 1, fontSize: '12px', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '8px' }}>{url}</span>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-3)', display: 'flex', alignItems: 'center', padding: '4px' }}>
            <X size={14} />
          </button>
        </div>
        {/* Content */}
        <div style={{ flex: 1, position: 'relative', background: '#fff' }}>
          {!loaded && !error && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)' }}>
              <motion.div
                animate={{ rotate: 360 }} transition={{ duration: 0.9, repeat: Infinity, ease: 'linear' }}
                style={{ width: '22px', height: '22px', border: '2px solid rgba(239,68,68,0.2)', borderTopColor: 'var(--red)', borderRadius: '50%' }}
              />
            </div>
          )}
          {error && (
            <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-card)', gap: '12px' }}>
              <p style={{ color: 'var(--text-2)', fontSize: '14px' }}>Preview blocked by this site</p>
              <a href={url} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '13px', padding: '8px 18px' }}>Open in new tab <ExternalLink size={13} /></a>
            </div>
          )}
          <iframe
            src={url} title={title}
            style={{ width: '100%', height: '100%', border: 'none', opacity: loaded ? 1 : 0, transition: 'opacity 0.3s' }}
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setLoaded(true)}
            onError={() => setError(true)}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

const FeaturedProject = ({ project }: { project: Project }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [preview, setPreview] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          borderRadius: '14px',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1fr)',
        }}
      >
        <div style={{ padding: '36px 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '20px' }}>
            <div>
              <span className="section-eyebrow" style={{ marginBottom: '8px', display: 'block' }}>Featured Project</span>
              <h3 style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.025em', color: 'var(--text)' }}>{project.title}</h3>
            </div>
            {project.tag && (
              <span style={{
                fontSize: '11px', fontWeight: 500, padding: '4px 10px',
                background: 'var(--indigo-dim)', color: 'var(--indigo)',
                border: '1px solid rgba(99,102,241,0.2)',
                borderRadius: '99px', whiteSpace: 'nowrap', fontFamily: 'JetBrains Mono, monospace',
              }}>{project.tag}</span>
            )}
          </div>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', lineHeight: 1.7, marginBottom: '24px', maxWidth: '580px' }}>{project.description}</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '28px' }}>
            {project.tech.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '13px', padding: '8px 16px' }}>
                <Github size={14} /> Code
              </a>
            )}
            {project.live && (
              <button onClick={() => setPreview(true)} className="btn-primary" style={{ fontSize: '13px', padding: '8px 16px' }}>
                Live Preview <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {preview && project.live && (
          <PreviewModal url={project.live} title={project.title} onClose={() => setPreview(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hover, setHover] = useState(false);
  const [preview, setPreview] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: 'var(--bg-card)',
          border: `1px solid ${hover ? 'rgba(239,68,68,0.22)' : 'var(--border)'}`,
          borderRadius: '12px',
          padding: '28px 28px 24px',
          transition: 'border-color 0.2s ease, transform 0.2s ease',
          transform: hover ? 'translateY(-4px)' : 'translateY(0)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* Faint red corner glow on hover */}
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '120px', height: '120px',
          background: 'radial-gradient(circle, rgba(239,68,68,0.07) 0%, transparent 70%)',
          opacity: hover ? 1 : 0, transition: 'opacity 0.3s ease',
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            {project.tag && (
              <span style={{
                fontSize: '10.5px', fontWeight: 500, display: 'block', marginBottom: '8px',
                color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em', textTransform: 'uppercase',
              }}>{project.tag}</span>
            )}
            <h3 style={{ fontSize: '18px', fontWeight: 650, letterSpacing: '-0.02em', color: 'var(--text)' }}>{project.title}</h3>
          </div>
          <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', padding: '5px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', transition: 'all 0.15s ease', textDecoration: 'none' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border-2)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <Github size={14} />
              </a>
            )}
            {project.live && (
              <button onClick={() => setPreview(true)}
                style={{ color: 'var(--text-3)', display: 'flex', alignItems: 'center', padding: '5px', borderRadius: '6px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', cursor: 'pointer', transition: 'all 0.15s ease' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--red)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--red-border)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = 'var(--text-3)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}
              >
                <ArrowUpRight size={14} />
              </button>
            )}
          </div>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-2)', lineHeight: 1.7, flex: 1 }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {project.tech.map((t) => <span key={t} className="chip" style={{ fontSize: '11.5px', padding: '3px 10px' }}>{t}</span>)}
        </div>
      </motion.div>
      <AnimatePresence>
        {preview && project.live && (
          <PreviewModal url={project.live} title={project.title} onClose={() => setPreview(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export const ProjectsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const featured = projects.find((p) => p.featured)!;
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" style={{ padding: '100px 24px' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '52px' }}
        >
          <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Selected Work</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Things I've built
          </h2>
        </motion.div>

        {/* Featured */}
        <div style={{ marginBottom: '16px' }}>
          <FeaturedProject project={featured} />
        </div>

        {/* Remaining 2-col grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
          {/* Coming soon card */}
          <div style={{
            background: 'var(--bg-elevated)', border: '1px dashed rgba(255,255,255,0.08)',
            borderRadius: '12px', padding: '28px',
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            gap: '8px', minHeight: '180px',
          }}>
            <span style={{ fontSize: '22px' }}>🚧</span>
            <p style={{ fontSize: '13px', color: 'var(--text-3)', textAlign: 'center', lineHeight: 1.6 }}>
              More projects<br />in progress...
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
