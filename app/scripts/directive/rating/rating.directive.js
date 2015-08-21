(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(function () {
        });

    RatingDirective.$inject = ['$provide'];

    function RatingDirective($provide) {
        $provide.decorator('ratingDirective', function ($delegate) {
            var directive = $delegate[0];

            directive.templateUrl = 'scripts/directive/rating/rating.template.html';

            return $delegate;
        });
    }
})();