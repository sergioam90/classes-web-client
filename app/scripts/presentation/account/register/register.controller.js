(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['AccountService', '$location'];

    function RegisterController(AccountService, $location) {
        var vm = this;

        vm.register = register;

        // TODO: Check
        function register(user) {
            AccountService.register(user).then(registrationSuccess, registrationError);

            function registrationError() {
                alert('Error in registration');
            }

            function registrationSuccess() {
                $location.path('/login');
            }
        }
    }
})();
