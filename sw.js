// Service worker Natural Smile : met l'application en cache pour un démarrage rapide et hors connexion.
const VERSION = 'ns-v3';
const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest',
  'firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js',
  'logo-mark.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Les données Firebase ne passent jamais par le cache.
  if (/googleapis\.com|firebaseio|firebasestorage|identitytoolkit|securetoken/.test(url.host)) return;
  if (url.origin === location.origin) {
    // Réseau d'abord (toujours la dernière version), cache si hors connexion.
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
  }
});
