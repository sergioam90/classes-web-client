(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('scheduleFilter', ScheduleFilterDirective);

    ScheduleFilterDirective.$inject = ['ScheduleService'];

    function ScheduleFilterDirective(ScheduleService) {

        function link(scope, element, attributes) {
            scope.toggleMorning = function () {
                console.log("click");
                scope.morning = scope.morning ? null : '1';
                scope.search();
            };

            scope.toggleAfternoon = function () {
                scope.afternoon = scope.afternoon ? null : '1';
                scope.search();
            };

            scope.toggleNight = function () {
                scope.night = scope.night ? null : '1';
                scope.search();
            };
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/schedule/schedule.filter.template.html',
            scope: {
                search: '&',
                morning: '=',
                afternoon: '=',
                night: '='
            },
            link: link
        };
    }

})();