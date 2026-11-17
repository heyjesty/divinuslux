import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Check } from 'lucide-react';
import { services, type Service } from '../data/services';
import { ServiceVisual } from './ServiceVisual';

/**
 * Home page services as a scroll-driven card stack: each card pins near the
 * top and the next one glides up over it, while the cards beneath ease back
 * (scale + dim) — a smooth "dealing a deck" effect.
 */
export function ServiceStack() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ['start start', 'end end'] });
  const total = services.length;

  return (
    <div ref={container} className="relative">
      {services.map((s, i) => (
        <StackCard key={s.slug} service={s} index={i} total={total} progress={scrollYProgress} />
      ))}
    </div>
  );
}

const tints = [
  'from-[#eef4ff] via-white to-white',
  'from-[#e8f8fb] via-white to-white',
  'from-[#f1f6ff] via-white to-[#f3fbfd]',
];

function StackCard({ service, index, total, progress }: { service: Service; index: number; total: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion();
  const targetScale = 1 - (total - index) * 0.022;
  const start = index / total;
  const scale = useTransform(progress, [start, 1], [1, reduce ? 1 : targetScale]);
  const dim = useTransform(progress, [start, Math.min(1, start + 2 / total)], [0, reduce ? 0 : 0.06]);
  const num = String(index + 1).padStart(2, '0');

  return (
    <div className="sticky flex min-h-[92vh] items-start md:min-h-[80vh]" style={{ top: `calc(84px + ${index * 12}px)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        initial={reduce ? false : { opacity: 0, y: 90, rotateX: -10 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className={`group relative w-full overflow-hidden rounded-[28px] border border-line/[0.08] bg-gradient-to-br ${tints[index % tints.length]} shadow-[0_-12px_40px_-24px_rgba(15,40,80,0.25),0_30px_60px_-40px_rgba(15,40,80,0.25)] [perspective:1200px] md:rounded-[36px]`}
      >
        <motion.div aria-hidden style={{ opacity: dim }} className="pointer-events-none absolute inset-0 z-10 bg-line" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(31,111,229,0.12),transparent_65%)]" />

        <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-12 md:gap-10 md:p-12">
          <div className="flex flex-col md:col-span-6 lg:col-span-7">
            <div className="flex items-center justify-between">
              <span className="text-gradient font-display text-[clamp(2.6rem,6vw,5rem)] font-semibold leading-none tracking-[-0.05em]">{num}</span>
              <span className="rounded-full border border-line/10 bg-white/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-bone-muted">{service.group}</span>
            </div>
            <h3 className="mt-5 font-display text-[clamp(1.6rem,3vw,2.75rem)] font-medium leading-[1.08] tracking-[-0.03em] md:mt-8">{service.title}</h3>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-bone-muted md:text-[17px]">{service.description}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {service.features.slice(0, 4).map((f, fi) => (
                <li key={f} className={`items-start gap-2.5 text-[14px] text-bone/85 ${fi > 1 ? 'hidden sm:flex' : 'flex'}`}>
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-blue to-brand-cyan text-white">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 md:mt-auto md:pt-10">
              <Link
                to={`/services#${service.slug}`}
                className="inline-flex items-center gap-3 rounded-full bg-bone py-2 pl-5 pr-2 text-[14px] font-medium text-white transition-colors duration-300 hover:bg-brand-blue"
                data-cursor="Explore"
              >
                Learn more
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition-transform duration-500 ease-expo group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>
          <div className="order-first md:order-none md:col-span-6 lg:col-span-5">
            <ServiceVisual visual={service.visual} className="!aspect-[16/9] md:!aspect-[1/1] lg:!aspect-[5/4]" />
          </div>
        </div>
      </motion.article>
    </div>
  );
}
