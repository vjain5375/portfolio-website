export const Footer = () => (
  <footer style={{
    borderTop: '1px solid rgba(255,255,255,0.06)',
    padding: '28px 24px',
  }}>
    <div className="max-w-6xl mx-auto" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '13px', color: 'var(--text-3)' }}>
        vj<span style={{ color: 'var(--red)' }}>.</span>
      </span>
      <span style={{ fontSize: '12px', color: 'var(--text-3)' }}>
        Built by Vansh Jain · {new Date().getFullYear()}
      </span>
    </div>
  </footer>
);
