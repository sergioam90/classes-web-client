(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('DegreeService', DegreeService);

    function DegreeService() {

        var degreesNames = {
            Graduate: 'Graduado',
            Undergraduate: 'No graduado',
            Postgraduate: 'Superior a graduado'
        };

        return {
            getName: function (degree) {
                return degreesNames[degree];
            }
        };
    }
})();