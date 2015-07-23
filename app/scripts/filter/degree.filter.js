(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('degree', DegreeFilter);

    DegreeFilter.$inject = ['DegreeService'];

    function DegreeFilter(DegreeService) {
        return function (input) {
            input = input || '';

            return DegreeService.getName(input);
        };
    }
})();