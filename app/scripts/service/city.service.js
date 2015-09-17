(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('CityService', CityService);

    function CityService() {
        var citiesNames = {
            ChIJvQIT3Ku87ZUREXoeJI3Y0XY: 'Bahía Blanca'
        };

        function getAllCities() {
            var keys = [];

            for (var key in citiesNames) {
                if (citiesNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            // TODO: It's possible that the city is not in the list
            // TODO: then ¿should we return it from MapsService?

            return keys;
        }

        function getCityName(city) {
            return citiesNames[city];
        }

        function exists(city) {
            return angular.isDefined(citiesNames[city]);
        }

        return {
            getCityName: getCityName,
            getAllCities: getAllCities,
            exists: exists
        };
    }

})();
