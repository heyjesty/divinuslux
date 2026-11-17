import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import type { ReactNode, MouseEventHandler } from 'react';
import { Magnetic } from './Magnetic';

type Variant = 'primary' | 'ghost' | 'gradient';

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: MouseEventHandler;
  variant?: Variant;
  icon?: 'arrow' | 'up-right' | 'none';
  magnetic?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  ariaLabel?: string;
  /** Stretch to full width on phones. */
  block?: boolean;
}

const styles: Record<Variant, string> = {
  primary: 'bg-bone text-white hover:bg-brand-blue',
  ghost: 'border border-line/15 text-bone hover:border-line/40 hover:bg-line/[0.04]',
  gradient: 'text-white bg-[linear-gradient(110deg,#1f6fe5,#3b8ff2_50%,#13b5c8)] bg-[length:160%_100%] bg-left hover:bg-right shadow-[0_10px_40px_-12px_rgba(31,111,229,0.45)]',
};

export function Button({ children, to, href, onClick, variant = 'primary', icon = 'arrow', magnetic = true, className = '', type = 'button', disabled, ariaLabel, block }: ButtonProps) {
  const Icon = icon === 'up-right' ? ArrowUpRight : ArrowRight;
  const inner = (
    <>
      <span className="relative">{children}</span>
      {icon !== 'none' && (
        <span className="relative inline-flex h-4 w-4 overflow-hidden" aria-hidden>
          <Icon className="absolute h-4 w-4 transition-transform duration-500 ease-expo group-hover:translate-x-5 group-hover:-translate-y-0" strokeWidth={1.75} />
          <Icon className="absolute h-4 w-4 -translate-x-5 transition-transform duration-500 ease-expo group-hover:translate-x-0" strokeWidth={1.75} />
        </span>
      )}
    </>
  );
  const cls = `group relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-[15px] text-[14px] font-medium tracking-[0.01em] transition-all duration-500 ease-expo disabled:cursor-not-allowed disabled:opacity-60 ${styles[variant]} ${block ? 'w-full sm:w-auto' : ''} ${className}`;

  let el: ReactNode;
  if (to) {
    el = (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  } else if (href) {
    const external = href.startsWith('http');
    el = (
      <a href={href} className={cls} onClick={onClick} aria-label={ariaLabel} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
        {inner}
      </a>
    );
  } else {
    el = (
      <button type={type} className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel}>
        {inner}
      </button>
    );
  }
  return magnetic ? <Magnetic strength={0.25} className={block ? 'w-full sm:w-auto' : ''}>{el}</Magnetic> : el;
}

/** Understated text link with an animated underline and arrow. */
export function TextLink({ to, href, children, className = '' }: { to?: string; href?: string; children: ReactNode; className?: string }) {
  const cls = `group inline-flex items-center gap-2 text-[14px] font-medium text-bone ${className}`;
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-line/25" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand-blue to-brand-cyan transition-transform duration-700 ease-expo group-hover:scale-x-100" />
      </span>
      <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.75} />
    </>
  );
  if (href)
    return (
      <a href={href} className={cls} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}>
        {inner}
      </a>
    );
  return (
    <Link to={to ?? '/'} className={cls}>
      {inner}
    </Link>
  );
}
