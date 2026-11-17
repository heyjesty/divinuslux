/**
 * Services. Feature lists come from the existing divinuslux.com service and
 * home pages; descriptions are rewritten for the new site.
 */

export type ServiceVisual =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'phones'; srcs: string[]; alt: string }
  | { kind: 'cards'; srcs: string[]; alt: string };

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  visual: ServiceVisual;
  group: 'Technology' | 'Marketing' | 'Brand';
}

export const services: Service[] = [
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    short: 'Web and enterprise applications built around the way you work.',
    description:
      'From internal tools to full enterprise platforms, we design and engineer software that removes manual work, connects your systems and scales with your business.',
    features: [
      'Custom web & enterprise app development',
      'Scalable backend systems & API integrations',
      'UI/UX-focused front-end development',
      'Quality assurance, testing & maintenance',
      'Digital transformation consulting',
    ],
    visual: { kind: 'image', src: '/images/services/software.webp', alt: 'Development team working at multiple screens' },
    group: 'Technology',
  },
  {
    slug: 'educosis-school-management-system',
    title: 'Educosis School Management System',
    short: 'One platform for students, staff, parents and the school bus.',
    description:
      'Educosis is our school management system. It brings admissions, attendance, fees, exams and parent communication together — with real-time GPS bus tracking and apps for Android and iOS.',
    features: [
      'Centralised student & staff data management',
      'Real-time GPS-integrated bus tracking',
      'Attendance management & reporting',
      'Fee collection & financial management',
      'Parent communication portal (Android & iOS)',
      'Timetable, examination & result management',
    ],
    visual: { kind: 'image', src: '/images/services/educosis.webp', alt: 'Illustration of a phone showing live GPS tracking' },
    group: 'Technology',
  },
  {
    slug: 'mobile-application-development',
    title: 'Mobile Application Development',
    short: 'Fast, considered apps for Android and iOS.',
    description:
      'We plan, design and build mobile applications that people enjoy using — performance-tuned, UI/UX-optimised and ready to grow with new features.',
    features: ['Android & iOS apps', 'UI/UX-optimised interfaces', 'High-performance builds', 'API & backend integration', 'Store launch & ongoing updates'],
    visual: {
      kind: 'phones',
      srcs: ['/images/projects/messhub/mobile.webp', '/images/projects/phonetech-education/mobile.webp', '/images/projects/thoshgod-holidays/mobile.webp'],
      alt: 'Mobile screens from projects delivered by Divinuslux',
    },
    group: 'Technology',
  },
  {
    slug: 'website-design-development',
    title: 'Website Design & Development',
    short: 'Corporate, business and e-commerce websites that convert.',
    description:
      'Responsive, SEO-ready websites for corporates, growing businesses and online stores — designed to load fast, look sharp and turn visitors into enquiries.',
    features: [
      'E-commerce website design',
      'Corporate & business websites',
      'Landing pages',
      'Website revamping & redesign',
      'Mobile-responsive & SEO-optimised builds',
      'Ongoing support & maintenance',
    ],
    visual: { kind: 'image', src: '/images/services/web.webp', alt: 'Designer working on UI and UX on a laptop' },
    group: 'Technology',
  },
  {
    slug: 'search-engine-optimization',
    title: 'Search Engine Optimization',
    short: 'Be found by the people already looking for you.',
    description:
      'Keyword research, technical fixes and on-page improvements that help search engines understand your site — and help the right customers find it.',
    features: ['Keyword research', 'On-page & technical SEO', 'Competitor & keyword analysis', 'Content strategy', 'Ranking & traffic reporting'],
    visual: { kind: 'image', src: '/images/services/seo.webp', alt: 'Hand holding a search marketing illustration' },
    group: 'Marketing',
  },
  {
    slug: 'social-media-marketing',
    title: 'Social Media Marketing',
    short: 'Content and campaigns that grow engaged communities.',
    description:
      'We plan, design and run social media for brands across hospitality, education, retail and real estate — from day-to-day content to paid campaigns.',
    features: ['Content strategy & calendars', 'Social media creatives', 'Facebook & Instagram ads', 'Community growth', 'Monthly reporting'],
    visual: {
      kind: 'cards',
      srcs: ['/images/social/messhub.webp', '/images/social/phonetech.webp', '/images/social/thoshgod.webp'],
      alt: 'Instagram profiles of brands managed by Divinuslux',
    },
    group: 'Marketing',
  },
  {
    slug: 'performance-marketing',
    title: 'Performance Marketing',
    short: 'Google and Meta campaigns measured by results.',
    description:
      'Campaign strategy, budget setting and continuous optimisation on Google and Meta — focused on cost per lead, conversations and revenue.',
    features: ['Google & Meta Ads', 'Campaign & budget setting', 'Lead generation campaigns', 'Email & WhatsApp marketing', 'Conversion tracking & reporting'],
    visual: {
      kind: 'cards',
      srcs: ['/images/results/meta-1.webp', '/images/results/meta-2.webp', '/images/results/meta-3.webp'],
      alt: 'Meta Ads campaign results published in the Divinuslux portfolio',
    },
    group: 'Marketing',
  },
  {
    slug: 'branding-identity',
    title: 'Branding & Identity',
    short: 'Identities with a clear story and a consistent voice.',
    description:
      'Research-led brand strategy and identity design — logos, systems and visual language that hold together across every touchpoint.',
    features: ['Brand consulting & strategy', 'Brand research & audit', 'Brand identity & logo design', 'Brand architecture & management', '2D/3D visualisation'],
    visual: { kind: 'image', src: '/images/services/branding.webp', alt: 'Brand identity stationery mockup' },
    group: 'Brand',
  },
  {
    slug: 'influencer-marketing',
    title: 'Influencer Marketing',
    short: 'The right voices, with campaigns you can measure.',
    description:
      'We identify and vet creators who fit your brand, develop the campaign concept and track performance and ROI from first post to final report.',
    features: ['Targeted influencer identification & vetting', 'Campaign concept & execution', 'Performance tracking & ROI', 'Micro, macro & celebrity partnerships'],
    visual: { kind: 'image', src: '/images/services/influencer.webp', alt: 'Creator filming fashion content' },
    group: 'Marketing',
  },
  {
    slug: 'outdoor-campaigns',
    title: 'Outdoor Campaigns',
    short: 'High-visibility brand presence in the real world.',
    description:
      'Roadshows, in-store installations and custom outdoor shoots — planned for strategic placement where your audience actually is.',
    features: ['Roadshow & flyer campaigns', 'In-shop installations & brand arches', 'Rotating tri-pillar standee design', 'Custom outdoor shoots', 'Strategic high-visibility placement'],
    visual: { kind: 'image', src: '/images/services/outdoor.webp', alt: 'Photographer on an outdoor shoot' },
    group: 'Brand',
  },
  {
    slug: '360-degree-marketing',
    title: '360-Degree Marketing Solutions',
    short: 'Online and offline, working as one campaign.',
    description:
      'Digital, traditional and outdoor channels combined into one integrated, measurable plan — with branding and creative strategy holding it together.',
    features: ['Digital marketing integration', 'Traditional & outdoor advertising', 'Branding & creative strategy', 'Seamless online & offline integration', 'Customised, measurable campaigns'],
    visual: { kind: 'image', src: '/images/services/360.webp', alt: 'Abstract 3D ring of digital marketing icons' },
    group: 'Marketing',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
