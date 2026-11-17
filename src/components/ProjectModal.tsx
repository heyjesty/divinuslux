import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Monitor, Smartphone, X, Loader2 } from 'lucide-react';
import type { Project } from '../data/projects';
import { getLenis } from '../lib/scroll';
import { ease, easeInOut } from '../animations/motion';

interface Props {
  project: Project;
  open: boolean;
  onClose: () => void;
}

/**
 * Full-screen live preview of a client website in a sandboxed iframe.
 * Only offered for projects whose site allows framing; a direct link is
 * always available in case the site changes its policy.
 */
export function ProjectModal({ project, open, onClose }: Props) {
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    setLoaded(false);
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = 'hidden';
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  if (!project.url) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`Live preview of ${project.title}`}
          className="fixed inset-0 z-[70] flex flex-col bg-ink/90 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.15 } }}
        >
          <motion.div
            className="flex items-center justify-between gap-4 border-b border-line/[0.07] px-4 py-3 md:px-8"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-[0.22em] text-bone-dim">Live preview</p>
              <p className="truncate font-display text-lg">{project.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden rounded-full border border-line/10 p-1 sm:flex" role="group" aria-label="Preview size">
                {(['desktop', 'mobile'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDevice(d)}
                    aria-pressed={device === d}
                    className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] capitalize transition-colors ${device === d ? 'bg-bone text-ink' : 'text-bone-muted hover:text-bone'}`}
                  >
                    {d === 'desktop' ? <Monitor className="h-3.5 w-3.5" /> : <Smartphone className="h-3.5 w-3.5" />}
                    {d}
                  </button>
                ))}
              </div>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-line/10 px-4 py-2.5 text-[12px] text-bone transition-colors hover:border-line/30"
              >
                <ExternalLink className="h-3.5 w-3.5" /> <span className="hidden sm:inline">Open site</span>
              </a>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-bone text-ink transition-transform hover:rotate-90"
                aria-label="Close preview"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>

          <div className="relative flex flex-1 items-center justify-center overflow-hidden p-3 md:p-8">
            <motion.div
              layout
              className={`relative h-full overflow-hidden rounded-2xl border border-line/10 bg-white shadow-[0_40px_120px_-30px_rgba(31,111,229,0.35)] ${device === 'mobile' ? 'w-[390px] max-w-full rounded-[36px] border-[8px] border-ink-600' : 'w-full max-w-[1440px]'}`}
              initial={{ clipPath: 'inset(8% 8% 8% 8% round 24px)', opacity: 0 }}
              animate={{ clipPath: 'inset(0% 0% 0% 0% round 0px)', opacity: 1 }}
              exit={{ clipPath: 'inset(8% 8% 8% 8% round 24px)', opacity: 0 }}
              transition={{ duration: 0.8, ease: easeInOut }}
            >
              {!loaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-ink-800 text-bone-muted">
                  <Loader2 className="h-6 w-6 animate-spin" />
                  <p className="text-sm">Loading {new URL(project.url).hostname}…</p>
                </div>
              )}
              <iframe
                title={`${project.title} website`}
                src={project.url}
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
                onLoad={() => setLoaded(true)}
              />
            </motion.div>
          </div>
          <p className="pb-4 text-center text-[12px] text-bone-dim">
            Preview loads the live site from {new URL(project.url).hostname}. If it does not appear, use “Open site”.
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
