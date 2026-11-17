# Divinuslux Website

React + TypeScript + Vite site for Divinuslux Pvt Ltd, with Tailwind, Framer Motion, GSAP ScrollTrigger and Lenis. Every route is prerendered to static HTML for SEO.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check, client build, SSR build, prerender + sitemap → dist/
npm run preview    # serve dist/ locally
```

Deploy the contents of `dist/` to any static host. `dist/.htaccess` handles Apache (clean URLs, 301s from the old `.php` pages, a custom 404 page and caching).

## Content

All content is data-driven. Edit these files, not the components:

| File | Contents |
| --- | --- |
| `src/data/company.ts` | Contact details, offices, mission and vision, stats, process, social links, hero video |
| `src/data/services.ts` | The 11 services |
| `src/data/projects.ts` | Portfolio. Optional `challenge`, `solution` and `results` fields appear on the page once filled in |
| `src/data/blog.ts` | Insights articles |

Images live in `public/images/` (WebP).

## Before launch

1. **Contact form:** copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT` (for example a Formspree form URL), then rebuild. Until it is set, the form does not pretend to send: it offers to send the message by email instead.
2. **Social links:** the old site only had placeholder links. Add real URLs in `company.social`.
3. **Hero video (optional):** set `company.heroVideo` to a licensed MP4 file. By default the hero uses a generated animated network graphic.
4. **Review:** check the article text in `blog.ts` (new drafts), the legal pages in `src/pages/Legal.tsx`, and the statistics notes in `company.ts`.
