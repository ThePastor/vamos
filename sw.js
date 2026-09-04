/* Vamos service worker — makes the app installable and fully usable offline.
   The whole app is one HTML file, so "offline" mostly means: keep index.html, the icons and the fonts.
   The version below is stamped by build.sh from BUILD.v in part4-app.js; a new build = a new cache. */
const VERSION = 'v17';
const SHELL = 'vamos-shell-' + VERSION;
const FONTS = 'vamos-fonts';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(CORE)));
  /* do not skipWaiting here: the page decides when to swap, so a lesson in progress is never yanked away */
});

self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith('vamos-shell-') && k !== SHELL).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (e) => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

const isFont = (u) => /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
const isSupabase = (u) => /supabase\.(co|in)$/.test(u.hostname);

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  /* progress sync: always live, never cached */
  if (isSupabase(url)) return;

  /* the page itself: network first so a fresh publish lands on the next open, cache when there is no signal */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      try {
        const fresh = await fetchWithTimeout(req, 4000);
        const c = await caches.open(SHELL);
        c.put('./index.html', fresh.clone());
        return fresh;
      } catch (err) {
        const c = await caches.open(SHELL);
        return (await c.match('./index.html')) || (await c.match('./')) || Response.error();
      }
    })());
    return;
  }

  /* fonts: serve what we have, refresh in the background */
  if (isFont(url)) {
    e.respondWith((async () => {
      const c = await caches.open(FONTS);
      const hit = await c.match(req);
      const refresh = fetch(req).then((r) => { if (r && r.ok) c.put(req, r.clone()); return r; }).catch(() => null);
      return hit || (await refresh) || Response.error();
    })());
    return;
  }

  /* everything else on our own origin (icons, manifest): cache first */
  if (url.origin === self.location.origin) {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      const hit = await c.match(req);
      if (hit) return hit;
      try { const r = await fetch(req); if (r && r.ok) c.put(req, r.clone()); return r; }
      catch (err) { return Response.error(); }
    })());
  }
});

function fetchWithTimeout(req, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(req).then((r) => { clearTimeout(t); resolve(r); }, (err) => { clearTimeout(t); reject(err); });
  });
}
