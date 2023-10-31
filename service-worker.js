// Service Worker installation
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('my-pwa-cache').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/manifest.json',
        '/duckylooks.css',
        '/favicon.png',
        '/duckypass_logo.png',
        '/duckygen.js',
        '/service-worker.js', // Add a comma here
        '/service.js'          // Add a comma here
        // Add other resources that you want to cache for offline use
      ]);
    })
  );
});

// Service Worker activation and cache cleanup
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName !== 'my-pwa-cache';
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Service Worker fetch event
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

// Check if the PWA is not already installed
if (window.matchMedia('(display-mode: browser)').matches && !window.navigator.standalone) {
  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default browser installation prompt
    e.preventDefault();
    // Show the browser's installation prompt
    e.prompt();
  });
}
