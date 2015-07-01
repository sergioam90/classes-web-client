(function () {
  'use strict';

  angular.module('classesClientApp')
    .factory('Students', Students);

  Students.$inject = ['Restangular'];

  function Students(Restangular) {
    return Restangular.service('students');
  }

})();
