const BASE = import.meta.env.BASE_URL;

const pages = Array.from({ length: 12 }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `${BASE}pages/page_${num}.jpg`;
});

const pageLabels = [
  'Cover', 'Contents', 'About Me', 'Design Projects — Crudo House',
  'Design Projects — Miny Gems', 'Design Projects — Unraveled',
  "Design Projects — McDonald's", 'Design Projects — Porsche Arabic',
  'Design Projects — Ferrari', 'Design Projects — Mind Spill',
  'Social Work Designs', 'Contact Info',
];

// Each blob: color, darker stroke, page to scroll to, SVG center on palette, and satellite drops
const paints: Array<{
  color: string; dark: string; page: number; label: string;
  cx: number; cy: number; splashPath: string;
  drops: Array<{ dx: number; dy: number; r: number }>;
}> = [
  {
    color: '#754921', dark: '#3e2510', page: 4, label: 'Crudo House',
    cx: 78, cy: 60,
    splashPath: 'M 0,-26 C 10,-32 24,-24 26,-10 C 34,-3 29,11 17,17 C 21,27 9,33 -1,27 C -9,33 -22,26 -22,13 C -31,14 -31,0 -23,-9 C -27,-20 -15,-28 -5,-26 Z',
    drops: [{ dx: 32, dy: -12, r: 5 }, { dx: 36, dy: 10, r: 4 }, { dx: -28, dy: -18, r: 3 }, { dx: 20, dy: -33, r: 3 }],
  },
  {
    color: '#F2692E', dark: '#b84610', page: 5, label: 'Miny Gems',
    cx: 140, cy: 44,
    splashPath: 'M 4,-28 C 14,-36 28,-26 27,-12 C 35,-4 30,12 18,18 C 23,29 10,35 0,29 C -8,35 -21,28 -21,15 C -31,16 -32,2 -23,-7 C -29,-18 -18,-30 -7,-28 Z',
    drops: [{ dx: -30, dy: 18, r: 5 }, { dx: 30, dy: -18, r: 4 }, { dx: 18, dy: 33, r: 4 }, { dx: -14, dy: -34, r: 3 }],
  },
  {
    color: '#8BCED6', dark: '#4a9aa8', page: 6, label: 'Unraveled',
    cx: 204, cy: 54,
    splashPath: 'M -2,-26 C 8,-34 24,-26 25,-11 C 33,-3 27,13 15,19 C 20,29 7,35 -3,29 C -11,34 -23,27 -23,14 C -32,15 -32,1 -23,-8 C -28,-20 -16,-30 -5,-27 Z',
    drops: [{ dx: -32, dy: 12, r: 5 }, { dx: 28, dy: 24, r: 4 }, { dx: -16, dy: -34, r: 3 }, { dx: 34, dy: -8, r: 3 }],
  },
  {
    color: '#FFFFFF', dark: '#aaaaaa', page: 3, label: 'About Me',
    cx: 34, cy: 118,
    splashPath: 'M 2,-24 C 12,-30 24,-22 24,-8 C 32,-1 27,13 16,18 C 20,28 8,32 -1,27 C -9,33 -21,25 -21,12 C -30,13 -30,0 -22,-8 C -27,-19 -15,-26 -5,-25 Z',
    drops: [{ dx: 30, dy: -10, r: 5 }, { dx: -24, dy: 22, r: 4 }, { dx: 16, dy: -30, r: 3 }, { dx: -28, dy: -8, r: 3 }],
  },
  {
    // Pink — center, biggest blob
    color: '#BA60A0', dark: '#7a3068', page: 11, label: 'Social Work',
    cx: 130, cy: 122,
    splashPath: 'M 0,-34 C 12,-42 30,-32 32,-16 C 42,-7 36,14 22,22 C 28,35 14,42 2,36 C -8,43 -24,35 -25,20 C -37,22 -38,5 -28,-7 C -35,-22 -20,-38 -7,-35 Z',
    drops: [{ dx: 40, dy: -18, r: 7 }, { dx: -38, dy: 18, r: 6 }, { dx: 24, dy: 42, r: 6 }, { dx: -22, dy: -40, r: 5 }, { dx: 44, dy: 12, r: 4 }],
  },
  {
    color: '#FEC20F', dark: '#b88900', page: 7, label: "McDonald's",
    cx: 226, cy: 112,
    splashPath: 'M 3,-25 C 13,-31 26,-23 26,-9 C 34,-2 28,12 17,18 C 22,27 9,33 -1,28 C -9,33 -21,26 -21,13 C -30,14 -30,0 -22,-9 C -27,-19 -15,-27 -5,-25 Z',
    drops: [{ dx: -30, dy: -16, r: 5 }, { dx: 30, dy: 18, r: 4 }, { dx: -18, dy: 32, r: 4 }, { dx: 22, dy: -32, r: 3 }],
  },
  {
    color: '#FFD189', dark: '#c9960a', page: 10, label: 'Mind Spill',
    cx: 64, cy: 184,
    splashPath: 'M 1,-26 C 11,-33 25,-25 25,-11 C 33,-4 28,12 17,17 C 21,27 9,33 -1,27 C -9,33 -21,25 -21,12 C -30,13 -30,0 -22,-9 C -27,-19 -15,-27 -5,-26 Z',
    drops: [{ dx: 30, dy: -14, r: 5 }, { dx: -28, dy: 16, r: 4 }, { dx: -12, dy: -32, r: 4 }, { dx: 24, dy: 30, r: 3 }],
  },
  {
    color: '#C82027', dark: '#800d13', page: 9, label: 'Ferrari',
    cx: 130, cy: 192,
    splashPath: 'M 4,-27 C 14,-34 28,-26 27,-11 C 35,-4 30,12 18,18 C 23,28 10,34 0,28 C -8,34 -21,26 -21,13 C -30,15 -31,1 -23,-8 C -28,-19 -17,-29 -6,-27 Z',
    drops: [{ dx: -34, dy: -12, r: 5 }, { dx: 34, dy: 14, r: 4 }, { dx: 16, dy: -34, r: 4 }, { dx: -20, dy: 32, r: 3 }],
  },
  {
    color: '#3F4DA1', dark: '#1f2460', page: 8, label: 'Porsche',
    cx: 198, cy: 182,
    splashPath: 'M 2,-25 C 12,-31 25,-23 25,-9 C 33,-2 27,12 16,18 C 22,28 9,33 -1,27 C -9,33 -22,25 -22,12 C -30,13 -31,0 -23,-9 C -27,-19 -16,-27 -6,-25 Z',
    drops: [{ dx: -32, dy: -14, r: 5 }, { dx: 32, dy: 12, r: 4 }, { dx: -14, dy: 34, r: 4 }, { dx: 20, dy: -32, r: 3 }],
  },
];

function PaintPalette() {
  const scrollTo = (page: number) => {
    document.getElementById(`page-${page}`)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <style>{`
        .blob-g { cursor: none; }
        .blob-main, .blob-drop {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-box: fill-box;
          transform-origin: center;
        }
        .blob-g:hover .blob-main { transform: scale(1.32); }
        .blob-g:hover .blob-drop { transform: scale(1.28); }
        .blob-g .blob-shadow {
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          transform-box: fill-box;
          transform-origin: center;
        }
        .blob-g:hover .blob-shadow { transform: scale(1.32); opacity: 0.15; }
      `}</style>

      <div style={{
        position: 'fixed',
        top: '56px',
        right: '12px',
        zIndex: 200,
        filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.55))',
      }}>
        <svg width="268" height="224" viewBox="0 0 268 224"
          xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>

          {/* Palette wooden body */}
          <ellipse cx="134" cy="112" rx="128" ry="106" fill="#C8904A" />

          {/* Wood grain shading */}
          <ellipse cx="134" cy="112" rx="116" ry="93" fill="none" stroke="#D9A860" strokeWidth="3" opacity="0.3" />
          <ellipse cx="134" cy="112" rx="98" ry="76" fill="none" stroke="#D9A860" strokeWidth="2" opacity="0.2" />
          <ellipse cx="134" cy="112" rx="76" ry="56" fill="none" stroke="#D9A860" strokeWidth="1.5" opacity="0.15" />

          {/* Palette edge */}
          <ellipse cx="134" cy="112" rx="128" ry="106" fill="none" stroke="#7a4d18" strokeWidth="5" />

          {/* Thumb hole */}
          <circle cx="190" cy="138" r="30" fill="#a0682a" />
          <circle cx="190" cy="138" r="26" fill="#1a1a1a" opacity="0.88" />

          {/* Paint splashes */}
          {paints.map((p) => (
            <g
              key={p.page}
              className="blob-g"
              onClick={() => scrollTo(p.page)}
              role="button"
              aria-label={`Go to ${p.label}`}
            >
              <title>{p.label}</title>

              {/* Drop shadows */}
              <g transform={`translate(${p.cx + 4}, ${p.cy + 6})`} opacity="0.28">
                <path className="blob-shadow" d={p.splashPath} fill="#000" />
                {p.drops.map((d, i) => (
                  <circle key={i} cx={d.dx} cy={d.dy} r={d.r} fill="#000" />
                ))}
              </g>

              {/* Main splash blob */}
              <g transform={`translate(${p.cx}, ${p.cy})`}>
                {/* Satellite drops */}
                {p.drops.map((d, i) => (
                  <circle key={i} className="blob-drop"
                    cx={d.dx} cy={d.dy} r={d.r}
                    fill={p.color} stroke={p.dark} strokeWidth="1"
                  />
                ))}
                {/* Main blob shape */}
                <path className="blob-main"
                  d={p.splashPath}
                  fill={p.color}
                  stroke={p.dark}
                  strokeWidth="1.2"
                />
                {/* Glossy highlight */}
                <ellipse
                  cx={-5} cy={-8}
                  rx={8} ry={6}
                  fill="white" opacity="0.38"
                  style={{ pointerEvents: 'none' }}
                />
              </g>
            </g>
          ))}
        </svg>
      </div>
    </>
  );
}

export default function App() {
  const brushCursor = `url(${BASE}brush-cursor.png) 12 78, crosshair`;

  return (
    <div style={{ background: '#1a1a1a', minHeight: '100vh', cursor: brushCursor }}>

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
        <nav style={{ display: 'flex', gap: '20px', marginRight: '230px' }}>
          {['About', 'Projects', 'Social Work', 'Contact'].map((label, i) => {
            const pageNum = [3, 4, 11, 12][i];
            return (
              <a key={label} href={`#page-${pageNum}`}
                style={{ color: '#ccc', textDecoration: 'none', fontFamily: 'sans-serif', fontSize: '13px', letterSpacing: '0.05em', transition: 'color 0.2s' }}
                onMouseOver={e => (e.currentTarget.style.color = '#fff')}
                onMouseOut={e => (e.currentTarget.style.color = '#ccc')}
              >{label}</a>
            );
          })}
        </nav>
      </header>

      {/* Fixed paint palette */}
      <PaintPalette />

      {/* Pages */}
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '32px 16px 64px' }}>
        {pages.map((src, i) => (
          <section key={i} id={`page-${i + 1}`} style={{ marginBottom: '24px' }}>
            <img
              src={src}
              alt={pageLabels[i]}
              loading={i < 2 ? 'eager' : 'lazy'}
              style={{ width: '100%', display: 'block', borderRadius: '8px', boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
            />
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer style={{
        background: '#111', padding: '24px', textAlign: 'center',
        color: '#666', fontFamily: 'sans-serif', fontSize: '13px',
      }}>
        © 2026 Rita Matar — Graphic Design &amp; Advertising Student, Antonine University
      </footer>
    </div>
  );
}
