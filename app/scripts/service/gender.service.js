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

        var gendersIcons = {
            male: 'fa fa-male blue-text',
            female: 'fa fa-female purple-text'
        };

        function getGenderName(gender) {
            return gendersNames[gender];
        }

        function getGenderIconClass(gender) {
            return gendersIcons[gender];
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

            getGenderIconClass: getGenderIconClass,

            getAllGenders: getAllGenders
        };
    }
})();