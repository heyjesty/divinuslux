import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Preloader } from './Preloader';
import { SmoothScroll } from './SmoothScroll';
import { CustomCursor } from './CustomCursor';
import { scrollToTarget } from '../lib/scroll';

export function Layout({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();

  // After the first load the hero no longer waits for the preloader.
  useEffect(() => {
    const id = window.setTimeout(() => document.documentElement.classList.add('no-intro'), 2600);
    return () => window.clearTimeout(id);
  }, []);

  // Scroll to #hash targets once the incoming page has rendered.
  useEffect(() => {
    if (!hash) return;
    const id = window.setTimeout(() => scrollToTarget(decodeURIComponent(hash.slice(1))), 700);
    return () => window.clearTimeout(id);
  }, [hash, pathname]);

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-bone focus:px-5 focus:py-3 focus:text-ink">
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <CustomCursor />
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
