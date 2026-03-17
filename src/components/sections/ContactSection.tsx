import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export const ContactSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: wire up to an API
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" style={{ padding: '100px 24px 80px' }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          style={{ marginBottom: '60px' }}
        >
          <span className="section-eyebrow" style={{ marginBottom: '10px', display: 'block' }}>Contact</span>
          <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '14px' }}>
            Let's build something.
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--text-2)', maxWidth: '420px', lineHeight: 1.65 }}>
            Open to internships, freelance projects, and interesting collaborations.
            Reach out — I reply fast.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          {/* LEFT — Direct links */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
          >
            {/* Email CTA */}
            <a
              href="mailto:vjain5375@gmail.com"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.15s ease, background 0.15s ease',
                group: 'true',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--red-border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--red-dim)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--red-dim)', border: '1px solid var(--red-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--red)' }}>
                  <Mail size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '1px' }}>Email</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)', fontFamily: 'JetBrains Mono, monospace' }}>vjain5375@gmail.com</div>
                </div>
              </div>
              <ArrowUpRight size={15} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/vjain5375"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.14)';
                (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-2)' }}>
                  <Github size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '1px' }}>GitHub</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>vjain5375</div>
                </div>
              </div>
              <ArrowUpRight size={15} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/vansh-jain-8b3704273/"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '18px 20px',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '10px',
                textDecoration: 'none',
                transition: 'border-color 0.15s ease, background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.25)';
                (e.currentTarget as HTMLElement).style.background = 'var(--indigo-dim)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLElement).style.background = 'var(--bg-card)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'var(--indigo-dim)', border: '1px solid rgba(99,102,241,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--indigo)' }}>
                  <Linkedin size={15} />
                </div>
                <div>
                  <div style={{ fontSize: '12px', color: 'var(--text-3)', marginBottom: '1px' }}>LinkedIn</div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text)' }}>Vansh Jain</div>
                </div>
              </div>
              <ArrowUpRight size={15} style={{ color: 'var(--text-3)', flexShrink: 0 }} />
            </a>
          </motion.div>

          {/* RIGHT — Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { id: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
              ].map((f) => (
                <div key={f.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>{f.label}</label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    required
                    value={form[f.id as 'name' | 'email']}
                    onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                    style={{
                      background: 'var(--bg-card)', border: '1px solid var(--border)',
                      borderRadius: '8px', padding: '10px 14px', fontSize: '14px',
                      color: 'var(--text)', outline: 'none',
                      transition: 'border-color 0.15s ease',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--red-border)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '12px', color: 'var(--text-3)', fontWeight: 500 }}>Message</label>
                <textarea
                  placeholder="What are you building?"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border)',
                    borderRadius: '8px', padding: '10px 14px', fontSize: '14px',
                    color: 'var(--text)', outline: 'none', resize: 'vertical',
                    transition: 'border-color 0.15s ease', fontFamily: 'inherit',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--red-border)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--border)')}
                />
              </div>
              <button type="submit" className="btn-primary" style={{ justifyContent: 'center', marginTop: '4px' }}>
                {sent ? 'Message Sent ✓' : (
                  <><Send size={14} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
