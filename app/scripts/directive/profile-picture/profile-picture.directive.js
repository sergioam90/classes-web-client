(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .directive('profilePicture', ProfilePictureDirective);

    function ProfilePictureDirective() {
        return {
            restrict: 'E',
            templateUrl: 'scripts/directive/profile-picture/profile-picture.template.html',
            scope: {
                image: '=ngModel'
            }
        };
    }
})();