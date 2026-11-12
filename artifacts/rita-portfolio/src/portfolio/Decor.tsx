import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Three overlapping paint dots — the site's logo mark. */
export function PaintDots({ size = 30, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" aria-hidden="true" {...rest}>
      <circle cx="10" cy="11" r="7" fill="#F2692E" />
      <circle cx="20" cy="10" r="6" fill="#FEC20F" />
      <circle cx="15" cy="20" r="7" fill="#3F4DA1" />
    </svg>
  );
}

/** Hand-drawn underline used under nav links. */
export function Squiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="44" height="6" viewBox="0 0 44 6" aria-hidden="true" {...props}>
      <path
        d="M1 4c6-3 10 1 15-1s9-2 14 0 9 1 13-1"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The yellow pentagram bullet from the Contents page. */
export function Star(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 30 30" aria-hidden="true" {...props}>
      <path
        d="M15 3 L22 26 L3 11 L27 11 L8 26 Z"
        fill="none"
        stroke="#F4B921"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StickFigure(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="22" height="40" viewBox="0 0 22 40" aria-hidden="true" {...props}>
      <g fill="none" stroke="#1B1E4B" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="11" cy="6" r="5" />
        <path d="M11 11v16M4 17l7 4 7-4M11 27l-6 11M11 27l6 11" />
      </g>
    </svg>
  );
}

/** A row of stick figures, like the page counters in the PDF. The last one waves. */
export function Crowd({ count = 11, ...rest }: SVGProps<SVGSVGElement> & { count?: number }) {
  const width = count * 22;
  return (
    <svg width={width} height="32" viewBox={`0 0 ${width} 32`} aria-hidden="true" {...rest}>
      <g fill="none" stroke="#B9B8D6" strokeWidth="1.6" strokeLinecap="round">
        {Array.from({ length: count }, (_, i) => {
          const waving = i === count - 1;
          return (
            <g key={i} transform={`translate(${i * 22} 0)`} stroke={waving ? '#FEC20F' : undefined}>
              <circle cx="9" cy="5" r="4" />
              <path d={waving ? 'M9 9v11M3 10l6 7 6-7M9 20l-5 10M9 20l5 10' : 'M9 9v11M3 13l6 4 6-4M9 20l-5 10M9 20l5 10'} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function Confetti(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="150" height="170" viewBox="0 0 150 170" aria-hidden="true" {...props}>
      <g fill="none" strokeLinecap="round" strokeWidth="4">
        <path d="M44 20v12" stroke="#1597D5" />
        <path d="M78 30l12 6" stroke="#E2207B" />
        <path d="M112 14c-4 4 5 6 0 12" stroke="#1597D5" strokeWidth="2.4" />
        <path d="M120 52l-6 10" stroke="#F4B921" />
        <path d="M24 54c4 4-4 6 0 12" stroke="#F4B921" strokeWidth="2.4" />
        <path d="M30 76l10 8" stroke="#D52A30" />
        <path d="M20 112l10 8" stroke="#6B2E91" />
        <path d="M116 98l-10 6" stroke="#1E8C45" />
        <path d="M130 104c-4 4 4 6 0 12" stroke="#D52A30" strokeWidth="2.4" />
        <path d="M52 118c-4 4 4 6 0 12" stroke="#E2207B" strokeWidth="2.4" />
      </g>
      <g fill="none" stroke="#1B1E4B" strokeWidth="3" strokeLinecap="round">
        <circle cx="75" cy="66" r="14" />
        <path d="M75 80v46M52 96l23 16 23-16M75 126l-16 30M75 126l16 30" />
      </g>
    </svg>
  );
}

const contactIcon = (stroke: string) => ({
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke,
  strokeWidth: 2.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
});

export function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...contactIcon('#F4B921')} {...props}>
      <path d="M5 3.5h3.5l2 5-2.6 1.6a11 11 0 0 0 6 6l1.6-2.6 5 2v3.5a2 2 0 0 1-2 2A17 17 0 0 1 3 5.5a2 2 0 0 1 2-2z" />
    </svg>
  );
}

export function PinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...contactIcon('#1E8C45')} {...props}>
      <path d="M12 21.5s7-6.4 7-11.8a7 7 0 0 0-14 0c0 5.4 7 11.8 7 11.8z" />
      <circle cx="12" cy="9.7" r="2.6" />
    </svg>
  );
}

export function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...contactIcon('#1597D5')} {...props}>
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 6.5 12 13l8.5-6.5M3.5 18l6-5.4M20.5 18l-6-5.4" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...contactIcon('#BA60A0')} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="#BA60A0" />
    </svg>
  );
}

export function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...contactIcon('#3F4DA1')} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <path d="M8 10.5v6.5M8 7.2v.1M12 17v-3.8a2.6 2.6 0 0 1 5.2 0V17M12 10.5V17" />
    </svg>
  );
}
