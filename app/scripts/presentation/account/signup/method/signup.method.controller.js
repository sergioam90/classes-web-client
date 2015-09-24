(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupMethodController', SignupMethodController);

    SignupMethodController.$inject = ['SocialService', '$state'];

    function SignupMethodController(SocialService, $state) {
        var vm = this;

        var target = $state.current.data.target;

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
