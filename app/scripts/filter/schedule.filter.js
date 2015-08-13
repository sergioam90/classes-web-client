(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .filter('schedule', ScheduleFilter);

    ScheduleFilter.$inject = ['ScheduleService'];

    function ScheduleFilter(ScheduleService) {
        return function (input) {
            input = input || '';

            return ScheduleService.getScheduleName(input);
        };
    }
})();