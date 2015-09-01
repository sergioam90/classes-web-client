(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('AccountService', AccountService);

    AccountService.$inject = ['UserService', 'OAuth', 'OAuthToken'];

    function AccountService(UserService, OAuth, OAuthToken) {

        var vm = this;

        vm.isAuthenticated = OAuth.isAuthenticated;
        vm.login = login;
        vm.logout = logout;
        vm.loadUser = loadUser;
        vm.loginWithToken = loginWithToken;
        vm.me = {};

        initialize();

        /* Implementation */

        function initialize() {
            if (vm.isAuthenticated()) {
                loadUser();
            }
        }

        function loadUser() {
            return UserService.me().then(function (user) {
                vm.me = user;
                return user;
            });
        }

        function login(user) {
            if (vm.isAuthenticated()) {
                vm.logout();
            }
            return OAuth.getAccessToken(user).then(vm.loadUser);
        }

        function loginWithToken(token) {
            if (vm.isAuthenticated()) {
                vm.logout();
            }

            OAuthToken.setToken(token);

            return vm.loadUser();
        }

        function logout() {
            vm.me = {};

            return OAuthToken.removeToken();
        }

    }

})();
