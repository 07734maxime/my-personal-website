// Markdown → HTML for blog posts: markdown-it, KaTeX for $inline$ and $$display$$ maths,
// and the shared Shiki highlighter for fenced code.
import MarkdownIt from 'markdown-it';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { getHighlighter } from './highlighter';

// Maths is swapped for placeholders before markdown-it runs (so it doesn't touch the LaTeX),
// then rendered back in. Fenced and inline code are left alone.
const extractMath = (source) => {
  const formulas = [];
  const keep = (tex, displayMode) => {
    formulas.push(katex.renderToString(tex.trim(), { displayMode, throwOnError: false }));
    return `MATHPLACEHOLDER${formulas.length - 1}X`;
  };
  const text = source
    .split(/(```[\s\S]*?```|`[^`\n]*`)/)
    .map((part, i) => (i % 2 ? part : part
      .replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => `\n\n${keep(tex, true)}\n\n`)
      .replace(/(?<![\\$])\$([^$\n]+?)\$/g, (_, tex) => keep(tex, false))))
    .join('');
  return { text, formulas };
};

export async function renderMarkdown(source) {
  // Load only the grammars of the languages this post uses
  const used = [...source.matchAll(/^```(\w+)/gm)].map((m) => m[1].toLowerCase());
  const highlighter = await getHighlighter(used);
  const languages = highlighter.getLoadedLanguages();

  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) =>
      languages.includes(lang?.toLowerCase()) ? highlighter.codeToHtml(code, { lang: lang.toLowerCase(), theme: 'github-dark' }) : '',
  });

  // ## headings are the post's sections: same look as SectionTitle, and listed in the table of contents
  md.renderer.rules.heading_open = (tokens, i, options, env, self) => {
    const token = tokens[i];
    if (token.tag === 'h2') token.attrJoin('class', 'section-title heading mt-6 mb-1 text-xl');
    if (token.tag === 'h3') token.attrJoin('class', 'heading mt-4 text-lg');
    return self.renderToken(tokens, i, options);
  };
  // External links open in a new tab
  md.renderer.rules.link_open = (tokens, i, options, env, self) => {
    const token = tokens[i];
    token.attrJoin('class', 'link');
    if (/^https?:/.test(token.attrGet('href'))) {
      token.attrSet('target', '_blank');
      token.attrSet('rel', 'noopener noreferrer');
    }
    return self.renderToken(tokens, i, options);
  };

  const { text, formulas } = extractMath(source);
  return md.render(text).replace(/MATHPLACEHOLDER(\d+)X/g, (_, n) => formulas[Number(n)]);
}
