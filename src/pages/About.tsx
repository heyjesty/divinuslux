import { Page } from '../components/Page';
import { Seo, organizationSchema } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, ImageReveal } from '../components/Reveal';
import { Stats } from '../components/Stats';
import { WhyUs } from '../components/WhyUs';
import { FinalCTA } from '../components/FinalCTA';
import { company } from '../data/company';

export default function About() {
  return (
    <Page>
      <Seo
        title="About Us — Software & Digital Marketing Company in Kochi"
        description="Divinuslux Pvt Ltd is a software development and digital marketing company headquartered in Kochi, Kerala, with offices in India, the USA, the UK, Italy and Portugal."
        path="/about"
        breadcrumbs={[{ name: 'About', path: '/about' }]}
        jsonLd={[organizationSchema()]}
      />
      <PageHero
        eyebrow="About Divinuslux"
        title={'Technology, Crafted\nWith Purpose.'}
        highlight={['Purpose']}
        crumbs={[{ name: 'About' }]}
        intro="We are a software development and digital marketing company from Kochi, Kerala — combining technology, creativity and strategy to help businesses grow."
      />

      <section className="pb-20 md:pb-40">
        <div className="container-site">
          <ImageReveal src="/images/about/office.webp" alt="Divinuslux office reception" priority className="aspect-[16/9] rounded-[32px] md:aspect-[21/9]" />
          <div className="mt-20 grid gap-12 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <span className="eyebrow">Our story</span>
            </Reveal>
            <div className="lg:col-span-8">
              <Reveal>
                <p className="text-[clamp(1.35rem,2.2vw,2rem)] leading-[1.45] tracking-[-0.01em] text-bone">{company.story}</p>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-8 max-w-3xl text-[17px] leading-relaxed text-bone-muted">
                  We specialise in custom software, scalable platforms and result-driven marketing tailored to each client’s needs. Our developers, creative marketers and specialists work together — so every solution is efficient, considered and ready for what comes next. We see ourselves as more than a service provider: we are a technology partner focused on long-term value.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line/[0.06] py-20 md:py-36">
        <div className="container-site grid gap-6 md:grid-cols-2">
          {[
            { k: 'Mission', color: 'text-brand-cyan', ...company.mission },
            { k: 'Vision', color: 'text-brand-violet', ...company.vision },
          ].map((b, i) => (
            <Reveal key={b.k} delay={i * 0.1} className="group relative overflow-hidden rounded-[28px] border border-line/[0.07] bg-gradient-to-b from-line/[0.03] to-transparent p-8 md:p-12">
              <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-60" />
              <p className={`text-[11px] uppercase tracking-[0.24em] ${b.color}`}>Our {b.k.toLowerCase()}</p>
              <h2 className="mt-6 font-display text-[clamp(1.5rem,2.4vw,2.2rem)] font-medium leading-snug tracking-[-0.02em]">{b.statement}</h2>
              <ul className="mt-10 space-y-3 border-t border-line/[0.07] pt-8">
                {b.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-[15px] text-bone/80">
                    <span className="mt-[0.6em] h-px w-3 shrink-0 bg-bone/40" />
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-20 md:py-36">
        <div className="container-site">
          <SectionHeading
            eyebrow="Global presence"
            title={'Rooted in Kochi.\nWorking Worldwide.'}
            highlight={['Worldwide']}
            intro="Our headquarters is in Kochi, Kerala, with offices in Atlanta, Poole, Naples and Lisbon."
            size="md"
          />
          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {company.offices.map((o, i) => (
              <Reveal key={o.city} delay={i * 0.06} className={`group relative overflow-hidden rounded-[22px] border border-line/[0.07] bg-ink-800 ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>
                <div className={`relative ${i === 0 ? 'aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[480px]' : 'aspect-[4/3]'}`}>
                  {o.image ? (
                    <img src={o.image} alt={`Divinuslux office, ${o.city}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
                  ) : (
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(31,111,229,0.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(19,181,200,0.2),transparent_55%)]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    {o.hq && <span className="mb-2 inline-block rounded-full bg-bone px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-ink">Headquarters</span>}
                    <p className="font-display text-2xl font-medium">{o.city}</p>
                    <p className="text-[13px] text-bone-muted">{o.country}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Stats withHeading={false} />
      <WhyUs />
      <FinalCTA />
    </Page>
  );
}
