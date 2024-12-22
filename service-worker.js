const CACHE_NAME = 'btc-tracker-cache-v1';
const URLS_TO_CACHE = [
  './',         // This folder
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
];

// On install, cache our files
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Intercept network requests to serve cached files
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
