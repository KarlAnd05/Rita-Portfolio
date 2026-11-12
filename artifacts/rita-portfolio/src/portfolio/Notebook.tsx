import { useEffect, useRef, useState, type CSSProperties, type MouseEvent, type ReactNode } from 'react';
import { ArrowRight, Check, Copy, Download } from 'lucide-react';

import {
  EMAIL,
  INSTAGRAM_HANDLE,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PDF_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  pageById,
  projects,
  sectionId,
} from './data';
import {
  Confetti,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  Star,
  StickFigure,
} from './Decor';

type GoTo = (page: number) => void;

const hl = (color: string) => ({ '--hl': color }) as CSSProperties;

function linkTo(page: number, goTo: GoTo) {
  return {
    href: `#${sectionId(page)}`,
    onClick: (e: MouseEvent) => {
      e.preventDefault();
      goTo(page);
    },
  };
}

function TocRow({
  page,
  label,
  extra,
  pnum,
  goTo,
}: {
  page: number;
  label: string;
  extra?: string;
  pnum?: string;
  goTo: GoTo;
}) {
  const p = pageById(page);
  return (
    <a className="nb__row" {...linkTo(page, goTo)}>
      <Star className="nb__star" />
      <span className="nb__row-text hl" style={hl(p.highlight)}>
        {label}
      </span>
      {extra && <span className="nb__extra">{extra}</span>}
      <span className="nb__pnum">{pnum ?? p.num}</span>
    </a>
  );
}

/** The Contents page, rebuilt as real links in the same notebook style. */
export function Contents({ goTo }: { goTo: GoTo }) {
  return (
    <nav aria-label="Contents" className="nb">
      <div className="nb__margin" aria-hidden="true" />
      <p className="nb__title" aria-hidden="true">
        Contents:
      </p>
      <TocRow page={3} label="About me" goTo={goTo} />
      <TocRow page={4} label="Design Projects" extra="Digital & Print" pnum="04–10" goTo={goTo} />
      <div className="nb__grid">
        {projects.map((p) => (
          <a key={p.n} className="nb__proj" {...linkTo(p.n, goTo)}>
            <span className="nb__dash" aria-hidden="true" />
            <span className="nb__proj-text hl" style={hl(p.highlight)}>
              {p.title}
            </span>
            <span className="nb__pnum">
              <span className="dot" style={{ background: p.color }} aria-hidden="true" />
              {p.num}
            </span>
          </a>
        ))}
      </div>
      <TocRow page={11} label="Social Work Designs" goTo={goTo} />
      <TocRow page={12} label="Contact info" goTo={goTo} />
      <StickFigure className="nb__figure" />
    </nav>
  );
}

function ContactRow({ icon, children, className }: { icon: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`nb__row${className ? ` ${className}` : ''}`}>
      {icon}
      {children}
    </div>
  );
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.setAttribute('readonly', '');
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

/** The Contact page, rebuilt with working links. */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const onCopy = async () => {
    const ok = await copyText(EMAIL);
    if (!ok) return;
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="nb">
      <div className="nb__margin" aria-hidden="true" />
      <p className="nb__title" aria-hidden="true">
        Contact info:
      </p>
      <ContactRow icon={<PhoneIcon className="nb__icon" />}>
        <a className="nb__link" href={PHONE_HREF}>
          <span className="sr-only">Phone: </span>
          {PHONE_DISPLAY}
        </a>
      </ContactRow>
      <ContactRow icon={<PinIcon className="nb__icon" />}>
        <span className="nb__text">
          <span className="sr-only">Location: </span>Hadat, Lebanon
        </span>
      </ContactRow>
      <ContactRow icon={<MailIcon className="nb__icon" />} className="nb__row--email">
        <a className="nb__link" href={`mailto:${EMAIL}`}>
          <span className="sr-only">Email: </span>
          {EMAIL}
        </a>
        <button type="button" className="btn btn--soft btn--sm" onClick={onCopy}>
          {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
        <span className="sr-only" aria-live="polite">
          {copied ? 'Email address copied' : ''}
        </span>
      </ContactRow>
      <ContactRow icon={<InstagramIcon className="nb__icon" />}>
        <a className="nb__link" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
          <span className="sr-only">Instagram: </span>
          {INSTAGRAM_HANDLE}
        </a>
      </ContactRow>
      <ContactRow icon={<LinkedInIcon className="nb__icon" />}>
        <a className="nb__link" href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          <span className="sr-only">LinkedIn: </span>
          Rita Matar
        </a>
      </ContactRow>
      <div style={{ height: 'var(--rule)' }} aria-hidden="true" />
      <div className="nb__row nb__actions">
        <a className="btn btn--primary" href={`mailto:${EMAIL}`}>
          Email me
          <ArrowRight size={18} aria-hidden="true" />
        </a>
        <a className="btn btn--soft" href={PDF_URL} download="Rita_Matar_Portfolio.pdf">
          <Download size={18} aria-hidden="true" />
          Download PDF portfolio
        </a>
      </div>
      <div className="note">Thanks for flipping through! Let’s make something together.</div>
      <Confetti className="confetti" />
    </div>
  );
}
