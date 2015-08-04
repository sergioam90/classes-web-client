(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('relatedTeacher', RelatedTeacherDirective);

    function RelatedTeacherDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/directive/related-teacher/related-teacher.template.html',
            scope: {
                teacher: '=ngModel'
            }
        };
    }

})();