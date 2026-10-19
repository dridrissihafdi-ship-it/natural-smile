// Service worker Natural Smile : démarrage rapide, hors connexion et notifications.
const VERSION = 'ns-v31';
importScripts('config.js', 'firebase-app-compat.js', 'firebase-messaging-compat.js');
try {
  firebase.initializeApp(self.NS_CONFIG.firebase);
  // Les notifications envoyées par le serveur (titre + texte) s'affichent automatiquement.
  firebase.messaging();
} catch (e) { /* notifications indisponibles sur ce navigateur */ }

const SHELL = ['./', 'index.html', 'config.js', 'manifest.webmanifest',
  'firebase-app-compat.js', 'firebase-auth-compat.js', 'firebase-firestore-compat.js',
  'firebase-storage-compat.js', 'firebase-messaging-compat.js', 'firebase-app-check-compat.js', 'JsBarcode.all.min.js',
  'logo-mark.png', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request; if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (/googleapis\.com|firebaseio|firebasestorage|identitytoolkit|securetoken|fcmregistrations/.test(url.host)) return;
  if (url.origin === location.origin) {
    e.respondWith(fetch(req).then(r => { const copy = r.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match('index.html'))));
  } else if (/fonts\.(googleapis|gstatic)\.com/.test(url.host)) {
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); return res; })));
  }
});
