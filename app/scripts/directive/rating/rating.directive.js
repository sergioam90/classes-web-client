(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .config(RatingDirective);

    RatingDirective.$inject = ['$provide'];

    function RatingDirective($provide) {
        $provide.decorator('ratingDirective', function ($delegate) {
            var directive = $delegate[0];

            directive.templateUrl = 'scripts/directive/rating/rating.template.html';

            return $delegate;
        });
    }
})();