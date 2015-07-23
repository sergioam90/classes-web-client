(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('AccountService', AccountService);

    AccountService.$inject = ['Users', 'OAuth', 'OAuthToken'];

    function AccountService(Users, OAuth, OAuthToken) {

        var vm = this;

        vm.register = register;
        vm.isAuthenticated = OAuth.isAuthenticated;
        vm.login = login;
        vm.logout = logout;
        vm.getMe = getMe;
        vm.me = {};

        ////////

        function register(user) {
            return Users.post(user);
        }

        function getMe() {
            return Users.one('me').get().then(function (user) {
                vm.me = user;
            });
        }

        function logout() {
            return OAuthToken.removeToken();
        }

        function login(user) {
            if (vm.isAuthenticated()) {
                vm.logout();
            }
            return OAuth.getAccessToken(user).then(vm.getMe);
        }

    }

})();
