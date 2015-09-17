(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('StorageService', StorageService);

    StorageService.$inject = ['CookiesService'];

    function StorageService(CookiesService) {

        // App specific cookie saving

        return {};
    }

})();