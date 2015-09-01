(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupController', SignupController);

    SignupController.$inject = ['SocialService', '$state', '$stateParams'];

    function SignupController(SocialService, $state, $stateParams) {
        var vm = this;

        vm.target = $stateParams.target;

        initialize();

        /* Implementation */

        function initialize() {

            // Get Facebook authorization url
            SocialService.getFacebookAuthorizationUrl().then(function (url) {
                vm.facebookUrl = url;
            }, function (error) {
                console.log(error);
            });
        }

    }
})();
