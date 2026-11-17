import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'framer-motion';
import { useRef } from 'react';
import { pillars } from '../data/company';
import { SectionHeading } from './SectionHeading';

/**
 * "Beyond Technology" — each principle is a large typographic line that
 * brightens as it passes the centre of the viewport, with its explanation beside it.
 */
export function WhyUs() {
  return (
    <section className="relative overflow-hidden py-20 md:py-40" aria-labelledby="why-title">
      <div aria-hidden className="absolute left-1/2 top-1/3 h-[50vmax] w-[50vmax] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(19,181,200,0.10),transparent_60%)] blur-3xl" />
      <div className="container-site relative">
        <SectionHeading id="why-title"
          eyebrow="Why Divinuslux"
          index="07"
          title={'Beyond Technology.\nBuilt for Progress.'}
          highlight={['Progress']}
          intro="Strategy, design, engineering and marketing under one roof — so ideas move from concept to measurable results without losing anything in translation."
        />
        <ol className="mt-20 md:mt-28">
          {pillars.map((p, i) => (
            <Pillar key={p.title} index={i} title={p.title} text={p.text} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Pillar({ index, title, text }: { index: number; title: string; text: string }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 35%'] });
  const opacity = useTransform(scrollYProgress, [0, 0.45, 0.55, 1], reduce ? [1, 1, 1, 1] : [0.3, 1, 1, 0.45]);
  const x = useTransform(scrollYProgress, [0, 0.5], reduce ? [0, 0] : [24, 0]);
  return (
    <li ref={ref} className="grid gap-4 border-t border-line/[0.07] py-8 md:grid-cols-12 md:items-center md:gap-8 md:py-10">
      <span className="font-display text-xs text-bone-dim md:col-span-1">{String(index + 1).padStart(2, '0')}</span>
      <Title opacity={opacity} x={x} title={title} />
      <motion.p style={{ opacity }} className="max-w-md text-[15.5px] leading-relaxed text-bone-muted md:col-span-4">
        {text}
      </motion.p>
    </li>
  );
}

function Title({ opacity, x, title }: { opacity: MotionValue<number>; x: MotionValue<number>; title: string }) {
  return (
    <motion.h3 style={{ opacity, x }} className="font-display text-[clamp(1.8rem,4.6vw,4.2rem)] font-medium leading-[1.02] tracking-[-0.04em] md:col-span-7">
      {title}
    </motion.h3>
  );
}
