(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('GenderService', GenderService);

    function GenderService() {

        var genderNames = {
            Male: 'Masculino',
            Female: 'Femenino'
        };

        return {
            getName: function (gender) {
                return genderNames[gender];
            }
        };
    }
})();