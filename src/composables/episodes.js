import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// Old-style kanji numerals, as in "第壹巻"
const NUMERALS = ['零', '壹', '貳', '參', '肆', '伍', '陸', '漆', '捌', '玖'];
export const toKanji = (n) => NUMERALS[n] ?? String(n);

// Top-level pages are the programs on the disk: route meta gives their number, Japanese title,
// 8.3 file name and scene color.
export function useEpisodes() {
  const router = useRouter();
  const route = useRoute();

  const episodes = router
    .getRoutes()
    .filter((r) => typeof r.meta?.ep === 'number')
    .sort((a, b) => a.meta.ep - b.meta.ep)
    .map((r) => ({
      name: r.name,
      path: r.path,
      ep: r.meta.ep,
      part: `第${toKanji(r.meta.ep)}巻`,
      jp: r.meta.jp,
      file: `${r.meta.file}.EXE`,
      color: r.meta.color,
    }));

  const isActive = (episode) =>
    episode.path === '/' ? route.path === '/' : route.path === episode.path || route.path.startsWith(episode.path + '/');

  // The program the current page belongs to (a blog post belongs to NOTES)
  const current = computed(() => episodes.find(isActive));

  // What the title window of the current page shows
  const card = computed(() => {
    const ep = current.value;
    const isArcPage = ep && ep.path === route.path;
    const dirs = route.path.split('/').filter(Boolean);
    const slug = dirs.pop() || 'start';
    return {
      part: ep ? ep.part : '番外',
      jp: isArcPage ? ep.jp : String(route.meta.jp ?? ep?.jp ?? ''),
      title: String(route.name ?? ''),
      file: isArcPage ? ep.file : `${slug.replace(/-/g, '_').slice(0, 8).toUpperCase()}.TXT`,
      path: ['C:', 'MAXIME', ...dirs.map((d) => d.toUpperCase())].join('\\'),
      color: isArcPage ? ep.color : 'ink',
    };
  });

  return { episodes, isActive, current, card, route };
}
