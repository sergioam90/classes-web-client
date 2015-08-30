(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupUserController', SignupUserController);

    SignupUserController.$inject = ['UserService'];

    function SignupUserController(UserService) {
        var vm = this;

        vm.user = {};
        vm.sendConfirmation = sendConfirmation;

        /* Implementation */
        function sendConfirmation() {
            UserService.signup(vm.user).then(function () {
                // TODO: Show waiting for confirmation message
            }, function (error) {
                // TODO: Handle error
                console.log('Error creating user')
            });
        }

    }

})();