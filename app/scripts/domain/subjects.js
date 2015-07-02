(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('Subjects', Subjects);

    Subjects.$inject = ['Restangular'];

    function Subjects(Restangular) {
        return Restangular.service('subjects');
    }


})();
