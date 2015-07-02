(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('Users', Users);

    Users.$inject = ['Restangular'];

    function Users(Restangular) {
        return Restangular.service('users');
    }

})();
