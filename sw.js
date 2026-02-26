const CACHE_NAME = 'luxe-v1';
const assets = [
  './',
  './index.html',
  './com.css',
  './js/com.js',
  './js/product.js',
  './js/sidebar.js',
  './js/wishlist.js',
  './js/animate.js',
  './images/bagscol.jpg',
  'https://unpkg.com/aos@next/dist/aos.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js',
  'https://unpkg.com/aos@next/dist/aos.js'
];

// Install the service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets).catch(err => {
        console.log('Cache install error:', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate and cleanup old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Serve files from cache when offline, fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Fallback for API calls that fail offline
        return new Response('Offline - API not available', { status: 503 });
      });
    })
  );
});