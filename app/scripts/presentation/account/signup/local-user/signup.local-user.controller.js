(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupLocalUserController', SignupLocalUserController);

    SignupLocalUserController.$inject = ['UserService', '$stateParams', '$state'];

    function SignupLocalUserController(UserService, $stateParams, $state) {
        var vm = this;

        vm.user = {};
        vm.target = $stateParams.target || null;

        vm.sendConfirmation = sendConfirmation;

        /* Implementation */

        function sendConfirmation() {
            vm.user.target = vm.target;

            // TODO: Validate user

            UserService.signup(vm.user).then(function () {
                $state.go('root.signup.emailSent');
            }, function (error) {
                // TODO: Handle error
                alert('Error creating user');
            });
        }

    }

})();