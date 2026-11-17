import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async';
import App from './App';
import { projects } from './data/projects';
import { posts } from './data/blog';

export function render(url: string) {
  const helmetContext: { helmet?: HelmetServerState } = {};
  const html = renderToString(
    <StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
  const h = helmetContext.helmet;
  const head = h ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join('\n') : '';
  return { html, head };
}

/** Every public URL, used for prerendering and the sitemap. */
export const routes: { path: string; priority: number; changefreq: string }[] = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/about', priority: 0.8, changefreq: 'monthly' },
  { path: '/services', priority: 0.9, changefreq: 'monthly' },
  { path: '/projects', priority: 0.9, changefreq: 'monthly' },
  ...projects.map((p) => ({ path: `/projects/${p.slug}`, priority: 0.7, changefreq: 'monthly' })),
  { path: '/insights', priority: 0.7, changefreq: 'weekly' },
  ...posts.map((p) => ({ path: `/insights/${p.slug}`, priority: 0.6, changefreq: 'yearly' })),
  { path: '/contact', priority: 0.8, changefreq: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changefreq: 'yearly' },
  { path: '/terms', priority: 0.2, changefreq: 'yearly' },
];
