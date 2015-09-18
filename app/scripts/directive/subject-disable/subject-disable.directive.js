(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('subjectDisable', SubjectDisableDirective);

    SubjectDisableDirective.$inject = ['LevelService'];

    function SubjectDisableDirective(LevelService) {

        function link(scope) {
            var levels = LevelService.getAllLevels();

            for (var i = 0; i < levels.length; i++) {
                levels[i] = {
                    id: levels[i],
                    $$disabled: false
                };
            }

            scope.levels = levels;

            scope.onChange = onChange;

            function onChange(level) {
                var subjects = scope.subjects;

                for (var i = 0; i < subjects.length; i++) {
                    var subject = subjects[i];

                    if (subject.level === level.id) {
                        subject.$$disabled = level.$$disabled;
                    }
                }
            }
        }

        return {
            restrict: 'E',
            scope: {
                subjects: '=ngModel'
            },
            templateUrl: 'scripts/directive/subject-disable/subject-disable.template.html',
            link: link
        };
    }
})();
