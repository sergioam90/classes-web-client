(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('relatedTeacher', RelatedTeacherDirective);

    function RelatedTeacherDirective() {
        return {
            restrict: 'E',
            replace: true, // TODO: Remove all replace: true (deprecated feature)
            templateUrl: 'scripts/directive/related-teacher/related-teacher.template.html',
            scope: {
                teacher: '=ngModel'
            }
        };
    }

})();