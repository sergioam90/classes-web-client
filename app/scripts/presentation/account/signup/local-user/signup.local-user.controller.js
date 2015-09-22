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

        vm.submittedForm = false;

        vm.sendConfirmation = sendConfirmation;
        vm.showAwardButton = showAwardButton;

        /* Implementation */

        function sendConfirmation(form) {
            if (form.$invalid) {
                vm.submittedForm = true;
                return;
            }

            vm.user.target = vm.target;

            // TODO: Validate user

            UserService.signup(vm.user).then(function () {
                $state.go('root.signup.emailSent');
            }, function (error) {
                // TODO: Handle error
                alert('Error creating user');
            });
        }

        function showAwardButton(form) {
            if (!form || !form.password || !form.confirmPassword) {
                return false;
            }

            var validPassword = angular.equals(form.password.$error, {});
            var validConfirmPassword = angular.equals(form.password.$modelValue, form.confirmPassword.$viewValue);

            return validPassword && validConfirmPassword;
        }
    }

})();