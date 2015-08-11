(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('teacherResult', TeacherResultDirective);

    function TeacherResultDirective() {

        function link(scope, element, attributes) {
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/teacher-result/teacher-result.template.html',
            scope: {
                teacher: '=ngModel',
                viewProfile: '&'
            },
            link: link
        };
    }

})();

