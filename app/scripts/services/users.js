'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.users
 * @description
 * # users
 * Factory in the classesClientApp.
 */
angular.module('classesClientApp')
    .factory('Users', ['Restangular', function (Restangular) {
        return Restangular.service('users');
    }]);
