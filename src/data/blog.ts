/**
 * Insights. Titles, dates, categories, excerpts and images come from the blog
 * section of the existing divinuslux.com home page. The old site had no
 * article pages, so the article bodies below are new drafts — review them
 * before publishing.
 */

export type Block = { type: 'p'; text: string } | { type: 'h2'; text: string } | { type: 'ul'; items: string[] } | { type: 'quote'; text: string };

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO
  excerpt: string;
  image: string;
  imageAlt: string;
  readingMinutes: number;
  body: Block[];
}

export const posts: Post[] = [
  {
    slug: 'custom-software-competitive-edge',
    title: 'How Custom Software Gives Your Business a Competitive Edge',
    category: 'Software',
    date: '2026-01-10',
    excerpt:
      'Custom software helps businesses streamline operations, improve efficiency, and scale faster. Discover how tailored solutions can give your company a strong competitive advantage in today’s digital world.',
    image: '/images/blog/custom-software.webp',
    imageAlt: 'Business professional working on a laptop surrounded by digital interface graphics',
    readingMinutes: 4,
    body: [
      { type: 'p', text: 'Off-the-shelf software is built for the average business. That is exactly its limitation: your processes, customers and goals are not average. Custom software starts from how your business actually works — and that difference compounds over time.' },
      { type: 'h2', text: 'Software that fits your process, not the other way round' },
      { type: 'p', text: 'Generic tools often force teams into workarounds: exporting spreadsheets, re-entering data, juggling several subscriptions that do not talk to each other. A tailored system models your real workflow, so people spend their time on the work itself instead of on the tool.' },
      { type: 'h2', text: 'Where the advantage comes from' },
      { type: 'ul', items: [
        'Automation of repetitive, manual tasks that slow teams down',
        'One source of truth instead of data scattered across tools',
        'Integrations with the systems you already rely on',
        'Features your competitors cannot simply buy off the shelf',
        'Room to scale — new users, locations and modules — without re-platforming',
      ] },
      { type: 'h2', text: 'Ownership and long-term cost' },
      { type: 'p', text: 'Licence fees for packaged software rise with every new seat. A custom platform is an asset you own: it can be extended when the business changes, and its roadmap is set by your priorities, not a vendor’s.' },
      { type: 'quote', text: 'The best software disappears into the work. People stop noticing the tool and simply get more done.' },
      { type: 'h2', text: 'Starting well' },
      { type: 'p', text: 'Successful custom projects begin with discovery: understanding goals, mapping current processes and agreeing a clear scope before any code is written. From there, an iterative build with regular reviews keeps the product aligned with what the business really needs.' },
      { type: 'p', text: 'If you are weighing up whether custom software is right for you, a short discovery conversation is usually enough to tell where it would make the biggest difference.' },
    ],
  },
  {
    slug: 'mobile-applications-modern-business',
    title: 'The Role of Mobile Applications in Modern Business Success',
    category: 'Mobile Apps',
    date: '2026-01-18',
    excerpt:
      'Mobile applications are essential for customer engagement and business growth. Learn how Android and iOS apps can enhance user experience and strengthen your brand presence.',
    image: '/images/blog/mobile-apps.webp',
    imageAlt: 'Hands presenting floating mobile app screens',
    readingMinutes: 4,
    body: [
      { type: 'p', text: 'For many customers, the phone is the first — and sometimes only — way they interact with a business. A well-built mobile app turns that moment into a direct, ongoing relationship.' },
      { type: 'h2', text: 'Why an app, not just a website?' },
      { type: 'p', text: 'A responsive website is essential, but an app lives on the home screen. It can send timely notifications, work with the camera and location, remember preferences and make repeat actions — ordering, booking, paying — take seconds.' },
      { type: 'h2', text: 'What a good business app delivers' },
      { type: 'ul', items: [
        'Faster, simpler journeys for your most frequent customer tasks',
        'Direct communication through push notifications',
        'Loyalty and repeat business through saved preferences and history',
        'Useful data about how customers actually use your service',
        'A stronger, more consistent brand presence',
      ] },
      { type: 'h2', text: 'Android, iOS, or both?' },
      { type: 'p', text: 'The answer depends on your audience. Many businesses launch on both platforms to reach everyone; others start with the platform their customers use most and expand once the product is proven.' },
      { type: 'h2', text: 'Experience is everything' },
      { type: 'p', text: 'Users judge an app within seconds. Clear UI/UX, quick load times and reliable performance matter more than a long feature list. Start with the few actions customers care about most, do them extremely well, and grow from there.' },
      { type: 'p', text: 'Planned well, a mobile app is not a side project — it becomes one of the most valuable channels a business has.' },
    ],
  },
  {
    slug: 'digital-presence-seo-smo-smm',
    title: 'Building a Strong Digital Presence with SEO, SMO, and SMM',
    category: 'Digital Marketing',
    date: '2026-01-25',
    excerpt:
      'A strong digital presence is key to business success. Explore how SEO, SMO, and SMM strategies can increase visibility, drive traffic, and boost conversions.',
    image: '/images/blog/digital-presence.webp',
    imageAlt: 'Desk with laptop, phone and SEO analytics illustrations',
    readingMinutes: 5,
    body: [
      { type: 'p', text: 'Customers discover businesses in two main ways online: by searching, and by scrolling. SEO helps you show up when people search. Social media optimisation and marketing help you show up — and stay memorable — where they scroll.' },
      { type: 'h2', text: 'SEO: be found at the moment of intent' },
      { type: 'p', text: 'Search Engine Optimisation makes your website easier for search engines to understand and more useful for visitors. It covers keyword research, technical health, on-page content and site speed. Results build gradually, but traffic from search is among the most valuable because people are actively looking for what you offer.' },
      { type: 'h2', text: 'SMO: make your profiles work for you' },
      { type: 'p', text: 'Social Media Optimisation is about getting the foundations right: complete, consistent profiles, a recognisable visual identity, and content that reflects what your brand stands for. It is what turns a visitor’s quick look into a follow.' },
      { type: 'h2', text: 'SMM: reach and grow your audience' },
      { type: 'p', text: 'Social Media Marketing combines regular content with targeted paid campaigns on platforms such as Instagram and Facebook. With the right targeting and creative, campaigns can generate conversations, leads and sales at a measurable cost per result.' },
      { type: 'h2', text: 'Why they work better together' },
      { type: 'ul', items: [
        'Search brings in people who already know what they want',
        'Social builds awareness and trust before they search',
        'Consistent branding across both makes every touchpoint reinforce the next',
        'Shared analytics show which channels drive real enquiries',
      ] },
      { type: 'p', text: 'A strong digital presence is not a single campaign — it is a system. Plan it as one, measure it honestly, and improve it month by month.' },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
