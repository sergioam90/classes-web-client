(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('city', CityFilter);

    CityFilter.$inject = ['CityService'];

    function CityFilter(CityService) {
        return function (input) {
            input = input || '';

            return CityService.getCityName(input);
        };
    }
})();