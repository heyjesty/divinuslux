import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { company } from '../data/company';
import { services } from '../data/services';
import { navLinks } from './Navbar';
import { scrollToTarget } from '../lib/scroll';

const socialLabels: Record<string, string> = { instagram: 'Instagram', linkedin: 'LinkedIn', facebook: 'Facebook', x: 'X', youtube: 'YouTube' };

export function Footer() {
  const socials = Object.entries(company.social).filter(([, url]) => Boolean(url));
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line/[0.06] bg-ink-900 pt-24">
      <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[70%] -translate-x-1/2 rounded-full bg-brand-blue/10 blur-[120px]" />
      <div className="container-site relative">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img src={company.logo} alt={company.legalName} width={160} height={51} loading="lazy" className="h-11 w-auto" />
            <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bone-muted">{company.shortDescription}</p>
            <div className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-[12px] uppercase tracking-[0.2em] text-bone-dim">
              {company.offices.map((o, i) => (
                <span key={o.city}>
                  {o.city}
                  {i < company.offices.length - 1 && <span className="ml-3 text-line/15">/</span>}
                </span>
              ))}
            </div>
          </div>

          <FooterCol title="Navigate" className="lg:col-span-2">
            {navLinks.map((l) => (
              <FooterLink key={l.to} to={l.to}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services" className="lg:col-span-3">
            {services.slice(0, 8).map((s) => (
              <FooterLink key={s.slug} to={`/services#${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Contact" className="lg:col-span-3">
            <a href={`mailto:${company.contact.email}`} className="block text-[15px] text-bone transition-colors hover:text-brand-cyan">
              {company.contact.email}
            </a>
            {company.contact.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, '')}`} className="block text-[15px] text-bone-muted transition-colors hover:text-bone">
                {p}
              </a>
            ))}
            <address className="pt-2 text-[14px] not-italic leading-relaxed text-bone-muted">
              {company.contact.address.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </address>
            <a href={company.contact.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 pt-1 text-[13px] text-bone transition-colors hover:text-brand-cyan">
              Open in Maps <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-4 pt-4">
                {socials.map(([k, url]) => (
                  <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="text-[13px] text-bone-muted hover:text-bone">
                    {socialLabels[k] ?? k}
                  </a>
                ))}
              </div>
            )}
          </FooterCol>
        </div>

        {/* oversized wordmark */}
        <div aria-hidden className="relative mt-24 select-none overflow-hidden">
          <p className="text-gradient animate-shimmer whitespace-nowrap text-center font-display text-[18.5vw] font-semibold leading-[0.8] tracking-[-0.06em] opacity-[0.16] lg:text-[16.5rem]">
            divinuslux
          </p>
        </div>

        <div className="flex flex-col gap-4 border-t border-line/[0.06] py-8 text-[13px] text-bone-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {company.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-bone">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-bone">
              Terms &amp; Conditions
            </Link>
            <button
              type="button"
              onClick={() => scrollToTarget(0)}
              className="group flex h-10 w-10 items-center justify-center rounded-full border border-line/10 transition-colors hover:border-line/30"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="mb-5 text-[11px] uppercase tracking-[0.24em] text-bone-dim">{title}</p>
      <div className="space-y-2.5">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link to={to} className="group flex w-fit items-center gap-2 text-[15px] text-bone-muted transition-colors duration-300 hover:text-bone">
      <span className="h-px w-0 bg-brand-cyan transition-all duration-500 ease-expo group-hover:w-3" />
      {children}
    </Link>
  );
}
