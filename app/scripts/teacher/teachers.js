'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.teachers
 * @description
 * # teachers
 * Factory in the classesClientApp.
 */
angular.module('classesClientApp')
    .factory('Teachers', function (Restangular) {
        return Restangular.service('teachers');
    });
