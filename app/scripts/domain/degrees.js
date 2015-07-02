(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('Degrees', RestangularFactory);

    RestangularFactory.$inject = ['Restangular'];

    function RestangularFactory(Restangular) {
        return Restangular.service('degrees');
    }

})();
