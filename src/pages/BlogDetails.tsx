import { motion, useScroll, useSpring } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Page } from '../components/Page';
import { Seo } from '../components/Seo';
import { Reveal, RevealText, ImageReveal } from '../components/Reveal';
import { InsightCard } from '../components/InsightCard';
import { Button } from '../components/Button';
import { getPost, posts, formatDate, type Block } from '../data/blog';
import { SITE_URL, company } from '../data/company';
import NotFound from './NotFound';

export default function BlogDetails() {
  const { slug = '' } = useParams();
  const post = getPost(slug);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  if (!post) return <NotFound />;
  const others = posts.filter((p) => p.slug !== post.slug);

  return (
    <Page>
      <Seo
        title={post.title}
        description={post.excerpt}
        path={`/insights/${post.slug}`}
        image={post.image}
        type="article"
        breadcrumbs={[
          { name: 'Insights', path: '/insights' },
          { name: post.title, path: `/insights/${post.slug}` },
        ]}
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: post.title,
            description: post.excerpt,
            image: [`${SITE_URL}${post.image}`],
            datePublished: post.date,
            dateModified: post.date,
            articleSection: post.category,
            mainEntityOfPage: `${SITE_URL}/insights/${post.slug}`,
            author: { '@type': 'Organization', name: company.legalName, url: SITE_URL },
            publisher: { '@type': 'Organization', name: company.legalName, logo: { '@type': 'ImageObject', url: `${SITE_URL}${company.logo}` } },
          },
        ]}
      />
      <motion.div aria-hidden style={{ scaleX: progress }} className="fixed inset-x-0 top-0 z-[55] h-[2px] origin-left bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan" />

      <article>
        <header className="pb-14 pt-40 md:pt-48">
          <div className="container-site max-w-5xl">
            <Reveal>
              <Link to="/insights" className="group inline-flex items-center gap-2 text-[13px] text-bone-muted hover:text-bone">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> All insights
              </Link>
            </Reveal>
            <Reveal delay={0.05} className="mt-10 flex items-center gap-3 text-[12px] uppercase tracking-[0.18em] text-bone-dim">
              <span className="text-brand-cyan">{post.category}</span>
              <span className="h-1 w-1 rounded-full bg-line/30" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="h-1 w-1 rounded-full bg-line/30" />
              <span>{post.readingMinutes} min read</span>
            </Reveal>
            <RevealText as="h1" text={post.title} delay={0.1} className="mt-8 font-display text-[clamp(2.2rem,5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.035em]" />
            <Reveal delay={0.3}>
              <p className="mt-8 max-w-3xl text-xl leading-relaxed text-bone-muted">{post.excerpt}</p>
            </Reveal>
          </div>
        </header>

        <div className="container-site">
          <ImageReveal src={post.image} alt={post.imageAlt} priority className="aspect-[16/9] rounded-[28px] md:aspect-[21/9]" />
        </div>

        <div className="container-site max-w-3xl py-20 md:py-28">
          <div className="prose-article">
            {post.body.map((b, i) => (
              <BlockView key={i} block={b} />
            ))}
          </div>
          <div className="mt-16 flex flex-col gap-6 rounded-3xl border border-line/[0.08] bg-line/[0.02] p-8 sm:flex-row sm:items-center sm:justify-between md:p-10">
            <div>
              <p className="font-display text-xl font-medium">Have a project in mind?</p>
              <p className="mt-1 text-bone-muted">Talk to the Divinuslux team.</p>
            </div>
            <Button to="/contact" variant="primary">
              Start a Project
            </Button>
          </div>
        </div>
      </article>

      <section className="border-t border-line/[0.06] py-24" aria-label="More insights">
        <div className="container-site">
          <p className="eyebrow mb-12">Keep reading</p>
          <div className="grid gap-12 md:grid-cols-2 md:gap-8">
            {others.map((p, i) => (
              <InsightCard key={p.slug} post={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </Page>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case 'h2':
      return <h2>{block.text}</h2>;
    case 'ul':
      return (
        <ul>
          {block.items.map((it) => (
            <li key={it}>{it}</li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote className="my-12 border-l-2 border-brand-cyan pl-6 font-display text-2xl font-medium leading-snug tracking-[-0.02em] text-bone md:text-3xl">{block.text}</blockquote>
      );
    default:
      return <p>{block.text}</p>;
  }
}
