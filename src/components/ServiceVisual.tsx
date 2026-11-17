import { motion, useReducedMotion } from 'framer-motion';
import type { ServiceVisual as Visual } from '../data/services';
import { ImageReveal } from './Reveal';
import { ease, viewport } from '../animations/motion';

/** Distinct visual per service: masked photo, phone trio or stacked cards. */
export function ServiceVisual({ visual, className = '' }: { visual: Visual; className?: string }) {
  const reduce = useReducedMotion();
  const frame = `relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line/[0.07] bg-ink-800 ${className}`;

  if (visual.kind === 'image') {
    return (
      <div className={frame}>
        <ImageReveal src={visual.src} alt={visual.alt} className="absolute inset-0" imgClassName="transition-transform duration-[1.6s] ease-expo group-hover:scale-[1.04]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-line/15 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-inset ring-line/[0.06]" />
      </div>
    );
  }

  if (visual.kind === 'phones') {
    return (
      <div className={`${frame} flex items-center justify-center bg-[radial-gradient(circle_at_50%_40%,rgba(31,111,229,0.25),transparent_65%)]`} role="img" aria-label={visual.alt}>
        {visual.srcs.map((src, i) => (
          <motion.div
            key={src}
            className="absolute w-[28%] overflow-hidden rounded-[22px] border-[5px] border-ink-600 bg-ink shadow-[0_30px_60px_-20px_rgba(15,40,80,0.22)]"
            style={{ aspectRatio: '9 / 19', zIndex: i === 1 ? 2 : 1 }}
            initial={reduce ? false : { y: 80, opacity: 0, rotate: 0, x: '0%' }}
            whileInView={{ y: i === 1 ? -6 : 18, opacity: 1, rotate: (i - 1) * 6, x: `${(i - 1) * 82}%` }}
            viewport={viewport}
            transition={{ duration: 1.3, delay: 0.1 + i * 0.12, ease }}
          >
            <img src={src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className={`${frame} flex items-center justify-center bg-[radial-gradient(circle_at_50%_50%,rgba(19,181,200,0.2),transparent_65%)]`} role="img" aria-label={visual.alt}>
      {visual.srcs.map((src, i) => (
        <motion.img
          key={src}
          src={src}
          alt=""
          loading="lazy"
          className="absolute max-h-[66%] w-auto max-w-[46%] rounded-2xl border border-line/10 object-contain shadow-[0_30px_60px_-20px_rgba(15,40,80,0.22)]"
          style={{ zIndex: i === 1 ? 2 : 1 }}
          initial={reduce ? false : { y: 60, opacity: 0, x: '0%' }}
          whileInView={{ y: i === 1 ? -10 : 14, opacity: 1, x: `${(i - 1) * 62}%`, rotate: (i - 1) * 5 }}
          viewport={viewport}
          transition={{ duration: 1.3, delay: 0.1 + i * 0.12, ease }}
        />
      ))}
    </div>
  );
}
