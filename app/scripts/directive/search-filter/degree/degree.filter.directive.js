(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('degreeFilter', DegreeFilterDirective);

    DegreeFilterDirective.$inject = ['DegreeService'];

    function DegreeFilterDirective(DegreeService) {

        function link(scope, element, attributes) {

            scope.minState = undefined;

            scope.$watch('selectedDegrees', function () {

                var auxStates = scope.selectedDegrees.slice();

                auxStates.push(true);

                var first;

                // If selection is incompatible, set minState to undefined
                for (var i = 0; i < auxStates.length - 1; i++) {
                    // Save the first
                    if ((first === undefined) && auxStates[i]) {
                        first = i;
                    }

                    // If current is selected and next is not
                    if (auxStates[i] && !auxStates[i + 1]) {
                        scope.minState = undefined;
                        return;
                    }
                }

                // Else
                if (first === 0) {
                    // If nothing selected, set minState undefined
                    scope.minState = undefined;
                } else {
                    // Else set minState to first selected degree
                    scope.minState = first;
                }
            }, true);

            scope.toggle = function () {

                // If incompatible selection, reset selection
                if (scope.minState === undefined) {
                    scope.selectedDegrees[0] = false;
                    for (var i = 1; i < scope.selectedDegrees.length; i++) {
                        scope.selectedDegrees[i] = true;
                    }
                    scope.minState = 1;
                    return;
                }

                // Else if last is selected, reset selection
                var last = scope.selectedDegrees.length - 1;

                if (scope.minState === last) {
                    scope.selectedDegrees[last] = false;
                    scope.minState = undefined;
                    return;
                }

                // Else fill from next of current selection
                scope.selectedDegrees[scope.minState] = false;
                scope.minState += 1;

                for (var i = scope.minState; i < scope.selectedDegrees.length; i++) {
                    scope.selectedDegrees[i] = true;
                }

            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/degree/degree.filter.template.html',
            scope: {
                selectedDegrees: '=',
                degreesNames: '='
            },
            link: link
        };
    }

})();