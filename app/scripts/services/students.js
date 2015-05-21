'use strict';

/**
 * @ngdoc service
 * @name classesClientApp.students
 * @description
 * # students
 * Factory in the classesClientApp.
 */
angular.module('classesClientApp')
  .factory('Students', ['Restangular', function (Restangular) {
    return Restangular.service('students');
  }]);
