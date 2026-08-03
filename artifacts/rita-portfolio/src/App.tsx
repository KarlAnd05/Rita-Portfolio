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
  "Design Projects — McDonald's",
  'Design Projects — Porsche Arabic',
  'Design Projects — Ferrari',
  'Design Projects — Mind Spill',
  'Social Work Designs',
  'Contact Info',
];

// Each paint blob: color, target page (1-indexed), label, and SVG center + radii
const paints = [
  // top row
  { color: '#754921', dark: '#4a2e12', page: 4,  label: 'Crudo House',     cx: 70,  cy: 50,  rx: 22, ry: 18 },
  { color: '#F2692E', dark: '#c94e1a', page: 5,  label: 'Miny Gems',       cx: 118, cy: 33,  rx: 22, ry: 18 },
  { color: '#8BCED6', dark: '#5baab5', page: 6,  label: 'Unraveled',       cx: 163, cy: 42,  rx: 21, ry: 17 },
  // middle row
  { color: '#FFFFFF', dark: '#bbbbbb', page: 3,  label: 'About Me',        cx: 28,  cy: 94,  rx: 24, ry: 20 },
  { color: '#BA60A0', dark: '#8a3e74', page: 11, label: 'Social Work',     cx: 100, cy: 92,  rx: 28, ry: 24 },
  { color: '#FEC20F', dark: '#c9950a', page: 7,  label: "McDonald's",      cx: 178, cy: 88,  rx: 21, ry: 18 },
  // bottom row
  { color: '#FFD189', dark: '#d4a355', page: 10, label: 'Mind Spill',      cx: 48,  cy: 146, rx: 22, ry: 18 },
  { color: '#C82027', dark: '#8a1219', page: 9,  label: 'Ferrari',         cx: 98,  cy: 150, rx: 22, ry: 18 },
  { color: '#3F4DA1', dark: '#272f68', page: 8,  label: 'Porsche',         cx: 150, cy: 144, rx: 22, ry: 18 },
];

function PaintPalette() {
  const scrollToPage = (pageNum: number) => {
    const el = document.getElementById(`page-${pageNum}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .paint-blob-group {
          cursor: pointer;
        }
        .paint-blob-group .blob-body {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-box: fill-box;
          transform-origin: center;
        }
        .paint-blob-group:hover .blob-body {
          transform: scale(1.35);
        }
        .paint-blob-group .blob-shadow {
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s;
          transform-box: fill-box;
          transform-origin: center;
        }
        .paint-blob-group:hover .blob-shadow {
          transform: scale(1.35);
          opacity: 0.15;
        }
      `}</style>
      <div
        style={{
          position: 'fixed',
          top: '58px',
          right: '14px',
          zIndex: 200,
          filter: 'drop-shadow(0 6px 20px rgba(0,0,0,0.5))',
          pointerEvents: 'none',
        }}
      >
        <svg
          width="200"
          height="172"
          viewBox="0 0 205 175"
          xmlns="http://www.w3.org/2000/svg"
          style={{ pointerEvents: 'all', display: 'block' }}
        >
          {/* Wooden palette body */}
          <ellipse cx="103" cy="92" rx="99" ry="80" fill="#C8904A" />

          {/* Wood grain rings */}
          <ellipse cx="103" cy="92" rx="88" ry="68" fill="none" stroke="#D9A860" strokeWidth="2.5" opacity="0.35" />
          <ellipse cx="103" cy="92" rx="74" ry="55" fill="none" stroke="#D9A860" strokeWidth="1.5" opacity="0.25" />

          {/* Wood edge shading */}
          <ellipse cx="103" cy="92" rx="99" ry="80" fill="none" stroke="#8B5E2A" strokeWidth="4" />

          {/* Thumb hole ring */}
          <circle cx="147" cy="107" r="25" fill="#A86E30" />
          <circle cx="147" cy="107" r="21" fill="#1a1a1a" opacity="0.9" />

          {/* Paint blobs */}
          {paints.map((p) => (
            <g
              key={p.page}
              className="paint-blob-group"
              onClick={() => scrollToPage(p.page)}
              role="button"
              aria-label={`Go to ${p.label}`}
            >
              <title>{p.label}</title>

              {/* Shadow (behind blob) */}
              <ellipse
                className="blob-shadow"
                cx={p.cx + 3}
                cy={p.cy + 5}
                rx={p.rx}
                ry={p.ry}
                fill="rgba(0,0,0,0.3)"
              />

              {/* Main blob */}
              <ellipse
                className="blob-body"
                cx={p.cx}
                cy={p.cy}
                rx={p.rx}
                ry={p.ry}
                fill={p.color}
                stroke={p.dark}
                strokeWidth="1.2"
              />

              {/* Glossy highlight on blob */}
              <ellipse
                cx={p.cx - p.rx * 0.28}
                cy={p.cy - p.ry * 0.32}
                rx={p.rx * 0.38}
                ry={p.ry * 0.28}
                fill="white"
                opacity="0.4"
                style={{ pointerEvents: 'none' }}
                className="blob-body"
              />
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}

export default function App() {
  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh' }}>
      {/* Header */}
      <header style={{
        background: '#111',
        padding: '14px 24px',
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
        <nav style={{ display: 'flex', gap: '20px', marginRight: '220px' }}>
          {['About', 'Projects', 'Social Work', 'Contact'].map((label, i) => {
            const pageIndex = [3, 4, 11, 12][i];
            return (
              <a
                key={label}
                href={`#page-${pageIndex}`}
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

      {/* Fixed paint palette navigator */}
      <PaintPalette />

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
