// Omshree Parida Portfolio - Service Worker Cache Layer
const CACHE_NAME = 'omshree-portfolio-v1';

// Static assets pattern to cache locally on user's device
const ASSETS_TO_CACHE = [
  '/',
  '/brand-icon.svg',
  '/track.jpg',
  '/scan-pay-go.png',
  '/civic-fix-ai.png',
  '/cloud5bot.png',
  '/sign-lang-detector.png',
  '/eco.png',
  '/neural.png',
  '/timer.png',
  '/omshree-guitar.webp',
  '/profile-reveal.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('SW: Pre-cache partial fail, will cache on fetch', err);
      });
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Cache-first for images, webp, svg, jpg, and remote posters
  const isImageOrMedia = 
    request.destination === 'image' || 
    url.pathname.match(/\.(webp|png|jpg|jpeg|svg|gif|ico|woff2?)$/i) ||
    url.hostname.includes('raw.githubusercontent.com');

  if (isImageOrMedia) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
          }
          return networkResponse;
        }).catch(() => {
          return cachedResponse || new Response('', { status: 404 });
        });
      })
    );
  }
});
