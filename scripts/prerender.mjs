/**
 * Prerenders every public route to static HTML (so crawlers and first paint
 * get real content), and writes sitemap.xml. Runs after the client and SSR builds.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE_URL = 'https://www.divinuslux.com';

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const { render, routes } = await import(pathToFileURL(path.join(root, 'dist-ssr', 'entry-server.js')).href);

let count = 0;
for (const { path: url } of routes) {
  const { html, head } = render(url);
  const page = template.replace('<!--app-head-->', head).replace('<!--app-html-->', html);
  const file = url === '/' ? path.join(dist, 'index.html') : path.join(dist, url.slice(1), 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
  // Flat copy (/about.html) for hosts and servers that resolve extensionless URLs to .html files.
  if (url !== '/') fs.writeFileSync(path.join(dist, `${url.slice(1)}.html`), page);
  count++;
}

// 404 page (served by hosts that support a custom 404.html)
{
  const { html, head } = render('/__not-found__');
  fs.writeFileSync(path.join(dist, '404.html'), template.replace('<!--app-head-->', head).replace('<!--app-html-->', html));
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    (r) => `  <url>
    <loc>${SITE_URL}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);
fs.rmSync(path.join(root, 'dist-ssr'), { recursive: true, force: true });

console.log(`Prerendered ${count} routes + 404.html, wrote sitemap.xml (${routes.length} URLs).`);
