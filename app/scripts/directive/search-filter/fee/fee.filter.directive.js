(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('feeFilter', FeeFilterDirective);

    function FeeFilterDirective() {

        function link(scope, element, attributes) {

            scope.states = [20, 50, 100, 200];

            scope.toggle = function () {
                var current = scope.states.length - 1;

                // Find current degree
                if (scope.state >= scope.states[current])
                    current = 0;
                else
                    for (var i = current - 1; i >= 0; i--) {
                        if (scope.state >= scope.states[i]) {
                            current = i + 1;
                            break;
                        }
                    }

                scope.state = scope.states[current];
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/fee/fee.filter.template.html',
            scope: {
                state: '=ngModel'
            },
            link: link
        };
    }

})();