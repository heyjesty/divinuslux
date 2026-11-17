import { company } from '../data/company';

/**
 * Short branded intro. Pure CSS (see .preloader in styles) so it plays from
 * the prerendered HTML, never blocks content for more than ~1.8s, and is
 * skipped entirely for reduced-motion users.
 */
export function Preloader() {
  return (
    <div className="preloader" aria-hidden>
      <img src={company.mark} alt="" width={56} height={56} className="preloader__mark" />
      <span className="preloader__bar" />
    </div>
  );
}
