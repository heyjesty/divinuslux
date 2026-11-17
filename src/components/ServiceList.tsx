import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useState, type PointerEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { Reveal } from './Reveal';

const previewSrc = (i: number) => {
  const v = services[i].visual;
  return v.kind === 'image' ? v.src : v.srcs[1] ?? v.srcs[0];
};

/** Home page index of services with a cursor-following image preview on desktop. */
export function ServiceList() {
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 20 });
  const sy = useSpring(y, { stiffness: 150, damping: 20 });

  const move = (e: PointerEvent<HTMLUListElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <ul className="relative border-b border-line/[0.07]" onPointerMove={move} onPointerLeave={() => setActive(null)}>
      {services.map((s, i) => (
        <li key={s.slug} onPointerEnter={(e) => e.pointerType === 'mouse' && setActive(i)}>
          <Reveal delay={Math.min(i * 0.03, 0.2)}>
            <Link to={`/services#${s.slug}`} className="group relative grid grid-cols-12 items-center gap-4 border-t border-line/[0.07] py-6 md:py-8" data-cursor="Explore">
              <span className="col-span-2 font-display text-xs text-bone-dim md:col-span-1">{String(i + 1).padStart(2, '0')}</span>
              <span className="col-span-10 font-display text-[clamp(1.35rem,3vw,2.6rem)] font-medium leading-tight tracking-[-0.03em] text-bone/85 transition-all duration-700 ease-expo group-hover:translate-x-3 group-hover:text-bone md:col-span-6">
                {s.title}
              </span>
              <span className="col-span-10 col-start-3 -mt-2 text-[14px] leading-relaxed text-bone-muted md:col-span-4 md:col-start-auto md:mt-0 md:text-[15px]">{s.short}</span>
              <span className="hidden justify-self-end md:col-span-1 md:flex">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line/10 transition-all duration-500 ease-expo group-hover:rotate-45 group-hover:border-transparent group-hover:bg-bone group-hover:text-ink">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </span>
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand-blue via-brand-violet to-brand-cyan transition-transform duration-700 ease-expo group-hover:scale-x-100" />
            </Link>
          </Reveal>
        </li>
      ))}
      <AnimatePresence>
        {active !== null && (
          <motion.li
            key="preview"
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 z-10 hidden h-56 w-80 list-none overflow-hidden rounded-2xl border border-line/10 bg-ink-800 shadow-2xl lg:block"
            style={{ x: sx, y: sy, translateX: '-50%', translateY: '-110%' }}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35 }}
          >
            <AnimatePresence initial={false}>
              <motion.img
                key={active}
                src={previewSrc(active)}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            </AnimatePresence>
          </motion.li>
        )}
      </AnimatePresence>
    </ul>
  );
}
