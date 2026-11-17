import { AnimatePresence, motion, LayoutGroup } from 'framer-motion';
import { useState } from 'react';
import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { PageHero } from '../components/PageHero';
import { ProjectCard } from '../components/ProjectCard';
import { FinalCTA } from '../components/FinalCTA';
import { Reveal } from '../components/Reveal';
import { projects, projectCategories } from '../data/projects';
import { SITE_URL } from '../data/company';
import { ease } from '../animations/motion';

export default function Projects() {
  const [filter, setFilter] = useState<string>('All');
  const list = filter === 'All' ? projects : projects.filter((p) => p.category === filter);
  const tabs = ['All', ...projectCategories];

  return (
    <Page>
      <Seo
        title="Projects — Websites, Campaigns & Brand Work"
        description="Selected work by Divinuslux: websites for real estate, interiors, solar, travel, education and food brands, plus Meta Ads performance campaigns and social media management."
        path="/projects"
        breadcrumbs={[{ name: 'Projects', path: '/projects' }]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Divinuslux projects',
            url: `${SITE_URL}/projects`,
            hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.title, url: `${SITE_URL}/projects/${p.slug}` })),
          },
        ]}
      />
      <PageHero
        eyebrow="Portfolio"
        title={'Selected Work.\nMeaningful Impact.'}
        highlight={['Meaningful', 'Impact']}
        crumbs={[{ name: 'Projects' }]}
        intro="Websites, performance campaigns and creative work for businesses across India, the UAE and beyond. Open any project for details and, where available, a live preview."
      />

      <section className="pb-20 md:pb-36">
        <div className="container-site">
          <Reveal>
            <LayoutGroup>
              <div role="tablist" aria-label="Filter projects by category" className="mb-16 flex flex-wrap gap-2">
                {tabs.map((t) => {
                  const count = t === 'All' ? projects.length : projects.filter((p) => p.category === t).length;
                  const active = filter === t;
                  return (
                    <button
                      key={t}
                      role="tab"
                      aria-selected={active}
                      type="button"
                      onClick={() => setFilter(t)}
                      className={`relative rounded-full border px-5 py-2.5 text-[13.5px] transition-colors duration-300 ${active ? 'border-transparent text-ink' : 'border-line/10 text-bone-muted hover:text-bone'}`}
                    >
                      {active && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-bone" transition={{ duration: 0.5, ease }} />}
                      <span className="relative">
                        {t} <span className={active ? 'text-ink/50' : 'text-bone-dim'}>{count}</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </Reveal>

          <motion.div layout className="grid gap-x-8 gap-y-20 md:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.div
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.6, ease }}
                >
                  <ProjectCard project={p} index={i} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
      <FinalCTA />
    </Page>
  );
}
