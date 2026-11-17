import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { process } from '../data/company';
import { SectionHeading } from './SectionHeading';

/** Connected four-step timeline. The rail fills and each step lights up as you scroll. */
export function ProcessTimeline() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const steps = gsap.utils.toArray<HTMLElement>('[data-step]');
      if (reduce) {
        gsap.set('[data-rail-fill]', { scaleY: 1 });
        steps.forEach((s) => s.classList.add('is-active'));
        return;
      }
      gsap.fromTo(
        '[data-rail-fill]',
        { scaleY: 0 },
        { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '[data-rail]', start: 'top 65%', end: 'bottom 60%', scrub: 0.6 } },
      );
      steps.forEach((step) => {
        gsap.fromTo(step.querySelectorAll('[data-reveal]'), { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: { trigger: step, start: 'top 75%' },
        });
        ScrollTrigger.create({
          trigger: step,
          start: 'top 62%',
          end: 'bottom 40%',
          onToggle: (self) => step.classList.toggle('is-active', self.isActive || self.progress === 1),
          onLeave: () => step.classList.add('is-active'),
        });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-ink-900 py-20 md:py-40" aria-labelledby="process-title">
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="process-title" eyebrow="Our process" index="06" title={'From Idea to\nDigital Reality.'} highlight={['Digital', 'Reality']} size="md" />
              <p className="mt-8 max-w-sm text-[16px] leading-relaxed text-bone-muted">
                A clear, four-stage process keeps every project focused — from the first conversation to long after launch.
              </p>
            </div>
          </div>
          <ol data-rail className="relative lg:col-span-7">
            <span aria-hidden className="absolute bottom-6 left-[19px] top-6 w-px bg-line/[0.08]" />
            <span aria-hidden data-rail-fill className="absolute bottom-6 left-[19px] top-6 w-px origin-top bg-gradient-to-b from-brand-blue via-brand-violet to-brand-cyan" />
            {process.map((p) => (
              <li key={p.n} data-step className="group/step relative pb-16 pl-16 last:pb-0 md:pl-20">
                <span className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-line/15 bg-ink-900 font-display text-[12px] text-bone-dim transition-all duration-700 group-[.is-active]/step:border-transparent group-[.is-active]/step:bg-bone group-[.is-active]/step:text-ink">
                  {p.n}
                </span>
                <h3 data-reveal className="font-display text-[clamp(1.6rem,2.8vw,2.4rem)] font-medium tracking-[-0.03em] text-bone/40 transition-colors duration-700 group-[.is-active]/step:text-bone">
                  {p.title}
                </h3>
                <p data-reveal className="mt-4 max-w-lg text-[16px] leading-relaxed text-bone-muted">
                  {p.text}
                </p>
                <ul data-reveal className="mt-6 flex flex-wrap gap-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="rounded-full border border-line/[0.08] px-3 py-1.5 text-[12.5px] text-bone/70">
                      {pt}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
