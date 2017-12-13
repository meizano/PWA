(function (exports) {
    'use strict';

    var app = {
        spinner: document.querySelector('.loader')
    };

    var container = document.querySelector('.container');

    document.getElementById('butRefresh').addEventListener('click', function() {
        // Mendapatkan data mutakhir dari Github setiap kali diklik tobol refresh
        toast('Mendapatkan data terbaru..');
        fetchCommits();
        console.log("Mendapatkan data terbaru!!");
    })

    var commitContainer = ['.first', '.second', '.third', '.fourth', '.fifth'];
    var posData = ['first', 'second', 'third', 'fourth', 'fifth'];

    // Memeriksa apakah localStorage didukung dan tersedia
    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return false;
        }
    }

    // Get Commit Data dari API Github
    function fetchCommits() {
        var url = 'https://api.github.com/repos/meizano/lampung/commits';

        fetch(url)
            .then(function (fetchResponse) {
                return fetchResponse.json();
            })
            .then(function (response) {

                // Tahap 1
                /* var commitData = {
                    'first' : {
                        message: response[0].commit.message,
                        author: response[0].commit.author.name,
                        time: response[0].commit.author.date,
                        link: response[0].html_url

                    },
                    'second' : {
                        message: response[1].commit.message,
                        author: response[1].commit.author.name,
                        time: response[1].commit.author.date,
                        link: response[1].html_url

                    },
                    'third' : {
                        message: response[2].commit.message,
                        author: response[2].commit.author.name,
                        time: response[2].commit.author.date,
                        link: response[2].html_url

                    },
                    'fourth' : {
                        message: response[3].commit.message,
                        author: response[3].commit.author.name,
                        time: response[3].commit.author.date,
                        link: response[3].html_url

                    },
                    'fifth' : {
                        message: response[4].commit.message,
                        author: response[4].commit.author.name,
                        time: response[4].commit.author.date,
                        link: response[4].html_url

                    }
                };

                container.querySelector('.first').innerHTML =
                    "<h4> Message: " + response[0].commit.message + "</h4>" +
                    "<h4> Author: " + response[0].commit.author.name + "</h4>" +
                    "<h4> Time committed: " + (new Date(response[0].commit.author.date)).toUTCString() + "</h4>" +
                    "<h4>" + "<a href='" + response[0].html_url + "'>Klik untuk rincian!</a>" + "</h4>";

                container.querySelector('.second').innerHTML =
                    "<h4> Message: " + response[1].commit.message + "</h4>" +
                    "<h4> Author: " + response[1].commit.author.name + "</h4>" +
                    "<h4> Time committed: " + (new Date(response[0].commit.author.date)).toUTCString() + "</h4>" +
                    "<h4>" + "<a href='" + response[1].html_url + "'>Klik untuk rincian!</a>" + "</h4>";

                container.querySelector('.third').innerHTML =
                    "<h4> Message: " + response[2].commit.message + "</h4>" +
                    "<h4> Author: " + response[2].commit.author.name + "</h4>" +
                    "<h4> Time committed: " + (new Date(response[2].commit.author.date)).toUTCString() + "</h4>" +
                    "<h4>" + "<a href='" + response[2].html_url + "'>Klik untuk rincian!</a>" + "</h4>";

                container.querySelector('.fourth').innerHTML =
                    "<h4> Message: " + response[3].commit.message + "</h4>" +
                    "<h4> Author: " + response[3].commit.author.name + "</h4>" +
                    "<h4> Time committed: " + (new Date(response[3].commit.author.date)).toUTCString() + "</h4>" +
                    "<h4>" + "<a href='" + response[3].html_url + "'>Klik untuk rincian!</a>" + "</h4>";

                container.querySelector('.fifth').innerHTML =
                    "<h4> Message: " + response[4].commit.message + "</h4>" +
                    "<h4> Author: " + response[4].commit.author.name + "</h4>" +
                    "<h4> Time committed: " + (new Date(response[4].commit.author.date)).toUTCString() + "</h4>" +
                    "<h4>" + "<a href='" + response[4].html_url + "'>Klik untuk rincian!</a>" + "</h4>";
                */

                // Tahap 2
                console.log("Respon dari Github", response);

                var commitData = {};

                for (var i = 0; i < posData.length; i++) {
                    commitData[posData[i]] = {
                        message: response[i].commit.message,
                        author: response[i].commit.author.name,
                        time: response[i].commit.author.date,
                        link: response[i].html_url
                    };
                }

                localStorage.setItem('commitData', JSON.stringify(commitData));

                for (var i = 0; i < commitContainer.length; i++) {
                    "<h4> Message: " + response[i].commit.message + "</h4>" +
                        "<h4> Author: " + response[i].commit.author.name + "</h4>" +
                        "<h4> Time committed: " + (new Date(response[i].commit.author.date)).toUTCString() + "</h4>" +
                        "<h4>" + "<a href='" + response[i].html_url + "'>Klik untuk rincian!</a>" + "</h4>";
                }

                app.spinner.setAttribute('hidden', true); //menyembunyikan spinner

            })
            .catch(function (error) {
                console.error(error);
            });
    };

    //Mendapatkan commit Data dari Web Storage
    function fetchCommitsFromLocalStorage(data) {
        var localData = JSON.parse(data);

        app.spinner.setAttribute('hidden', true); //menyembunyikan spinner

        for (var i = 0; i < commitContainer.length; i++) {

            container.querySelector("" + commitContainer[i]).innerHTML =
                "<h4> Message: " + localData[posData[i]].message + "</h4>" +
                        "<h4> Author: " + localData[posData[i]].author + "</h4>" +
                        "<h4> Time committed: " + (new Date(localData[posData[i]].time)).toUTCString() + "</h4>" +
                        "<h4>" + "<a href='" + localData[posData[i]].link + "'>Klik untuk rincian!</a>" + "</h4>";
        }
    };

    if(storageAvailable('localStorage')) {
        if (localStorage.getItem('commitData') === null) {
            /* Pengguna menggunakan aplikasi untuk pertama kali atau pengguna belum menyimpan commit data, sehingga tunjukkan pengguna beberapa data palsu */
            fetchCommits();
            console.log("fetch dari API");
        } else {
            fetchCommitsFromLocalStorage(localStorage.getItem('commitData'));
            console.log("Fetch dari localStorage");
        }
    }
    else {
        toast("Kami masih belum bisa melakukan cache data..")
    }



})();
