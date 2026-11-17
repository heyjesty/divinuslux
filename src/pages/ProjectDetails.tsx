import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useCallback, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowUpRight, Eye, Instagram } from 'lucide-react';
import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { Reveal, ImageReveal } from '../components/Reveal';
import { Button } from '../components/Button';
import { ProjectModal } from '../components/ProjectModal';
import { FinalCTA } from '../components/FinalCTA';
import { getProject, projects } from '../data/projects';
import { process as steps, SITE_URL, company } from '../data/company';
import NotFound from './NotFound';

export default function ProjectDetails() {
  const { slug = '' } = useParams();
  const project = getProject(slug);
  const [preview, setPreview] = useState(false);
  const closePreview = useCallback(() => setPreview(false), []);
  const coverRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: coverRef, offset: ['start end', 'end start'] });
  const coverY = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%']);

  if (!project) return <NotFound />;

  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];
  const meta = [
    { k: 'Client', v: project.client },
    { k: 'Industry', v: project.industry },
    project.location && { k: 'Location', v: project.location },
    { k: 'Category', v: project.category },
  ].filter(Boolean) as { k: string; v: string }[];

  return (
    <Page>
      <Seo
        title={`${project.title} — ${project.category} Project`}
        description={`${project.summary} ${project.overview}`.slice(0, 158)}
        path={`/projects/${project.slug}`}
        image={project.cover}
        breadcrumbs={[
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CreativeWork',
            name: project.title,
            description: project.overview,
            image: `${SITE_URL}${project.cover}`,
            url: `${SITE_URL}/projects/${project.slug}`,
            creator: { '@type': 'Organization', name: company.legalName, url: SITE_URL },
            ...(project.url ? { sameAs: project.url } : {}),
            genre: project.category,
            keywords: project.services.join(', '),
          },
        ]}
      />

      <PageHero eyebrow={project.category} title={project.title} crumbs={[{ name: 'Projects', path: '/projects' }, { name: project.title }]} intro={project.summary}>
        <Reveal delay={0.45} className="mt-10 flex flex-col gap-3 sm:mt-12 sm:flex-row sm:flex-wrap">
          {project.url && project.embeddable && (
            <Button onClick={() => setPreview(true)} variant="gradient" icon="none" block>
              <span className="flex items-center gap-2">
                <Eye className="h-4 w-4" /> Live Preview
              </span>
            </Button>
          )}
          {project.url && (
            <Button href={project.url} variant={project.embeddable ? 'ghost' : 'primary'} icon="up-right" block>
              Visit Website
            </Button>
          )}
        </Reveal>
      </PageHero>

      <div ref={coverRef} className="container-site">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] border border-line/[0.07] bg-ink-800 md:aspect-[16/9]">
          <motion.img
            src={project.cover}
            alt={`${project.title} — cover`}
            style={{ y: coverY, scale: 1.12 }}
            className="absolute inset-0 h-full w-full object-cover object-top"
            {...{ fetchpriority: "high" }}
          />
        </div>
      </div>

      <section className="py-24 md:py-32">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-8 lg:sticky lg:top-32 lg:grid-cols-1">
              {meta.map((m, i) => (
                <Reveal key={m.k} delay={i * 0.05}>
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">{m.k}</dt>
                  <dd className="mt-2 text-[16px] text-bone">{m.v}</dd>
                </Reveal>
              ))}
              <Reveal delay={0.2} className="col-span-2 lg:col-span-1">
                <dt className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">Services</dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {project.services.map((s) => (
                    <span key={s} className="rounded-full border border-line/10 px-3 py-1.5 text-[13px] text-bone/80">
                      {s}
                    </span>
                  ))}
                </dd>
              </Reveal>
              {project.tech && project.tech.length > 0 && (
                <Reveal delay={0.25} className="col-span-2 lg:col-span-1">
                  <dt className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">Technology</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((s) => (
                      <span key={s} className="rounded-full bg-line/[0.05] px-3 py-1.5 text-[13px] text-bone/80">
                        {s}
                      </span>
                    ))}
                  </dd>
                </Reveal>
              )}
            </dl>
          </aside>

          <div className="space-y-20 lg:col-span-7 lg:col-start-6">
            <Block title="Overview">
              <p className="text-[clamp(1.2rem,1.8vw,1.5rem)] leading-[1.55] text-bone">{project.overview}</p>
            </Block>

            {project.challenge && (
              <Block title="The challenge">
                <p className="text-[17px] leading-relaxed text-bone-muted">{project.challenge}</p>
              </Block>
            )}

            <Block title={project.solution ? 'The solution' : 'Key features'}>
              {project.solution && <p className="mb-8 text-[17px] leading-relaxed text-bone-muted">{project.solution}</p>}
              <ul className="grid gap-px overflow-hidden rounded-2xl border border-line/[0.07] bg-line/[0.07] sm:grid-cols-2">
                {project.highlights.map((h, i) => (
                  <li key={h} className="bg-ink p-6">
                    <span className="font-display text-xs text-bone-dim">{String(i + 1).padStart(2, '0')}</span>
                    <p className="mt-3 text-[15.5px] leading-relaxed text-bone/90">{h}</p>
                  </li>
                ))}
              </ul>
            </Block>

            {project.results && project.results.length > 0 && (
              <Block title="Results">
                <div className="grid gap-4 sm:grid-cols-2">
                  {project.results.map((r) => (
                    <div key={r.label} className="rounded-2xl border border-line/[0.07] bg-gradient-to-b from-line/[0.04] to-transparent p-7">
                      <p className="text-gradient font-display text-5xl font-medium tracking-[-0.04em]">{r.value}</p>
                      <p className="mt-3 text-[14.5px] leading-relaxed text-bone-muted">{r.label}</p>
                    </div>
                  ))}
                </div>
                {project.resultsNote && <p className="mt-4 text-[12.5px] text-bone-dim">{project.resultsNote}</p>}
              </Block>
            )}

            <Block title="Our approach">
              <ol className="space-y-5">
                {steps.map((s) => (
                  <li key={s.n} className="flex gap-5 border-b border-line/[0.06] pb-5 last:border-0">
                    <span className="font-display text-sm text-bone-dim">{s.n}</span>
                    <div>
                      <p className="font-display text-lg font-medium">{s.title}</p>
                      <p className="mt-1 text-[15px] leading-relaxed text-bone-muted">{s.points.join(' · ')}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>

            {project.links && project.links.length > 0 && (
              <Block title={project.links.length > 2 ? 'Accounts we manage' : 'Also see'}>
                <ul className="flex flex-wrap gap-2">
                  {project.links.map((l) => (
                    <li key={l.url}>
                      <a href={l.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line/10 px-4 py-2 text-[13.5px] text-bone/85 transition-colors hover:border-line/30 hover:text-bone">
                        {l.url.includes('instagram.com') && <Instagram className="h-3.5 w-3.5" />}
                        {l.label}
                        <ArrowUpRight className="h-3.5 w-3.5 text-bone-dim" />
                      </a>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        </div>
      </section>

      <section className="pb-28" aria-label="Project gallery">
        <div className="container-site">
          <Reveal className="mb-10">
            <span className="eyebrow">Gallery</span>
          </Reveal>
          <div className="grid gap-5 md:grid-cols-6">
            {project.gallery.map((g, i) => (
              <div key={g.src} className={g.tall ? 'md:col-span-2' : project.gallery.length > 3 ? 'md:col-span-3' : i === 0 ? 'md:col-span-4' : 'md:col-span-4'}>
                {g.tall ? (
                  <Reveal delay={0.1} className="flex h-full max-h-[720px] justify-center overflow-hidden rounded-[22px] border border-line/[0.07] bg-ink-800 p-4">
                    <img src={g.src} alt={g.alt} loading="lazy" className="h-full w-auto max-w-full rounded-xl object-contain object-top" />
                  </Reveal>
                ) : (
                  <ImageReveal src={g.src} alt={g.alt} className="aspect-[16/10] rounded-[22px] border border-line/[0.07] bg-ink-800" imgClassName="object-top" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line/[0.06]">
        <Link to={`/projects/${next.slug}`} className="group block" data-cursor="Next">
          <div className="container-site grid items-center gap-10 py-20 md:grid-cols-12 md:py-28">
            <div className="md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.24em] text-bone-dim">Next project</p>
              <p className="mt-5 font-display text-display-md font-medium transition-transform duration-700 ease-expo group-hover:translate-x-3">{next.title}</p>
              <p className="mt-4 text-bone-muted">{next.summary}</p>
            </div>
            <div className="relative aspect-[16/10] overflow-hidden rounded-[22px] border border-line/[0.07] md:col-span-5">
              <img src={next.cover.includes('/projects/') ? next.cover.replace('cover.webp', 'cover-800.webp') : next.cover} alt="" loading="lazy" className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-expo group-hover:scale-105" />
            </div>
          </div>
        </Link>
      </section>

      <FinalCTA />
      {project.url && project.embeddable && <ProjectModal project={project} open={preview} onClose={closePreview} />}
    </Page>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <h2 className="mb-6 text-[11px] font-normal uppercase tracking-[0.24em] text-bone-dim">{title}</h2>
      {children}
    </Reveal>
  );
}
