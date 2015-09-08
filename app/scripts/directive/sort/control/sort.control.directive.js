(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('sortControl', SortControlDirective);

    SortControlDirective.$inject = ['SortStatesService'];

    function SortControlDirective(SortStatesService) {

        function link(scope, element, attributes) {

            scope.toggle = function () {
                scope.state = SortStatesService.next(scope.state);
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/sort/control/sort.control.template.html',
            scope: {
                state: '=ngModel',
                text: '@',
                iconClass: '@',
                iconColorClass: '@'
            },
            link: link
        };
    }

})();