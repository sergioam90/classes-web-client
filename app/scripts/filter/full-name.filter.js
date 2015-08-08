(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('fullName', FullName);

    FullName.$inject = [];

    function FullName() {
        return function (object) {

            return object.firstName + ' ' + object.lastName;
        };
    }
})();