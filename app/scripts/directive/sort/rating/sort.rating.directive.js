(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('ratingSort', RatingSortDirective);

    RatingSortDirective.$inject = ['SortStatesService'];

    function RatingSortDirective(SortStatesService) {

        function link(scope, element, attributes) {

            scope.toggle = function () {
                scope.state = SortStatesService.next(scope.state);
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/sort/rating/sort.rating.template.html',
            scope: {
                state: '=ngModel'

            },
            link: link
        };
    }

})();