/*
const cacheVersion = 'v1';

const excludeFromCache = ['https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/restaurants/IJLSWXjvdbsUujFsvnqs',
          '/restaurants/JBAmvRjzM7SpGTyNiQJA',
          '/restaurants/Oj0T2eStXvJMQnWUDwIg',
          '/restaurants/c50Na4WEvDiW6wWROJRQ',
          '/restaurants/oxMlf5MRlsv6ib91Vg1H',
          '/commandes',
          '/favoris',
          '/parametres',
          '/stylesheets/tailwind.min.css',
          '/javascripts/firebaseInit.min.js',
          '/javascripts/network.min.js',
          '/javascripts/notifications.min.js',
          '/javascripts/order.min.js',
          '/javascripts/product.min.js',
          '/javascripts/search-bar.min.js',
          '/javascripts/service-worker-init.min.js',
        ]);
      })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', function (event) {
  const url = new URL(event.request.url);
  const link = `${url.origin}${url.pathname}`;

  if (event.request.method === 'GET' && !excludeFromCache.includes(link)) {
    event.respondWith(
      caches.match(event.request)
        .then(function (response) {
          return response || fetch(event.request)
            .then(function (response) {
              const responseClone = response.clone();
              caches.open(cacheVersion)
                .then(function (cache) {
                  cache.put(event.request, responseClone);
                  cache.matchAll('/images').then(function (response) {
                    response.forEach(function (element, index, array) {
                      cache.delete(element);
                    });
                  });
                });

              return response;
            })
        })
        .catch(function () {
          return caches.match('index.html');
        })
    )
  }
});
*/