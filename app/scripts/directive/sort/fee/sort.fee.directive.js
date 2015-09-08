(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('feeSort', FeeSortDirective);

    FeeSortDirective.$inject = ['SortStatesService'];

    function FeeSortDirective(SortStatesService) {

        function link(scope, element, attributes) {

            scope.toggle = function () {
                scope.state = SortStatesService.next(scope.state);
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/sort/fee/sort.fee.template.html',
            scope: {
                state: '=ngModel'

            },
            link: link
        };
    }

})();