(function() {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('teacherCard', TeacherCardDirective);

    TeacherCardDirective.$inject = ['$state'];

    function TeacherCardDirective($state) {

        function link(scope) {
            var teacher = scope.teacher;
            var isLink = scope.isLink;

            if (isLink) {
                scope.href = $state.href('root.teacherProfile', {
                    id: teacher.id
                });
            }
        }

        return {
            restrict: 'E',
            scope: {
                teacher: '=',
                isLink: '='
            },
            templateUrl: 'scripts/directive/teacher-card/teacher-card.template.html',
            link: link
        };
    }
})();
