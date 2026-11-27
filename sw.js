/* DATASS Móvil Offline · service worker: guarda la app en el equipo para usarla sin conexión */
const VERSION = 'datass-v116';
const APP = ['./', './index.html', './manifest.webmanifest', './icons/icon-192-v3.png', './icons/icon-512-v3.png', './icons/maskable-512-v3.png', './icons/apple-touch-icon-v3.png', './icons/favicon-32-v3.png', './icons/favicon-64-v3.png', './icons/icon.svg'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(APP)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === location.origin) {
    // la app: primero la red, revalidando con el servidor (sin usar la copia vieja del navegador); si no hay conexión, la copia guardada
    e.respondWith(fetch(req, {cache: 'no-cache'}).then(r => { const cp = r.clone(); caches.open(VERSION).then(c => c.put(req, cp)); return r; }).catch(() => caches.match(req).then(r => r || caches.match('./index.html'))));
  } else if (/cdnjs\.cloudflare\.com|tile\.openstreetmap\.org|arcgisonline\.com/.test(url.host)) {
    // librería de mapas y teselas: copia guardada si existe; si no, la red
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const cp = res.clone(); caches.open(VERSION + '-ext').then(c => c.put(req, cp)); return res; })));
  }
});
