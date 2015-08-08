(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('degreeIcon', DegreeIconDirective);

    function DegreeIconDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/degree-icon/degree-icon.template.html',
            scope: {
                degree: '=ngModel'
            }
        };
    }

})();