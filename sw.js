let cacheId = `mws-rest-2`;

self.addEventListener('install', event => {
  skipWaiting();
  event.waitUntil(
    caches.open(cacheId).then(cache => {
      return cache.addAll(
        [
          '/',
          '/index.html',
          '/restaurant.html',
          '/sw.js',
          '/manifest.json',
          '/favicon.ico',
          '/dist/css/styles.min.css',
          '/dist/css/details.min.css',
          '/dist/img/',
          '/js/dbhelper.js',
          '/js/idb.js',
          '/js/idbHelper.js',
          '/js/main.js',
          '/js/registerSW.js',
          '/js/restaurant_info.js',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
          'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
        ]
      ).catch(error => {
        console.log('Cache open failed: ' + error);
      });
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
    .then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName.startsWith('mws-') && !cacheId.includes(cacheName);
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      ).then( () => {
        return clients.claim();
      })
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request)
        .then(fetchedRes => {
          return caches.open(cacheId).then(cache => {
            cache.put(event.request, fetchedRes.clone());
            return fetchedRes;
          });
        }).catch(error => {
          return new Response('Restaurant Reviews has no internet connection', {
            status: 404,
            statusText: 'Restaurant Reviews has no internet connection'
        });
      })
  }));
});