(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .service('AccountService', AccountService);

    AccountService.$inject = ['Users', 'OAuth', 'OAuthToken', '$q'];

    function AccountService(Users, OAuth, OAuthToken, $q) {

        var vm = this;

        var meDeferred = $q.defer();

        vm.register = register;
        vm.isAuthenticated = OAuth.isAuthenticated;
        vm.login = login;
        vm.logout = logout;
        vm.me = me;
        vm.currentUser = {};

        initialize();

        /* Implementation */

        function initialize() {
            if (vm.isAuthenticated) {
                loadMe();
            }
        }

        function me() {
            return meDeferred.promise;
        }

        function register(user) {
            return Users.post(user);
        }

        function loadMe() {
            return Users.one('me').get().then(function (user) {
                vm.currentUser = user;

                meDeferred.resolve(user);
            });
        }

        function logout() {
            return OAuthToken.removeToken();
        }

        function login(user) {
            if (vm.isAuthenticated()) {
                vm.logout();
            }
            return OAuth.getAccessToken(user).then(vm.loadMe);
        }

    }

})();
