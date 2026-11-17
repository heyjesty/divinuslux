/**
 * Company facts. Everything here is taken from the existing divinuslux.com
 * pages or the official portfolio PDF (assets/project/PORTFOLIO.pdf).
 * Update this file — not the components — when details change.
 */

export const SITE_URL = 'https://www.divinuslux.com';

export const company = {
  name: 'Divinuslux',
  legalName: 'Divinuslux Pvt Ltd',
  tagline: 'Where Tech Shines Bright',
  logo: '/images/brand/logo.png',
  mark: '/images/brand/mark.png',
  shortDescription:
    'A software development and digital marketing company from Kochi, Kerala — building custom software, mobile apps, websites and growth campaigns for businesses worldwide.',
  intro: [
    'Divinuslux Pvt Ltd is a technology and digital marketing company delivering innovative software solutions, mobile applications and performance-driven digital experiences.',
    'We combine creativity, strategy and technology to help businesses operate smarter, grow faster and build meaningful digital connections.',
  ],
  story:
    'Divinuslux Pvt Ltd was founded on the belief that technology, when crafted with purpose, can unlock extraordinary business potential. It began its journey in Kochi, Kerala, with a strong passion for technology and innovation, and has grown into a company with a presence across multiple countries — delivering projects and building lasting relationships with clients across industries.',
  mission: {
    statement:
      'To deliver innovative and reliable digital solutions that empower businesses to grow faster, operate smarter, and achieve long-term success.',
    points: [
      'Provide customised software and digital marketing solutions',
      'Enhance business efficiency through smart technology',
      'Ensure client satisfaction with high-quality services',
    ],
  },
  vision: {
    statement:
      'To become a globally recognised leader in software development and digital marketing by driving innovation, embracing emerging technologies, and creating impactful digital experiences.',
    points: [
      'Drive innovation using emerging technologies',
      'Expand global presence and impact',
      'Create future-ready digital experiences',
    ],
  },
  contact: {
    email: 'mail@divinuslux.com',
    phones: ['+91 7711000046', '+91 7288000056'],
    address: {
      lines: ['Arya Bhangy Business Center,', 'NH 544, Muttom,', 'Ernakulam, Kerala, India.'],
      street: 'Arya Bhangy Business Center, NH 544, Muttom, Kalamassery',
      locality: 'Kochi',
      region: 'Kerala',
      postalCode: '683106',
      country: 'IN',
    },
    mapUrl: 'https://maps.app.goo.gl/NDpz1WLJFqjFqkHKA',
  },
  /** Office cities listed in the existing site footer and page titles. */
  offices: [
    { city: 'Kochi', country: 'India', hq: true, image: '/images/offices/india.webp' },
    { city: 'Atlanta', country: 'USA', image: '/images/offices/usa.webp' },
    { city: 'Poole', country: 'United Kingdom' },
    { city: 'Naples', country: 'Italy', image: '/images/offices/italy.webp' },
    { city: 'Lisbon', country: 'Portugal', image: '/images/offices/portugal.webp' },
  ],
  /**
   * Social profiles. The current site only links to "#!" placeholders, so these
   * are intentionally empty. Add verified URLs and they appear in the footer.
   */
  social: {
    instagram: '',
    linkedin: '',
    facebook: '',
    x: '',
    youtube: '',
  } as Record<string, string>,
  /** Optional hero video (licensed). Leave empty to use the generated canvas visual. */
  heroVideo: '' as string,
  heroPoster: '/images/hero-poster.webp',
};

/**
 * Figures shown on the site. Each one is countable from public material:
 * offices from the site footer, projects and accounts from the portfolio PDF.
 *
 * NOT shown (conflicting or unverifiable on the current site — confirm with
 * the team before adding): "8+ countries" vs "10+ countries", "1500+ companies",
 * "3,000 projects", "5k decision-makers", "82.4% growth", "95% / 90% / 92%".
 */
export const stats = [
  { value: 5, suffix: '', label: 'Office cities', detail: 'Kochi · Atlanta · Poole · Naples · Lisbon' },
  { value: 10, suffix: '', label: 'Websites in our portfolio', detail: 'Built for brands in India, the UAE and beyond' },
  { value: 12, suffix: '', label: 'Brand social accounts managed', detail: 'Hospitality, education, retail, real estate' },
  { value: 40, prefix: '₹', suffix: 'L+', label: 'Revenue from one Meta campaign', detail: '80 confirmed international tour bookings' },
];

/** Brands named in the official portfolio (websites + social accounts). */
export const clientBrands = [
  'MessHub',
  'Bitdrive',
  'Phonetech Education',
  'Fuddooo',
  'LN Interiors',
  'Arya Bhangy Builders',
  'Arya Bhangy Coworking',
  'Thoshgod Holidays',
  'Newcrest Solar',
  'Samiya Wedding Centre',
  'Izza Power',
  'My Gold Wallet',
  'Hedra Interior Furniture',
  'Sugar Business Hotel',
  'Gridspace',
  'Ostrax Institute',
];

export const process = [
  {
    n: '01',
    title: 'Discovery & Consultation',
    text: 'We start by understanding your business goals, gathering requirements and studying your market and competitors — then agree a clear project scope.',
    points: ['Business goals', 'Requirement analysis', 'Market & competitor insights', 'Scope finalisation'],
  },
  {
    n: '02',
    title: 'Strategy & Planning',
    text: 'We design the solution architecture, select the right technology stack, plan UI/UX with wireframes and set a roadmap with milestones.',
    points: ['Solution architecture', 'Technology selection', 'UI/UX wireframes', 'Roadmap & milestones'],
  },
  {
    n: '03',
    title: 'Development & Execution',
    text: 'Our team builds the software, apps or campaigns, implements features and integrations, and tests thoroughly before anything goes live.',
    points: ['Custom development', 'Integrations', 'Quality testing', 'SEO & marketing setup'],
  },
  {
    n: '04',
    title: 'Launch & Ongoing Support',
    text: 'We deploy and launch, monitor performance, and keep improving with continuous updates, optimisation and dedicated maintenance.',
    points: ['Deployment', 'Performance monitoring', 'Continuous optimisation', 'Dedicated support'],
  },
];

export const pillars = [
  { title: 'Customised solutions', text: 'Nothing off the shelf. Every platform, app and campaign is shaped around how your business actually works.' },
  { title: 'Innovation-driven', text: 'We bring emerging technology and modern tooling to problems — when it earns its place, not for its own sake.' },
  { title: 'Scalable technology', text: 'Architecture that grows with you, from a first launch to many more users, locations and features.' },
  { title: 'Creative problem solving', text: 'Design, engineering and marketing under one roof, so ideas move quickly from concept to result.' },
  { title: 'Client-focused delivery', text: 'Clear scope, honest timelines and regular check-ins. You always know where your project stands.' },
  { title: 'Ongoing support', text: 'Launch is a beginning. We monitor, maintain and optimise long after go-live.' },
];
