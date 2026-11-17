import type { Variants, Transition } from 'framer-motion';

export const ease = [0.16, 1, 0.3, 1] as const;
export const easeInOut = [0.76, 0, 0.24, 1] as const;

export const t = (duration = 0.9, delay = 0): Transition => ({ duration, delay, ease });

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: t(1) },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: t(1.2) },
};

export const stagger = (gap = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: gap, delayChildren: delay } },
});

export const viewport = { once: true, margin: '0px 0px -12% 0px' } as const;
