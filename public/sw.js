const CACHE_NAME = 'henna-by-fathima-v1';
const STATIC_CACHE_NAME = 'static-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-v1';

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.jsx',
  '/favicon.svg',
  '/logo.png',
  '/placeholder.svg',
  '/og-image.svg',
  'https://fonts.googleapis.com/css2?family=Jacques+Francois&display=swap',
  'https://fonts.cdnfonts.com/css/axiforma'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE_NAME)
        .then(cache => cache.addAll(STATIC_ASSETS)),
      caches.open(DYNAMIC_CACHE_NAME)
    ])
  );
});

// Fetch event with network-first strategy for API calls
// and cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Handle API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Clone the response before caching
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Handle static assets
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then(cache => cache.put(event.request, responseToCache));

            return response;
          });
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames
            .filter(cacheName => {
              return cacheName !== STATIC_CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME;
            })
            .map(cacheName => caches.delete(cacheName))
        );
      })
  );
});

// Handle messages from clients
self.addEventListener('message', (event) => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
});