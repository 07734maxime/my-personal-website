import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';

// Languages a code block can use; each grammar is only downloaded the first time a page needs it.
const LANGUAGES = {
  rust: () => import('@shikijs/langs/rust'),
  c: () => import('@shikijs/langs/c'),
  cpp: () => import('@shikijs/langs/cpp'),
  javascript: () => import('@shikijs/langs/javascript'),
  js: () => import('@shikijs/langs/javascript'),
  typescript: () => import('@shikijs/langs/typescript'),
  ts: () => import('@shikijs/langs/typescript'),
  python: () => import('@shikijs/langs/python'),
  bash: () => import('@shikijs/langs/shellscript'),
  sh: () => import('@shikijs/langs/shellscript'),
  json: () => import('@shikijs/langs/json'),
  yaml: () => import('@shikijs/langs/yaml'),
  nix: () => import('@shikijs/langs/nix'),
};

// One highlighter shared by every code block on the site
let highlighterPromise;

export async function getHighlighter(langs = []) {
  highlighterPromise ??= createHighlighterCore({
    themes: [import('@shikijs/themes/github-dark')],
    langs: [],
    engine: createJavaScriptRegexEngine(),
  });
  const highlighter = await highlighterPromise;
  const missing = langs.filter((l) => LANGUAGES[l] && !highlighter.getLoadedLanguages().includes(l));
  await Promise.all(missing.map(async (l) => highlighter.loadLanguage(await LANGUAGES[l]())));
  return highlighter;
}
