(function () {
    'use strict';

    var header = document.querySelector('header');
    var menuHeader = document.querySelector('.menu__header');

    // Setelah DOM loaded

    document.addEventListener('DOMContentLoaded', function (event) {
        // Pada saat load awal, mengecek koneksi
        if (!navigator.onLine) {
            updateNetworkStatus();
        }

        window.addEventListener('online', updateNetworkStatus, false);
        window.addEventListener('offline', updateNetworkStatus, false);
    });

    // Untuk update status network
    function updateNetworkStatus() {
        if(navigator.onLine){
            header.classList.remove('app__offline');
            menuHeader.style.background = '#1E88E5';
        }
        else {
            toast('Anda sekarang offline..');
            header.classList.add('app__offline');
            menuHeader.style.background = '#9E9E9E';
        }
    }



}) ();
