import { useEffect, useRef, type MouseEvent } from 'react';
import { Download, X } from 'lucide-react';

import { PDF_URL, pageById, paints, sectionId } from './data';

type Props = {
  current: number;
  onClose: () => void;
  goTo: (page: number) => void;
};

/** Tile order on the sheet: About first, projects in page order, Social Work last. */
const ORDER = [3, 4, 5, 6, 7, 8, 9, 10, 11];

/** Bottom sheet that replaces the wooden palette on tablets and phones. */
export function MenuSheet({ current, onClose, goTo }: Props) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'Tab') {
        const nodes = sheetRef.current?.querySelectorAll<HTMLElement>('button, a[href]');
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [onClose]);

  const pick = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    onClose();
    // let the sheet unmount (and the scroll lock lift) before scrolling
    window.requestAnimationFrame(() => goTo(page));
  };

  return (
    <>
      <div className="menu-backdrop" onClick={onClose} aria-hidden="true" />
      <div ref={sheetRef} className="menu" role="dialog" aria-modal="true" aria-labelledby="menu-title">
        <div className="menu__grip" aria-hidden="true" />
        <div className="menu__head">
          <div>
            <h2 id="menu-title" className="menu__title">
              Pick a paint
            </h2>
            <p className="menu__sub">Each colour opens a page</p>
          </div>
          <button ref={closeRef} type="button" className="btn btn--ghost btn--icon" aria-label="Close menu" onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <ul className="menu__grid">
          {ORDER.map((n) => {
            const page = pageById(n);
            const paint = paints.find((p) => p.page === n)!;
            const isCurrent = current === n;
            return (
              <li key={n}>
                <a
                  className="tile"
                  href={`#${sectionId(n)}`}
                  aria-current={isCurrent ? 'true' : undefined}
                  onClick={pick(n)}
                >
                  <svg width="54" height="54" viewBox="-40 -40 80 80" aria-hidden="true">
                    {paint.drops.slice(0, 2).map(([dx, dy, r], i) => (
                      <circle key={i} cx={dx} cy={dy} r={r} fill={page.color} />
                    ))}
                    <path d={paint.path} fill={page.color} stroke={page.dark} strokeWidth="1.2" />
                    {page.color !== '#FFFFFF' && (
                      <ellipse cx="-5" cy="-8" rx="8" ry="6" fill="#FFFFFF" opacity="0.35" />
                    )}
                  </svg>
                  <span className="tile__label">{page.title}</span>
                  <span className="tile__num">{page.num}</span>
                  {isCurrent && <span className="tile__now">Now</span>}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="menu__links">
          <a className="btn btn--ghost" href={`#${sectionId(2)}`} onClick={pick(2)}>
            Contents
          </a>
          <a className="btn btn--ghost" href={`#${sectionId(12)}`} onClick={pick(12)}>
            Contact
          </a>
          <a className="btn btn--primary" href={PDF_URL} download="Rita_Matar_Portfolio.pdf">
            <Download size={16} aria-hidden="true" />
            PDF
          </a>
        </div>
      </div>
    </>
  );
}
