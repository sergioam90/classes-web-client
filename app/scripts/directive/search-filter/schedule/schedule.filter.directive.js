(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('scheduleFilter', ScheduleFilterDirective);

    ScheduleFilterDirective.$inject = ['ScheduleService'];

    function ScheduleFilterDirective(ScheduleService) {

        function link(scope, element, attributes) {

            scope.states = [undefined];

            scope.states.push.apply(scope.states, ScheduleService.getAllSchedules());

            console.log(scope.states);

            scope.toggle = function () {
                var current;

                // Find current degree
                for (var i = 0; i < scope.states.length; i++) {
                    if (scope.states[i] === scope.state) {
                        current = i;
                        break;
                    }
                }

                scope.state = scope.states[(current + 1) % scope.states.length];
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/schedule/schedule.filter.template.html',
            scope: {
                state: '=ngModel'
            },
            link: link
        };
    }

})();