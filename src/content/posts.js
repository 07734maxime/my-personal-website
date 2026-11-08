// Blog posts written in Markdown: content/blog/<slug>.md, with YAML frontmatter
// (title, date, jp, description, tags). Each one becomes a /blog/<slug> route.
import { parse } from 'yaml';

const files = import.meta.glob('../../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export const posts = Object.entries(files).map(([path, raw]) => {
  const match = raw.match(FRONTMATTER);
  const meta = match ? parse(match[1]) || {} : {};
  const date = meta.date instanceof Date ? meta.date.toISOString().slice(0, 10) : String(meta.date ?? '');
  return {
    slug: path.split('/').pop().replace(/\.md$/, ''),
    title: String(meta.title ?? 'Untitled'),
    date,
    jp: meta.jp ? String(meta.jp) : '記事',
    description: meta.description ? String(meta.description) : '',
    tags: (meta.tags || []).map((label) => ({ label: String(label) })),
    body: match ? raw.slice(match[0].length) : raw,
  };
});
