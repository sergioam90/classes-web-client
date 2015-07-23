(function () {
    'use strict';

    angular
        .module('classesClientApp', [
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
            'ui.bootstrap.rating',
            'ui.router',
            'ui.select'
        ])
        .run(function (editableOptions) {
            // TODO: Move
            editableOptions.theme = 'bs3';
        });


})();
