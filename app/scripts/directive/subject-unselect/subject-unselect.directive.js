(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('subjectUnselect', SubjectUnselectDirective);

    function SubjectUnselectDirective() {

        function link(scope) {
            scope.unselect = unselect;

            function unselect(subject) {
                subject.$$selected = false;
            }
        }

        return {
            restrict: 'E',
            scope: {
                subjects: '=ngModel'
            },
            templateUrl: 'scripts/directive/subject-unselect/subject-unselect.template.html',
            link: link
        };
    }
})();
