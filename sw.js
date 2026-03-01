const CACHE_NAME = 'luxe-v11';
const criticalAssets = [
  './',
  './index.html',
  './com.css'
];

const optionalAssets = [
  './js/com.js',
  './js/product.js',
  './js/sidebar.js',
  './js/wishlist.js',
  './js/animate.js',
  './images/logo/jfif'
];


self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {

      cache.addAll(criticalAssets).catch(err => {
        console.log('Critical assets cache error:', err);
      });
      
      optionalAssets.forEach(url => {
        cache.add(url).catch(err => {
          console.log(`Failed to cache: ${url}`, err);
        });
      });
      
      return Promise.resolve();
    })
  );
  self.skipWaiting();
});

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
  // Allow external APIs to fetch from network
  if (event.request.url.includes('googleapis') || event.request.url.includes('cdnjs') || event.request.url.includes('unpkg') || event.request.url.includes('docs.google.com') || event.request.url.includes('google.com')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({error: 'Offline - External resource not available'}), { status: 503 });
      })
    );
    return;
  }
  
  // Cache first strategy for local assets
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      return caches.match('./index.html');
    })
  );
});
