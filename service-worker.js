/* Service worker di Leggende d'Italia — abilita il gioco offline (PWA).
   Strategia:
     - file del gioco (stessa origine): NETWORK-FIRST → online prendi sempre l'ultima
       versione, offline parti dalla cache.
     - Phaser dalla CDN: CACHE-FIRST → non cambia mai, lo serviamo dalla cache.
   NB: per forzare il refresh totale della cache dopo grandi aggiornamenti,
   basta cambiare CACHE_VERSION qui sotto. */
const CACHE_VERSION = 'leggende-v9';
const PHASER_URL = 'https://cdn.jsdelivr.net/npm/phaser@3.80.1/dist/phaser.min.js';

const CORE = [
  './', 'index.html', 'manifest.json',
  'data/assets.js', 'data/types.js', 'data/moves.js', 'data/creatures.js',
  'data/items.js', 'data/maps.js', 'data/npcs.js', 'data/regions.js',
  'src/state.js', 'src/dialog.js', 'src/world.js', 'src/battlescene.js',
  'src/battle.js', 'src/story.js', 'src/menu.js', 'src/box.js', 'src/main.js',
  'icons/icon-192.png', 'icons/icon-512.png',
  PHASER_URL
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then((c) => c.addAll(CORE))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting())   // se un file manca, non bloccare l'install
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    if (req.mode === 'navigate') {
      const idx = await cache.match('index.html');
      if (idx) return idx;
    }
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  if (req.url === PHASER_URL) { e.respondWith(cacheFirst(req)); return; }
  const url = new URL(req.url);
  if (url.origin === self.location.origin) { e.respondWith(networkFirst(req)); return; }
  // altre origini: prova rete, fallback cache
  e.respondWith(cacheFirst(req));
});
