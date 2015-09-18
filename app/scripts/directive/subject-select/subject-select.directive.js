(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('subjectSelect', SubjectSelectDirective);

    SubjectSelectDirective.$inject = ['$document', '$timeout'];

    function SubjectSelectDirective($document, $timeout) {

        function link(scope) {
            var onChangePromise = null;
            var onMousedownFlag = false;

            scope.query = '';
            scope.results = [];
            scope.showDropdown = false;

            scope.onBlur = onBlur;
            scope.onChange = onChange;
            scope.onFocus = onFocus;
            scope.onMousedown = onMousedown;
            scope.select = select;

            scope.$on('$destroy', onDestroy);
            $document.on('click', onDocumentClick);

            search();

            function isMatch(subject) {
                var query = scope.query;
                var processedQuery = processString(query);

                if (processString(subject.name).indexOf(processedQuery) >= 0) {
                    return true;
                }

                if (processString(subject.category.name).indexOf(processedQuery) >= 0) {
                    return true;
                }

                return false;
            }

            function onBlur() {
                if (!onMousedownFlag) {
                    scope.showDropdown = false;
                }
            }

            function onChange() {
                $timeout.cancel(onChangePromise);

                onChangePromise = $timeout(function () {
                    search();
                }, 200);
            }

            function onDestroy() {
                $document.off('click', onDocumentClick);
                $timeout.cancel(onChangePromise);
            }

            function onDocumentClick() {
                if (onMousedownFlag) {
                    onMousedownFlag = false;
                } else {
                    scope.showDropdown = false;
                    scope.$apply();
                }
            }

            function onFocus() {
                scope.showDropdown = true;
            }

            function onMousedown() {
                onMousedownFlag = true;
            }

            function processString(string) {
                return string
                    .toLowerCase()
                    .replace('á', 'a')
                    .replace('é', 'e')
                    .replace('í', 'i')
                    .replace('ó', 'o')
                    .replace('ú', 'u')
                    .replace('ü', 'u');
            }

            function search() {
                var query = scope.query;
                var subjects = scope.subjects;

                var results;

                if (query === '') {
                    results = subjects;
                } else {
                    results = [];
                    for (var i = 0; i < subjects.length; i++) {
                        var subject = subjects[i];

                        if (isMatch(subject)) {
                            results.push(subject);
                        }
                    }
                }

                scope.results = results;
            }

            function select(subject) {
                scope.showDropdown = false;
                subject.$$selected = true;
            }
        }

        return {
            restrict: 'E',
            scope: {
                subjects: '=ngModel'
            },
            templateUrl: 'scripts/directive/subject-select/subject-select.template.html',
            link: link
        };
    }
})();
