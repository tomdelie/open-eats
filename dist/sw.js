console.log('sw is sleeping')
/*
const cacheVersion = 'v1';

const excludeFromCache = ['https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png', 'http://localhost:3000/connexion', 'http://localhost:3000/deconnexion'];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(cacheVersion)
      .then((cache) => {
        return cache.addAll([
          '/',
          '/stylesheets/tailwind.min.css',
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
  console.log(link, !excludeFromCache.includes(link));

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
                  cache.matchAll('/images/').then(function (response) {
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

self.addEventListener('push', e => {
  const data = e.data.json();

  self.registration.showNotification(data.title, {
    body: data.body,
    actions: [
      { action: 'like', title: 'Like' },
      { action: 'reply', title: 'Reply' }
    ]
  });
});

self.addEventListener('notificationclick', event => {
  let notification = event.notification
  let action = event.action
  if (action === 'close') {
    notification.close()
  } else {
    clients.openWindow('https://google.fr')
  }
});
*/