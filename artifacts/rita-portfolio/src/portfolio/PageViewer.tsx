import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { ChevronLeft, ChevronRight, Download, Minus, Plus, X } from 'lucide-react';

import { pages } from './data';

const ZOOMS = [1, 1.5, 2] as const;
const ZOOM_LABELS = ['Fit', '150%', '200%'];
const RATIO = 2526 / 1786;

type Props = {
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

/** Full-screen page viewer with keyboard, swipe, zoom and thumbnails. */
export function PageViewer({ index, onChange, onClose }: Props) {
  const page = pages[index];
  const last = pages.length - 1;
  const [zoom, setZoom] = useState(0);
  const [fit, setFit] = useState<{ w: number; h: number } | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);

  const go = useCallback(
    (next: number) => {
      if (next < 0 || next > last) return;
      onChange(next);
    },
    [last, onChange],
  );

  // reset zoom when the page changes, keep the active thumbnail visible, preload neighbours
  useEffect(() => {
    setZoom(0);
    const active = thumbsRef.current?.querySelector<HTMLElement>('[aria-current="true"]');
    active?.scrollIntoView({ block: 'nearest', inline: 'center' });
    [index - 1, index + 1].forEach((i) => {
      if (pages[i]) new Image().src = pages[i].img;
    });
  }, [index]);

  // lock page scroll + move focus into the dialog, restore both on close
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  // fit the page inside the available stage
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const measure = () => {
      const { clientWidth: w, clientHeight: h } = frame;
      if (!w || !h) return;
      const width = Math.min(w, h * RATIO);
      setFit({ w: Math.round(width), h: Math.round(width / RATIO) });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);
    return () => ro.disconnect();
  }, []);

  // keep the zoomed image centred
  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.scrollLeft = (frame.scrollWidth - frame.clientWidth) / 2;
    frame.scrollTop = (frame.scrollHeight - frame.clientHeight) / 2;
  }, [zoom, fit]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        go(index + 1);
      } else if (e.key === 'ArrowLeft') {
        go(index - 1);
      } else if (e.key === '+' || e.key === '=') {
        setZoom((z) => Math.min(ZOOMS.length - 1, z + 1));
      } else if (e.key === '-' || e.key === '_') {
        setZoom((z) => Math.max(0, z - 1));
      } else if (e.key === 'Tab') {
        // keep focus inside the dialog
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]');
        if (!nodes || nodes.length === 0) return;
        const first = nodes[0];
        const lastNode = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          lastNode.focus();
        } else if (!e.shiftKey && document.activeElement === lastNode) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, onClose]);

  const zoomed = zoom > 0;
  const imgStyle: CSSProperties = fit
    ? { width: fit.w * ZOOMS[zoom], height: fit.h * ZOOMS[zoom] }
    : { maxWidth: '100%', maxHeight: '100%' };

  return (
    <div
      ref={dialogRef}
      className="viewer"
      role="dialog"
      aria-modal="true"
      aria-labelledby="viewer-title"
    >
      <div className="viewer__bar">
        <span className="viewer__count">
          {page.num} / {String(pages.length).padStart(2, '0')}
        </span>
        <span className="dot" style={{ background: page.color }} aria-hidden="true" />
        <h2 id="viewer-title" className="viewer__title">
          {page.title}
        </h2>
        <span className="viewer__meta">{page.meta}</span>
        <div className="viewer__tools">
          <div className="zoom" role="group" aria-label="Zoom">
            <button
              type="button"
              className="ibtn ibtn--bare"
              aria-label="Zoom out"
              disabled={zoom === 0}
              onClick={() => setZoom((z) => Math.max(0, z - 1))}
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <span className="zoom__label" aria-live="polite">
              {ZOOM_LABELS[zoom]}
            </span>
            <button
              type="button"
              className="ibtn ibtn--bare"
              aria-label="Zoom in"
              disabled={zoom === ZOOMS.length - 1}
              onClick={() => setZoom((z) => Math.min(ZOOMS.length - 1, z + 1))}
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
          <a
            className="ibtn viewer__download"
            href={page.img}
            download={`Rita_Matar_page_${page.num}.jpg`}
            aria-label={`Download page ${page.num}`}
          >
            <Download size={18} aria-hidden="true" />
          </a>
          <button ref={closeRef} type="button" className="ibtn ibtn--fill" aria-label="Close viewer" onClick={onClose}>
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="viewer__stage">
        <button
          type="button"
          className="ibtn ibtn--lg"
          aria-label="Previous page"
          disabled={index === 0}
          onClick={() => go(index - 1)}
        >
          <ChevronLeft size={24} aria-hidden="true" />
        </button>
        <div
          ref={frameRef}
          className={`viewer__frame${zoomed ? ' is-zoomed' : ''}`}
          onDoubleClick={() => setZoom((z) => (z === 0 ? 1 : 0))}
          onTouchStart={(e) => {
            touchX.current = e.touches.length === 1 ? e.touches[0].clientX : null;
          }}
          onTouchEnd={(e) => {
            if (zoomed || touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            touchX.current = null;
            if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
          }}
          onMouseDown={(e) => {
            if (!zoomed || !frameRef.current) return;
            e.preventDefault();
            drag.current = {
              x: e.clientX,
              y: e.clientY,
              left: frameRef.current.scrollLeft,
              top: frameRef.current.scrollTop,
            };
          }}
          onMouseMove={(e) => {
            const d = drag.current;
            if (!d || !frameRef.current) return;
            frameRef.current.scrollLeft = d.left - (e.clientX - d.x);
            frameRef.current.scrollTop = d.top - (e.clientY - d.y);
          }}
          onMouseUp={() => (drag.current = null)}
          onMouseLeave={() => (drag.current = null)}
        >
          <img key={page.img} src={page.img} alt={page.alt} style={imgStyle} draggable={false} />
        </div>
        <button
          type="button"
          className="ibtn ibtn--lg"
          aria-label="Next page"
          disabled={index === last}
          onClick={() => go(index + 1)}
        >
          <ChevronRight size={24} aria-hidden="true" />
        </button>
      </div>

      <div className="viewer__foot">
        <div className="viewer__mnav">
          <button
            type="button"
            className="ibtn"
            aria-label="Previous page"
            disabled={index === 0}
            onClick={() => go(index - 1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span>Swipe or tap the arrows</span>
          <button
            type="button"
            className="ibtn"
            aria-label="Next page"
            disabled={index === last}
            onClick={() => go(index + 1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
        <div ref={thumbsRef} className="thumbs" aria-label="All pages">
          {pages.map((p, i) => (
            <button
              key={p.n}
              type="button"
              className="thumb"
              aria-label={`Page ${p.num}: ${p.title}`}
              aria-current={i === index ? 'true' : undefined}
              style={{ '--thumb': p.color === '#FFFFFF' ? '#F2692E' : p.color } as CSSProperties}
              onClick={() => go(i)}
            >
              <img src={p.thumb} alt="" loading="lazy" />
            </button>
          ))}
        </div>
        <div className="keys" aria-hidden="true">
          <span>
            <kbd>←</kbd>
            <kbd>→</kbd>move
          </span>
          <span>
            <kbd>+</kbd>
            <kbd>−</kbd>zoom
          </span>
          <span>
            <kbd>Esc</kbd>close
          </span>
        </div>
      </div>
    </div>
  );
}
