var version = '1';

self.addEventListener('install', function(event) {
  console.log('SW installed ', version , ' -> ', new Date().toLocaleString());
  self.skipWaiting();
  event.waitUntil(
    caches.open(version)
    .then(function(cache) {
      return cache.addAll([
        'index.html'
      ]);
    }));
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then(function(res) {
      if(res) {
        return res;
      }

      if(!navigator.onLine) {
        return caches.match(new Request('index.html'));
      }
      // The below line is buggy. The fetch header needs to be cleared after a request is done.
      //
      return fetch(event.request);
    }));
});
