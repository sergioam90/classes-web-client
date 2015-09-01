(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AccountService', '$routeParams', '$location', '$rootScope', 'SocialService'];

    function LoginController(AccountService, $routeParams, $location, $rootScope, SocialService) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.login = login;
        vm.loginMessages = {};
        vm.user = {};

        $rootScope.$on('oauth:error', handleOAuthError);

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

        function handleOAuthError(event, rejection) {
            if (rejection.data.error === 'invalid_grant') {
                vm.loginMessages.$error = {'badCredentials': 'true'};
            }
        }

        function login() {
            AccountService.login(vm.user).then(function () {
                // TODO: Check this, maybe update to ui-router.
                $location.path($routeParams.redirectUrl || '/');
            });
        }

        function isAuthenticated() {
            return AccountService.isAuthenticated();
        }
    }

})();
