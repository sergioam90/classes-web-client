(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SocialService', SocialService);

    SocialService.$inject = ['Restangular', '$http'];

    function SocialService(Restangular, $http) {

        function getFacebookAuthorization(code) {

            return Restangular.one('social').one('facebook').one('authorization').get({code: code});
        }

        function getFacebookAuthorizationUrl() {
            // TODO: Improve
            return $http({
                method: 'GET',
                headers: {
                    "Accept": "text/plain"
                }, url: 'http://classes.noip.me:8080/social/facebook/authorization-url'
            });
            //return Restangular.one('social').one('facebook').one('authorization-url').get();
        }

        return {
            getFacebookAuthorization: getFacebookAuthorization,
            getFacebookAuthorizationUrl: getFacebookAuthorizationUrl
        };
    }
})();