(function (window) {
    'use strict';


    // tombol push notification
    var fabPushElement = document.querySelector('.fab__push');
    var fabPushImgElement = document.querySelector('.fab__image');

    // Untuk memeriksa apakah ada dukungan untuk push notification
    function isPushSupported() {
        // Memeriksa apakah izin untuk push notification ditolak oleh pengguna
        if (Notification.permission === 'denied') {
            alert('Pengguna telak memblokir push notification.');
            return;
        }

        // Memeriksa apakah ada dukungan untuk push notification
        if (!('PushManager' in window)) {
            alert('Maaf, Push notification tidak didukung oleh browser Anda.');
            return;
        }

        // Mendapatkan langganan push notification
        // Jika serviceWorker telah terdaftar dan siap
        navigator.serviceWorker.ready
            .then(function (registration) {
                registration.pushManager.getSubscription()
                    .then(function (subscription) {
                        // Jika telah diberikan, akan mengaktifkan status tombol push
                        if (subscription) {
                            changePushStatus(true);
                        } else {
                            changePushStatus(false);
                        }
                    })
                    .catch(function (error) {
                        console.error('Masalah terjadi ketikan mengaktifkan push', error);
                    });
            });
    }

    function saveSubscriptionID(subscription) {
        var subscription_id = subscription.endpoint.split('gcm/send')[1];

        console.log("Subscription ID", subscription_id);

        // Harus membangun server untuk berlangganan
//        fetch('http://localhost:3333/api/users', {
//            method: 'post',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            },
//            body: JSON.stringify({
//                user_id: subscription_id
//            })
//        });
    }

    function deleteSubscriptionID(subscription) {
        var subscription_id = subscription.endpoint.split('gcm/send')[1];


        // Harus membangun server untuk berlangganan
//        fetch('http://localhost:3333/api/user/' + subscription_id, {
//            method: 'delete',
//            headers: {
//                'Accept': 'application/json',
//                'Content-Type': 'application/json'
//            }
//        });
    }

    // Tanya pengguna apakah mau melanggan (subscribe) untuk push notification dan kemudian
    // ..subscribe dan kirim push notification
    function subscribePush() {
        navigator.serviceWorker.ready.then(function (registration) {
            if (!registration.pushManager) {
                alert('Browser Anda tidak mendukung push notification');
                return false;
            }

            // Untuk melanggan 'push notification' dari push manager
            registration.pushManager.subscribe({
                    userVisibleOnly: true
                })
                .then(function (subscription) {
                    toast('Berhasil melanggan.');
                    console.info('Push dilanggan.');
                    console.log(subscription);
                    // saveSubscriptionID(subscription);
                    changePushStatus(true);
                })
                .catch(function (error) {
                    changePushStatus(false);
                    console.error('Push notification subscription error: ', error);
                });
        })
    }

    // Unsubscribe pengguna dari push notification
    function unsubscribePush() {
        navigator.serviceWorker.ready
            .then(function (registration) {
                // Mendapatkan 'push subscription'
                registration.pushManager.getSubscription()
                    .then(function (subscription) {
                        // Jika tidak ada 'push subscription, kembali
                        if (!subscription) {
                            alert('Tidak dapat membatalkan push notification.');
                            return;
                        }
                        // Berhenti melanggan 'push notification'
                        subscription.unsubscribe()
                            .then(function () {
                                toast('berhasil berhenti melanggan.');
                                console.info('Push notification berhenti dilanggan.');
                                console.log(subscription);
                                //deleteSubscriptionID(subscription);
                                changePushStatus(false);
                            })
                            .catch(function (error) {
                                console.error(error);
                            });
                    })
                    .catch(function (error) {
                        console.error('Gagal untuk berhenti melanggan push notification.');
                    });
            })
    }

    // Mengganti status
    function changePushStatus(status) {
        fabPushElement.dataset.checked = status;
        fabPushElement.checked = status;
        if (status) {
            fabPushElement.classList.add('active');
            fabPushImgElement.src = 'images/push-on.png';
        } else {
            fabPushElement.classList.remove('active');
            fabPushImgElement.src = 'images/push-off.png';
        }
    }

    // Even klik untuk subscribe push
    fabPushElement.addEventListener('click', function () {
        var isSubscribed = (fabPushElement.dataset.checked === 'true');
        if (isSubscribed) {
            unsubscribePush()
        } else {
            subscribePush();
        }
    });


    isPushSupported(); // Periksa apakah mendukung push notification

})(window);
