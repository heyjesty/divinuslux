import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { ease, viewport } from '../animations/motion';

const thumb = (p: Project) => (p.cover.includes('/projects/') ? p.cover.replace('cover.webp', 'cover-800.webp') : p.cover);

interface Props {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1.1, delay: (index % 2) * 0.12, ease }}
      className="group"
    >
      <Link to={`/projects/${project.slug}`} className="block" data-cursor="View" aria-label={`${project.title} — view project`}>
        <div className={`relative overflow-hidden rounded-[24px] border border-line/[0.07] bg-ink-800 aspect-[16/10]`}>
          <img
            src={thumb(project)}
            srcSet={project.cover.includes('/projects/') ? `${thumb(project)} 800w, ${project.cover} 1440w` : undefined}
            sizes="(min-width: 1024px) 50vw, 100vw"
            alt={`${project.title} — ${project.summary}`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover object-top transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-line/30 via-line/0 to-line/0 opacity-60 transition-opacity duration-700 group-hover:opacity-100" />
          <div className="absolute left-5 top-5 flex gap-2">
            <span className="glass rounded-full px-3 py-1.5 text-[11px] uppercase tracking-[0.16em] text-bone/90">{project.category}</span>
          </div>
          <div className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-700 ease-expo group-hover:translate-y-0 group-hover:opacity-100">
            <ArrowUpRight className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div>
            <h3 className="font-display text-2xl font-medium tracking-[-0.02em] md:text-[28px]">{project.title}</h3>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-bone-muted">{project.summary}</p>
          </div>
          <span className="shrink-0 text-[11px] sm:pt-2 sm:text-[12px] uppercase tracking-[0.18em] text-bone-dim">{project.industry}</span>
        </div>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.services.map((s) => (
            <li key={s} className="rounded-full border border-line/[0.08] px-3 py-1 text-[12px] text-bone-muted">
              {s}
            </li>
          ))}
        </ul>
      </Link>
    </motion.article>
  );
}
