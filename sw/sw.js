var CACHE_NAME = 'my-site-cache-v1';
var urlsToCache = [
  './',
  'index.html',
  'main.css',
  'main.js',
]

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event){
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        console.log('fetch: ' + event.request.url);

        if (response) {
          console.log('Cache Hit:' + response)
          return response;
        }

        var fetchRequest = event.request.clone();

        console.log('Cache miss:' + event.request.url)
        return fetch(fetchRequest).then(
          function (response) {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });
            return response;
          }
        );
      }
    )
  );
});


self.addEventListener('activate', function(event){
  console.log('SW activate');
});
