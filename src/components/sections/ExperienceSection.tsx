import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Users, Megaphone } from 'lucide-react';

interface Item {
  year: string;
  title: string;
  org: string;
  icon: React.ElementType;
  desc?: string;
  current?: boolean;
  type: 'edu' | 'exp';
}

const items: Item[] = [
  { year: '2024–2028', title: 'B.Tech — CS & Design Engineering', org: 'RGIPT, Rae Bareli', icon: GraduationCap, desc: 'Pursuing undergraduate degree in Computer Science & Design Engineering', current: true, type: 'edu' },
  { year: '2021–2023', title: 'Class 12 (Senior Secondary)', org: 'Sacred Heart Convent School', icon: GraduationCap, desc: 'Completed higher secondary education', type: 'edu' },
  { year: '2011–2021', title: 'Class 10 (Secondary)', org: 'DAV Schools Network', icon: GraduationCap, desc: 'Completed secondary education with strong academic foundation', type: 'edu' },
  { year: '2025–Present', title: 'Campus Ambassador', org: 'E-Cell, IIT Bombay', icon: Award, desc: 'Representing E-Cell IIT Bombay, promoting entrepreneurship culture', current: true, type: 'exp' },
  { year: '2025', title: 'Executive', org: 'E-CELL, RGIPT', icon: Briefcase, desc: 'Driving entrepreneurial initiatives and startup ecosystem', type: 'exp' },
  { year: '2025', title: 'Executive', org: 'Science & Technical Council / ASPAC Club, RGIPT', icon: Users, desc: 'Organizing technical events and fostering innovation', type: 'exp' },
  { year: '2025', title: 'Marketing Executive', org: 'KALTARANG — RGIPT Cultural Fest', icon: Megaphone, desc: 'Leading marketing campaigns for the annual cultural festival', type: 'exp' },
];

const TimelineItem = ({ item, index }: { item: Item; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      style={{ display: 'flex', gap: '20px', position: 'relative' }}
    >
      {/* Icon + line */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
        <div style={{
          width: '34px', height: '34px', borderRadius: '8px',
          background: item.type === 'edu' ? 'var(--red-dim)' : 'var(--indigo-dim)',
          border: `1px solid ${item.type === 'edu' ? 'var(--red-border)' : 'rgba(99,102,241,0.2)'}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: item.type === 'edu' ? 'var(--red)' : 'var(--indigo)',
          flexShrink: 0,
        }}>
          <Icon size={15} />
        </div>
        {index < items.length - 1 && (
          <div style={{ width: '1px', flex: 1, background: 'var(--border)', marginTop: '6px', marginBottom: '6px' }} />
        )}
      </div>

      {/* Content */}
      <div style={{ paddingBottom: index < items.length - 1 ? '28px' : 0, flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
          <span style={{
            fontSize: '11px', fontFamily: 'JetBrains Mono, monospace',
            color: 'var(--text-3)', letterSpacing: '0.04em',
          }}>{item.year}</span>
          {item.current && (
            <span style={{
              fontSize: '10px', fontWeight: 600, padding: '1px 7px',
              background: 'rgba(16,185,129,0.1)', color: '#10b981',
              border: '1px solid rgba(16,185,129,0.25)', borderRadius: '99px',
              fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em',
            }}>CURRENT</span>
          )}
        </div>
        <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.015em', marginBottom: '3px' }}>{item.title}</h4>
        <p style={{ fontSize: '13px', color: item.type === 'edu' ? 'var(--red)' : 'var(--indigo)', fontWeight: 500, marginBottom: item.desc ? '4px' : 0 }}>{item.org}</p>
        {item.desc && <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: 1.6 }}>{item.desc}</p>}
      </div>
    </motion.div>
  );
};

export const ExperienceSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const eduItems = items.filter((i) => i.type === 'edu');
  const expItems = items.filter((i) => i.type === 'exp');

  return (
    <section id="education" style={{ padding: '100px 24px' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '60px' }}
        >
          <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Background</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)' }}>
            Education & Experience
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Education */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px',
              paddingBottom: '14px', borderBottom: '1px solid var(--border)',
            }}>
              <GraduationCap size={14} style={{ color: 'var(--red)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>Education</span>
            </div>
            <div>
              {eduItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Experience */}
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '28px',
              paddingBottom: '14px', borderBottom: '1px solid var(--border)',
            }}>
              <Briefcase size={14} style={{ color: 'var(--indigo)' }} />
              <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)', fontFamily: 'JetBrains Mono, monospace' }}>Experience</span>
            </div>
            <div>
              {expItems.map((item, i) => (
                <TimelineItem key={i} item={item} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
