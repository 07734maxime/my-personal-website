# Content

Everything the site shows that isn't code lives here. Edit these files by hand, or through
[Pages CMS](https://app.pagescms.org) (configured in `/.pages.yml`).

- `hobbies.yaml` — anime, visual novels, games, music. Give an item a MyAnimeList / VNDB / Steam /
  Apple Music id and its cover and link are found automatically (`npm run covers`, also run by
  `npm run dev` and `npm run build`). Downloaded covers land in `public/assets/img/covers/`: commit them.
- `projects.yaml` — the Projects page.
- `profile.yaml` — age, OS, what you're learning (home page + side column).
- `blog/*.md` — blog posts in Markdown. The file name is the URL (`blog/my-post.md` → `/blog/my-post`).
  Frontmatter: `title`, `date`, `jp` (kanji on the paper strip), `description`, `tags`.
  `## Headings` become chapters (and appear in the table of contents), `$x^2$` and `$$...$$` are maths,
  fenced code blocks are highlighted (rust, c, cpp, js, ts, python, bash, json, yaml, nix).
  Posts can still be written as Vue files in `src/views/blog/` instead.
