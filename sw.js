self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("myproduction-cache").then((cache) =>
      cache.addAll([
        "index.html",
        "dashboard.html",
        "profile.html",
        "404.html",
        "style.css",
        "manifest.json",
        "icons/icon-192.png",
        "icons/icon-512.png"
      ])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});