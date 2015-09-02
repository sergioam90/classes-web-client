(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SocialService', SocialService);

    SocialService.$inject = ['Restangular'];

    function SocialService(Restangular) {

        function getFacebookAuthorization(code, target) {

            return Restangular.one('social').one('facebook').one('authorization').get({
                code: code,
                target: target
            });
        }

        function getFacebookAuthorizationUrl(target) {
            return Restangular.one('social').one('facebook').one('authorization-url').customGET(
                '',
                {
                    target: target
                },
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