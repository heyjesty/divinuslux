import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect } from 'react';
import { Code2, Smartphone, Search, TrendingUp } from 'lucide-react';
import { company } from '../data/company';

/**
 * Hero centrepiece: the Divinuslux mark at the centre of rotating orbit rings
 * with travelling nodes, floating service chips and pointer-driven depth.
 * Pure CSS rotation (cheap, runs from prerendered HTML) + Framer for parallax.
 */
export function HeroOrbit({ delay = 1.4 }: { delay?: number }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-0 aspect-square
        right-[-16%] top-[9%] w-[62vw] opacity-80
        sm:right-[4%] sm:top-[7%] sm:w-[50vw] sm:opacity-90
        lg:right-[2%] lg:top-[46%] lg:w-[min(38vw,580px)] lg:-translate-y-1/2 lg:opacity-100"
    >
      <div className="hero-orbit-in h-full w-full" style={{ animationDelay: `${delay}s` }}>
        {/* soft glow */}
        <Layer x={sx} y={sy} depth={10} className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgba(31,111,229,0.22),rgba(19,181,200,0.10)_45%,transparent_70%)] blur-2xl" />

        {/* rings */}
        <Layer x={sx} y={sy} depth={18} className="absolute inset-0">
          <Ring inset="0%" duration={90} dash="2 10" nodes={[{ a: 20, c: '#13b5c8', r: 5 }, { a: 200, c: '#1f6fe5', r: 3.5 }]} />
          <Ring inset="14%" duration={60} reverse dash="1 0" opacity={0.18} nodes={[{ a: 110, c: '#1f6fe5', r: 6 }, { a: 300, c: '#4c9bf5', r: 3 }]} gradient />
          <Ring inset="28%" duration={40} dash="6 8" nodes={[{ a: 60, c: '#13b5c8', r: 4 }, { a: 240, c: '#1f6fe5', r: 4 }]} />
        </Layer>

        {/* tilted orbit for depth */}
        <Layer x={sx} y={sy} depth={26} className="absolute inset-[8%]">
          <div className="h-full w-full [transform:rotateX(68deg)_rotateZ(-18deg)] [transform-style:preserve-3d]">
            <Ring inset="0%" duration={24} dash="1 0" opacity={0.22} nodes={[{ a: 0, c: '#13b5c8', r: 7 }]} gradient />
          </div>
        </Layer>

        {/* core */}
        <Layer x={sx} y={sy} depth={34} className="absolute inset-[38%] flex items-center justify-center">
          <span className="absolute inset-0 animate-[orbit-pulse_3.2s_ease-out_infinite] rounded-full border border-brand-blue/30" />
          <span className="absolute inset-0 animate-[orbit-pulse_3.2s_ease-out_1.6s_infinite] rounded-full border border-brand-cyan/30" />
          <span className="glass relative flex h-full w-full items-center justify-center rounded-full">
            <span className="absolute inset-[6%] rounded-full bg-[conic-gradient(from_0deg,rgba(31,111,229,0.18),rgba(19,181,200,0.18),rgba(76,155,245,0.06),rgba(31,111,229,0.18))] animate-[spin_12s_linear_infinite]" />
            <img src={company.mark} alt="" width={96} height={96} className="relative w-[46%] drop-shadow-[0_10px_24px_rgba(31,111,229,0.35)]" />
          </span>
        </Layer>

        {/* floating chips (tablet/desktop) */}
        <div className="hidden sm:block">
          <Chip x={sx} y={sy} depth={46} pos="left-[-8%] top-[54%]" floatDelay="0s" icon={<Code2 className="h-4 w-4" />} label="Custom Software" />
          <Chip x={sx} y={sy} depth={58} pos="right-[2%] top-[6%]" floatDelay="-2s" icon={<Smartphone className="h-4 w-4" />} label="Mobile Apps" />
          <Chip x={sx} y={sy} depth={40} pos="right-[-1%] bottom-[20%]" floatDelay="-4s" icon={<TrendingUp className="h-4 w-4" />} label="Growth Marketing" />
          <Chip x={sx} y={sy} depth={52} pos="left-[16%] bottom-[2%]" floatDelay="-6s" icon={<Search className="h-4 w-4" />} label="SEO" />
        </div>
      </div>
    </div>
  );
}

function Layer({ x, y, depth, className, children }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; className?: string; children?: React.ReactNode }) {
  const tx = useTransform(x, (v) => v * depth);
  const ty = useTransform(y, (v) => v * depth);
  return (
    <motion.div style={{ x: tx, y: ty }} className={className}>
      {children}
    </motion.div>
  );
}

interface RingProps {
  inset: string;
  duration: number;
  reverse?: boolean;
  dash: string;
  opacity?: number;
  gradient?: boolean;
  nodes: { a: number; c: string; r: number }[];
}

function Ring({ inset, duration, reverse, dash, opacity = 0.28, gradient, nodes }: RingProps) {
  const id = `g${inset.replace(/\W/g, '')}${duration}`;
  return (
    <div className="absolute" style={{ inset, animation: `spin ${duration}s linear infinite${reverse ? ' reverse' : ''}` }}>
      <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
        {gradient && (
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1f6fe5" />
              <stop offset="1" stopColor="#13b5c8" />
            </linearGradient>
          </defs>
        )}
        <circle cx="100" cy="100" r="99" fill="none" stroke={gradient ? `url(#${id})` : '#0b1a33'} strokeOpacity={opacity} strokeWidth={gradient ? 0.8 : 0.5} strokeDasharray={dash} vectorEffect="non-scaling-stroke" />
        {nodes.map((n, i) => {
          const rad = (n.a * Math.PI) / 180;
          const cx = 100 + 99 * Math.cos(rad);
          const cy = 100 + 99 * Math.sin(rad);
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={n.r * 1.9} fill={n.c} opacity={0.15} />
              <circle cx={cx} cy={cy} r={n.r * 0.55} fill={n.c} />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function Chip({ x, y, depth, pos, floatDelay, icon, label }: { x: MotionValue<number>; y: MotionValue<number>; depth: number; pos: string; floatDelay: string; icon: React.ReactNode; label: string }) {
  return (
    <Layer x={x} y={y} depth={depth} className={`absolute ${pos}`}>
      <div className="glass flex animate-floaty items-center gap-2.5 rounded-2xl py-2.5 pl-2.5 pr-4" style={{ animationDelay: floatDelay }}>
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-brand-blue to-brand-cyan text-white">{icon}</span>
        <span className="whitespace-nowrap text-[13px] font-medium text-bone">{label}</span>
      </div>
    </Layer>
  );
}
