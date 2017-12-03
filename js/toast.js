(function (exports) {
    'use strict';

    var toastContainer = document.querySelector('.toast__container');

    // Untuk memperlihatkan notifikasi
    function toast(msg, options){
        if(!msg) return;

        options = options || 3000;

        var toastMsg = document.createElement('div');

        toastMsg.className = 'toast__msg';
        toastMsg.textContent = msg;

        toastContainer.appendChild(toastMsg);

        // Memperlihatkan toast selama 3 detik kemudian disembunyikan
        setTimeout(function () {
            toastMsg.classList.add('toast__msg--hide');
        }, options);

        // Membuang elemen setelah disembunyikan
        toastMsg.addEventListener('transitionend', function(event) {
            event.target.parentNode.removeChild(event.target);
        });
    }

    exports.toast = toast;

})(typeof window === 'undefined' ? module.exports : window);
