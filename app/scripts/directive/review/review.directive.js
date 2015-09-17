(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('review', ReviewDirective);

    function ReviewDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/review/review.template.html',
            scope: {
                review: '=ngModel',
                forStudent: '@',
                deleteReview: '&'
            }
        };
    }

})();