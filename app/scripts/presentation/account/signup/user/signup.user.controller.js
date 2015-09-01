(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupUserController', SignupUserController);

    SignupUserController.$inject = ['UserService', '$stateParams'];

    function SignupUserController(UserService, $stateParams) {
        var vm = this;

        vm.user = {};
        vm.target = $stateParams.target;

        vm.sendConfirmation = sendConfirmation;

        /* Implementation */
        function sendConfirmation() {
            vm.user.target = vm.target;

            UserService.signup(vm.user).then(function () {
                // TODO: Show waiting for confirmation message
            }, function (error) {
                // TODO: Handle error
                console.log('Error creating user');
            });
        }

    }

})();