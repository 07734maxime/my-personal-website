# Content

Every word the site shows lives here. Edit these files by hand, or through
[Pages CMS](https://app.pagescms.org) (configured in `/.pages.yml`). Text fields accept Markdown,
like `[a link](https://example.com)` or `*emphasis*`.

- `site.yaml` — what every page shares: tab titles, footer, contact links.
- `home.yaml` — the home page: intro, avatar, status table, and its sections.
- `projects.yaml` — the Projects page, in sections (Personal, School…).
- `hobbies.yaml` — the Hobbies page, in sections, each with a favorite and lists of items. Give an item a
  MyAnimeList / VNDB / Steam / Apple Music id and its cover and link are found automatically
  (`npm run covers`, also run by `npm run dev` and `npm run build`). Downloaded covers land in
  `public/assets/img/covers/`: commit them.
- `dev.yaml` — the Dev page: your setup (groups of name → details) and a dev log (dated entries,
  shown newest first).

`npm run build` turns all of this into plain HTML pages in `dist/` (see `scripts/build.js`);
`npm run dev` builds and serves them on http://localhost:3000. Never edit `dist/`: it is rewritten on every build.
