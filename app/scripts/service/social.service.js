(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('SocialService', SocialService);

    SocialService.$inject = ['Restangular'];

    function SocialService(Restangular) {

        var socialEndPointRoot = location.protocol + '//' + location.host + '/signup/';

        function getFacebookUri(target){
            return socialEndPointRoot + target + '/facebook';
        }

        function getFacebookAuthorization(code, target) {
            var uri = getFacebookUri(target);

            return Restangular.one('social').one('facebook').one('authorization').customPOST({
                code: code,
                uri: uri
            });
        }

        function getFacebookAuthorizationUrl(target) {
            var uri = getFacebookUri(target);

            return Restangular.one('social').one('facebook').one('authorization-url').customGET(
                '',
                {
                    uri: uri
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