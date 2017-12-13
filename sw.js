var cacheName = 'pwa-kamus-lampung-commit';

var filesToCache = [
    './',
    './css/style.css',
    './images/Logo-2016-Unila.png',
    './images/Home.svg',
    './images/ic_refresh_white_24px.svg',
    './images/profile.png',
    './images/push-off.png',
    './images/push-on.png',
    './js/app.js',
    './js/menu.js',
    './js/offline.js',
    './js/toast.js'
];

//Install Service Worker
self.addEventListener('install', function (event) {

    console.log('Service Worker: Instalasi...');

    event.waitUntil(

        // Membuka Cache
        caches.open(cacheName).then(function (cache) {
            console.log('Service Worker: sedang Caching App Shell...');

            // Menambahkan Berkas ke dalam Cache
            return cache.addAll(filesToCache);
        })

    );
});

// Dijalankan ketika Service Worker dimulai
self.addEventListener('activate', function (event) {

    console.log('Service Worker: Aktivasi...');

    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(cacheNames.map(function (key) {
                if (key !== cacheName) {
                    console.log('Service Worker: Membuang cache lama', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    return self.clients.claim();

});

self.addEventListener('fetch', function (event) {

    console.log('Service Worker: Fetch', event.request.url);

    console.log("Url", event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});

//Tahap 3

self.addEventListener('push', function(event) {

  console.info('Event: Push');

  var title = 'Commit terbaru pada Kamus Lampung';

  var body = {
    'body': 'Klik untuk melihat commit terbaru',
    'tag': 'pwa',
    'icon': './images/48x48.png'
  };

  event.waitUntil(
    self.registration.showNotification(title, body)
  );
});

self.addEventListener('notificationclick', function(event) {

  var url = './latest.html';

  event.notification.close(); //Menutup notification

  // Mmebuka aplikasi dan pindah ke latest.html setelah mengklik notification
  event.waitUntil(
    clients.openWindow(url)
  );

});
