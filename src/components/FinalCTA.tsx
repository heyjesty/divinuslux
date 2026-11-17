import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { RevealText, Reveal } from './Reveal';
import { Button } from './Button';

/** Cinematic closing call to action with slowly drifting light. */
export function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.5], reduce ? [1, 1] : [0.92, 1]);
  const glowX = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-15%', '15%']);

  return (
    <section ref={ref} className="px-3 py-10 md:px-6" aria-labelledby="cta-title">
      <motion.div style={{ scale }} className="grain relative mx-auto max-w-[1600px] overflow-hidden rounded-[28px] md:rounded-[36px] border border-line/[0.07] bg-ink-900 px-5 py-20 text-center sm:px-6 md:py-40">
        <motion.div aria-hidden style={{ x: glowX }} className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(31,111,229,0.35),rgba(19,181,200,0.3),rgba(19,181,200,0.25),rgba(31,111,229,0.35))] opacity-60 blur-[110px] motion-safe:animate-[spin_30s_linear_infinite]" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(246,249,253,0.92)_75%)]" />
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(rgba(11,26,51,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(11,26,51,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,#000_10%,transparent_65%)]" />
        <div className="relative">
          <Reveal>
            <span className="eyebrow">Let&apos;s build together</span>
          </Reveal>
          <RevealText id="cta-title" as="h2" text={'Your Next Big Idea\nStarts Here.'} highlight={['Starts', 'Here']} className="mx-auto mt-8 max-w-5xl font-display text-display-lg font-medium" />
          <Reveal delay={0.25}>
            <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-bone/70">
              Let&apos;s turn your vision into a powerful digital experience. Connect with our team and discover what&apos;s possible.
            </p>
          </Reveal>
          <Reveal delay={0.35} className="mx-auto mt-12 flex max-w-xs flex-col justify-center gap-3 sm:max-w-none sm:flex-row sm:flex-wrap">
            <Button to="/contact" variant="primary" block>
              Start a Project
            </Button>
            <Button to="/contact#details" variant="ghost" block>
              Contact Us
            </Button>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
