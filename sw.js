var cacheName = 'pwa-commits-v3';

var filesToCache = [
    './',
    './css/style.css',
    './images/books.png',
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

    console.log('Service Worker: Instal...');

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
