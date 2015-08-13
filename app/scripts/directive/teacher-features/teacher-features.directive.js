(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('teacherFeatures', TeacherFeaturesDirective);

    function TeacherFeaturesDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/teacher-features/teacher-features.template.html',
            scope: {
                teacher: '=ngModel'
            }
        };
    }

})();

