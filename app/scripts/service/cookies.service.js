(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('CookiesService', CookiesService);

    CookiesService.$inject = ['$cookies'];

    function CookiesService($cookies) {

        var APPLICATION_COOKIE_PREFIX = 'classes.';

        function put(key, value) {
            $cookies.put(APPLICATION_COOKIE_PREFIX + key, value);
        }

        function get(key) {
            return $cookies.get(APPLICATION_COOKIE_PREFIX + key);
        }

        function remove(key) {
            $cookies.remove(APPLICATION_COOKIE_PREFIX + key);
        }

        return {
            get: get,
            put: put,
            remove: remove
        };
    }
})();