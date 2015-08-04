(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('subject', SubjectDirective);

    function SubjectDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'scripts/directive/subject/subject.template.html',
            scope: {
                subject: '=ngModel'
            }
        };
    }

})();