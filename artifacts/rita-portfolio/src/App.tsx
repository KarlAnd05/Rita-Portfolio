import { useCallback, useEffect, useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowRight, ChevronDown, ChevronUp, Download, Maximize2 } from 'lucide-react';

import {
  EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PDF_URL,
  asset,
  pageById,
  pages,
  sectionId,
  skills,
  type Page,
} from './portfolio/data';
import { Crowd, PaintDots, Squiggle } from './portfolio/Decor';
import { MenuSheet } from './portfolio/MenuSheet';
import { Contact, Contents } from './portfolio/Notebook';
import { PageViewer } from './portfolio/PageViewer';
import { PaintPalette } from './portfolio/PaintPalette';
import './portfolio/portfolio.css';

const NAV = [
  { label: 'About', page: 3, pages: [3], color: '#2E3192' },
  { label: 'Work', page: 4, pages: [4, 5, 6, 7, 8, 9, 10], color: '#F2692E' },
  { label: 'Social Work', page: 11, pages: [11], color: '#BA60A0' },
  { label: 'Contact', page: 12, pages: [12], color: '#1597D5' },
];

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToPage(page: number) {
  const el = document.getElementById(sectionId(page));
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${sectionId(page)}`);
}

/** Tracks which page section is crossing the upper-middle of the viewport. */
function useCurrentPage() {
  const [current, setCurrent] = useState(1);
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('[data-page]'));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrent(Number(entry.target.getAttribute('data-page')));
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return current;
}

function Caption({ page, as: Tag = 'h2', onOpen }: { page: Page; as?: 'h1' | 'h2'; onOpen?: () => void }) {
  return (
    <div className="cap">
      <span className="cap__num">
        <span className="dot" style={{ background: page.color }} aria-hidden="true" />
        {page.num}
      </span>
      <Tag className="cap__title">{page.title}</Tag>
      <span className="cap__meta">{page.meta}</span>
      {onOpen && (
        <button type="button" className="btn btn--ghost btn--sm cap__open" onClick={onOpen}>
          <Maximize2 size={15} aria-hidden="true" />
          Full size
        </button>
      )}
    </div>
  );
}

function Sheet({ page, onOpen }: { page: Page; onOpen: () => void }) {
  return (
    <button type="button" className="sheet" onClick={onOpen} aria-label={`Open “${page.title}” full size`}>
      <img
        src={page.img}
        srcSet={`${page.imgSm} 1280w, ${page.img} 2526w`}
        sizes="(max-width: 1099px) 100vw, 1064px"
        alt={page.alt}
        width={2526}
        height={1786}
        loading={page.n <= 1 ? 'eager' : 'lazy'}
        decoding="async"
      />
      <span className="sheet__hint" aria-hidden="true">
        <Maximize2 size={14} />
        <span className="sheet__hint-mouse">View full size</span>
        <span className="sheet__hint-touch">Tap to zoom</span>
      </span>
    </button>
  );
}

export default function App() {
  const current = useCurrentPage();
  const [hovered, setHovered] = useState<number | null>(null);
  const [viewer, setViewer] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = useCallback((page: number) => scrollToPage(page), []);
  const closeViewer = useCallback(() => setViewer(null), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const open = (page: number) => () => setViewer(page - 1);

  const navLink = (page: number) => ({
    href: `#${sectionId(page)}`,
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      goTo(page);
    },
  });

  const shown = pageById(hovered ?? current);
  const activeNav = NAV.find((n) => n.pages.includes(current));

  const siteVars = {
    '--brush': `url(${asset('brush-cursor.png')}) 12 78, auto`,
    '--paper-tex': `url(${asset('paper.jpg')})`,
  } as CSSProperties;

  return (
    <div className="site" style={siteVars}>
      <a className="skip" href={`#${sectionId(3)}`}>
        Skip to the work
      </a>

      <header className="hdr">
        <div className="hdr__in">
          <a className="logo" {...navLink(1)} aria-label="Rita Matar, back to the cover">
            <PaintDots />
            <span className="logo__name">Rita Matar</span>
          </a>
          <span className="hdr__divider" aria-hidden="true" />
          <span className="hdr__role">Graphic Design &amp; Advertising Student</span>

          <nav className="nav" aria-label="Main">
            {NAV.map((n) => (
              <a
                key={n.label}
                {...navLink(n.page)}
                aria-current={activeNav === n ? 'true' : undefined}
                style={{ '--sq': n.color } as CSSProperties}
              >
                {n.label}
                <Squiggle className="nav__sq" />
              </a>
            ))}
          </nav>

          <div className="hdr__actions">
            <a className="btn btn--ghost hdr__pdf" href={PDF_URL} download="Rita_Matar_Portfolio.pdf">
              <Download size={18} aria-hidden="true" />
              PDF
            </a>
            <a className="btn btn--primary hdr__talk" {...navLink(12)}>
              Let’s talk
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <button
              type="button"
              className="btn btn--ghost menu-btn"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <svg className="menu-btn__dots" width="22" height="12" viewBox="0 0 22 12" aria-hidden="true">
                <circle cx="4" cy="6" r="4" fill="#F2692E" />
                <circle cx="11" cy="6" r="4" fill="#FEC20F" />
                <circle cx="18" cy="6" r="4" fill="#BA60A0" />
              </svg>
              Menu
            </button>
          </div>
        </div>
      </header>

      <div className="layout">
        <main className="pages" id="main">
          {pages.map((page) => {
            if (page.n === 2) {
              return (
                <section key={page.n} id={sectionId(page.n)} data-page={page.n} className="pg">
                  <Caption page={page} />
                  <Contents goTo={goTo} />
                </section>
              );
            }
            if (page.n === 12) {
              return (
                <section key={page.n} id={sectionId(page.n)} data-page={page.n} className="pg">
                  <Caption page={page} />
                  <Contact />
                </section>
              );
            }
            return (
              <section key={page.n} id={sectionId(page.n)} data-page={page.n} className="pg">
                <Caption page={page} as={page.n === 1 ? 'h1' : 'h2'} onOpen={open(page.n)} />
                <Sheet page={page} onOpen={open(page.n)} />
                {page.desc && <p className="pg__desc">{page.desc}</p>}
                {page.n === 3 && (
                  <ul className="chips" aria-label="Personal skills">
                    {skills.map((s) => (
                      <li key={s.label} style={{ background: s.bg }}>
                        {s.label}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            );
          })}
        </main>

        <aside className="rail" aria-label="Quick navigation">
          <span className="label">Jump with paint</span>
          <PaintPalette current={current} onHover={setHovered} onPick={goTo} />
          <div className="now" aria-live="polite">
            <span className="label">{hovered ? 'Jump to' : 'Now viewing'}</span>
            <div className="now__count">
              <span className="now__num">{shown.num}</span>
              <span className="now__of">/ 12</span>
            </div>
            <span className="now__title">{shown.title}</span>
            <span className="now__meta">{shown.meta}</span>
            <div className="progress" aria-hidden="true">
              {pages.map((p) => (
                <span
                  key={p.n}
                  style={{
                    background:
                      p.n < current ? 'var(--ink)' : p.n === current ? (p.color === '#FFFFFF' ? 'var(--ink)' : p.color) : undefined,
                  }}
                />
              ))}
            </div>
            <div className="now__nav">
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                aria-label="Previous page"
                disabled={current <= 1}
                onClick={() => goTo(current - 1)}
              >
                <ChevronUp size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="btn btn--ghost btn--icon"
                aria-label="Next page"
                disabled={current >= 12}
                onClick={() => goTo(current + 1)}
              >
                <ChevronDown size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <p className="rail__hint">Hover a paint blob to see the project, click to jump. Open any page full size and use ← → to flip through.</p>
        </aside>
      </div>

      <footer className="foot">
        <div className="foot__in">
          <div className="foot__top">
            <div className="foot__pitch">
              <p className="foot__title">Let’s make something together.</p>
              <p className="foot__sub">Graphic Design &amp; Advertising Student at Antonine University, based in Hadat, Lebanon.</p>
            </div>
            <div className="foot__links">
              <a className="btn btn--sun" href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
              <a className="btn btn--line" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                Instagram
              </a>
              <a className="btn btn--line" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
          <div className="foot__rule" />
          <div className="foot__bottom">
            <span className="foot__copy">© {new Date().getFullYear()} Rita Matar</span>
            <Crowd className="foot__crowd" />
            <a className="foot__top-link" {...navLink(1)}>
              Back to top
              <ChevronUp size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>

      {viewer !== null && <PageViewer index={viewer} onChange={setViewer} onClose={closeViewer} />}
      {menuOpen && <MenuSheet current={current} onClose={closeMenu} goTo={goTo} />}
    </div>
  );
}
