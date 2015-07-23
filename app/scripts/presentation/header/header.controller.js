(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$location', 'OAuth', 'AccountService'];

    function HeaderController($location, OAuth, AccountService) {
        var vm = this;

        vm.isActive = isActive;
        vm.isAuthenticated = OAuth.isAuthenticated;
        vm.logout = logout;
        vm.getCurrentUser = getCurrentUser;

        // TODO: Check this
        if (AccountService.isAuthenticated()) {
            AccountService.getMe();
        }

        ////////////////

        function getCurrentUser(){
            return AccountService.me;
        }

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function logout() {
            AccountService.logout();
            $location.path('/');
        }
    }

})();
