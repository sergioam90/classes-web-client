(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['SocialService', '$stateParams'];

    function SignupController(SocialService, $stateParams) {
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
