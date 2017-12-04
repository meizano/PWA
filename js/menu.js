(function () {
    'use strict';

    var menuIconElement = document.querySelector('.header__icon');
    var menuElement = document.querySelector('.menu');
    var menuOverlayElement = document.querySelector('.menu__overlay');

    // Menu click event
    menuIconElement.addEventListener('click', showMenu, false);
    menuOverlayElement.addEventListener('click', hideMenu, false);
    menuElement.addEventListener('click', onTransitionEnd, false);

    // Untuk memperlihatkan menu (showMenu)
    function showMenu() {
        menuElement.style.transform = "translateX(0)";
        menuElement.classList.add('menu--show');
        menuOverlayElement.classList.add('menu__overlay--show');
    }

    // Untuk menyembunyikan menu (hideMenu)
    function hideMenu() {
        menuElement.style.transform = "translateX(-110%)";
        menuElement.classList.remove('menu--show');
        menuOverlayElement.classList.remove('menu__overlay--show');
        menuElement.addEventListener('transitionend', onTransitionEnd, false);
    }

    var touchStartPoint, touchMovePoint;

    /*Swipe dari pinggir/edge untuk membuka menu*/

    //'Touchstart' event untuk mengetahui darimana user memulai sentuhan
    document.body.addEventListener('touchstart', function(event){
        touchStartPoint = event.changeTouches[0].pageX;
        touchMovePoint = touchStartPoint;
    }, false);

    //'TouchMove' event untuk menentukan pergerakan sentuhan user
    document.body.addEventListener('touchmove', function(event) {
        touchMovePoint = event.touches[0].pageX;
        if(touchStartPoint < 10 && touchMovePoint > 30) {
            menuElement.style.transform = "translateX(0)";
        }
    }, false);

    function onTransitionEnd() {
        if(touchStartPoint < 10) {
            menuElement.style.transform = "translateX(0)";
            menuOverlayElement.classList.add('menu__overlay--show');
            menuElement.removeEventListener('transitionend', onTransitionEnd, false);
        }
    }

})();
