/**
 * Portfolio. Every project below is listed in the official Divinuslux
 * portfolio PDF. Overviews summarise each client's own public website;
 * "highlights" describe features visible on the live site; "tech" lists only
 * technology detected in the live site's markup.
 *
 * Optional case-study fields (challenge / solution / results) are left empty
 * unless the information is published. Fill them in when the team confirms
 * details and they will appear automatically on the project page.
 */

export type ProjectCategory = 'Web Development' | 'Digital Marketing' | 'Branding' | 'Software Development' | 'Education Technology' | 'Mobile Applications';

export interface ProjectResult {
  value: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  industry: string;
  location?: string;
  category: ProjectCategory;
  summary: string;
  overview: string;
  highlights: string[];
  services: string[];
  tech?: string[];
  cover: string;
  mobile?: string;
  gallery: { src: string; alt: string; tall?: boolean }[];
  url?: string;
  /** True when the live site allows being framed (no X-Frame-Options / frame-ancestors). */
  embeddable?: boolean;
  links?: { label: string; url: string }[];
  challenge?: string;
  solution?: string;
  results?: ProjectResult[];
  resultsNote?: string;
}

const site = (slug: string) => ({
  cover: `/images/projects/${slug}/cover.webp`,
  mobile: `/images/projects/${slug}/mobile.webp`,
});

const gallery = (slug: string, title: string, withFrame = true) => [
  { src: `/images/projects/${slug}/cover.webp`, alt: `${title} website — home page` },
  ...(withFrame ? [{ src: `/images/projects/${slug}/frame-1.webp`, alt: `${title} website — section detail` }] : []),
  { src: `/images/projects/${slug}/mobile.webp`, alt: `${title} website — full mobile page`, tall: true },
];

export const projects: Project[] = [
  {
    slug: 'arya-bhangy-builders',
    title: 'Arya Bhangy Builders',
    client: 'Arya Bhangy Builders',
    industry: 'Real Estate',
    location: 'Kochi, Kerala',
    category: 'Web Development',
    summary: 'A premium real-estate website for RERA-registered apartments in Kochi.',
    overview:
      'Arya Bhangy Builders is a family group that has been building since 1969, offering RERA-registered 2.5, 3 and 4 BHK apartments in Vyttila and Kumbalam, Kochi. The website presents its residential projects and drives site-visit bookings.',
    highlights: ['Project showcase for each residential development', 'Apartment configurations and amenities', 'Site-visit booking and enquiry flow', 'WhatsApp contact'],
    services: ['Website Design & Development', 'Social Media Marketing'],
    tech: ['WordPress', 'Elementor', 'GSAP', 'Swiper'],
    ...site('arya-bhangy-builders'),
    gallery: gallery('arya-bhangy-builders', 'Arya Bhangy Builders'),
    url: 'https://www.aryabhangybuilders.com/',
    embeddable: true,
    links: [{ label: 'Instagram', url: 'https://www.instagram.com/aryabhangybuilders/' }],
  },
  {
    slug: 'ln-interiors',
    title: 'LN Interiors LLC',
    client: 'LN Interiors LLC',
    industry: 'Interior Design',
    location: 'Dubai, UAE',
    category: 'Web Development',
    summary: 'A luxury interiors and fit-out website for a Dubai design studio.',
    overview:
      'LN Interiors LLC is an interior design and fit-out company in Dubai delivering luxury residential, commercial and office interiors with turnkey solutions. The website positions the studio for high-value consultations.',
    highlights: ['Cinematic, animated hero and page transitions', 'Residential, commercial and office service pages', 'Project gallery', 'Free consultation enquiry and WhatsApp contact'],
    services: ['Website Design & Development'],
    tech: ['Bootstrap', 'jQuery', 'GSAP', 'Swiper'],
    ...site('ln-interiors'),
    gallery: gallery('ln-interiors', 'LN Interiors', false),
    url: 'https://lninteriorsllc.com/',
    embeddable: true,
  },
  {
    slug: 'newcrest-solar',
    title: 'Newcrest Solar',
    client: 'Newcrest Solar',
    industry: 'Renewable Energy',
    location: 'Kochi, Kerala',
    category: 'Web Development',
    summary: 'A lead-focused website for a Kerala solar installation company.',
    overview:
      'Newcrest Solar designs, supplies and installs on-grid, off-grid and hybrid solar systems across Kerala. The website explains each system type, the available subsidy and invites free consultations.',
    highlights: ['On-grid, off-grid & hybrid system pages', 'Subsidy information for homeowners', 'Free consultation lead capture', 'WhatsApp contact'],
    services: ['Website Design & Development'],
    ...site('newcrest-solar'),
    gallery: gallery('newcrest-solar', 'Newcrest Solar'),
    url: 'https://newcrestsolar.com/',
    embeddable: true,
  },
  {
    slug: 'thoshgod-holidays',
    title: 'Thoshgod Holidays',
    client: 'Thoshgod Holidays',
    industry: 'Travel & Visa Services',
    location: 'Kochi, Kerala',
    category: 'Web Development',
    summary: 'A travel, tour and visa services website — backed by social and paid campaigns.',
    overview:
      'Thoshgod Holidays offers international and domestic tour packages, visa assistance and personalised holiday experiences. Divinuslux built the website and also manages the brand’s Instagram presence.',
    highlights: ['International & domestic tour packages', 'Visa and immigration services', 'Destination showcase', 'Enquiry flow for bookings'],
    services: ['Website Design & Development', 'Social Media Marketing'],
    ...site('thoshgod-holidays'),
    gallery: gallery('thoshgod-holidays', 'Thoshgod Holidays', false),
    url: 'https://thoshgod.com/',
    embeddable: true,
    links: [{ label: 'Instagram', url: 'https://www.instagram.com/thoshgod/' }],
  },
  {
    slug: 'phonetech-education',
    title: 'Phonetech Education',
    client: 'Phonetech Education',
    industry: 'Education & Training',
    location: 'Kerala',
    category: 'Education Technology',
    summary: 'A course and admissions website for an ISO-certified repair training institute.',
    overview:
      'Phonetech Education is an ISO-certified mobile and laptop repair training institute in Kerala offering practical, chip-level courses with placement support. Divinuslux built the website and manages its Instagram.',
    highlights: ['Course catalogue with chip-level programmes', 'Placement and certification information', 'Admissions enquiry and WhatsApp contact', 'Analytics tracking'],
    services: ['Website Design & Development', 'Social Media Marketing'],
    tech: ['Bootstrap', 'jQuery', 'Swiper', 'Google Analytics'],
    ...site('phonetech-education'),
    gallery: gallery('phonetech-education', 'Phonetech Education'),
    url: 'https://www.phonetecheducation.com/',
    embeddable: true,
    links: [{ label: 'Instagram', url: 'https://www.instagram.com/phonetech_education' }],
  },
  {
    slug: 'messhub',
    title: 'MessHub',
    client: 'MessHub',
    industry: 'Food Delivery',
    location: 'Bangalore',
    category: 'Web Development',
    summary: 'A subscription meal-delivery website for homely Kerala food in Bangalore.',
    overview:
      'MessHub delivers authentic Kerala tiffins — breakfast, lunch and dinner — to homes in Bangalore, with daily, weekly and monthly meal plans. Divinuslux built the website and manages the brand’s Instagram.',
    highlights: ['Daily, weekly & monthly meal plans', 'Veg, mixed & non-veg options', 'App Store & Google Play download links', 'WhatsApp ordering'],
    services: ['Website Design & Development', 'Social Media Marketing'],
    ...site('messhub'),
    gallery: gallery('messhub', 'MessHub'),
    url: 'https://messhub.in/',
    embeddable: true,
    links: [{ label: 'Instagram', url: 'https://www.instagram.com/mess.hub_' }],
  },
  {
    slug: 'arya-bhangy-coworking',
    title: 'Arya Bhangy Coworking',
    client: 'Arya Bhangy Coworking',
    industry: 'Coworking & Workspace',
    location: 'Kochi, Kerala',
    category: 'Web Development',
    summary: 'A workspace website for coworking, private offices and meeting rooms in Kochi.',
    overview:
      'Arya Bhangy Coworking offers coworking desks, managed offices and meeting spaces in Kochi. The website presents the locations and facilities, and captures enquiries.',
    highlights: ['Workspace and location showcase', 'Facilities overview', 'Enquire-now forms', 'WhatsApp contact'],
    services: ['Website Design & Development', 'Social Media Marketing'],
    tech: ['Bootstrap', 'jQuery'],
    ...site('arya-bhangy-coworking'),
    gallery: gallery('arya-bhangy-coworking', 'Arya Bhangy Coworking'),
    url: 'https://www.aryabhangycoworking.com/',
    embeddable: true,
    links: [{ label: 'Gridspace on Instagram', url: 'https://www.instagram.com/gridspacearyabhangy/' }],
  },
  {
    slug: 'fuddooo',
    title: 'Grand Bibury Fuddooo',
    client: 'Fuddooo',
    industry: 'Entertainment & Leisure',
    category: 'Web Development',
    summary: 'A colourful website for a family destination with “everything under one roof”.',
    overview:
      'Grand Bibury Fuddooo brings entertainment and leisure together in one destination. The website introduces its attractions with a bright, family-friendly visual style.',
    highlights: ['Full-screen hero slider', 'Attraction showcase', 'Bright, family-friendly visual design', 'Contact and enquiry'],
    services: ['Website Design & Development'],
    ...site('fuddooo'),
    gallery: gallery('fuddooo', 'Fuddooo', false),
    url: 'https://fuddooo.com/',
    embeddable: true,
  },
  {
    slug: 'bitdrive',
    title: 'Bitdrive StarRide',
    client: 'Bitdrive',
    industry: 'Mobility',
    category: 'Web Development',
    summary: 'A launch website for a next-generation ride service.',
    overview:
      'Bitdrive StarRide is a ride service promising comfortable, effortless travel. The website introduces the service and directs visitors to download the app.',
    highlights: ['Bold product launch hero', 'App Store & Google Play download links', 'Service introduction', 'Contact'],
    services: ['Website Design & Development'],
    ...site('bitdrive'),
    gallery: gallery('bitdrive', 'Bitdrive', false),
    url: 'https://bitdrive.in/',
    embeddable: true,
  },
  {
    slug: 'meta-ads-performance',
    title: 'Meta Ads Performance Campaigns',
    client: 'Multiple clients',
    industry: 'Travel, Healthcare & Retail',
    category: 'Digital Marketing',
    summary: 'Lead and conversation campaigns with published results across three industries.',
    overview:
      'A selection of Meta Ads campaigns run by Divinuslux — WhatsApp conversation campaigns for retail, lead campaigns for a postnatal care provider and international tour campaigns for a travel client. The figures below are taken from the campaign dashboards published in our portfolio.',
    highlights: ['Messaging-conversation campaigns for retail launches', 'Lead-form campaigns for healthcare', 'Destination campaigns for international tours', 'Cost-per-result optimisation'],
    services: ['Performance Marketing', 'Social Media Marketing'],
    cover: '/images/results/cover.webp',
    gallery: [
      { src: '/images/results/meta-1.webp', alt: 'Meta Ads results: messaging conversation campaigns', tall: true },
      { src: '/images/results/meta-2.webp', alt: 'Meta Ads results: postnatal care lead campaign', tall: true },
      { src: '/images/results/meta-3.webp', alt: 'Meta Ads results: international tour lead campaigns', tall: true },
      { src: '/images/results/overview-1.webp', alt: 'Meta Ads performance overview: messaging conversations' },
      { src: '/images/results/overview-2.webp', alt: 'Meta Ads performance overview: 138 leads' },
      { src: '/images/results/overview-3.webp', alt: 'Meta Ads performance overview: 103 leads' },
    ],
    results: [
      { value: '₹40L+', label: 'Revenue for a travel client from 80 confirmed international tour bookings' },
      { value: '₹10L+', label: 'Revenue from 20 confirmed postnatal care conversions' },
      { value: '220+', label: 'Customer conversations from WhatsApp campaigns' },
      { value: '₹6.04', label: 'Lowest cost per messaging conversation' },
    ],
    resultsNote: 'Figures as published in the official Divinuslux portfolio.',
  },
  {
    slug: 'social-media-management',
    title: 'Social Media Management',
    client: '12 brands',
    industry: 'Hospitality, Education, Retail & Real Estate',
    category: 'Digital Marketing',
    summary: 'Ongoing content, design and growth for twelve brand accounts.',
    overview:
      'Divinuslux plans, designs and publishes social content for brands across hospitality, education, retail, food, energy and real estate — including Sugar Business Hotel, Phonetech Education, MessHub, Arya Bhangy Builders and Thoshgod Holidays.',
    highlights: ['Content calendars and creative production', 'Reels and promotional creatives', 'Festive and campaign content', 'Profile optimisation and growth'],
    services: ['Social Media Marketing', 'Creative Design'],
    cover: '/images/social/cover.webp',
    gallery: [
      { src: '/images/social/sugar.webp', alt: 'Sugar Business Hotel Instagram profile' },
      { src: '/images/social/phonetech.webp', alt: 'Phonetech Education Instagram profile' },
      { src: '/images/social/aryabuilders.webp', alt: 'Arya Bhangy Builders Instagram profile' },
      { src: '/images/social/thoshgod.webp', alt: 'Thoshgod Holidays Instagram profile' },
      { src: '/images/social/messhub.webp', alt: 'MessHub Instagram profile' },
      { src: '/images/social/hedra.webp', alt: 'Hedra Interior Furniture Instagram profile' },
    ],
    links: [
      { label: 'Sugar Business Hotel', url: 'https://www.instagram.com/sugarbusinesshotel/' },
      { label: 'Samiya Wedding Centre', url: 'https://www.instagram.com/samiya_weddingcentre' },
      { label: 'Izza Power', url: 'https://www.instagram.com/izza_power' },
      { label: 'Phonetech Education', url: 'https://www.instagram.com/phonetech_education' },
      { label: 'Hedra Interior Furniture', url: 'https://www.instagram.com/hedra_interior_furniture' },
      { label: 'MessHub', url: 'https://www.instagram.com/mess.hub_' },
      { label: 'My Gold Wallet', url: 'https://www.instagram.com/mygoldwallet' },
      { label: 'Arya Bhangy Builders', url: 'https://www.instagram.com/aryabhangybuilders/' },
      { label: 'Ostrax Institute', url: 'https://www.instagram.com/ostrax_institute' },
      { label: 'Gridspace Arya Bhangy', url: 'https://www.instagram.com/gridspacearyabhangy/' },
      { label: 'Thoshgod Holidays', url: 'https://www.instagram.com/thoshgod/' },
    ],
  },
  {
    slug: 'creative-advertising-design',
    title: 'Creative & Advertising Design',
    client: 'Multiple brands',
    industry: 'Retail, Food, Travel & Healthcare',
    category: 'Branding',
    summary: 'Social creatives, campaigns and advertisement design across industries.',
    overview:
      'A collection of social media creatives, promotional campaigns, festive greetings, branding materials and advertisement designs developed by Divinuslux for businesses across various industries.',
    highlights: ['Social media creative series', 'Promotional & advertisement design', 'Festive and seasonal campaigns', 'Bilingual (English & Malayalam) creatives'],
    services: ['Branding & Identity', 'Creative Design'],
    cover: '/images/creatives/cover.webp',
    gallery: [
      { src: '/images/creatives/set-1.webp', alt: 'Social media creative series' },
      { src: '/images/creatives/set-2.webp', alt: 'Food and lifestyle creatives' },
      { src: '/images/creatives/set-3.webp', alt: 'Travel and food campaign creatives' },
      { src: '/images/creatives/set-4.webp', alt: 'Office furniture campaign creatives' },
      { src: '/images/creatives/set-5.webp', alt: 'Festive campaign creatives' },
      { src: '/images/creatives/set-6.webp', alt: 'Retail promotion creatives' },
    ],
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const projectCategories = Array.from(new Set(projects.map((p) => p.category)));
