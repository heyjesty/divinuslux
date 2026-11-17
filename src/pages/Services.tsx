import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ServiceSection } from '../components/ServiceSection';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { FinalCTA } from '../components/FinalCTA';
import { Reveal } from '../components/Reveal';
import { services } from '../data/services';
import { SITE_URL, company } from '../data/company';
import { scrollToTarget } from '../lib/scroll';

export default function Services() {
  return (
    <Page>
      <Seo
        title="Services — Custom Software, Mobile Apps, SEO & Digital Marketing"
        description="Custom software development, the Educosis school management system, mobile apps, website design, SEO, social media, performance marketing, branding and 360° campaigns from Divinuslux in Kochi, Kerala."
        path="/services"
        breadcrumbs={[{ name: 'Services', path: '/services' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${company.legalName} services`,
            itemListElement: services.map((s, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              item: {
                '@type': 'Service',
                name: s.title,
                description: s.description,
                url: `${SITE_URL}/services#${s.slug}`,
                provider: { '@id': `${SITE_URL}/#organization` },
                areaServed: 'Worldwide',
              },
            })),
          },
        ]}
      />
      <PageHero
        eyebrow="Services"
        title={"Solutions Designed\nFor What's Next."}
        highlight={['Next']}
        crumbs={[{ name: 'Services' }]}
        intro="From enterprise software to data-driven marketing — everything your business needs to grow, under one roof."
      >
        <Reveal delay={0.45} className="mt-14">
          <nav aria-label="Jump to a service" className="flex flex-wrap gap-2">
            {services.map((s, i) => (
              <button
                key={s.slug}
                type="button"
                onClick={() => scrollToTarget(s.slug)}
                className="rounded-full border border-line/10 px-4 py-2 text-[13px] text-bone-muted transition-all duration-300 hover:border-line/30 hover:text-bone"
              >
                <span className="mr-2 text-bone-dim">{String(i + 1).padStart(2, '0')}</span>
                {s.title}
              </button>
            ))}
          </nav>
        </Reveal>
      </PageHero>

      <section className="pb-12">
        <div className="container-site">
          {services.map((s, i) => (
            <ServiceSection key={s.slug} service={s} index={i} reverse={i % 2 === 1} />
          ))}
        </div>
      </section>

      <ProcessTimeline />
      <FinalCTA />
    </Page>
  );
}
