const CACHE_NAME = 'type-checker-v5';
const urlsToCache = [
  '/TypeAdvantageTool/',
  '/TypeAdvantageTool/tat_icon.png',
  '/TypeAdvantageTool/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});