import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface Props {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/** Counts up from zero the first time it enters the viewport. Renders the final value on the server. */
export function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2.2, className = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    if (!reduce && !started.current) setDisplay(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce || started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${prefix}${value}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {display.toLocaleString('en-IN')}
        {suffix}
      </span>
    </span>
  );
}
