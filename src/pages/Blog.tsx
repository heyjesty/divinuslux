import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { InsightCard } from '../components/InsightCard';
import { FinalCTA } from '../components/FinalCTA';
import { posts } from '../data/blog';
import { SITE_URL, company } from '../data/company';

export default function Blog() {
  const [first, ...rest] = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <Page>
      <Seo
        title="Insights — Software, Mobile Apps & Digital Marketing"
        description="Articles from Divinuslux on custom software, mobile applications, SEO and social media marketing for growing businesses."
        path="/insights"
        breadcrumbs={[{ name: 'Insights', path: '/insights' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: `${company.legalName} Insights`,
            url: `${SITE_URL}/insights`,
            blogPost: posts.map((p) => ({ '@type': 'BlogPosting', headline: p.title, datePublished: p.date, url: `${SITE_URL}/insights/${p.slug}` })),
          },
        ]}
      />
      <PageHero eyebrow="Insights" title={'Ideas Worth\nSharing.'} highlight={['Sharing']} crumbs={[{ name: 'Insights' }]} intro="Notes on software, mobile and digital growth from the Divinuslux team." />
      <section className="pb-20 md:pb-36">
        <div className="container-site">
          <div className="grid gap-12 border-b border-line/[0.07] pb-20 lg:grid-cols-12">
            <div className="lg:col-span-12">
              <InsightCard post={first} index={0} featured />
            </div>
          </div>
          <div className="mt-20 grid gap-14 md:grid-cols-2 md:gap-8">
            {rest.map((p, i) => (
              <InsightCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
      <FinalCTA />
    </Page>
  );
}
