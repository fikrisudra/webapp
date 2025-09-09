self.addEventListener('install', (event) => {
  self.skipWaiting(); // Langsung aktif
});

self.addEventListener('activate', (event) => {
  self.clients.claim(); // Ambil kontrol langsung
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .catch(() => new Response(
        '<h1>Offline access is not allowed.</h1>',
        { status: 503, headers: { 'Content-Type': 'text/html' } }
      ))
  );
});