(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupUserController', SignupUserController);

    SignupUserController.$inject = ['UserService', '$stateParams', '$state'];

    function SignupUserController(UserService, $stateParams, $state) {
        var vm = this;

        vm.user = {};
        vm.target = $stateParams.target;

        vm.sendConfirmation = sendConfirmation;

        /* Implementation */
        function sendConfirmation() {
            vm.user.target = vm.target;

            UserService.signup(vm.user).then(function () {
                $state.go('root.signup.emailSent');
            }, function (error) {
                // TODO: Handle error
                console.log('Error creating user');
            });
        }

    }

})();