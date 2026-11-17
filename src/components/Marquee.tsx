import type { ReactNode } from 'react';

/** Seamless infinite horizontal marquee (CSS only, pauses on hover). */
export function Marquee({ children, className = '', reverse = false }: { children: ReactNode; className?: string; reverse?: boolean }) {
  return (
    <div className={`group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)] ${className}`}>
      <div className={`flex w-max shrink-0 animate-marquee items-center group-hover:[animation-play-state:paused] ${reverse ? '[animation-direction:reverse]' : ''}`}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
