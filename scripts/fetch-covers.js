// Downloads the cover of every item in content/hobbies.yaml that has an id but no `image`,
// into public/assets/img/covers/<source>-<id>.webp. Covers already on disk are skipped, so this is
// cheap to run before every dev/build. Network errors only warn: the site falls back to a floppy disk.
import { readFile, mkdir, access, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';
import sharp from 'sharp';
import { coverKey } from '../src/content/sources.js';

const OUT = new URL('../public/assets/img/covers/', import.meta.url);
const UA = { 'User-Agent': 'maxime-website cover fetcher (https://hello.is-a.dev)' };

const anilist = async (idMal, type) => {
  const res = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...UA },
    body: JSON.stringify({
      query: 'query ($id: Int, $type: MediaType) { Media(idMal: $id, type: $type) { coverImage { extraLarge } } }',
      variables: { id: Number(idMal), type },
    }),
  });
  return (await res.json()).data?.Media?.coverImage?.extraLarge;
};

const vndb = async (id) => {
  const res = await fetch('https://api.vndb.org/kana/vn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...UA },
    body: JSON.stringify({ filters: ['id', '=', id], fields: 'image.url,image.sexual' }),
  });
  const image = (await res.json()).results?.[0]?.image;
  // Skip covers VNDB flags as explicit
  return image && image.sexual < 1.5 ? image.url : null;
};

const appleMusic = async (id) => {
  const res = await fetch(`https://itunes.apple.com/lookup?id=${id}&country=fr`, { headers: UA });
  return (await res.json()).results?.[0]?.artworkUrl100?.replace('100x100bb', '600x600bb');
};

const COVER_URL = {
  mal_anime: (id) => anilist(id, 'ANIME'),
  mal_manga: (id) => anilist(id, 'MANGA'),
  vndb: (id) => vndb(id),
  steam: async (id) => `https://shared.steamstatic.com/store_item_assets/steam/apps/${id}/library_600x900.jpg`,
  apple_music: (id) => appleMusic(id),
};

// Every item of every list, wherever it sits in the file
const collect = (node, out = []) => {
  if (Array.isArray(node)) node.forEach((n) => collect(n, out));
  else if (node && typeof node === 'object') {
    if ('title' in node) out.push(node);
    else Object.values(node).forEach((n) => collect(n, out));
  }
  return out;
};

const exists = (url) => access(url).then(() => true, () => false);

const items = collect(parse(await readFile(new URL('../content/hobbies.yaml', import.meta.url), 'utf8')));
await mkdir(OUT, { recursive: true });

let fetched = 0;
for (const item of items) {
  const key = coverKey(item);
  if (item.image || !key) continue;
  const file = new URL(`${key}.webp`, OUT);
  if (await exists(file)) continue;

  const [field, id] = [key.slice(0, key.indexOf('-')), key.slice(key.indexOf('-') + 1)];
  try {
    const url = await COVER_URL[field](id);
    if (!url) throw new Error('no cover found');
    const res = await fetch(url, { headers: UA });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const webp = await sharp(Buffer.from(await res.arrayBuffer()))
      .resize({ width: 600, height: 900, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();
    await writeFile(file, webp);
    fetched++;
    console.log(`covers: ${item.title} → ${key}.webp`);
  } catch (err) {
    console.warn(`covers: could not get a cover for "${item.title}" (${key}): ${err.message}`);
  }
}
console.log(`covers: ${fetched} downloaded, ${items.length} items checked`);
