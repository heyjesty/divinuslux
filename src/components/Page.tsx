import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { easeInOut, ease } from '../animations/motion';

/** Wraps each route: content cross-fade plus a curtain wipe between pages. */
export function Page({ children }: { children: ReactNode }) {
  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[60] origin-top bg-ink-800"
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0, transition: { duration: 0.75, ease: easeInOut, delay: 0.05 } }}
        exit={{ scaleY: 1, originY: 1, transition: { duration: 0.55, ease: easeInOut } }}
        style={{ originY: 0 }}
      />
      <motion.main
        id="main"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.9, ease, delay: 0.25 } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.45, ease: easeInOut } }}
      >
        {children}
      </motion.main>
    </>
  );
}
