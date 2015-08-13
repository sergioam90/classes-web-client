(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .factory('ScheduleService', ScheduleService);

    function ScheduleService() {

        var scheduleNames = {
            morning: 'Mañana',
            afternoon: 'Tarde',
            night: 'Noche'
        };

        function getScheduleName(degree) {
            return scheduleNames[degree];
        }

        function getAllSchedules() {
            var keys = [];

            for (var key in scheduleNames) {
                if (scheduleNames.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }

            return keys;
        }

        return {
            getScheduleName: getScheduleName,

            getAllSchedules: getAllSchedules
        };
    }
})();