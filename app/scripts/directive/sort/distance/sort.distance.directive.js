(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('distanceSort', DistanceSortDirective);

    DistanceSortDirective.$inject = ['SortStatesService'];

    function DistanceSortDirective(SortStatesService) {

        function link(scope, element, attributes) {

            scope.toggle = function () {
                scope.state = SortStatesService.next(scope.state);
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/sort/distance/sort.distance.template.html',
            scope: {
                state: '=ngModel'

            },
            link: link
        };
    }

})();