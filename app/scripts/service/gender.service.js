(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('GenderService', GenderService);

    function GenderService() {

        var gendersNames = {
            male: 'Masculino',
            female: 'Femenino'
        };

        function getGenderName(gender) {
            return gendersNames[gender];
        }

        function getAllGenders(){
            var keys = [];

            for (var key in gendersNames) {
                if (gendersNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            return keys;
        }


        return {
            getGenderName: getGenderName,

            getAllGenders: getAllGenders
        };
    }
})();