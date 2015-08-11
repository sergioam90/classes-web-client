(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('degreeFilter', DegreeFilterDirective);

    DegreeFilterDirective.$inject = ['DegreeService'];

    function DegreeFilterDirective(DegreeService) {

        function link(scope, element, attributes) {

            scope.states = DegreeService.getAllDegrees();

            scope.states[0] = undefined;

            scope.toggle = function () {
                var current;

                // Find current degree
                for (var i = 0; i < scope.states.length; i++) {
                    if (scope.states[i] == scope.state) {
                        current = i;
                        break;
                    }
                }

                scope.state = scope.states[(current + 1) % scope.states.length];
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/degree/degree.filter.template.html',
            scope: {
                state: '=ngModel'
            },
            link: link
        };
    }

})();