import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import type { Post } from '../data/blog';
import { formatDate } from '../data/blog';
import { Reveal } from './Reveal';

export function InsightCard({ post, index, featured = false }: { post: Post; index: number; featured?: boolean }) {
  return (
    <Reveal delay={index * 0.1} as="article" className="group h-full">
      <Link to={`/insights/${post.slug}`} className="flex h-full flex-col" data-cursor="Read">
        <div className={`relative overflow-hidden rounded-[22px] border border-line/[0.07] bg-ink-800 ${featured ? 'aspect-[16/10]' : 'aspect-[4/3]'}`}>
          <img src={post.image} alt={post.imageAlt} loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-[1.4s] ease-expo group-hover:scale-[1.06]" />
          <div className="absolute inset-0 bg-gradient-to-t from-line/10 to-transparent" />
        </div>
        <div className="mt-6 flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-bone-dim">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="h-1 w-1 rounded-full bg-brand-cyan" />
          <span>{post.category}</span>
        </div>
        <h3 className={`mt-4 font-display font-medium leading-snug tracking-[-0.02em] transition-colors group-hover:text-brand-blue ${featured ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-[15px] leading-relaxed text-bone-muted">{post.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[14px] font-medium">
          Read article
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </Link>
    </Reveal>
  );
}
