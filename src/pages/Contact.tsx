import { Page } from '../components/Page';
import { Seo, professionalServiceSchema } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ContactBlock } from '../components/ContactBlock';
import { Reveal } from '../components/Reveal';
import { company, SITE_URL } from '../data/company';

export default function Contact() {
  return (
    <Page>
      <Seo
        title="Contact — Start a Project with Divinuslux"
        description="Contact Divinuslux in Kochi, Kerala: mail@divinuslux.com, +91 7711000046, +91 7288000056. Tell us about your software, app, website or marketing project."
        path="/contact"
        breadcrumbs={[{ name: 'Contact', path: '/contact' }]}
        jsonLd={[
          { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact Divinuslux', url: `${SITE_URL}/contact` },
          professionalServiceSchema(),
        ]}
      />
      <PageHero
        eyebrow="Contact"
        title={"Let's Build\nSomething Great."}
        highlight={['Something', 'Great']}
        crumbs={[{ name: 'Contact' }]}
        intro="Whether you have a specific project in mind, need guidance on the right digital solution, or simply want to learn more — our team is ready to listen, advise and deliver."
      />
      <ContactBlock heading={false} />
      <section className="border-t border-line/[0.06] py-24">
        <div className="container-site">
          <Reveal>
            <p className="eyebrow">Our offices</p>
          </Reveal>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-[22px] border border-line/[0.07] bg-line/[0.07] sm:grid-cols-2 lg:grid-cols-5">
            {company.offices.map((o, i) => (
              <Reveal as="li" key={o.city} delay={i * 0.05} className="bg-ink p-7">
                <p className="font-display text-2xl font-medium">{o.city}</p>
                <p className="mt-1 text-[14px] text-bone-muted">{o.country}</p>
                {o.hq && <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-brand-cyan">Headquarters</p>}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </Page>
  );
}
