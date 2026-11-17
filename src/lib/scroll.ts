import type Lenis from 'lenis';

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};

export const getLenis = () => instance;

/** Smoothly scroll to an element id or Y position, falling back to native scroll. */
export function scrollToTarget(target: string | number, opts: { immediate?: boolean; offset?: number } = {}) {
  if (typeof window === 'undefined') return;
  const offset = opts.offset ?? -90;
  if (instance) {
    instance.scrollTo(typeof target === 'string' ? `#${target}` : target, { offset, immediate: opts.immediate, duration: 1.4 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: opts.immediate ? 'auto' : 'smooth' });
  } else {
    const el = document.getElementById(target);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY + offset, behavior: opts.immediate ? 'auto' : 'smooth' });
  }
}
