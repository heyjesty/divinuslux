import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode, ElementType } from 'react';
import { ease, viewport } from '../animations/motion';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'p' | 'span' | 'article' | 'figure';
}

/** Fades and lifts its children into view once. */
export function Reveal({ children, delay = 0, y = 28, className, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as ElementType;
  return (
    <Comp
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 1, delay, ease }}
    >
      {children}
    </Comp>
  );
}

interface RevealTextProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
  /** Words (exact match, punctuation stripped) to render with the gradient. */
  highlight?: string[];
  id?: string;
}

/** Line-by-line masked word reveal. Use "\n" in `text` for line breaks. */
export function RevealText({ text, className, delay = 0, as = 'h2', highlight = [], id }: RevealTextProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as ElementType;
  const lines = text.split('\n');
  let i = 0;
  return (
    <Tag id={id} className={className} initial="hidden" whileInView="show" viewport={viewport} aria-label={text.replace(/\n/g, ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block" aria-hidden>
          {line.split(' ').map((word, wi) => {
            const idx = i++;
            const hl = highlight.includes(word.replace(/[.,!?]/g, ''));
            return (
              <span key={wi} className="inline-block overflow-hidden pb-[0.12em] align-bottom -mb-[0.12em]">
                <motion.span
                  className={`inline-block ${hl ? 'text-gradient animate-shimmer' : ''}`}
                  variants={{
                    hidden: reduce ? { y: 0 } : { y: '108%' },
                    show: { y: 0, transition: { duration: 1.05, delay: delay + idx * 0.045, ease } },
                  }}
                >
                  {word}
                  {wi < line.split(' ').length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Image that reveals behind a sliding mask and settles from a slight zoom. */
export function ImageReveal({ src, alt, className = '', imgClassName = '', priority = false, sizes }: { src: string; alt: string; className?: string; imgClassName?: string; priority?: boolean; sizes?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
      whileInView={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={viewport}
      transition={{ duration: 1.3, ease }}
    >
      <motion.img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${imgClassName}`}
        initial={reduce ? false : { scale: 1.18 }}
        whileInView={{ scale: 1 }}
        viewport={viewport}
        transition={{ duration: 1.8, ease }}
      />
    </motion.div>
  );
}
