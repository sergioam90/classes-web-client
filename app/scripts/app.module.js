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
            'ui.router',
            'rzModule', // Slider
            'isteven-multi-select',
            'ui.materialize',
            'ngMap'
        ])
        .run(function (editableOptions) {
            // TODO: Move
            editableOptions.theme = 'bs3';
        });


})();
