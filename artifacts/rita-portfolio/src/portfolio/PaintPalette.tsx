import type { MouseEvent } from 'react';

import { pageById, paints, sectionId } from './data';

type Props = {
  current: number;
  onHover: (page: number | null) => void;
  onPick: (page: number) => void;
};

/** The wooden paint palette: each blob jumps to a project page. */
export function PaintPalette({ current, onHover, onPick }: Props) {
  const ring = paints.find((p) => p.page === current);

  return (
    <svg
      className="palette"
      viewBox="0 0 268 224"
      role="group"
      aria-label="Paint palette: each colour opens a project"
      onMouseLeave={() => onHover(null)}
    >
      {/* wooden body + grain */}
      <ellipse cx="134" cy="112" rx="128" ry="106" fill="#C8904A" />
      <ellipse cx="134" cy="112" rx="116" ry="93" fill="none" stroke="#D9A860" strokeWidth="3" opacity="0.32" />
      <ellipse cx="134" cy="112" rx="98" ry="76" fill="none" stroke="#D9A860" strokeWidth="2" opacity="0.22" />
      <ellipse cx="134" cy="112" rx="76" ry="56" fill="none" stroke="#D9A860" strokeWidth="1.5" opacity="0.16" />
      <ellipse cx="134" cy="112" rx="128" ry="106" fill="none" stroke="#7A4D18" strokeWidth="4" />

      {/* thumb hole shows the page behind it */}
      <circle cx="190" cy="140" r="29" fill="#A0682A" />
      <circle cx="190" cy="140" r="24" style={{ fill: 'var(--stage)' }} />
      <circle cx="190" cy="140" r="24" fill="none" stroke="rgba(60, 34, 8, 0.25)" strokeWidth="3" />

      {paints.map((p) => {
        const page = pageById(p.page);
        const isWhite = page.color === '#FFFFFF';
        return (
          <a
            key={p.page}
            className="blob"
            href={`#${sectionId(p.page)}`}
            aria-label={`${page.title}, page ${page.num}`}
            onMouseEnter={() => onHover(p.page)}
            onFocus={() => onHover(p.page)}
            onBlur={() => onHover(null)}
            onClick={(e: MouseEvent) => {
              e.preventDefault();
              onPick(p.page);
            }}
          >
            <title>{`${page.num} · ${page.title}`}</title>
            <g transform={`translate(${p.cx} ${p.cy})`}>
              <g className="blob__body">
                {p.drops.map(([dx, dy, r], i) => (
                  <circle key={i} cx={dx} cy={dy} r={r} fill={page.color} />
                ))}
                <path d={p.path} fill={page.color} stroke={page.dark} strokeWidth="1.2" />
                {!isWhite && (
                  <ellipse
                    cx={p.shine[0]}
                    cy={p.shine[1]}
                    rx={p.shine[2]}
                    ry={p.shine[3]}
                    fill="#FFFFFF"
                    opacity="0.35"
                  />
                )}
              </g>
            </g>
          </a>
        );
      })}

      {ring && (
        <circle
          className="palette__ring"
          cx={ring.cx}
          cy={ring.cy}
          r="38"
          fill="none"
          stroke="#1B1E4B"
          strokeWidth="2"
          strokeDasharray="2 6"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
