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

        // TODO: Check this
        if (AccountService.isAuthenticated()) {
            AccountService.me();
        }

        ////////////////

        function isActive(viewLocation) {
            return viewLocation === $location.path();
        }

        function logout() {
            AccountService.logout();
            $location.path('/');
        }
    }

})();
