(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['AccountService', '$routeParams', '$location', '$rootScope'];

    function LoginController(AccountService, $routeParams, $location, $rootScope) {
        var vm = this;

        vm.isAuthenticated = isAuthenticated;
        vm.login = login;
        vm.loginMessages = {};


        $rootScope.$on('oauth:error', handleOAuthError);

        ///////////////

        function handleOAuthError(event, rejection) {
            if (rejection.data.error === 'invalid_grant') {
                vm.loginMessages.$error = {'badCredentials': 'true'};
            }
        }

        function login(user) {
            AccountService.login(user).then(function () {
                // TODO: Check this, maybe update to ui-router.
                $location.path($routeParams.redirectUrl || '/');
            });
        }

        function isAuthenticated() {
            return AccountService.isAuthenticated();
        }

    }

})();
