(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('favoriteTeacher', FavoriteTeacherDirective);

    FavoriteTeacherDirective.$inject = ['$state'];

    function FavoriteTeacherDirective($state) {

        function link(scope, elem, attr) {
            scope.goToTeacherProfile = goToTeacherProfile;

            /* Implementation */
            function goToTeacherProfile() {
                $state.go('root.teacherProfile', scope.teacher);
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/favorite-teacher/favorite-teacher.template.html',
            scope: {
                teacher: '=ngModel'
            },
            link: link
        };
    }

})();