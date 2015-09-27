(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('cityValidator', CityValidatorService);

    CityValidatorService.$inject = ['CityService'];

    function CityValidatorService(CityService) {
        return {
            name: 'city',
            validate: function (value) {
                if (!value) {
                    return false;
                }

                return CityService.exists(value.city);
            }
        };
    }
})();