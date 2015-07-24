(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('gender', GenderFilter);

    GenderFilter.$inject = ['GenderService'];

    function GenderFilter(GenderService) {
        return function (input) {
            input = input || '';

            return GenderService.getGenderName(input);
        };
    }
})();