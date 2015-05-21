'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.subjects
 * @description
 * # subjects
 * Service in the classesClientApp.
 */
angular.module('classesClientApp')
  .factory('Subjects', ['Restangular', function (Restangular) {
    return Restangular.service('subjects');
  }]);
