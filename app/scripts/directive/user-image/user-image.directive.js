(function() {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('userImage', UserImageDirective);

    function UserImageDirective() {

        function link(scope) {
            var image = scope.image;

            if (image === null) {
                scope.folder = 'system'; // TODO: should use a constant?
                scope.image = {
                    id: 'default-user-image' // TODO: should use a constant?
                }
            } else {
                scope.folder = 'committed'; // TODO: should use a constant?
            }
        }

        return {
            restrict: 'E',
            scope: {
                image: '=',
                transformation: '@'
            },
            templateUrl: 'scripts/directive/user-image/user-image.template.html',
            link: link
        };
    }
})();
