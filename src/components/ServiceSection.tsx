import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Service } from '../data/services';
import { ServiceVisual } from './ServiceVisual';
import { Reveal } from './Reveal';
import { Button } from './Button';
import { ease } from '../animations/motion';

/** Large alternating service block with expandable "Learn more" detail. */
export function ServiceSection({ service, index, reverse = false }: { service: Service; index: number; reverse?: boolean }) {
  const [open, setOpen] = useState(false);
  const num = String(index + 1).padStart(2, '0');
  const panelId = `svc-${service.slug}-detail`;
  return (
    <article id={service.slug} className="group scroll-mt-28 border-t border-line/[0.07] py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-6 ${reverse ? 'lg:order-2' : ''}`}>
          <ServiceVisual visual={service.visual} />
        </div>
        <div className="lg:col-span-6 lg:px-4">
          <Reveal className="flex items-center gap-4 text-[12px] uppercase tracking-[0.24em] text-bone-dim">
            <span className="font-display text-5xl font-light tracking-tight text-transparent [-webkit-text-stroke:1px_rgba(11,26,51,0.35)] md:text-6xl">{num}</span>
            <span>{service.group}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-6 font-display text-[clamp(1.9rem,3.4vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.03em]">{service.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-bone-muted">{service.description}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-8 flex flex-wrap gap-2">
              {service.features.slice(0, 3).map((f) => (
                <li key={f} className="rounded-full border border-line/10 px-3.5 py-1.5 text-[13px] text-bone/80">
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2} className="mt-9">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls={panelId}
              className="group/btn inline-flex items-center gap-3 text-[14px] font-medium"
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-line/15 transition-all duration-500 ease-expo group-hover/btn:border-line/40 ${open ? 'rotate-45 bg-bone text-ink' : ''}`}
              >
                <Plus className="h-4 w-4" />
              </span>
              {open ? 'Show less' : 'Learn more'}
            </button>
          </Reveal>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.7, ease }}
                className="overflow-hidden"
              >
                <div className="mt-8 rounded-2xl border border-line/[0.08] bg-line/[0.02] p-6 md:p-8">
                  <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-bone-dim">What is included</p>
                  <ul className="grid gap-3 sm:grid-cols-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex gap-3 text-[15px] text-bone/85">
                        <span className="mt-[0.6em] h-px w-3 shrink-0 bg-brand-cyan" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <Button to={`/contact?service=${encodeURIComponent(service.title)}`} variant="ghost" className="!py-3">
                      Discuss this service
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </article>
  );
}
