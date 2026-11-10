import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname } from 'node:path';

const DIST = new URL('../dist/', import.meta.url);
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.png': 'image/png', '.webp': 'image/webp', '.ico': 'image/x-icon', '.mp3': 'audio/mpeg' };

createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://localhost').pathname).replace(/^\/+/, '');
  if (path.includes('..')) path = '';
  if (!extname(path)) path = `${path}/index.html`.replace(/^\//, '');
  try {
    const body = await readFile(new URL(path, DIST));
    res.writeHead(200, { 'Content-Type': TYPES[extname(path)] || 'application/octet-stream' }).end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': TYPES['.html'] }).end(await readFile(new URL('404.html', DIST)));
  }
}).listen(3000, () => console.log('serve: http://localhost:3000'));
