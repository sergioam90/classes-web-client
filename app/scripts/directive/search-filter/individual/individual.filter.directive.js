(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('individualFilter', IndividualFilterDirective);
    function IndividualFilterDirective() {

        function link(scope, element, attributes) {
            scope.toggle = function () {
                if (scope.state)
                    scope.state = undefined;
                else
                    scope.state = true;
            }
        }

        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/search-filter/individual/individual.filter.template.html',
            scope: {
                state: '=ngModel'
            },
            link: link
        };
    }

})();

