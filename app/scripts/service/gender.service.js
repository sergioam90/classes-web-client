(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('GenderService', GenderService);

    function GenderService() {

        var gendersNames = {
            Male: 'Masculino',
            Female: 'Femenino'
        };

        return {
            getGenderName: function (gender) {
                return gendersNames[gender];
            }
        };
    }
})();