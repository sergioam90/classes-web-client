(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupMethodController', SignupMethodController);

    SignupMethodController.$inject = ['SocialService', '$stateParams'];

    function SignupMethodController(SocialService, $stateParams) {
        var vm = this;

        var target = $stateParams.target || null;

        initialize();

        /* Implementation */

        function initialize() {

            // Get Facebook authorization url
            SocialService.getFacebookAuthorizationUrl(target).then(function (url) {
                vm.facebookUrl = url;
            });
        }

    }
})();
