// Site content lives in /content (YAML + Markdown) so it can be edited without touching the code,
// by hand or through Pages CMS (see .pages.yml). This module parses it once and fills in links and covers.
import { parse } from 'yaml';
import hobbiesRaw from '../../content/hobbies.yaml?raw';
import projectsRaw from '../../content/projects.yaml?raw';
import profileRaw from '../../content/profile.yaml?raw';
import { coverKey, itemLink } from './sources.js';

export const profile = parse(profileRaw);

// An item as the components want it: { alt, img, url, note?, artist? }
const toItem = (item) => {
  if (!item) return null;
  const key = coverKey(item);
  return {
    alt: String(item.title),
    img: item.image || (key ? `/assets/img/covers/${key}.webp` : null),
    url: itemLink(item),
    note: item.note,
    artist: item.artist,
  };
};
const toList = (list) => (list || []).map(toItem);

const hobbiesData = parse(hobbiesRaw);
export const hobbies = {
  animanga: {
    favorite: toItem(hobbiesData.animanga?.favorite),
    shelf: toList(hobbiesData.animanga?.shelf),
    next: toList(hobbiesData.animanga?.next),
  },
  novels: {
    read: toList(hobbiesData.novels?.read),
    backlog: toList(hobbiesData.novels?.backlog),
  },
  games: {
    favorite: toItem(hobbiesData.games?.favorite),
    shelf: toList(hobbiesData.games?.shelf),
  },
  music: {
    playlist: toList(hobbiesData.music?.playlist),
  },
};

const projectsData = parse(projectsRaw);
const toProject = (p) => ({ ...p, tags: (p.tags || []).map((name) => ({ name })) });
export const projects = {
  personal: (projectsData.personal || []).map(toProject),
  school: (projectsData.school || []).map(toProject),
};
