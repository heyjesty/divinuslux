import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  /** Optional licensed video. When empty, the generated network visual is used on its own. */
  src?: string;
  poster?: string;
  className?: string;
}

/**
 * Cinematic hero background: optional muted looping video, a live particle
 * network drawn on canvas, slow-moving light and a vignette.
 */
export function VideoBackground({ src, poster, className = '' }: VideoBackgroundProps) {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`} aria-hidden>
      {poster && <img src={poster} alt="" className="absolute inset-0 h-full w-full object-cover opacity-100" {...{ fetchpriority: "high" }} />}
      {src && (
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1.5s] ${videoReady ? 'opacity-60' : 'opacity-0'}`}
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setVideoReady(true)}
        />
      )}
      {/* moving light */}
      <div className="absolute -right-[10%] top-[-20%] h-[70vmax] w-[70vmax] animate-[spin_60s_linear_infinite] rounded-full bg-[conic-gradient(from_90deg,rgba(31,111,229,0.0),rgba(31,111,229,0.22),rgba(19,181,200,0.18),rgba(19,181,200,0.12),rgba(31,111,229,0))] blur-[90px]" />
      <div className="absolute -left-[15%] bottom-[-30%] h-[55vmax] w-[55vmax] animate-floaty rounded-full bg-[radial-gradient(circle,rgba(19,181,200,0.20),transparent_65%)] blur-[60px]" />
      <NetworkCanvas />
      {/* horizon line */}
      <div className="absolute inset-x-0 bottom-[22%] h-px bg-gradient-to-r from-transparent via-line/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(255,255,255,0.88)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
    </div>
  );
}

/** Lightweight particle network. Pauses off-screen / in background tabs; static for reduced motion. */
function NetworkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0, h = 0, raf = 0, visible = true;
    const mouse = { x: -9999, y: -9999 };
    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    let pts: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(small ? 38 : 85, (w * h) / (small ? 14000 : 16000)));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: Math.random() * 1.4 + 0.4,
        hue: Math.random(),
      }));
    };

    const link = small ? 110 : 150;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        if (!reduce) {
          p.x += p.vx;
          p.y += p.vy;
          const dx = mouse.x - p.x, dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 200) {
            p.x -= (dx / d) * 0.25;
            p.y -= (dy / d) * 0.25;
          }
          if (p.x < -20) p.x = w + 20;
          if (p.x > w + 20) p.x = -20;
          if (p.y < -20) p.y = h + 20;
          if (p.y > h + 20) p.y = -20;
        }
      }
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < link * link) {
            const o = (1 - Math.sqrt(d2) / link) * 0.22;
            ctx.strokeStyle = `rgba(31,111,229,${o * 0.9})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const p of pts) {
        ctx.fillStyle = p.hue > 0.7 ? 'rgba(19,181,200,0.75)' : p.hue > 0.4 ? 'rgba(76,155,245,0.7)' : 'rgba(31,111,229,0.55)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce) draw();
    else raf = requestAnimationFrame(loop);

    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-80" />;
}
