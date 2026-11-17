import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { Page } from '../components/Page';
import { Seo, organizationSchema, professionalServiceSchema } from '../components/Seo';
import { Hero } from '../components/Hero';
import { SectionHeading } from '../components/SectionHeading';
import { Reveal, ImageReveal } from '../components/Reveal';
import { ServiceStack } from '../components/ServiceStack';
import { ProjectCard } from '../components/ProjectCard';
import { ProcessTimeline } from '../components/ProcessTimeline';
import { WhyUs } from '../components/WhyUs';
import { Stats } from '../components/Stats';
import { InsightCard } from '../components/InsightCard';
import { FinalCTA } from '../components/FinalCTA';
import { ContactBlock } from '../components/ContactBlock';
import { Marquee } from '../components/Marquee';
import { Button, TextLink } from '../components/Button';
import { company, clientBrands } from '../data/company';
import { projects } from '../data/projects';
import { posts } from '../data/blog';

const featured = ['arya-bhangy-builders', 'ln-interiors', 'meta-ads-performance', 'newcrest-solar'].map((s) => projects.find((p) => p.slug === s)!);

export default function Home() {
  return (
    <Page>
      <Seo
        title="Divinuslux Pvt Ltd | Software Development & Digital Marketing Company in Kerala"
        description="Divinuslux is a software development and digital marketing company in Kochi, Kerala — custom software, the Educosis school management system, mobile apps, websites, SEO and performance marketing."
        path="/"
        jsonLd={[organizationSchema(), professionalServiceSchema(), { '@context': 'https://schema.org', '@type': 'WebSite', name: company.legalName, url: 'https://www.divinuslux.com/' }]}
      />
      <Hero />
      <Intro />
      <section className="border-y border-line/[0.06] bg-ink-900 py-8 md:py-10" aria-label="Brands we have worked with">
        <Marquee>
          {clientBrands.map((b) => (
            <span key={b} className="flex items-center gap-10 px-5 font-display text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium tracking-[-0.02em] text-bone/35 transition-colors hover:text-bone">
              {b}
              <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-r from-brand-blue to-brand-cyan" />
            </span>
          ))}
        </Marquee>
      </section>

      <section className="py-20 md:py-40" aria-labelledby="services-title">
        <div className="container-site">
          <SectionHeading id="services-title"
            eyebrow="Services"
            index="04"
            title={"Solutions Designed\nFor What's Next."}
            highlight={['Next']}
            intro="Eleven disciplines across technology, marketing and brand — combined as one team around your goals."
            aside={
              <div className="mt-8">
                <TextLink to="/services">All services in detail</TextLink>
              </div>
            }
          />
          <div className="mt-16 md:mt-24">
            <ServiceStack />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-36" aria-labelledby="work-title">
        <div className="container-site">
          <SectionHeading id="work-title"
            eyebrow="Selected work"
            index="05"
            title={'Selected Work.\nMeaningful Impact.'}
            highlight={['Meaningful', 'Impact']}
            intro="Websites, campaigns and brand work delivered for businesses in India, the UAE and beyond."
          />
          <div className="mt-16 grid gap-x-8 gap-y-20 md:mt-24 md:grid-cols-2">
            {featured.map((p, i) => (
              <div key={p.slug} className={i % 2 === 1 ? 'md:mt-32' : ''}>
                <ProjectCard project={p} index={i} />
              </div>
            ))}
          </div>
          <Reveal className="mt-20 flex justify-center">
            <Button to="/projects" variant="ghost">
              View all {projects.length} projects
            </Button>
          </Reveal>
        </div>
      </section>

      <ProcessTimeline />
      <WhyUs />
      <Stats />

      <section className="py-20 md:py-36" aria-labelledby="insights-title">
        <div className="container-site">
          <SectionHeading id="insights-title"
            eyebrow="Insights"
            index="09"
            title={'Ideas Worth\nSharing.'}
            highlight={['Sharing']}
            aside={
              <div>
                <p className="max-w-md text-[16px] leading-relaxed text-bone-muted">Notes on software, mobile and digital growth from our team.</p>
                <div className="mt-6">
                  <TextLink to="/insights">All insights</TextLink>
                </div>
              </div>
            }
          />
          <div className="mt-16 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
            {posts.map((p, i) => (
              <InsightCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <FinalCTA />
      <ContactBlock />
    </Page>
  );
}

function Intro() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y1 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-30, 90]);

  return (
    <section ref={ref} id="intro" className="relative py-20 md:py-40" aria-labelledby="intro-title">
      <div className="container-site">
        <SectionHeading id="intro-title" eyebrow="Who we are" index="03" title={'Technology Meets\nCreative Intelligence.'} highlight={['Creative', 'Intelligence']} />

        <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="relative lg:col-span-6">
            <motion.div style={{ y: y1 }} className="relative z-[1] w-[82%]">
              <ImageReveal src="/images/about/office.webp" alt="Divinuslux office reception with illuminated logo" className="aspect-[4/5] rounded-[28px]" />
            </motion.div>
            <motion.div style={{ y: y2 }} className="absolute bottom-[-8%] right-0 z-[2] w-[46%]">
              <ImageReveal src="/images/about/team.webp" alt="A Divinuslux team member at work" className="aspect-[3/4] rounded-[22px] border-[6px] border-ink" />
            </motion.div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
            {company.intro.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? 'text-[clamp(1.25rem,1.9vw,1.6rem)] leading-[1.5] text-bone' : 'mt-6 text-[17px] leading-relaxed text-bone-muted'}>{p}</p>
              </Reveal>
            ))}

            <div className="mt-14 grid gap-10 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-cyan">Mission</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/80">{company.mission.statement}</p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-[11px] uppercase tracking-[0.22em] text-brand-violet">Vision</p>
                <p className="mt-3 text-[15px] leading-relaxed text-bone/80">{company.vision.statement}</p>
              </Reveal>
            </div>

            <Reveal delay={0.24} className="mt-14 border-t border-line/[0.07] pt-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">Global presence</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {company.offices.map((o) => (
                  <li key={o.city} className="rounded-full border border-line/10 px-4 py-2 text-[13.5px] text-bone/85">
                    {o.city}, {o.country}
                    {o.hq && <span className="ml-2 text-[11px] uppercase tracking-wider text-brand-cyan">HQ</span>}
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <TextLink to="/about">Discover our story</TextLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
