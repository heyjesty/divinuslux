import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { company } from '../data/company';
import { Button } from './Button';
import { getLenis } from '../lib/scroll';
import { ease, easeInOut } from '../animations/motion';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/insights', label: 'Insights' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 400 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const lenis = getLenis();
    if (open) {
      lenis?.stop();
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (to: string) => (to === '/' ? pathname === '/' : pathname.startsWith(to));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-700 ease-expo ${hidden && !open ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="container-site pt-4">
          <nav
            aria-label="Primary"
            className={`flex items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-700 ease-expo md:px-5 ${
              scrolled || open ? 'border-line/[0.08] bg-ink/70 shadow-[0_10px_40px_-20px_rgba(15,40,80,0.22)] backdrop-blur-xl' : 'border-transparent bg-transparent'
            }`}
          >
            <Link to="/" className="group flex items-center" aria-label={`${company.legalName} — home`}>
              <img
                src={company.logo}
                alt={company.legalName}
                width={136}
                height={44}
                className="h-9 w-auto transition-transform duration-700 ease-expo group-hover:scale-[1.04] md:h-10"
              />
            </Link>

            <ul className="hidden items-center gap-1 lg:flex">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    className={`relative block rounded-full px-4 py-2 text-[13.5px] transition-colors duration-300 ${isActive(l.to) ? 'text-bone' : 'text-bone-muted hover:text-bone'}`}
                  >
                    {isActive(l.to) && (
                      <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-line/[0.07]" transition={{ duration: 0.6, ease }} />
                    )}
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden sm:block">
                <Button to="/contact" variant="gradient" className="!px-5 !py-2.5 text-[13px]">
                  Let&apos;s Talk
                </Button>
              </div>
              <button
                type="button"
                className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line/10 lg:hidden"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-expo ${open ? 'rotate-45' : '-translate-y-[4px]'}`} />
                <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ease-expo ${open ? '-rotate-45' : 'translate-y-[4px]'}`} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: easeInOut }}
          >
            <div className="container-site flex flex-1 flex-col justify-between pb-10 pt-32">
              <ul className="space-y-1">
                {navLinks.map((l, i) => (
                  <li key={l.to} className="overflow-hidden">
                    <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} transition={{ duration: 0.8, delay: 0.15 + i * 0.05, ease }}>
                      <Link
                        to={l.to}
                        className={`flex items-baseline gap-4 py-1.5 font-display text-[clamp(2.2rem,10vw,3.5rem)] font-medium tracking-tight ${isActive(l.to) ? 'text-bone' : 'text-bone/50'}`}
                      >
                        <span className="text-xs text-bone-dim">0{i + 1}</span>
                        {l.label}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ delay: 0.5 }} className="space-y-2 text-sm text-bone-muted">
                <a href={`mailto:${company.contact.email}`} className="block text-bone">
                  {company.contact.email}
                </a>
                {company.contact.phones.map((p) => (
                  <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block">
                    {p}
                  </a>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
