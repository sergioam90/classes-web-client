(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('relatedTeacher', RelatedTeacherDirective);

    RelatedTeacherDirective.$inject = ['$state'];

    function RelatedTeacherDirective($state) {

        function link(scope, elem, attr) {
            scope.goToTeacherProfile = goToTeacherProfile;

            /* Implementation */
            function goToTeacherProfile() {
                $state.go('root.teacherProfile', scope.teacher);
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/related-teacher/related-teacher.template.html',
            scope: {
                teacher: '=ngModel'
            },
            link: link
        };
    }

})();