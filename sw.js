const FALLBACK_404 = '/404.html';
const FALLBACK_503 = '/503.html';

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('fallback-cache').then((cache) =>
      cache.addAll([FALLBACK_404, FALLBACK_503])
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Jika halaman tidak ditemukan (404), arahkan ke fallback 404
        if (response.status === 404) {
          return caches.match(FALLBACK_404);
        }
        return response;
      })
      .catch(() => {
        // Jika offline atau fetch gagal, arahkan ke fallback 503
        return caches.match(FALLBACK_503);
      })
  );
});