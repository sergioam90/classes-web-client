'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.degrees
 * @description
 * # degrees
 * Service in the classesClientApp.
 */
angular.module('classesClientApp')
  .factory('Degrees', ['Restangular', function (Restangular) {
    return Restangular.service('degrees');
  }]);
