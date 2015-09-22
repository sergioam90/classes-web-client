(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('title', TitleDirective);

    TitleDirective.$inject = ['TitleService'];

    function TitleDirective(TitleService) {

        function link(scope, element) {
            scope.$watch(TitleService.getCurrentTitle, function (title) {
                element.text(title);
            });
        }

        return {
            restrict: 'E',
            scope: {},
            link: link
        };
    }
})();
