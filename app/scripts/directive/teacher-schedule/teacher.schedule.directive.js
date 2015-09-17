(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('teacherSchedule', TeacherScheduleDirective);

    TeacherScheduleDirective.$inject = [];

    function TeacherScheduleDirective() {

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/teacher-schedule/teacher.schedule.template.html',
            scope: {
                schedule: '=ngModel'
            }
        };
    }

})();