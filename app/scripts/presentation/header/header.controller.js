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
        vm.getCurrentUser = getCurrentUser;

        initialize();

        /* Implementation */

        function initialize() {
        }

        function getCurrentUser() {
            return AccountService.me;
        }

        function logout() {
            AccountService.logout();

            $state.go('root.home');
        }
    }

})();
