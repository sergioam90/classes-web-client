(function () {
    'use strict';

    angular
        .module('classesClientApp', [
            'appConstant',
            'ngAnimate',
            'ngCookies',
            'ngMessages',
            'ngResource',
            'ngRoute',
            'ngSanitize',
            'ngTouch',
            'restangular',
            'angular-oauth2',
            'xeditable',
            'ui.bootstrap',
            'ui.router',
            'ui.select',
            'ui.bootstrap.collapse',
            'rzModule' // Slider
        ])
        .run(function (editableOptions) {
            // TODO: Move
            editableOptions.theme = 'bs3';
        });


})();
