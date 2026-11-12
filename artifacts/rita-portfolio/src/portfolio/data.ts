const BASE = import.meta.env.BASE_URL;

export const asset = (path: string) => `${BASE}${path}`;

export const PDF_URL = asset('Rita_Matar_Portfolio.pdf');
export const EMAIL = 'ritamatar800@gmail.com';
export const PHONE_DISPLAY = '(+961) 81 357 923';
export const PHONE_HREF = 'tel:+96181357923';
export const INSTAGRAM_HANDLE = 'rita.matarr';
export const INSTAGRAM_URL = 'https://www.instagram.com/rita.matarr';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/rita-matar-5656323aa';

export type Page = {
  /** 1-based page number in the PDF */
  n: number;
  num: string;
  title: string;
  meta: string;
  /** paint colour used for dots, highlights and the palette */
  color: string;
  /** darker stroke for the paint blob */
  dark: string;
  /** full-resolution page (2526 px wide) */
  img: string;
  /** 1280 px version for phones and tablets */
  imgSm: string;
  /** 240 px thumbnail for the viewer strip */
  thumb: string;
  alt: string;
  /** short write-up, shown as real text under the page on small screens */
  desc?: string;
  /** a translucent version of the paint for the highlighter effect */
  highlight: string;
};

const rawPages: Array<Omit<Page, 'imgSm' | 'thumb'>> = [
  {
    n: 1, num: '01', title: 'Portfolio', meta: 'Rita Matar · Graphic Design & Advertising Student',
    color: '#2E3192', dark: '#1B1E4B', highlight: 'rgba(46, 49, 146, 0.25)',
    img: asset('pages/page_01.jpg'),
    alt: 'Portfolio cover: hand-drawn PORTFOLIO lettering with a fez, a stick figure, a cedar, an evil eye, a pencil and a sun. Rita Matar, Graphic Design & Advertising Student.',
  },
  {
    n: 2, num: '02', title: 'Contents', meta: 'Every line is a link — jump straight there',
    color: '#2E3192', dark: '#1B1E4B', highlight: 'rgba(46, 49, 146, 0.25)',
    img: asset('pages/page_02.jpg'),
    alt: 'Contents page on lined notebook paper.',
  },
  {
    n: 3, num: '03', title: 'About me', meta: 'Antonine University · Branding, illustration & editorial',
    color: '#FFFFFF', dark: '#B5ADA0', highlight: 'rgba(244, 185, 33, 0.45)',
    img: asset('pages/page_03.jpg'),
    alt: 'About me: portrait of Rita Matar, a short bio, personal skills and the Adobe tools she uses.',
    desc: 'Graphic design student at Antonine University (UA) who sees design as a way to tell stories and give meaning to ideas. Enjoys transforming concepts into clear, expressive visuals, especially through branding, illustration and editorial design.',
  },
  {
    n: 4, num: '04', title: 'Crudo House', meta: 'Branding & Campaign Design · Illustrator, Photoshop',
    color: '#754921', dark: '#3E2510', highlight: 'rgba(117, 73, 33, 0.25)',
    img: asset('pages/page_04.jpg'),
    alt: 'Crudo House café identity: logo, pattern, colour palette, ordering app screens, stationery, apron and cap mockups.',
    desc: 'A warm, natural and inviting café identity. One visual system runs across print, merchandise and digital platforms, centred on freshness, authenticity and simplicity.',
  },
  {
    n: 5, num: '05', title: 'Miny Gems', meta: 'Branding & Packaging · Illustrator',
    color: '#F2692E', dark: '#B84610', highlight: 'rgba(242, 105, 46, 0.32)',
    img: asset('pages/page_05.jpg'),
    alt: 'Miny Gems packaging system: product box, inner tray, activity journal, explorer ID and collectible gem cards.',
    desc: 'A complete packaging system for an educational gem excavation kit: product box, inner packaging, activity journal, collectible cards and explorer ID, built for a memorable unboxing for children.',
  },
  {
    n: 6, num: '06', title: 'Unraveled', meta: 'Editorial Design · Illustrator, InDesign',
    color: '#8BCED6', dark: '#4A9AA8', highlight: 'rgba(139, 206, 214, 0.55)',
    img: asset('pages/page_06.jpg'),
    alt: 'Unraveled book cover, back cover and spine in black and white.',
    desc: 'Typography, illustration and book layout that reflect the story’s psychological themes. Cover, spine and back work together to speak about identity, memory and the complexity of the mind.',
  },
  {
    n: 7, num: '07', title: 'McDonald’s', meta: 'Presentation Design · Illustrator',
    color: '#FEC20F', dark: '#B88900', highlight: 'rgba(254, 194, 15, 0.45)',
    img: asset('pages/page_07.jpg'),
    alt: 'Marketing at McDonald’s presentation shown on a laptop, a tablet and a printed booklet.',
    desc: 'A presentation on McDonald’s marketing strategy with a brand-driven, clean visual system: clear hierarchy, consistent layouts and the signature palette to simplify marketing concepts.',
  },
  {
    n: 8, num: '08', title: 'Porsche Arabic', meta: 'Typography & Layout · Illustrator, InDesign',
    color: '#3F4DA1', dark: '#1F2460', highlight: 'rgba(63, 77, 161, 0.25)',
    img: asset('pages/page_08.jpg'),
    alt: 'Arabic adaptation of the Porsche wordmark with construction guides, a key fob, paper and building signage.',
    desc: 'A custom Arabic adaptation of Porsche’s wordmark that keeps its geometry, proportions and premium feel, refined through typographic analysis and real-world applications.',
  },
  {
    n: 9, num: '09', title: 'Ferrari', meta: 'Web Design · Adobe XD',
    color: '#C82027', dark: '#800D13', highlight: 'rgba(200, 32, 39, 0.25)',
    img: asset('pages/page_09.jpg'),
    alt: 'Responsive Scuderia Ferrari website concept on a laptop, a tablet and phones.',
    desc: 'A responsive website concept for Scuderia Ferrari: iconic red, black and white, dynamic layouts, editorial-inspired type and engaging interactions.',
  },
  {
    n: 10, num: '10', title: 'Mind Spill', meta: 'Illustration & Visual Storytelling · Illustrator',
    color: '#FFD189', dark: '#C9960A', highlight: 'rgba(255, 209, 137, 0.7)',
    img: asset('pages/page_10.jpg'),
    alt: 'Mind Spill coffee shop logo with a walking cup character, and a letterhead mockup.',
    desc: 'Branding for a coffee shop that encourages meaningful conversations. Warm tones, a playful illustrated logo and cohesive stationery invite customers to “spill what’s on their mind”.',
  },
  {
    n: 11, num: '11', title: 'Social Work Designs', meta: 'Booklet covers · Instagram carousel campaign',
    color: '#BA60A0', dark: '#7A3068', highlight: 'rgba(186, 96, 160, 0.35)',
    img: asset('pages/page_11.jpg'),
    alt: 'Six scouting booklet covers and The Mindful Box Instagram carousel.',
    desc: 'Concept-driven booklet covers that tell individual scouting members’ stories, plus a multi-slide Instagram carousel promoting a scouting initiative.',
  },
  {
    n: 12, num: '12', title: 'Contact info', meta: 'Tap to call, email or follow',
    color: '#1597D5', dark: '#0B5F88', highlight: 'rgba(21, 151, 213, 0.3)',
    img: asset('pages/page_12.jpg'),
    alt: 'Contact info page with phone, location, email, Instagram and LinkedIn.',
  },
];

export const pages: Page[] = rawPages.map((p) => ({
  ...p,
  imgSm: asset(`pages/page_${p.num}-1280.jpg`),
  thumb: asset(`pages/thumbs/page_${p.num}.jpg`),
}));

export const projects = pages.filter((p) => p.n >= 4 && p.n <= 10);

export const skills = [
  { label: 'Branding & Visual Identity', bg: '#FCD34D' },
  { label: 'Illustration', bg: '#8FD3DC' },
  { label: 'Adobe Creative Suite', bg: '#F5B4CF' },
  { label: 'Layout & Composition', bg: '#D7A9D3' },
  { label: 'Print & Digital Design', bg: '#F2A3A6' },
  { label: 'Typography', bg: '#9FD3AE' },
];

/** Paint blobs on the wooden palette: page they open, centre on the 268×224 palette, splash outline and satellite drops. */
export const paints: Array<{
  page: number;
  cx: number;
  cy: number;
  path: string;
  drops: Array<[number, number, number]>;
  shine: [number, number, number, number];
}> = [
  { page: 4, cx: 78, cy: 60, path: 'M 0,-26 C 10,-32 24,-24 26,-10 C 34,-3 29,11 17,17 C 21,27 9,33 -1,27 C -9,33 -22,26 -22,13 C -31,14 -31,0 -23,-9 C -27,-20 -15,-28 -5,-26 Z', drops: [[32, -12, 5], [36, 10, 4], [-28, -18, 3], [20, -33, 3]], shine: [-5, -8, 8, 6] },
  { page: 5, cx: 140, cy: 44, path: 'M 4,-28 C 14,-36 28,-26 27,-12 C 35,-4 30,12 18,18 C 23,29 10,35 0,29 C -8,35 -21,28 -21,15 C -31,16 -32,2 -23,-7 C -29,-18 -18,-30 -7,-28 Z', drops: [[-30, 18, 5], [30, -18, 4], [18, 33, 4], [-14, -34, 3]], shine: [-5, -8, 8, 6] },
  { page: 6, cx: 204, cy: 54, path: 'M -2,-26 C 8,-34 24,-26 25,-11 C 33,-3 27,13 15,19 C 20,29 7,35 -3,29 C -11,34 -23,27 -23,14 C -32,15 -32,1 -23,-8 C -28,-20 -16,-30 -5,-27 Z', drops: [[-32, 12, 5], [28, 24, 4], [-16, -34, 3], [34, -8, 3]], shine: [-5, -8, 8, 6] },
  { page: 3, cx: 34, cy: 118, path: 'M 2,-24 C 12,-30 24,-22 24,-8 C 32,-1 27,13 16,18 C 20,28 8,32 -1,27 C -9,33 -21,25 -21,12 C -30,13 -30,0 -22,-8 C -27,-19 -15,-26 -5,-25 Z', drops: [[30, -10, 5], [-24, 22, 4], [16, -30, 3], [-28, -8, 3]], shine: [-5, -8, 8, 6] },
  { page: 11, cx: 130, cy: 122, path: 'M 0,-34 C 12,-42 30,-32 32,-16 C 42,-7 36,14 22,22 C 28,35 14,42 2,36 C -8,43 -24,35 -25,20 C -37,22 -38,5 -28,-7 C -35,-22 -20,-38 -7,-35 Z', drops: [[40, -18, 7], [-38, 18, 6], [24, 42, 6], [-22, -40, 5], [44, 12, 4]], shine: [-6, -10, 10, 7] },
  { page: 7, cx: 226, cy: 112, path: 'M 3,-25 C 13,-31 26,-23 26,-9 C 34,-2 28,12 17,18 C 22,27 9,33 -1,28 C -9,33 -21,26 -21,13 C -30,14 -30,0 -22,-9 C -27,-19 -15,-27 -5,-25 Z', drops: [[-30, -16, 5], [30, 18, 4], [-18, 32, 4], [22, -32, 3]], shine: [-5, -8, 8, 6] },
  { page: 10, cx: 64, cy: 184, path: 'M 1,-26 C 11,-33 25,-25 25,-11 C 33,-4 28,12 17,17 C 21,27 9,33 -1,27 C -9,33 -21,25 -21,12 C -30,13 -30,0 -22,-9 C -27,-19 -15,-27 -5,-26 Z', drops: [[30, -14, 5], [-28, 16, 4], [-12, -32, 4], [24, 30, 3]], shine: [-5, -8, 8, 6] },
  { page: 9, cx: 130, cy: 192, path: 'M 4,-27 C 14,-34 28,-26 27,-11 C 35,-4 30,12 18,18 C 23,28 10,34 0,28 C -8,34 -21,26 -21,13 C -30,15 -31,1 -23,-8 C -28,-19 -17,-29 -6,-27 Z', drops: [[-34, -12, 5], [34, 14, 4], [16, -34, 4], [-20, 32, 3]], shine: [-5, -8, 8, 6] },
  { page: 8, cx: 198, cy: 182, path: 'M 2,-25 C 12,-31 25,-23 25,-9 C 33,-2 27,12 16,18 C 22,28 9,33 -1,27 C -9,33 -22,25 -22,12 C -30,13 -31,0 -23,-9 C -27,-19 -16,-27 -6,-25 Z', drops: [[-32, -14, 5], [32, 12, 4], [-14, 34, 4], [20, -32, 3]], shine: [-5, -8, 8, 6] },
];

export const pageById = (n: number) => pages[n - 1];
export const sectionId = (n: number) => `page-${n}`;
