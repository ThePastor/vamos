/* Vamos service worker — makes the app installable and fully usable offline.
   The whole app is one HTML file, so "offline" mostly means: keep index.html, the icons and the fonts.
   The version below is stamped by build.sh from BUILD.v in part4-app.js; a new build = a new cache. */
const VERSION = 'v31';
const SHELL = 'vamos-shell-' + VERSION;
const FONTS = 'vamos-fonts';
const CORE = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './icon-maskable-512.png', './apple-touch-icon.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(CORE)).catch(() => {}));
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

  /* The page itself: network first, so a fresh publish lands on the next open.
     A 404 or a 5xx is an answer, but it is NOT the app. The whole app is one file that is always
     there, so the only thing that produces one of those is the host in the middle of a publish —
     GitHub Pages serves its own "page not found" for roughly half a minute after every upload.
     The old code took that at face value: it returned the 404 to the person who had just followed
     the link, AND wrote it into the cache as index.html, so the offline copy and the home-screen
     app went on showing a 404 long after the site was back. That is the bug behind "the link
     404s every time I update".
     Now: only a good response is trusted. Anything else falls back to the copy already held, and
     the bad response is only returned when there is nothing at all to fall back on. */
  if (req.mode === 'navigate') {
    e.respondWith((async () => {
      const c = await caches.open(SHELL);
      let fresh = null;
      try { fresh = await fetchWithTimeout(req, 4000); } catch (err) { fresh = null; }
      if (fresh && fresh.ok) {
        try { await c.put('./index.html', fresh.clone()); } catch (err) { /* quota; not fatal */ }
        return fresh;
      }
      const held = (await c.match('./index.html')) || (await c.match('./'));
      return held || fresh || offlineCard();
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

/* Never hand back a blank tab. If there is no network and nothing cached, say so in a way that
   tells the person what to do about it. */
function offlineCard() {
  return new Response('<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;'
    + 'font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif;background:#111;color:#eee}</style>'
    + '<div><h1 style="font-size:1.4rem;margin:0 0 8px">Nothing to show yet</h1>'
    + '<p style="margin:0;opacity:.75">Open Vamos once with a connection and it will work without one after that.</p></div>',
    { status: 503, headers: { 'content-type': 'text/html; charset=utf-8' } });
}

function fetchWithTimeout(req, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error('timeout')), ms);
    fetch(req).then((r) => { clearTimeout(t); resolve(r); }, (err) => { clearTimeout(t); reject(err); });
  });
}
