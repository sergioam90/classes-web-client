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
            return Restangular.one('social').one('facebook').one('authorization-url').customGET(
                '',
                undefined,
                {
                    'Accept': 'text/plain'
                }
            );
        }

        return {
            getFacebookAuthorization: getFacebookAuthorization,
            getFacebookAuthorizationUrl: getFacebookAuthorizationUrl
        };
    }
})();