(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('LocalService', LocalService);

    LocalService.$inject = ['Restangular'];

    function LocalService(Restangular) {

        function sendVerification(id, code) {
            return Restangular.one('users').one(id).one('verification').customPUT({verificationCode: code});
        }

        return {
            sendVerification: sendVerification
        };
    }
})();