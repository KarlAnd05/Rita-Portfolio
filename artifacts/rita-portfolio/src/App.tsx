const BASE = import.meta.env.BASE_URL;

const pages = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `${BASE}pages/page_${num}.jpg`;
});

const pageLabels = [
  'Cover',
  'Contents',
  'About Me',
  'Design Projects — Crudo House',
  'Design Projects — Miny Gems',
  'Design Projects — Unraveled',
  'Design Projects — McDonald\'s',
  'Design Projects — Porsche Arabic',
  'Design Projects — Ferrari',
  'Design Projects — Mind Spill',
  'Social Work Designs',
  'Contact Info',
];

export default function App() {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', padding: '0' }}>
      {/* Header */}
      <header style={{
        background: '#111',
        padding: '16px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 12px rgba(0,0,0,0.5)',
      }}>
        <div>
          <span style={{ color: '#fff', fontFamily: 'Georgia, serif', fontSize: '18px', fontWeight: 'bold' }}>
            Rita Matar
          </span>
          <span style={{ color: '#aaa', fontFamily: 'Georgia, serif', fontSize: '14px', marginLeft: '12px' }}>
            Graphic Design &amp; Advertising Student
          </span>
        </div>
        <nav style={{ display: 'flex', gap: '20px' }}>
          {['About', 'Projects', 'Social Work', 'Contact'].map((label, i) => {
            const pageIndex = [2, 3, 10, 11][i];
            return (
              <a
                key={label}
                href={`#page-${pageIndex + 1}`}
                style={{
                  color: '#ccc',
                  textDecoration: 'none',
                  fontFamily: 'sans-serif',
                  fontSize: '13px',
                  letterSpacing: '0.05em',
                  transition: 'color 0.2s',
                }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = '#ccc')}
              >
                {label}
              </a>
            );
          })}
        </nav>
      </header>

      {/* Pages */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 64px' }}>
        {pages.map((src, i) => (
          <section
            key={i}
            id={`page-${i + 1}`}
            style={{ marginBottom: '24px' }}
          >
            <img
              src={src}
              alt={pageLabels[i]}
              loading={i < 2 ? 'eager' : 'lazy'}
              style={{
                width: '100%',
                display: 'block',
                borderRadius: '8px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
              }}
            />
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#111',
        padding: '24px',
        textAlign: 'center',
        color: '#666',
        fontFamily: 'sans-serif',
        fontSize: '13px',
      }}>
        © 2026 Rita Matar — Graphic Design &amp; Advertising Student, Antonine University
      </footer>
    </div>
  );
}
