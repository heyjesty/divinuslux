import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { RevealText, Reveal } from './Reveal';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  highlight?: string[];
  intro?: ReactNode;
  crumbs: { name: string; path?: string }[];
  children?: ReactNode;
}

/** Header for inner pages: breadcrumb trail, oversized title and intro. */
export function PageHero({ eyebrow, title, highlight, intro, crumbs, children }: PageHeroProps) {
  return (
    <section className="grain relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40 md:pb-24 md:pt-48">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -right-[10%] -top-[30%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,rgba(31,111,229,0.16),transparent_60%)] blur-2xl" />
        <div className="absolute -left-[20%] top-[10%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(19,181,200,0.10),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(11,26,51,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(11,26,51,0.035)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_top,#000_20%,transparent_70%)]" />
      </div>
      <div className="container-site relative">
        <Reveal>
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12px] text-bone-dim">
              <li>
                <Link to="/" className="hover:text-bone">
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.name} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3 w-3" />
                  {c.path ? (
                    <Link to={c.path} className="hover:text-bone">
                      {c.name}
                    </Link>
                  ) : (
                    <span className="text-bone-muted" aria-current="page">
                      {c.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <span className="eyebrow mb-7">{eyebrow}</span>
        </Reveal>
        <RevealText as="h1" text={title} highlight={highlight} delay={0.1} className="mt-7 max-w-6xl font-display text-display-lg font-medium" />
        {intro && (
          <Reveal delay={0.35} className="mt-8 max-w-2xl text-base leading-relaxed sm:mt-10 sm:text-lg text-bone-muted">
            {intro}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
