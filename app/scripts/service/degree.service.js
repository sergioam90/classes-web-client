(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('DegreeService', DegreeService);

    function DegreeService() {

        var degreesNames = {
            undergraduate: 'No graduado',
            graduate: 'Graduado',
            postgraduate: 'Superior a graduado'
        };

        function getDegreeName(degree) {
            return degreesNames[degree];
        }

        function getAllDegrees(){
            var keys = [];

            for (var key in degreesNames) {
                if (degreesNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            return keys;
        }

        return {
            getDegreeName: getDegreeName,

            getAllDegrees: getAllDegrees
        };
    }
})();