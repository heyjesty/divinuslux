import type { ReactNode } from 'react';
import { Reveal, RevealText } from './Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  index?: string;
  title: string;
  highlight?: string[];
  intro?: ReactNode;
  aside?: ReactNode;
  as?: 'h1' | 'h2';
  size?: 'lg' | 'md';
  className?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, index, title, highlight, intro, aside, as = 'h2', size = 'lg', className = '', id }: SectionHeadingProps) {
  return (
    <div className={`grid gap-10 lg:grid-cols-12 lg:items-end ${className}`}>
      <div className={intro || aside ? "lg:col-span-8" : "lg:col-span-12"}>
        {(eyebrow || index) && (
          <Reveal className="mb-7 flex items-center gap-4">
            {index && <span className="font-display text-xs text-bone-dim">{index}</span>}
            {eyebrow && <span className="eyebrow">{eyebrow}</span>}
          </Reveal>
        )}
        <RevealText
          id={id}
          as={as}
          text={title}
          highlight={highlight}
          className={`font-display font-medium text-bone ${size === 'lg' ? 'text-display-lg' : 'text-display-md'}`}
        />
      </div>
      {(intro || aside) && (
        <Reveal delay={0.2} className="lg:col-span-4 lg:pb-3">
          {intro && <p className="max-w-md text-[16px] leading-relaxed text-bone-muted">{intro}</p>}
          {aside}
        </Reveal>
      )}
    </div>
  );
}
