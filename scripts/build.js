import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { parse } from 'yaml';
import MarkdownIt from 'markdown-it';
import { coverKey, itemLink } from './sources.js';

const ROOT = new URL('../', import.meta.url);
const DIST = new URL('dist/', ROOT);
const SITE = 'https://hello.is-a.dev';

const read = (path) => readFile(new URL(path, ROOT), 'utf8');

const esc = (value) =>
  String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const link = (href, text) =>
  /^https?:/.test(href)
    ? `<a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${text}</a>`
    : `<a href="${esc(href)}">${text}</a>`;
const table = (headers, rows) => `<table border="1" cellpadding="6">${headers.length ? `
      <thead>
        <tr>${headers.map((h) => `<th scope="col">${h}</th>`).join('')}</tr>
      </thead>` : ''}
      <tbody>
${rows.map(([first, ...rest]) => `        <tr><th scope="row" align="left">${first}</th>${rest.map((c) => `<td>${c}</td>`).join('')}</tr>`).join('\n')}
      </tbody>
    </table>`;
const site = parse(await read('content/site.yaml'));
const home = parse(await read('content/home.yaml'));
const projects = parse(await read('content/projects.yaml'));
const hobbies = parse(await read('content/hobbies.yaml'));
const dev = parse(await read('content/dev.yaml'));
const toItem = (item) => {
  if (!item) return null;
  const key = coverKey(item);
  return {
    title: String(item.title),
    img: item.image || (key ? `/assets/img/covers/${key}.webp` : null),
    url: itemLink(item),
    note: item.note,
    artist: item.artist,
  };
};
const toList = (list) => (list || []).map(toItem);

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });
md.renderer.rules.fence = (tokens, i) => `<pre><code>${esc(tokens[i].content)}</code></pre>\n`;
md.renderer.rules.link_open = (tokens, i, options, env, self) => {
  const token = tokens[i];
  if (/^https?:/.test(token.attrGet('href'))) {
    token.attrSet('target', '_blank');
    token.attrSet('rel', 'noopener noreferrer');
  }
  return self.renderToken(tokens, i, options);
};
const text = (source) => (source ? md.render(String(source)) : '');
const inline = (source) => md.renderInline(String(source ?? ''));
const plain = (source) => String(source ?? '').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`]/g, '').trim();

const NAV = [
  { path: '/', label: 'Home' },
  { path: '/projects', label: projects.title },
  { path: '/hobbies', label: hobbies.title },
  { path: '/dev', label: dev.title },
];
const slugify = (text) => text.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section';
const addContents = (body) => {
  const sections = [];
  const used = new Set();
  body = body.replace(/<h2>([\s\S]*?)<\/h2>/g, (_, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    let id = slugify(text.replace(/&amp;/g, 'and').replace(/&[a-z#0-9]+;/g, ''));
    while (used.has(id)) id += '-';
    used.add(id);
    sections.push({ id, text });
    return `<h2 id="${id}">${inner}</h2>`;
  });
  if (sections.length < 3) return body;
  const contents = `<nav aria-label="On this page">
      <p><strong>On this page:</strong></p>
      <ol>
${sections.map((s) => `        <li><a href="#${s.id}">${s.text}</a></li>`).join('\n')}
      </ol>
    </nav>

    `;
  const first = body.indexOf('<h2 ');
  return body.slice(0, first) + contents + body.slice(first);
};

const page = ({ path, title, description, body }) => {
  const fullTitle = path === '/' ? site.home_tab_title : `${title} — ${site.name}`;
  const nav = NAV.map(({ path: p, label }) => {
    const current = p === '/' ? path === '/' : path === p || path.startsWith(p + '/');
    return current ? `<a href="${p}" aria-current="page"><strong>${label}</strong></a>` : `<a href="${p}">${label}</a>`;
  }).join(' |\n      ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(fullTitle)}</title>
  <meta name="description" content="${esc(description)}">
  <meta property="og:title" content="${esc(fullTitle)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE}${path}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="${SITE}/assets/img/avatar.png">
  <link rel="icon" href="/favicon.ico">
</head>
<body>
  <header>
    <nav>
      ${nav}
    </nav>
    <hr>
  </header>

  <main>
${addContents(body)}
  </main>

  <footer>
    <hr>
    <p>${inline(site.footer)}</p>
    <address>Contact: ${(site.contact || []).map((c) => link(c.url, esc(c.label))).join(' · ')}</address>
  </footer>
</body>
</html>
`;
};

const pages = [];

pages.push({
  path: '/',
  title: 'Home',
  description: site.description,
  body: `
    <h1>${esc(home.title)}</h1>
    ${text(home.intro)}
    ${home.avatar ? `<img src="${esc(home.avatar)}" alt="${esc(home.title)}'s avatar" width="160" height="160">` : ''}

    <h2>${esc(home.status?.heading)}</h2>
    ${table([], (home.status?.rows || []).map((row) => [esc(row.label), inline(row.value)]))}
${(home.sections || []).map((section) => `
    <h2>${esc(section.heading)}</h2>
    ${text(section.body)}`).join('\n')}`,
});

const projectTable = (list) => table(['Project', 'Status', 'Made with', 'What it is'], (list || []).map((p) => [
  p.link ? link(p.link, esc(p.name)) : esc(p.name),
  !p.status ? '' : ['Abandoned', 'Discontinued'].includes(p.status) ? `<del>${esc(p.status)}</del>` : esc(p.status),
  (p.tags || []).map(esc).join(', '),
  inline(p.description),
]));

pages.push({
  path: '/projects',
  title: projects.title,
  description: plain(projects.intro),
  body: `
    <h1>${esc(projects.title)}</h1>
    ${text(projects.intro)}
${(projects.sections || []).map((section) => `
    <h2>${esc(section.heading)}</h2>
    ${text(section.intro)}
    ${projectTable(section.projects)}`).join('\n')}`,
});
const name = (item) => (item.url ? link(item.url, esc(item.title)) : esc(item.title));
const thumb = (item, width) => (item.img ? `<img src="${esc(item.img)}" alt="" width="${width}" loading="lazy">` : '');
const favorite = (raw) => {
  const item = toItem(raw);
  if (!item) return '';
  return `<figure>
      ${thumb(item, 160)}
      <figcaption><strong>Favorite: ${name(item)}</strong>${item.note ? ` — 「${inline(item.note)}」` : ''}</figcaption>
    </figure>`;
};
const shelf = ({ heading, items }) => {
  const list = toList(items);
  if (!list.length) return '';
  return `<h3>${esc(heading)} (${list.length})</h3>
    <ul>
${list.map((item) => `      <li>${thumb(item, 40)} ${name(item)}${item.artist ? ` — ${esc(item.artist)}` : ''}</li>`).join('\n')}
    </ul>`;
};

pages.push({
  path: '/hobbies',
  title: hobbies.title,
  description: plain(hobbies.intro),
  body: `
    <h1>${esc(hobbies.title)}</h1>
    ${text(hobbies.intro)}
${(hobbies.sections || []).map((section) => `
    <h2>${esc(section.heading)}</h2>
    ${text(section.intro)}
    ${favorite(section.favorite)}
    ${(section.lists || []).map(shelf).join('\n    ')}
    ${text(section.outro)}`).join('\n')}`,
});
const day = (date) => (date instanceof Date ? date.toISOString().slice(0, 10) : String(date ?? ''));

pages.push({
  path: '/dev',
  title: dev.title,
  description: plain(dev.intro),
  body: `
    <h1>${esc(dev.title)}</h1>
    ${text(dev.intro)}

    <h2>${esc(dev.setup?.heading)}</h2>
${(dev.setup?.groups || []).map((group) => `
    <h3>${esc(group.heading)}</h3>
    ${table([], (group.items || []).map((item) => [item.url ? link(item.url, esc(item.name)) : esc(item.name), inline(item.details)]))}`).join('\n')}

    <h2>${esc(dev.log?.heading)}</h2>
    <ul>
${[...(dev.log?.entries || [])]
  .sort((a, b) => day(b.date).localeCompare(day(a.date)))
  .map((entry) => `      <li><time datetime="${esc(day(entry.date))}">${esc(day(entry.date))}</time> — ${inline(entry.text)}</li>`)
  .join('\n')}
    </ul>`,
});

await rm(DIST, { recursive: true, force: true });
await cp(new URL('public/', ROOT), DIST, { recursive: true });

for (const p of pages) {
  const dir = new URL(`.${p.path === '/' ? '' : p.path}/`, DIST);
  await mkdir(dir, { recursive: true });
  await writeFile(new URL('index.html', dir), page(p));
}

await writeFile(new URL('404.html', DIST), page({
  path: '/404',
  title: 'Not found',
  description: 'This page does not exist.',
  body: `
    <h1>Not found</h1>
    <p>This page does not exist. <a href="/">Go back home</a>.</p>`,
}));

console.log(`build: ${pages.length + 1} pages written to dist/`);
