import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { VideoBackground } from './VideoBackground';
import { Button } from './Button';
import { company } from '../data/company';
import { scrollToTarget } from '../lib/scroll';

const LINES: { text: string; gradient?: boolean }[][] = [
  [{ text: 'Turning' }, { text: 'Vision' }],
  [{ text: 'Into' }, { text: 'Digital', gradient: true }, { text: 'Excellence.', gradient: true }],
];

const BASE_DELAY = 1.25; // after the preloader

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '22%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '-12%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  let w = 0;
  return (
    <section ref={ref} className="grain relative flex min-h-[100svh] flex-col overflow-hidden" aria-labelledby="hero-title">
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <VideoBackground src={company.heroVideo || undefined} poster={company.heroPoster} />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: fadeOut }} className="container-site relative z-10 flex flex-1 flex-col justify-end pb-16 pt-32 sm:pb-28 sm:pt-36 md:pb-32">
        <p className="hero-in mb-6 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-bone-muted sm:mb-8 sm:text-[11px] sm:tracking-[0.32em]" style={{ animationDelay: `${BASE_DELAY}s` }}>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan shadow-[0_0_12px_2px_rgba(19,181,200,0.6)]" />
          Digital Innovation · Software · Growth
        </p>

        <h1 id="hero-title" className="font-display text-display-xl font-medium text-bone" aria-label="Turning Vision Into Digital Excellence.">
          {LINES.map((line, li) => (
            <span key={li} className="block" aria-hidden>
              {line.map((word, wi) => {
                const delay = BASE_DELAY + 0.1 + w++ * 0.07;
                return (
                  <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.1em] align-bottom -mb-[0.1em] last:mr-0">
                    <span className={`hero-word inline-block ${word.gradient ? 'text-gradient animate-shimmer' : ''}`} style={{ animationDelay: `${delay}s` }}>
                      {word.text}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <div className="mt-8 grid gap-8 sm:mt-12 sm:gap-10 md:grid-cols-12 md:items-end">
          <p className="hero-in max-w-xl text-[17px] leading-relaxed text-bone/70 md:col-span-6 md:text-lg" style={{ animationDelay: `${BASE_DELAY + 0.6}s` }}>
            We build intelligent digital solutions, powerful software and growth-driven experiences that help businesses move forward.
          </p>
          <div className="hero-in flex flex-col gap-3 sm:flex-row sm:flex-wrap md:col-span-6 md:justify-end" style={{ animationDelay: `${BASE_DELAY + 0.75}s` }}>
            <Button to="/projects" variant="primary" block>
              Explore Our Work
            </Button>
            <Button to="/contact" variant="ghost" block>
              Start a Project
            </Button>
          </div>
        </div>
      </motion.div>

      {/* floating meta */}
      <div className="pointer-events-none absolute right-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block xl:right-12">
        <div className="hero-in" style={{ animationDelay: `${BASE_DELAY + 0.9}s` }}>
        <div className="glass animate-floaty rounded-2xl p-4">
          <img src={company.mark} alt="" width={44} height={44} className="h-11 w-11" />
        </div>
        </div>
      </div>

      <div className="container-site relative z-10 flex items-center justify-between pb-8 text-[11px] uppercase tracking-[0.24em] text-bone-dim">
        <span className="hero-in hidden sm:block" style={{ animationDelay: `${BASE_DELAY + 1}s` }}>
          Kochi · Atlanta · Poole · Naples · Lisbon
        </span>
        <button
          type="button"
          onClick={() => scrollToTarget('intro')}
          className="hero-in group mx-auto flex items-center gap-3 sm:mx-0"
          style={{ animationDelay: `${BASE_DELAY + 1.1}s` }}
          aria-label="Scroll to content"
        >
          <span className="relative flex h-9 w-5 justify-center rounded-full border border-line/25 pt-1.5">
            <span className="h-1.5 w-1 animate-scrolldot rounded-full bg-bone" />
          </span>
          <span className="transition-colors group-hover:text-bone">Scroll</span>
        </button>
      </div>
    </section>
  );
}
