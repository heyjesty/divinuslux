import { stats } from '../data/company';
import { AnimatedCounter } from './AnimatedCounter';
import { Reveal } from './Reveal';
import { SectionHeading } from './SectionHeading';

/** Impact figures — only numbers that can be traced to public Divinuslux material. */
export function Stats({ withHeading = true }: { withHeading?: boolean }) {
  return (
    <section className="relative bg-ink-900 py-20 md:py-36" aria-labelledby={withHeading ? 'impact-title' : undefined}>
      <div className="container-site">
        {withHeading && (
          <SectionHeading id="impact-title"
            eyebrow="Impact & presence"
            index="08"
            title={'Real Work.\nReal Numbers.'}
            highlight={['Numbers']}
            intro="Every figure here comes from our published portfolio and office list — no inflated claims."
            size="md"
          />
        )}
        <div className={`grid grid-cols-2 border-l border-t border-line/[0.07] bg-ink lg:grid-cols-4 ${withHeading ? 'mt-16 md:mt-20' : ''}`}>
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="group relative overflow-hidden border-b border-r border-line/[0.07] p-5 sm:p-8 md:p-10">
              <div aria-hidden className="absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-brand-blue/0 blur-3xl transition-colors duration-700 group-hover:bg-brand-blue/20" />
              <p className="font-display text-[clamp(2.4rem,5.5vw,5rem)] font-medium leading-none tracking-[-0.05em]">
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="mt-4 text-[14px] font-medium sm:mt-6 sm:text-[15px] text-bone">{s.label}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed sm:text-[13.5px] text-bone-dim">{s.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
