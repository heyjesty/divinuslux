import { Helmet } from 'react-helmet-async';
import { SITE_URL, company } from '../data/company';

interface Crumb {
  name: string;
  path: string;
}

interface SeoProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
  breadcrumbs?: Crumb[];
  jsonLd?: Record<string, unknown>[];
  noindex?: boolean;
}

const abs = (p: string) => (p.startsWith('http') ? p : `${SITE_URL}${p}`);

export function Seo({ title, description, path, image = '/images/og-image.jpg', type = 'website', breadcrumbs, jsonLd = [], noindex }: SeoProps) {
  const url = abs(path === '/' ? '/' : path.replace(/\/$/, ''));
  const fullTitle = path === '/' ? title : `${title} | ${company.legalName}`;
  const schemas = [...jsonLd];
  if (breadcrumbs?.length) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ name: 'Home', path: '/' }, ...breadcrumbs].map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: abs(c.path),
      })),
    });
  }
  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noindex && <meta name="robots" content="noindex, follow" />}
      <meta property="og:site_name" content={company.legalName} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={abs(image)} />
      <meta property="og:locale" content="en_IN" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={abs(image)} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(s)}
        </script>
      ))}
    </Helmet>
  );
}

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_URL}/#organization`,
  name: company.legalName,
  alternateName: company.name,
  url: SITE_URL,
  logo: `${SITE_URL}${company.logo}`,
  slogan: company.tagline,
  email: company.contact.email,
  telephone: company.contact.phones[0],
  address: postalAddress(),
  sameAs: Object.values(company.social).filter(Boolean),
});

export const professionalServiceSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#business`,
  name: company.legalName,
  url: SITE_URL,
  image: `${SITE_URL}/images/og-image.jpg`,
  description: company.shortDescription,
  email: company.contact.email,
  telephone: company.contact.phones,
  address: postalAddress(),
  areaServed: ['IN', 'US', 'GB', 'IT', 'PT', 'AE'],
  parentOrganization: { '@id': `${SITE_URL}/#organization` },
  knowsAbout: [
    'Custom Software Development',
    'School Management Software',
    'Mobile App Development',
    'Website Design and Development',
    'Search Engine Optimization',
    'Social Media Marketing',
    'Performance Marketing',
    'Branding',
  ],
});

function postalAddress() {
  const a = company.contact.address;
  return {
    '@type': 'PostalAddress',
    streetAddress: a.street,
    addressLocality: a.locality,
    addressRegion: a.region,
    postalCode: a.postalCode,
    addressCountry: a.country,
  };
}
