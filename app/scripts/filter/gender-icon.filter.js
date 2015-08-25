(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('genderIcon', GenderFilter);

    GenderFilter.$inject = ['GenderService'];

    function GenderFilter(GenderService) {
        return function (input) {
            input = input || '';

            return GenderService.getGenderIconClass(input);
        };
    }
})();