(function () {
    'use strict';

    angular
        .module('classesClientApp')
        .controller('SignupSocialUserController', SignupSocialUserController);

    SignupSocialUserController.$inject = ['user', 'UserService', '$state'];

    function SignupSocialUserController(user, UserService, $state) {
        var vm = this;

        var target = $state.current.data.target;

        vm.user = user;

        vm.submittedForm = false;
        
        vm.sendConfirmation = sendConfirmation;

        /* Implementation */
        function sendConfirmation(form) {
            if (form.$invalid) {
                vm.submittedForm = true;
                return;
            }

            var tempUser = angular.copy(user);

            tempUser.target = target;

            UserService.confirm(tempUser).then(function () {
                $state.go('root.signup-' + target + '.step.data');
            }, function (error) {
                // TODO: Handle error
                alert('Error creating user');
            });
        }
    }
})();