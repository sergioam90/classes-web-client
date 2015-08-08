(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['OAuth', 'AccountService', '$state'];

    function HeaderController(OAuth, AccountService, $state) {
        var vm = this;

        vm.isAuthenticated = OAuth.isAuthenticated;
        vm.logout = logout;
        vm.user = {};

        initialize();

        /* Implementation */

        function initialize() {
            getCurrentUser();
        }

        function getCurrentUser() {
            AccountService.me().then(function (user) {
                vm.user = user;
            });
        }

        function logout() {
            AccountService.logout();
            $state.go('main');
        }
    }

})();
