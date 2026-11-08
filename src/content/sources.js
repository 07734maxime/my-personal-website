// The databases an item can point to, shared by the site (links) and scripts/fetch-covers.js (covers).
// The first id an item has wins.
export const SOURCES = [
  { field: 'mal_anime', link: (id) => `https://myanimelist.net/anime/${id}` },
  { field: 'mal_manga', link: (id) => `https://myanimelist.net/manga/${id}` },
  { field: 'vndb', link: (id) => `https://vndb.org/${id}` },
  { field: 'steam', link: (id) => `https://store.steampowered.com/app/${id}` },
  { field: 'apple_music', link: (id) => `https://music.apple.com/fr/album/${id}` },
];

const sourceOf = (item) => SOURCES.find((s) => item[s.field] != null && item[s.field] !== '');

// File name (without extension) of the downloaded cover, e.g. "mal_anime-2167"
export const coverKey = (item) => {
  const source = sourceOf(item);
  return source ? `${source.field}-${String(item[source.field]).trim()}` : null;
};

export const itemLink = (item) => {
  if (item.url) return item.url;
  const source = sourceOf(item);
  return source ? source.link(String(item[source.field]).trim()) : null;
};
