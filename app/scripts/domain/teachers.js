(function () {
  'use strict';

  angular
    .module('classesClientApp')
    .factory('Teachers', Teachers);

  Teachers.$inject = ['Restangular'];

  function Teachers(Restangular) {
    return Restangular.service('teachers');
  }


})();
